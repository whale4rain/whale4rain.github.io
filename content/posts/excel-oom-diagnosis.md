---
title: "goroutine 中 excel 操作 OOM：一次错误的诊断"
date: 2025-12-17T12:00:00+08:00
draft: false
summary: "一次线上 OOM 的完整诊断复盘：从 dmesg 到 pprof，中间还闹了个乌龙，最后定位到真正的元凶。"
categories: ["技术"]
tags: ["Go", "OOM", "pprof", "并发", "excelize"]
slug: "excel-oom-diagnosis"
---

我的程序出现OOM，最开始的分析是excel操作和并发锁导致的内存线形增长但是却忽略的最明显的问题

---

## 🔍 事故场景分析

log里没有错误和panic，很大概率是oom，经过查验

```shell
$ dmesg | grep oom
[xxx.xxxxxx] model-xxx invoked oom-killer: gfp_mask=0xcc0(GFP_KERNEL), order=0, oom_score_adj=0
[xxx.xxxxxx]  try_charge+0x6c2/0x750 [livepatch_0001_fix_oom_issues_and_cgroup_leak_and_bt_lo]
[xxx.xxxxxx]  ? memory_max_write+0x1b0/0x1b0 [livepatch_0001_fix_oom_issues_and_cgroup_leak_and_bt_lo]
[xxx.xxxxxx] oom-kill:constraint=CONSTRAINT_NONE,nodemask=(null),cpuset=xxx.newapp-xxx-xxx-server-hbf,mems_allowed=0-1,oom_memcg=/matrix/xxx/xxx.newapp-xxxxxx-server-hbf,task_memcg=/matrix/stable/xxx.newapp-xxxxxx-server-hbf,task=xxxxxx-se,pid=xxx,uid=xxx
[xxx.xxxxxx] [  pid  ]   uid  tgid total_vm      rss pgtables_bytes swapents oom_score_adj name
[xxx.xxxxxx] Out of memory (oom kill group): Killed process xxx (matrix-init-pro) total-vm:xxxkB, anon-rss:xxxkB, file-rss:xxxkB, shmem-rss:0kB, UID:0 pgtables:xxxkB oom_score_adj:0
[xxx.xxxxxx] Out of memory (oom kill group): Killed process xxx (matrix_jail) total-vm:xxxkB, anon-rss:xxxkB, file-rss:xxxkB, shmem-rss:0kB, UID:0 pgtables:xxxkB oom_score_adj:0
[xxx.xxxxxx] Out of memory (oom kill group): Killed process xxx (bash) total-vm:xxxkB, anon-rss:xxxkB, file-rss:xxxkB, shmem-rss:0kB, UID:0 pgtables:xxxkB oom_score_adj:0
[xxx.xxxxxx] oom_reaper: reaped process xxx (bash), now anon-rss:0kB, file-rss:0kB, shmem-rss:0kB
[xxx.xxxxxx] Out of memory (oom kill group): Killed process xxx (noah-ci) total-vm:xxxkB, anon-rss:xxxkB, file-rss:xxxkB, shmem-rss:xxxkB, UID:0 pgtables:xxxkB oom_score_adj:0
[xxx.xxxxxx] Out of memory (oom kill group): Killed process xxx (supervise) total-vm:xxxkB, anon-rss:xxxkB, file-rss:xxxkB, shmem-rss:0kB, UID:xxx pgtables:xxxkB oom_score_adj:0
[xxx.xxxxxx] Out of memory (oom kill group): Killed process xxx (xxxxxx-se) total-vm:xxxkB, anon-rss:xxxkB, file-rss:xxxkB, shmem-rss:0kB, UID:xxx pgtables:xxxkB oom_score_adj:0
[xxx.xxxxxx] oom_reaper: reaped process xxx (noah-ci), now anon-rss:0kB, file-rss:0kB, shmem-rss:0kB
[xxx.xxxxxx] oom_reaper: reaped process xxx (model-xxx), now anon-rss:0kB, file-rss:0kB, shmem-rss:0kB
```

机器无法使用`dmesg -T` 使用 `who -b` 计算时间定位确定发生时间，确定事故时间及原因是：程序OOM，下面进行细致的分析

## 1️⃣最开始的分析

### 一、问题概述

在 Go 语言模型评估任务 `ProcessModel` 函数中，使用 `github.com/xuri/excelize/v2` 库并发写入 Excel 文件时，将协程并发数 (`Concurrency`) 从 $2$ 提高到 $10$ 导致程序出现 **内存溢出（OOM）** 崩溃。

### 二、关键数据与现象

| **指标** | **Concurrency=2** | **Concurrency=10** | **结论** |
|---|---|---|---|
| **任务结果** | 正常完成 | OOM 崩溃 | 高并发触发 OOM |
| **输入文件大小** | 约 1MB | 约 1MB | 输入并非主要问题 |
| **pprof 内存总量** | N/A | 87.03MB (采样) | 内存峰值过高 |
### pprof 内存热点数据 (Top 5)

| **函数名** | **Flat %** | **Cumulative %** | **内存用途** |
|---|---|---|---|
| `bytes.growSlice` | 25.86% | 25.86% | 底层切片扩容开销 |
| `excelize.(*xlsxWorksheet).prepareSheetXML` | 24.78% | 50.63% | **构建整个工作表的 XML DOM 结构** |
| `encoding/xml.copyValue` | 17.40% | 68.03% | XML 数据序列化开销 |
| `strings.(*Builder).WriteString` | 15.13% | 83.16% | 字符串拼接开销 |
| `excelize.(*xlsxWorksheet).checkRow` | 4.02% | 87.18% | 行检查和处理 |
结果Excel大小11mb，输入Excel1mb左右，我们分析excel解析的消耗

### 附：excel 解析占用分析

![](/images/notion/excel-oom-child/img1.png)

对比程序如下

对比： SetCellValue经过解析，stremWrite流式写入

### 对比测试程序

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	_ "net/http/pprof"
	"os"
	"runtime"
	"runtime/pprof"
	"time"

	"github.com/xuri/excelize/v2"
)

func main() {
	// 启动 pprof HTTP
	go func() {
		log.Println("pprof listening on :6060")
		log.Println(http.ListenAndServe("0.0.0.0:6060", nil))
	}()

	f := excelize.NewFile()
	sw, err := f.NewStreamWriter("Sheet1")
	if err != nil {
		panic(err)
	}

	const (
		totalRows   = 200_000
		dumpEvery   = 20_000
		outputExcel = "large.xlsx"
	)

	for i := 1; i <= totalRows; i++ {
		row := []interface{}{
			i,
			fmt.Sprintf("row-%d-some-long-text-%d", i, i),
			time.Now().Unix(),
		}

		cell := fmt.Sprintf("A%d", i)
		if err := sw.SetRow(cell, row); err != nil {
			panic(err)
		}

		// 每 dumpEvery 行，记录一次内存
		if i%dumpEvery == 0 {
			logMem(fmt.Sprintf("after %d rows", i))
			dumpHeap(fmt.Sprintf("heap_%d.pprof", i))
		}
	}

	if err := sw.Flush(); err != nil {
		panic(err)
	}

	if err := f.SaveAs(outputExcel); err != nil {
		panic(err)
	}

	logMem("after save")
}

func dumpHeap(filename string) {
	f, err := os.Create(filename)
	if err != nil {
		log.Println("create heap file failed:", err)
		return
	}
	defer f.Close()

	runtime.GC() // 强制回收，避免“暂存对象”
	if err := pprof.WriteHeapProfile(f); err != nil {
		log.Println("write heap failed:", err)
	}
}

func _main() {

	go func() {
		log.Println(http.ListenAndServe("0.0.0.0:6060", nil))
	}()

	f := excelize.NewFile()
	sheet := "Sheet1"

	const (
		totalRows = 200_000
		dumpEvery = 20_000
	)

	for i := 1; i <= totalRows; i++ {
		cellA := fmt.Sprintf("A%d", i)
		cellB := fmt.Sprintf("B%d", i)
		cellC := fmt.Sprintf("C%d", i)

		f.SetCellValue(sheet, cellA, i)
		f.SetCellValue(sheet, cellB, fmt.Sprintf("this-is-a-long-string-%d-%d", i, time.Now().UnixNano()))
		f.SetCellValue(sheet, cellC, time.Now().Format(time.RFC3339Nano))

		if i%dumpEvery == 0 {
			logMem(fmt.Sprintf("after %d rows", i))
			dumpHeap(fmt.Sprintf("heap_setcell_%d.pprof", i))
		}
	}

	logMem("before save")
	dumpHeap("heap_setcell_before_save.pprof")

	if err := f.SaveAs("setcell.xlsx"); err != nil {
		panic(err)
	}

	logMem("after save")
}

func logMem(tag string) {
	var m runtime.MemStats
	runtime.ReadMemStats(&m)

	log.Printf(
		"[MEM][%s] HeapAlloc=%.2fMB HeapInuse=%.2fMB Sys=%.2fMB NumGC=%d\n",
		tag,
		float64(m.HeapAlloc)/1024/1024,
		float64(m.HeapInuse)/1024/1024,
		float64(m.Sys)/1024/1024,
		m.NumGC,
	)
}

```

在20,000行小数据内容处理中看出解析excel到xml的操作中，多了200mb的内存分配操作

|  | inuse_Space | alloc_Space |
|---|---|---|
| 解析前 | 21 | 138 |
| 解析后 | 250.9 | 479 |
| 差异 | 几乎翻了十倍 | 差了近四倍 |
可以看到确实存在巨大内存损耗

![](/images/notion/excel-oom-child/img2.png)

```rust
File: main
Type: inuse_space
Time: 2025-12-17 20:05:13 CST
Entering interactive mode (type "help" for commands, "o" for options)
(pprof) top
Showing nodes accounting for 249.41MB, 99.40% of 250.91MB total
Dropped 18 nodes (cum <= 1.25MB)
Showing top 10 nodes out of 28
      flat  flat%   sum%        cum   cum%
  135.30MB 53.92% 53.92%   146.80MB 58.51%  github.com/xuri/excelize/v2.(*xlsxWorksheet).prepareSheetXML
   76.60MB 30.53% 84.45%    76.60MB 30.53%  github.com/xuri/excelize/v2.(*File).setSharedString
    9.50MB  3.79% 88.24%     9.50MB  3.79%  fmt.Sprintf
    8.50MB  3.39% 91.63%     8.50MB  3.39%  strconv.formatBits
       8MB  3.19% 94.82%        8MB  3.19%  time.Time.Format
    5.50MB  2.19% 97.01%     5.50MB  2.19%  github.com/xuri/excelize/v2.ColumnNumberToName (inline)
    3.50MB  1.39% 98.40%    11.50MB  4.58%  github.com/xuri/excelize/v2.CoordinatesToCellName
       2MB   0.8% 99.20%        2MB   0.8%  runtime.allocm
    0.50MB   0.2% 99.40%   247.40MB 98.60%  main.main
         0     0% 99.40%   141.80MB 56.51%  github.com/xuri/excelize/v2.(*File).SetCellInt
(pprof)
```

### 其中对于prepareSheetXML

```rust
list prepareSheetXML
Total: 250.91MB
ROUTINE ======================== github.com/xuri/excelize/v2.(*xlsxWorksheet).prepareSheetXML in /Users/whale_rain/go/pkg/mod/github.com/xuri/excelize/v2@v2.10.0/sheet.go
  135.30MB   146.80MB (flat, cum) 58.51% of Total
				..............
         .          .   2055:	if rowCount < row {
         .          .   2056:		// append missing rows
         .          .   2057:		for rowIdx := rowCount; rowIdx < row; rowIdx++ {
  135.30MB   135.30MB   2058:			ws.SheetData.Row = append(ws.SheetData.Row, xlsxRow{R: rowIdx + 1, CustomHeight: customHeight, Ht: ht, C: make([]xlsxC, 0, sizeHint)})
         .          .   2059:		}
         .          .   2060:	}
         .          .   2061:	rowData := &ws.SheetData.Row[row-1]
         .    11.50MB   2062:	fillColumns(rowData, col, row)
         .          .   2063:}
         .          .   2064:
         .          .   2065:// fillColumns fill cells in the column of the row as contiguous.
         .          .   2066:func fillColumns(rowData *xlsxRow, col, row int) {
         .          .   2067:	cellCount := len(rowData.C)
```

这里对于一个高占用Slice的append操作在我们事故报告里有发现其存在

### 而对于setSharedString

```rust
   34.50MB    34.50MB    501:	t := xlsxT{Val: val}
         .          .    502:	val, t.Space = trimCellValue(val, false)
   26.20MB    26.20MB    503:	sst.SI = append(sst.SI, xlsxSI{T: &t})
         .          .    504:	sst.Count = len(sst.SI)
         .          .    505:	sst.UniqueCount = sst.Count
   15.91MB    15.91MB    506:	f.sharedStringsMap[val] = sst.UniqueCount - 1
```

sharedStrings实际上是一个“字符串全集缓存表”，由于Excel 规范要求：

- 所有字符串统一放在 `xl/sharedStrings.xml`

- 单元格里只存 **索引**

所以 excelize 必须：

- 维护：

  - `[]string`（或等价结构）

  - `map[string]int`

- 并且 **整个文件生命周期内不能释放**

这就形成了一个持续增长的内存占用

### 更大的excel

```rust
Showing top 10 nodes out of 19
      flat  flat%   sum%        cum   cum%
  708.43MB 54.02% 54.02%   755.93MB 57.64%  github.com/xuri/excelize/v2.(*xlsxWorksheet).prepareSheetXML
  447.41MB 34.12% 88.14%   447.41MB 34.12%  github.com/xuri/excelize/v2.(*File).setSharedString
   56.50MB  4.31% 92.45%    56.50MB  4.31%  fmt.Sprintf
   31.50MB  2.40% 94.85%    31.50MB  2.40%  strconv.formatBits
      27MB  2.06% 96.91%       27MB  2.06%  time.Time.Format
      21MB  1.60% 98.51%    47.50MB  3.62%  github.com/xuri/excelize/v2.CoordinatesToCellName
   15.50MB  1.18% 99.69%    15.50MB  1.18%  github.com/xuri/excelize/v2.ColumnNumberToName (inline)
         0     0% 99.69%   731.43MB 55.78%  github.com/xuri/excelize/v2.(*File).SetCellInt
         0     0% 99.69%   492.41MB 37.55%  github.com/xuri/excelize/v2.(*File).SetCellStr
         0     0% 99.69%  1223.84MB 93.33%  github.com/xuri/excelize/v2.(*File).SetCellValue
```

对与2万行简单数据达到了近1GB的占用，如果在并行写入不使用channel的情况下造成少与 1 * 20 = 20GB

### 三、原因与细致分析

OOM 问题并非由简单的并发 Bug 引起，而是由**内存模型**、**高并发**和**互斥锁**共同作用下导致的内存峰值叠加。

### 1. 根本原因：Excelize 的 DOM 内存模型

`excelize` 在使用 `SetCellValue` 时，采用了 **Document Object Model (DOM)** 模式。这意味着它会**将整个 Excel 文件的工作表结构以 XML 形式完整地保存在内存中**。

- **内存膨胀**：由于 LLM 的输出（`RAG引用`、`思考内容`、`当轮上下文`）包含大量长文本，这些文本被 `excelize` 包装成 XML 标签（如 `<v>...</v>`），导致内存占用远高于纯文本大小（通常 $5$ 到 $10$ 倍）。

- **pprof 证据**：`prepareSheetXML` 占用 $24.78\%$，明确指出内存被用于构建巨大的 XML 内存树。

### 2. 直接原因：互斥锁导致的并发内存滞留

这是导致 Concurrency=10 崩溃的核心机制。您的代码结构如下：

`Go`

`go func() {
    // A. 耗时操作：调用 LLM API，获取大型响应数据 (如 5MB/条)
    resp := callLLM() 

    // B. 瓶颈：获取互斥锁 (mu.Lock())
    mu.Lock() 
    
    // C. 串行操作：写入 Excelize 内存结构 (newFile.SetCellValue)
    mu.Unlock()
    
    // D. Goroutine 退出
}()`

在高并发下 ($N=10$)：

1. **9 个 Goroutine 饥饿**：$10$ 个 Goroutine 同时完成了步骤 A，获得了 $10$ 份 LLM 响应数据。

1. **数据堆积**：只有 **1 个** Goroutine 能拿到锁（步骤 B）执行写入（步骤 C）。

1. **内存峰值叠加**：剩下的 **9 个** Goroutine 处于阻塞等待状态。它们不能退出，因此它们所持有的 $9$ 份 **LLM 响应数据（长文本字符串）** 无法被 Go 垃圾回收器（GC）回收。

1. 瞬时 OOM：系统的瞬时内存峰值达到：

  $$\text{Peak Memory} \approx \text{Excel DOM 结构大小} + N \times (\text{LLM 响应数据大小})$$

  当 DOM 结构本身已经膨胀到容器边缘时（如 $400$MB），额外叠加 $10 \times 10$MB 的滞留内存，直接触发 OOM。

### 3. 辅助原因：高频内存扩容

`bytes.growSlice` 和 `WriteString` 的高占比 ($41\%$) 表明，在并发写入时，`excelize` 底层的切片需要频繁地进行 $2$ 倍内存扩容，这个操作需要临时的**双倍内存空间**，加剧了 OOM 风险。

### 四、解决方案与结果预测

根本解决思路是：**解耦高内存消耗的写入操作，并消除 DOM 模式带来的巨大内存基础开销。**

### 💡 方案一：Channel 写入 + 释放内存 (治标)

- **操作**：移除 Goroutine 中的 `mu.Lock()`。引入一个 `resultChan`。Worker 协程计算完毕后，将结果发送给 Channel，随即退出（释放内存引用）。一个独立的 Writer 协程串行地从 Channel 接收数据并写入 Excel。

- **预测结果**：

  - **解决滞留内存**：Worker 快速退出，系统无需同时持有 $10$ 份 LLM 响应。瞬时峰值内存预计减少 **80% - 90%**。

  - **未解决问题**：`excelize` 的 DOM 结构基础内存依然会随着行数增加而膨胀，如果文件最终超过 $500$MB，程序仍可能 OOM。

### 🚀 方案二：Channel + StreamWriter (推荐治本方案)

- **操作**：在方案一的基础上，放弃使用 `newFile.SetCellValue`，改用 `newFile.NewStreamWriter` 进行流式写入。

- **优点**：`StreamWriter` 不在内存中维护完整的 XML DOM 结构，而是写一行数据就将数据刷新到磁盘（或临时文件）。

- **预测结果**：

  - **消除 DOM 基础开销**：根除了 `prepareSheetXML` 和相关 XML 操作的巨大内存占用。内存占用将保持在一个平稳的低水位。

  - **彻底解决 OOM**：此方案能彻底解决高并发下因内存峰值叠加和 XML 结构膨胀导致的 OOM 问题。

### 简易方案：CSV 中转

- **操作**：将结果先写入内存占用极低的 `.csv` 文件，任务结束后再通过单线程将 CSV 转换为 `.xlsx` 文件。

- **预测结果**：内存消耗最低，但流程多一步。

## 2️⃣一个乌龙：真正的问题

```shell
$ pprof pprof.main.alloc_objects.alloc_space.inuse_objects.inuse_space.012.pb.gz 
File: main
Type: inuse_space
Time: 2025-12-17 16:49:48 CST
Entering interactive mode (type "help" for commands, "o" for options)
(pprof) top
Showing nodes accounting for 4.39GB, 99.87% of 4.40GB total
Dropped 100 nodes (cum <= 0.02GB)
      flat  flat%   sum%        cum   cum%
    4.39GB 99.87% 99.87%     4.40GB 99.88%  xxxxxx/xxxxxx-server/model/service.analyzeWithInnerAPI
         0     0% 99.87%     4.40GB 99.88%  xxxxxx/xxxxxx-server/model/service.ProcessModel.func3
         0     0% 99.87%     4.40GB 99.88%  xxxxxx/xxxxxx-server/model/service.processRowsInGoroutine
(pprof) list analyzeWithInnerAPI
Total: 4.40GB
ROUTINE ======================== xxxxxx/xxxxxx-server/model/service.analyzeWithInnerAPI in /home/work/baidu/developing/xxxxxx-server/model/service/model_evaluation_llm.go
    4.39GB     4.40GB (flat, cum) 99.88% of Total
         .          .    406:func analyzeWithInnerAPI(ctx context.Context, inputParam AnalysisFuncInput) (string, ModelPerformance, error) {
         .          .    407:   var buf strings.Builder
         .          .    408:   var thinkingBuf strings.Builder
         .          .    409:   perf := ModelPerformance{}
         .          .    410:   start := time.Now()
         .          .    411:
         .          .    412:   reqBody := map[string]interface{}{
         .          .    413:           "scene":    "llm",
         .          .    414:           "model":    LlmAPIConfig[inputParam.modelType].Model,
         .          .    415:           "messages": inputParam.messages,
         .          .    416:           "stream":   true,
         .          .    417:   }
         .          .    418:
         .          .    419:   //  解析 extParams 解析为一个 map
         .          .    420:   var additionalParams map[string]interface{}
         .          .    421:   err := json.Unmarshal([]byte(inputParam.extParams), &additionalParams)
         .          .    422:   if err != nil {
         .          .    423:           fmt.Println("错误：解析 unknownKeysJsonString 失败:", err)
         .          .    424:           return "", ModelPerformance{Error: err}, err
         .          .    425:   }
         .          .    426:
         .          .    427:   //    合并 additionalParams 到 baseParams 中
         .          .    428:   //    如果存在同名键，additionalParams 中的值会覆盖 baseParams 中的值
         .          .    429:   for key, value := range additionalParams {
         .          .    430:           reqBody[key] = value
         .          .    431:   }
         .          .    432:
         .          .    433:   jsonBody, _ := json.Marshal(reqBody)
         .          .    434:
         .          .    435:   // 保存ext字段
         .          .    436:   extBody := reqBody
         .          .    437:   delete(extBody, "messages")
         .          .    438:   tmpJson, _ := json.Marshal(extBody)
         .          .    439:   jsonExtBody, _ := json.Marshal(extBody["ext"])
         .          .    440:   fmt.Println("extBody; ", string(tmpJson))
         .          .    441:   fmt.Println("ext: ", string(jsonExtBody))
         .          .    442:   perf.Extension = string(jsonExtBody)
         .          .    443:
         .          .    444:   req, _ := http.NewRequestWithContext(ctx, "POST", LlmAPIConfig[inputParam.modelType].APIPath, bytes.NewBuffer(jsonBody))
         .          .    445:   logger.AddNotice(ctx, "请求参数", string(jsonBody))
         .          .    446:   req.Header.Set("Content-Type", "application/json")
         .          .    447:   // req.Header.Set("Authorization", LlmAPIConfig[inputParam.modelType].Token)
         .          .    448:
         .          .    449:   // 暂时先用Token字段放Cookie
         .          .    450:   req.Header.Set("Cookie", LlmAPIConfig[inputParam.modelType].Token)
         .          .    451:
         .          .    452:   client := &http.Client{
         .          .    453:           Transport: &http.Transport{
         .          .    454:                   TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
         .          .    455:           },
         .          .    456:           Timeout: 10 * time.Minute,
         .          .    457:   }
         .          .    458:
         .          .    459:   // 发送请求
         .          .    460:   resp, err := client.Do(req)
         .          .    461:   if err != nil {
         .          .    462:           if ctx.Err() == context.DeadlineExceeded {
         .          .    463:                   fmt.Println("请求超时，继续处理下一个")
         .          .    464:                   // 关闭响应体（如果存在）
         .          .    465:                   if resp != nil {
         .          .    466:                           err := resp.Body.Close()
         .          .    467:                           if err != nil {
         .          .    468:                                   // 关闭相应体错误
         .          .    469:                                   return "", ModelPerformance{Error: err}, err
         .          .    470:                           }
         .          .    471:                   }
         .          .    472:                   // 超时错误
         .          .    473:                   return "", ModelPerformance{Error: err}, err // 跳过本次循环剩余部分
         .          .    474:           }
         .          .    475:           // 未知错误
         .          .    476:           return "", ModelPerformance{Error: err}, err
         .          .    477:   }
         .          .    478:   defer resp.Body.Close()
         .          .    479:
         .          .    480:   scanner := bufio.NewScanner(resp.Body)
         .          .    481:   // 设置一个更大的缓冲区
         .          .    482:   const maxCapacity = 1024 * 1024 * 500 // 500MB
    4.39GB     4.39GB    483:   buffer := make([]byte, maxCapacity)
         .          .    484:   scanner.Buffer(buffer, maxCapacity)
         .          .    485:   firstToken := true
         .          .    486:   firstPara := true
         .          .    487:   // firstThinkingToken := true
         .          .    488:
         .          .    489:   pattern := `https://[^\s"]+\.png`
         .          .    490:   patternEmpty := `reasoning_content":""`
         .          .    491:   reImg := regexp.MustCompile(pattern)
         .   512.01kB    492:   reEmp := regexp.MustCompile(patternEmpty)
         .          .    493:   for scanner.Scan() {
         .          .    494:           line := scanner.Text()
         .          .    495:           //fmt.Println("Line Output:", line)
         .          .    496:           if line == "" || line == "data: [DONE]" {
         .          .    497:                   continue
```

设置了一个太大的buffer是真正的问题，maxCapacity不应该是buffer的初始值应该是scan的最大值正确写法是：

```go
// 修正后的代码
const maxCapacity = 1024 * 1024 * 500 // 允许最大 500MB（防止报错 token too long）
initialBuffer := make([]byte, 64*1024) // 初始只申请 64KB

// 关键点：Scanner 会自动从 64KB 开始，如果遇到长行，它会自动翻倍扩容，直到 maxCapacity
scanner.Buffer(initialBuffer, maxCapacity)//在这里使用maxCapacity
```

这个buffer的设置原先是为了解决内部结构会返回一个巨大的json，之前由于buffer设置太小导致无法正确接收所以设置了太大的buffer，在并行情况会出现 10 * 500mb = 5000mb 导致巨大的内存分配。

## 🤔为什么出现两种不同的分析

因为 **pprof 的默认行为是“快照（Snapshot）”**，而你的问题是 **“瞬时峰值（Spike）”**。

这就像是警察去抓超速，他在路口拍了一张照片。

- **照片里**：Excelize 是一辆装满货的大卡车，开得很慢，很显眼。

- **没拍到的**：那 10 辆 500MB 的法拉利（Scanner Buffer）刚刚以 300km/h 冲过去，已经开走了（被 GC 回收或尚未分配）。

### 复盘分析

### 1. 默认视角：`inuse_space` vs `alloc_space`

这是最核心的原因。

- **`inuse_space`**** (pprof 默认)**：显示 **当前时刻** 依然存活在内存中的对象。

- **`alloc_space`**：显示 **程序启动以来** 累计分配过的内存总量（不管是否已被回收）。

场景还原：

当你抓取第一次 pprof 时，那 10 个协程可能正好：

1. **刚处理完网络请求**：那 10 个 `make([]byte, 500MB)` 刚用完，函数退出，引用断开。

1. **正在等锁写入 Excel**：此时活跃内存里全是 `excelize` 的 XML 结构。

1. **GC 刚介入**：Go 的 GC 效率很高，如果你在请求间隙抓取，那 5GB 的内存可能刚被标记为“可回收”或已回收，**所以在 ****`inuse_space`**** 视图里消失了**。

你在第一次报告中看到 `Total: 87.03MB`，这对于一个 10 并发跑大模型的任务来说太小了，这本身就是疑点——说明你抓取的是“平静期”或“清理后”的内存。

### 2. “幸存者偏差”

Excelize 的对象（DOM 树）是长驻内存的，随着任务进行一直变大，直到保存文件才释放。

而 buffer := make(...) 是临时内存，用完即扔。

在 `inuse_space`（当前快照）中，长驻内存的 Excelize 永远都在，所以它看起来像是“罪魁祸首”。真正的凶手（500MB Buffer）是“作案后潜逃”，除非你正好在它作案的那几百毫秒内抓到了它，否则它在快照里就是隐形的。

### 3. `pprof` 的局限性

- `top` 展示的是 **累计热点**

- 无法反映 **瞬时峰值分配**

- 一次性大分配容易被噪音函数（Builder / excelize）掩盖

### 4. OOM 的本质

OOM（Out Of Memory）通常发生在 Alloc（分配） 的一瞬间。

如果你的程序直接崩了，你甚至来不及抓 pprof。如果你没崩但抓到了 pprof，说明系统刚扛过了一波冲击，或者冲击还没来。你第一次抓到的 pprof，大概率是冲击刚过，现场只剩下 Excelize 在打扫战场。

---

### 二、 正确使用 pprof 的姿势

为了不再被“隐形内存”欺骗，建议采用以下一套标准的排查组合拳：

### 1. 必看：切换到 `alloc_space` 模式

不要只看默认视图。进入 pprof 交互模式后，**第一时间检查累计分配**。

```shell
go tool pprof http://localhost:xxxx/debug/pprof/heap
```

进入交互界面后：

```shell
(pprof) o            # 查看当前选项
(pprof) alloc_space  # 切换到“累计分配空间”模式 !!! 重要
(pprof) top10
```

**如果当时开了 ****`alloc_space`****，那 4.4GB 的 ****`analyzeWithInnerAPI`**** 会瞬间排在第一名，因为它累计申请的量太大了。**

- **`inuse_space`**** 高** = 内存泄漏（对象不释放）。

- **`alloc_space`**** 高 但 ****`inuse_space`**** 低** = 内存抖动（高频创建大对象，GC 压力极大，容易导致 OOM）。

### 2. 抓取时机：基准对比 (Base Profiling)

不要只抓一次。在任务开始前、峰值中、任务结束前各抓一次。

更好的方法是使用 -base 标志来查看增量：

1. 先抓一个快照作为基准：`curl ... > base.heap`

1. 运行一段时间（或并发上来后）再抓一个：`curl ... > current.heap`

1. 对比分析：

  `go tool pprof -base base.heap current.heap`

  这样能直接看到**新增了什么**，过滤掉底噪。

### 3. 关注 GC 频率

如果你的程序很卡，或者 CPU 占用忽高忽低，先看 GC。

如果代码里有大量临时大对象（比如你的 500MB buffer），GC 会疯狂工作。

可以在启动程序前加上环境变量，直接看 GC 日志：

`GODEBUG=gctrace=1 ./your_program`

如果你看到日志疯狂刷屏，且 `Scavenged`（回收）的内存量巨大（比如每次 GC 都回收几个 GB），说明有“隐形的大对象”在不断生灭。

### 4. Web UI 视图的 `Source` 功能

最后使用的 `list` 命令（对应 Web UI 的 Source 视图）是终极武器。

- `top` 只能看个概览。

- 一旦发现某个函数（如 `analyzeWithInnerAPI`）出现在 top 榜单（哪怕不是第一），**立刻 list 进去看代码行的内存归属**。

- 你最后正是通过 `list` 发现了第 482 行代码占了 4.39GB。

### 三、 总结建议

下次遇到 **“明明输入很少，内存却爆了”** 的诡异情况：

1. **怀疑大对象**：一定有地方在分配巨大的 Slice 或 String。

1. **看 ****`alloc_space`**：这是照妖镜，能照出那些“短命但巨大”的对象。

1. **看 ****`list`**** 代码行**：不要停留在函数名级别，必须深入到代码行，看看到底是哪一行在 `make`。

1. **警惕硬编码常量**：任何 `make(..., constant)` 都是潜在的炸弹，尤其是当这行代码在循环或并发中时。

## 🍀修复结果

| 项目 | 修复前 | 修复后 |
|---|---|---|
| 峰值 RSS | >4GB（20并发>8G) | <300MB |
| 并发 10 | OOM | 正常 |
| pprof Total | 4.40GB | <100MB |
| 服务稳定性 | 不稳定 | 稳定 |
项目要用`pprof`，`pprof`关注点和多次比较

---

*本文由 Notion 笔记整理发布。*
