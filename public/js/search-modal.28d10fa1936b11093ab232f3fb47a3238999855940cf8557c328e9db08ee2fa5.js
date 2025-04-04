(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // node_modules/@popperjs/core/lib/index.js
  var lib_exports = {};
  __export(lib_exports, {
    afterMain: () => afterMain,
    afterRead: () => afterRead,
    afterWrite: () => afterWrite,
    applyStyles: () => applyStyles_default,
    arrow: () => arrow_default,
    auto: () => auto,
    basePlacements: () => basePlacements,
    beforeMain: () => beforeMain,
    beforeRead: () => beforeRead,
    beforeWrite: () => beforeWrite,
    bottom: () => bottom,
    clippingParents: () => clippingParents,
    computeStyles: () => computeStyles_default,
    createPopper: () => createPopper3,
    createPopperBase: () => createPopper,
    createPopperLite: () => createPopper2,
    detectOverflow: () => detectOverflow,
    end: () => end,
    eventListeners: () => eventListeners_default,
    flip: () => flip_default,
    hide: () => hide_default,
    left: () => left,
    main: () => main,
    modifierPhases: () => modifierPhases,
    offset: () => offset_default,
    placements: () => placements,
    popper: () => popper,
    popperGenerator: () => popperGenerator,
    popperOffsets: () => popperOffsets_default,
    preventOverflow: () => preventOverflow_default,
    read: () => read,
    reference: () => reference,
    right: () => right,
    start: () => start,
    top: () => top,
    variationPlacements: () => variationPlacements,
    viewport: () => viewport,
    write: () => write
  });

  // node_modules/@popperjs/core/lib/enums.js
  var top = "top";
  var bottom = "bottom";
  var right = "right";
  var left = "left";
  var auto = "auto";
  var basePlacements = [top, bottom, right, left];
  var start = "start";
  var end = "end";
  var clippingParents = "clippingParents";
  var viewport = "viewport";
  var popper = "popper";
  var reference = "reference";
  var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []);
  var beforeRead = "beforeRead";
  var read = "read";
  var afterRead = "afterRead";
  var beforeMain = "beforeMain";
  var main = "main";
  var afterMain = "afterMain";
  var beforeWrite = "beforeWrite";
  var write = "write";
  var afterWrite = "afterWrite";
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  // node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
  function getNodeName(element) {
    return element ? (element.nodeName || "").toLowerCase() : null;
  }

  // node_modules/@popperjs/core/lib/dom-utils/getWindow.js
  function getWindow(node) {
    if (node == null) {
      return window;
    }
    if (node.toString() !== "[object Window]") {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }
    return node;
  }

  // node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }
  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }
  function isShadowRoot(node) {
    if (typeof ShadowRoot === "undefined") {
      return false;
    }
    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }

  // node_modules/@popperjs/core/lib/modifiers/applyStyles.js
  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function(name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name];
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(name2) {
        var value = attributes[name2];
        if (value === false) {
          element.removeAttribute(name2);
        } else {
          element.setAttribute(name2, value === true ? "" : value);
        }
      });
    });
  }
  function effect(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }
    return function() {
      Object.keys(state.elements).forEach(function(name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
        var style = styleProperties.reduce(function(style2, property) {
          style2[property] = "";
          return style2;
        }, {});
        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }
        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function(attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  }
  var applyStyles_default = {
    name: "applyStyles",
    enabled: true,
    phase: "write",
    fn: applyStyles,
    effect,
    requires: ["computeStyles"]
  };

  // node_modules/@popperjs/core/lib/utils/getBasePlacement.js
  function getBasePlacement(placement) {
    return placement.split("-")[0];
  }

  // node_modules/@popperjs/core/lib/utils/math.js
  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  // node_modules/@popperjs/core/lib/utils/userAgent.js
  function getUAString() {
    var uaData = navigator.userAgentData;
    if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
      return uaData.brands.map(function(item) {
        return item.brand + "/" + item.version;
      }).join(" ");
    }
    return navigator.userAgent;
  }

  // node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
  function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString());
  }

  // node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
  function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    var clientRect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;
    if (includeScale && isHTMLElement(element)) {
      scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
      scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
    }
    var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
    var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
    var width = clientRect.width / scaleX;
    var height = clientRect.height / scaleY;
    return {
      width,
      height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x,
      y
    };
  }

  // node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element);
    var width = element.offsetWidth;
    var height = element.offsetHeight;
    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }
    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }
    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width,
      height
    };
  }

  // node_modules/@popperjs/core/lib/dom-utils/contains.js
  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode();
    if (parent.contains(child)) {
      return true;
    } else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;
      do {
        if (next && parent.isSameNode(next)) {
          return true;
        }
        next = next.parentNode || next.host;
      } while (next);
    }
    return false;
  }

  // node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
  function getComputedStyle2(element) {
    return getWindow(element).getComputedStyle(element);
  }

  // node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
  function isTableElement(element) {
    return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
  }

  // node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
  function getDocumentElement(element) {
    return ((isElement(element) ? element.ownerDocument : (
      // $FlowFixMe[prop-missing]
      element.document
    )) || window.document).documentElement;
  }

  // node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
  function getParentNode(element) {
    if (getNodeName(element) === "html") {
      return element;
    }
    return (
      // this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || // DOM Element detected
      (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element)
    );
  }

  // node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle2(element).position === "fixed") {
      return null;
    }
    return element.offsetParent;
  }
  function getContainingBlock(element) {
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());
    if (isIE && isHTMLElement(element)) {
      var elementCss = getComputedStyle2(element);
      if (elementCss.position === "fixed") {
        return null;
      }
    }
    var currentNode = getParentNode(element);
    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }
    while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle2(currentNode);
      if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }
    return null;
  }
  function getOffsetParent(element) {
    var window2 = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
      offsetParent = getTrueOffsetParent(offsetParent);
    }
    if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
      return window2;
    }
    return offsetParent || getContainingBlock(element) || window2;
  }

  // node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
  function getMainAxisFromPlacement(placement) {
    return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
  }

  // node_modules/@popperjs/core/lib/utils/within.js
  function within(min2, value, max2) {
    return max(min2, min(value, max2));
  }
  function withinMaxClamp(min2, value, max2) {
    var v = within(min2, value, max2);
    return v > max2 ? max2 : v;
  }

  // node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  // node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }

  // node_modules/@popperjs/core/lib/utils/expandToHashMap.js
  function expandToHashMap(value, keys) {
    return keys.reduce(function(hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  // node_modules/@popperjs/core/lib/modifiers/arrow.js
  var toPaddingObject = function toPaddingObject2(padding, state) {
    padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  };
  function arrow(_ref) {
    var _state$modifiersData$;
    var state = _ref.state, name = _ref.name, options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? "height" : "width";
    if (!arrowElement || !popperOffsets2) {
      return;
    }
    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === "y" ? top : left;
    var maxProp = axis === "y" ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
    var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2;
    var min2 = paddingObject[minProp];
    var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset2 = within(min2, center, max2);
    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
  }
  function effect2(_ref2) {
    var state = _ref2.state, options = _ref2.options;
    var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
    if (arrowElement == null) {
      return;
    }
    if (typeof arrowElement === "string") {
      arrowElement = state.elements.popper.querySelector(arrowElement);
      if (!arrowElement) {
        return;
      }
    }
    if (!contains(state.elements.popper, arrowElement)) {
      return;
    }
    state.elements.arrow = arrowElement;
  }
  var arrow_default = {
    name: "arrow",
    enabled: true,
    phase: "main",
    fn: arrow,
    effect: effect2,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
  };

  // node_modules/@popperjs/core/lib/utils/getVariation.js
  function getVariation(placement) {
    return placement.split("-")[1];
  }

  // node_modules/@popperjs/core/lib/modifiers/computeStyles.js
  var unsetSides = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };
  function roundOffsetsByDPR(_ref, win) {
    var x = _ref.x, y = _ref.y;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }
  function mapToStyles(_ref2) {
    var _Object$assign2;
    var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
    var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
      x,
      y
    }) : {
      x,
      y
    };
    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty("x");
    var hasY = offsets.hasOwnProperty("y");
    var sideX = left;
    var sideY = top;
    var win = window;
    if (adaptive) {
      var offsetParent = getOffsetParent(popper2);
      var heightProp = "clientHeight";
      var widthProp = "clientWidth";
      if (offsetParent === getWindow(popper2)) {
        offsetParent = getDocumentElement(popper2);
        if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
          heightProp = "scrollHeight";
          widthProp = "scrollWidth";
        }
      }
      offsetParent = offsetParent;
      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
          // $FlowFixMe[prop-missing]
          offsetParent[heightProp]
        );
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }
      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
          // $FlowFixMe[prop-missing]
          offsetParent[widthProp]
        );
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }
    var commonStyles = Object.assign({
      position
    }, adaptive && unsetSides);
    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x,
      y
    }, getWindow(popper2)) : {
      x,
      y
    };
    x = _ref4.x;
    y = _ref4.y;
    if (gpuAcceleration) {
      var _Object$assign;
      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }
    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
  }
  function computeStyles(_ref5) {
    var state = _ref5.state, options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration,
      isFixed: state.options.strategy === "fixed"
    };
    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive,
        roundOffsets
      })));
    }
    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: "absolute",
        adaptive: false,
        roundOffsets
      })));
    }
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-placement": state.placement
    });
  }
  var computeStyles_default = {
    name: "computeStyles",
    enabled: true,
    phase: "beforeWrite",
    fn: computeStyles,
    data: {}
  };

  // node_modules/@popperjs/core/lib/modifiers/eventListeners.js
  var passive = {
    passive: true
  };
  function effect3(_ref) {
    var state = _ref.state, instance = _ref.instance, options = _ref.options;
    var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
    var window2 = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.addEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.addEventListener("resize", instance.update, passive);
    }
    return function() {
      if (scroll) {
        scrollParents.forEach(function(scrollParent) {
          scrollParent.removeEventListener("scroll", instance.update, passive);
        });
      }
      if (resize) {
        window2.removeEventListener("resize", instance.update, passive);
      }
    };
  }
  var eventListeners_default = {
    name: "eventListeners",
    enabled: true,
    phase: "write",
    fn: function fn() {
    },
    effect: effect3,
    data: {}
  };

  // node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
  var hash = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function(matched) {
      return hash[matched];
    });
  }

  // node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
  var hash2 = {
    start: "end",
    end: "start"
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function(matched) {
      return hash2[matched];
    });
  }

  // node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft,
      scrollTop
    };
  }

  // node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
  function getWindowScrollBarX(element) {
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  // node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
  function getViewportRect(element, strategy) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      var layoutViewport = isLayoutViewport();
      if (layoutViewport || !layoutViewport && strategy === "fixed") {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x: x + getWindowScrollBarX(element),
      y
    };
  }

  // node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
  function getDocumentRect(element) {
    var _element$ownerDocumen;
    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;
    if (getComputedStyle2(body || html).direction === "rtl") {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  // node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
  function isScrollParent(element) {
    var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  // node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
  function getScrollParent(node) {
    if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
      return node.ownerDocument.body;
    }
    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }
    return getScrollParent(getParentNode(node));
  }

  // node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
  function listScrollParents(element, list) {
    var _element$ownerDocumen;
    if (list === void 0) {
      list = [];
    }
    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : (
      // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      updatedList.concat(listScrollParents(getParentNode(target)))
    );
  }

  // node_modules/@popperjs/core/lib/utils/rectToClientRect.js
  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  // node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
  function getInnerBoundingClientRect(element, strategy) {
    var rect = getBoundingClientRect(element, false, strategy === "fixed");
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }
  function getClientRectFromMixedType(element, clippingParent, strategy) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  }
  function getClippingParents(element) {
    var clippingParents2 = listScrollParents(getParentNode(element));
    var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
    if (!isElement(clipperElement)) {
      return [];
    }
    return clippingParents2.filter(function(clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
    });
  }
  function getClippingRect(element, boundary, rootBoundary, strategy) {
    var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
    var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents2[0];
    var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent, strategy));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  // node_modules/@popperjs/core/lib/utils/computeOffsets.js
  function computeOffsets(_ref) {
    var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference2.x + reference2.width / 2 - element.width / 2;
    var commonY = reference2.y + reference2.height / 2 - element.height / 2;
    var offsets;
    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference2.y - element.height
        };
        break;
      case bottom:
        offsets = {
          x: commonX,
          y: reference2.y + reference2.height
        };
        break;
      case right:
        offsets = {
          x: reference2.x + reference2.width,
          y: commonY
        };
        break;
      case left:
        offsets = {
          x: reference2.x - element.width,
          y: commonY
        };
        break;
      default:
        offsets = {
          x: reference2.x,
          y: reference2.y
        };
    }
    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
    if (mainAxis != null) {
      var len = mainAxis === "y" ? "height" : "width";
      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
          break;
        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
          break;
        default:
      }
    }
    return offsets;
  }

  // node_modules/@popperjs/core/lib/utils/detectOverflow.js
  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets2 = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: "absolute",
      placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset;
    if (elementContext === popper && offsetData) {
      var offset2 = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function(key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
        overflowOffsets[key] += offset2[axis] * multiply;
      });
    }
    return overflowOffsets;
  }

  // node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
      return getVariation(placement2) === variation;
    }) : basePlacements;
    var allowedPlacements = placements2.filter(function(placement2) {
      return allowedAutoPlacements.indexOf(placement2) >= 0;
    });
    if (allowedPlacements.length === 0) {
      allowedPlacements = placements2;
    }
    var overflows = allowedPlacements.reduce(function(acc, placement2) {
      acc[placement2] = detectOverflow(state, {
        placement: placement2,
        boundary,
        rootBoundary,
        padding
      })[getBasePlacement(placement2)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function(a, b) {
      return overflows[a] - overflows[b];
    });
  }

  // node_modules/@popperjs/core/lib/modifiers/flip.js
  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }
    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }
  function flip(_ref) {
    var state = _ref.state, options = _ref.options, name = _ref.name;
    if (state.modifiersData[name]._skip) {
      return;
    }
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
      return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
        placement: placement2,
        boundary,
        rootBoundary,
        padding,
        flipVariations,
        allowedAutoPlacements
      }) : placement2);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = /* @__PURE__ */ new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements2[0];
    for (var i = 0; i < placements2.length; i++) {
      var placement = placements2[i];
      var _basePlacement = getBasePlacement(placement);
      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? "width" : "height";
      var overflow = detectOverflow(state, {
        placement,
        boundary,
        rootBoundary,
        altBoundary,
        padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }
      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];
      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }
      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }
      if (checks.every(function(check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }
      checksMap.set(placement, checks);
    }
    if (makeFallbackChecks) {
      var numberOfChecks = flipVariations ? 3 : 1;
      var _loop = function _loop2(_i2) {
        var fittingPlacement = placements2.find(function(placement2) {
          var checks2 = checksMap.get(placement2);
          if (checks2) {
            return checks2.slice(0, _i2).every(function(check) {
              return check;
            });
          }
        });
        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };
      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);
        if (_ret === "break") break;
      }
    }
    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  }
  var flip_default = {
    name: "flip",
    enabled: true,
    phase: "main",
    fn: flip,
    requiresIfExists: ["offset"],
    data: {
      _skip: false
    }
  };

  // node_modules/@popperjs/core/lib/modifiers/hide.js
  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }
    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }
  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function(side) {
      return overflow[side] >= 0;
    });
  }
  function hide(_ref) {
    var state = _ref.state, name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: "reference"
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets,
      popperEscapeOffsets,
      isReferenceHidden,
      hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-reference-hidden": isReferenceHidden,
      "data-popper-escaped": hasPopperEscaped
    });
  }
  var hide_default = {
    name: "hide",
    enabled: true,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: hide
  };

  // node_modules/@popperjs/core/lib/modifiers/offset.js
  function distanceAndSkiddingToXY(placement, rects, offset2) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
    var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
      placement
    })) : offset2, skidding = _ref[0], distance = _ref[1];
    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }
  function offset(_ref2) {
    var state = _ref2.state, options = _ref2.options, name = _ref2.name;
    var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function(acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }
    state.modifiersData[name] = data;
  }
  var offset_default = {
    name: "offset",
    enabled: true,
    phase: "main",
    requires: ["popperOffsets"],
    fn: offset
  };

  // node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
  function popperOffsets(_ref) {
    var state = _ref.state, name = _ref.name;
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: "absolute",
      placement: state.placement
    });
  }
  var popperOffsets_default = {
    name: "popperOffsets",
    enabled: true,
    phase: "read",
    fn: popperOffsets,
    data: {}
  };

  // node_modules/@popperjs/core/lib/utils/getAltAxis.js
  function getAltAxis(axis) {
    return axis === "x" ? "y" : "x";
  }

  // node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
  function preventOverflow(_ref) {
    var state = _ref.state, options = _ref.options, name = _ref.name;
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary,
      rootBoundary,
      padding,
      altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
      mainAxis: tetherOffsetValue,
      altAxis: tetherOffsetValue
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, tetherOffsetValue);
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data = {
      x: 0,
      y: 0
    };
    if (!popperOffsets2) {
      return;
    }
    if (checkMainAxis) {
      var _offsetModifierState$;
      var mainSide = mainAxis === "y" ? top : left;
      var altSide = mainAxis === "y" ? bottom : right;
      var len = mainAxis === "y" ? "height" : "width";
      var offset2 = popperOffsets2[mainAxis];
      var min2 = offset2 + overflow[mainSide];
      var max2 = offset2 - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide];
      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset2 + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
      popperOffsets2[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset2;
    }
    if (checkAltAxis) {
      var _offsetModifierState$2;
      var _mainSide = mainAxis === "x" ? top : left;
      var _altSide = mainAxis === "x" ? bottom : right;
      var _offset = popperOffsets2[altAxis];
      var _len = altAxis === "y" ? "height" : "width";
      var _min = _offset + overflow[_mainSide];
      var _max = _offset - overflow[_altSide];
      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
      popperOffsets2[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
    state.modifiersData[name] = data;
  }
  var preventOverflow_default = {
    name: "preventOverflow",
    enabled: true,
    phase: "main",
    fn: preventOverflow,
    requiresIfExists: ["offset"]
  };

  // node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  // node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  // node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  }
  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent, true);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  // node_modules/@popperjs/core/lib/utils/orderModifiers.js
  function order(modifiers) {
    var map = /* @__PURE__ */ new Map();
    var visited = /* @__PURE__ */ new Set();
    var result = [];
    modifiers.forEach(function(modifier) {
      map.set(modifier.name, modifier);
    });
    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function(dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);
          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }
    modifiers.forEach(function(modifier) {
      if (!visited.has(modifier.name)) {
        sort(modifier);
      }
    });
    return result;
  }
  function orderModifiers(modifiers) {
    var orderedModifiers = order(modifiers);
    return modifierPhases.reduce(function(acc, phase) {
      return acc.concat(orderedModifiers.filter(function(modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  // node_modules/@popperjs/core/lib/utils/debounce.js
  function debounce(fn2) {
    var pending;
    return function() {
      if (!pending) {
        pending = new Promise(function(resolve) {
          Promise.resolve().then(function() {
            pending = void 0;
            resolve(fn2());
          });
        });
      }
      return pending;
    };
  }

  // node_modules/@popperjs/core/lib/utils/mergeByName.js
  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function(merged2, current) {
      var existing = merged2[current.name];
      merged2[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged2;
    }, {});
    return Object.keys(merged).map(function(key) {
      return merged[key];
    });
  }

  // node_modules/@popperjs/core/lib/createPopper.js
  var DEFAULT_OPTIONS = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };
  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return !args.some(function(element) {
      return !(element && typeof element.getBoundingClientRect === "function");
    });
  }
  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }
    var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper4(reference2, popper2, options) {
      if (options === void 0) {
        options = defaultOptions;
      }
      var state = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference2,
          popper: popper2
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state,
        setOptions: function setOptions(setOptionsAction) {
          var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options2);
          state.scrollParents = {
            reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
            popper: listScrollParents(popper2)
          };
          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state.options.modifiers)));
          state.orderedModifiers = orderedModifiers.filter(function(m) {
            return m.enabled;
          });
          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }
          var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
          if (!areValidElements(reference3, popper3)) {
            return;
          }
          state.rects = {
            reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
            popper: getLayoutRect(popper3)
          };
          state.reset = false;
          state.placement = state.options.placement;
          state.orderedModifiers.forEach(function(modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });
          for (var index = 0; index < state.orderedModifiers.length; index++) {
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }
            var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
            if (typeof fn2 === "function") {
              state = fn2({
                state,
                options: _options,
                name,
                instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function() {
          return new Promise(function(resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };
      if (!areValidElements(reference2, popper2)) {
        return instance;
      }
      instance.setOptions(options).then(function(state2) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state2);
        }
      });
      function runModifierEffects() {
        state.orderedModifiers.forEach(function(_ref) {
          var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect4 = _ref.effect;
          if (typeof effect4 === "function") {
            var cleanupFn = effect4({
              state,
              name,
              instance,
              options: options2
            });
            var noopFn = function noopFn2() {
            };
            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }
      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function(fn2) {
          return fn2();
        });
        effectCleanupFns = [];
      }
      return instance;
    };
  }
  var createPopper = /* @__PURE__ */ popperGenerator();

  // node_modules/@popperjs/core/lib/popper-lite.js
  var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
  var createPopper2 = /* @__PURE__ */ popperGenerator({
    defaultModifiers
  });

  // node_modules/@popperjs/core/lib/popper.js
  var defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
  var createPopper3 = /* @__PURE__ */ popperGenerator({
    defaultModifiers: defaultModifiers2
  });

  // node_modules/bootstrap/dist/js/bootstrap.esm.js
  var elementMap = /* @__PURE__ */ new Map();
  var Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, /* @__PURE__ */ new Map());
      }
      const instanceMap = elementMap.get(element);
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }
      instanceMap.set(key, instance);
    },
    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }
      return null;
    },
    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }
      const instanceMap = elementMap.get(element);
      instanceMap.delete(key);
      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }
  };
  var MAX_UID = 1e6;
  var MILLISECONDS_MULTIPLIER = 1e3;
  var TRANSITION_END = "transitionend";
  var parseSelector = (selector) => {
    if (selector && window.CSS && window.CSS.escape) {
      selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
    }
    return selector;
  };
  var toType = (object) => {
    if (object === null || object === void 0) {
      return `${object}`;
    }
    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  var getUID = (prefix) => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));
    return prefix;
  };
  var getTransitionDurationFromElement = (element) => {
    if (!element) {
      return 0;
    }
    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay);
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    }
    transitionDuration = transitionDuration.split(",")[0];
    transitionDelay = transitionDelay.split(",")[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };
  var triggerTransitionEnd = (element) => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };
  var isElement2 = (object) => {
    if (!object || typeof object !== "object") {
      return false;
    }
    if (typeof object.jquery !== "undefined") {
      object = object[0];
    }
    return typeof object.nodeType !== "undefined";
  };
  var getElement = (object) => {
    if (isElement2(object)) {
      return object.jquery ? object[0] : object;
    }
    if (typeof object === "string" && object.length > 0) {
      return document.querySelector(parseSelector(object));
    }
    return null;
  };
  var isVisible = (element) => {
    if (!isElement2(element) || element.getClientRects().length === 0) {
      return false;
    }
    const elementIsVisible = getComputedStyle(element).getPropertyValue("visibility") === "visible";
    const closedDetails = element.closest("details:not([open])");
    if (!closedDetails) {
      return elementIsVisible;
    }
    if (closedDetails !== element) {
      const summary = element.closest("summary");
      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }
      if (summary === null) {
        return false;
      }
    }
    return elementIsVisible;
  };
  var isDisabled = (element) => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }
    if (element.classList.contains("disabled")) {
      return true;
    }
    if (typeof element.disabled !== "undefined") {
      return element.disabled;
    }
    return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
  };
  var findShadowRoot = (element) => {
    if (!document.documentElement.attachShadow) {
      return null;
    }
    if (typeof element.getRootNode === "function") {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }
    if (element instanceof ShadowRoot) {
      return element;
    }
    if (!element.parentNode) {
      return null;
    }
    return findShadowRoot(element.parentNode);
  };
  var noop = () => {
  };
  var reflow = (element) => {
    element.offsetHeight;
  };
  var getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
      return window.jQuery;
    }
    return null;
  };
  var DOMContentLoadedCallbacks = [];
  var onDOMContentLoaded = (callback) => {
    if (document.readyState === "loading") {
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener("DOMContentLoaded", () => {
          for (const callback2 of DOMContentLoadedCallbacks) {
            callback2();
          }
        });
      }
      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };
  var isRTL = () => document.documentElement.dir === "rtl";
  var defineJQueryPlugin = (plugin) => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;
        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };
  var execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
    return typeof possibleCallback === "function" ? possibleCallback.call(...args) : defaultValue;
  };
  var executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }
    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;
    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }
      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };
    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  var getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement);
    if (index === -1) {
      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }
    index += shouldGetNext ? 1 : -1;
    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }
    return list[Math.max(0, Math.min(index, listLength - 1))];
  };
  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {};
  var uidEvent = 1;
  var customEvents = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  };
  var nativeEvents = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }
  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }
  function bootstrapHandler(element, fn2) {
    return function handler(event) {
      hydrateObj(event, {
        delegateTarget: element
      });
      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn2);
      }
      return fn2.apply(element, [event]);
    };
  }
  function bootstrapDelegationHandler(element, selector, fn2) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);
      for (let {
        target
      } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }
          hydrateObj(event, {
            delegateTarget: target
          });
          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn2);
          }
          return fn2.apply(target, [event]);
        }
      }
    };
  }
  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find((event) => event.callable === callable && event.delegationSelector === delegationSelector);
  }
  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === "string";
    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);
    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }
    return [isDelegated, callable, typeEvent];
  }
  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== "string" || !element) {
      return;
    }
    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
    if (originalTypeEvent in customEvents) {
      const wrapFunction = (fn3) => {
        return function(event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn3.call(this, event);
          }
        };
      };
      callable = wrapFunction(callable);
    }
    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }
    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
    const fn2 = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn2.delegationSelector = isDelegated ? handler : null;
    fn2.callable = callable;
    fn2.oneOff = oneOff;
    fn2.uidEvent = uid;
    handlers[uid] = fn2;
    element.addEventListener(typeEvent, fn2, isDelegated);
  }
  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn2 = findHandler(events[typeEvent], handler, delegationSelector);
    if (!fn2) {
      return;
    }
    element.removeEventListener(typeEvent, fn2, Boolean(delegationSelector));
    delete events[typeEvent][fn2.uidEvent];
  }
  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }
  function getTypeEvent(event) {
    event = event.replace(stripNameRegex, "");
    return customEvents[event] || event;
  }
  var EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },
    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },
    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== "string" || !element) {
        return;
      }
      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith(".");
      if (typeof callable !== "undefined") {
        if (!Object.keys(storeElementEvent).length) {
          return;
        }
        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }
      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }
      for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, "");
        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },
    trigger(element, event, args) {
      if (typeof event !== "string" || !element) {
        return null;
      }
      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }
      const evt = hydrateObj(new Event(event, {
        bubbles,
        cancelable: true
      }), args);
      if (defaultPrevented) {
        evt.preventDefault();
      }
      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }
      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }
      return evt;
    }
  };
  function hydrateObj(obj, meta = {}) {
    for (const [key, value] of Object.entries(meta)) {
      try {
        obj[key] = value;
      } catch (_unused) {
        Object.defineProperty(obj, key, {
          configurable: true,
          get() {
            return value;
          }
        });
      }
    }
    return obj;
  }
  function normalizeData(value) {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    if (value === Number(value).toString()) {
      return Number(value);
    }
    if (value === "" || value === "null") {
      return null;
    }
    if (typeof value !== "string") {
      return value;
    }
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (_unused) {
      return value;
    }
  }
  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
  }
  var Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },
    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },
    getDataAttributes(element) {
      if (!element) {
        return {};
      }
      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter((key) => key.startsWith("bs") && !key.startsWith("bsConfig"));
      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, "");
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }
      return attributes;
    },
    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }
  };
  var Config = class {
    // Getters
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      return config;
    }
    _mergeConfigObj(config, element) {
      const jsonConfig = isElement2(element) ? Manipulator.getDataAttribute(element, "config") : {};
      return __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, this.constructor.Default), typeof jsonConfig === "object" ? jsonConfig : {}), isElement2(element) ? Manipulator.getDataAttributes(element) : {}), typeof config === "object" ? config : {});
    }
    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const [property, expectedTypes] of Object.entries(configTypes)) {
        const value = config[property];
        const valueType = isElement2(value) ? "element" : toType(value);
        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
        }
      }
    }
  };
  var VERSION = "5.3.4";
  var BaseComponent = class extends Config {
    constructor(element, config) {
      super();
      element = getElement(element);
      if (!element) {
        return;
      }
      this._element = element;
      this._config = this._getConfig(config);
      Data.set(this._element, this.constructor.DATA_KEY, this);
    }
    // Public
    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);
      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }
    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    // Static
    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY);
    }
    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
    }
    static get VERSION() {
      return VERSION;
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }
  };
  var getSelector = (element) => {
    let selector = element.getAttribute("data-bs-target");
    if (!selector || selector === "#") {
      let hrefAttribute = element.getAttribute("href");
      if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) {
        return null;
      }
      if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) {
        hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
      }
      selector = hrefAttribute && hrefAttribute !== "#" ? hrefAttribute.trim() : null;
    }
    return selector ? selector.split(",").map((sel) => parseSelector(sel)).join(",") : null;
  };
  var SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },
    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },
    children(element, selector) {
      return [].concat(...element.children).filter((child) => child.matches(selector));
    },
    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);
      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }
      return parents;
    },
    prev(element, selector) {
      let previous = element.previousElementSibling;
      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }
        previous = previous.previousElementSibling;
      }
      return [];
    },
    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;
      while (next) {
        if (next.matches(selector)) {
          return [next];
        }
        next = next.nextElementSibling;
      }
      return [];
    },
    focusableChildren(element) {
      const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
      return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
    },
    getSelectorFromElement(element) {
      const selector = getSelector(element);
      if (selector) {
        return SelectorEngine.findOne(selector) ? selector : null;
      }
      return null;
    },
    getElementFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.findOne(selector) : null;
    },
    getMultipleElementsFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.find(selector) : [];
    }
  };
  var enableDismissTrigger = (component, method = "hide") => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
      if (["A", "AREA"].includes(this.tagName)) {
        event.preventDefault();
      }
      if (isDisabled(this)) {
        return;
      }
      const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target);
      instance[method]();
    });
  };
  var NAME$f = "alert";
  var DATA_KEY$a = "bs.alert";
  var EVENT_KEY$b = `.${DATA_KEY$a}`;
  var EVENT_CLOSE = `close${EVENT_KEY$b}`;
  var EVENT_CLOSED = `closed${EVENT_KEY$b}`;
  var CLASS_NAME_FADE$5 = "fade";
  var CLASS_NAME_SHOW$8 = "show";
  var Alert = class _Alert extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$f;
    }
    // Public
    close() {
      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
      if (closeEvent.defaultPrevented) {
        return;
      }
      this._element.classList.remove(CLASS_NAME_SHOW$8);
      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    }
    // Private
    _destroyElement() {
      this._element.remove();
      EventHandler.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Alert.getOrCreateInstance(this);
        if (typeof config !== "string") {
          return;
        }
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  };
  enableDismissTrigger(Alert, "close");
  defineJQueryPlugin(Alert);
  var NAME$e = "button";
  var DATA_KEY$9 = "bs.button";
  var EVENT_KEY$a = `.${DATA_KEY$9}`;
  var DATA_API_KEY$6 = ".data-api";
  var CLASS_NAME_ACTIVE$3 = "active";
  var SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
  var EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
  var Button = class _Button extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$e;
    }
    // Public
    toggle() {
      this._element.setAttribute("aria-pressed", this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Button.getOrCreateInstance(this);
        if (config === "toggle") {
          data[config]();
        }
      });
    }
  };
  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, (event) => {
    event.preventDefault();
    const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    const data = Button.getOrCreateInstance(button);
    data.toggle();
  });
  defineJQueryPlugin(Button);
  var NAME$d = "swipe";
  var EVENT_KEY$9 = ".bs.swipe";
  var EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
  var EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
  var EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
  var EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
  var EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
  var POINTER_TYPE_TOUCH = "touch";
  var POINTER_TYPE_PEN = "pen";
  var CLASS_NAME_POINTER_EVENT = "pointer-event";
  var SWIPE_THRESHOLD = 40;
  var Default$c = {
    endCallback: null,
    leftCallback: null,
    rightCallback: null
  };
  var DefaultType$c = {
    endCallback: "(function|null)",
    leftCallback: "(function|null)",
    rightCallback: "(function|null)"
  };
  var Swipe = class _Swipe extends Config {
    constructor(element, config) {
      super();
      this._element = element;
      if (!element || !_Swipe.isSupported()) {
        return;
      }
      this._config = this._getConfig(config);
      this._deltaX = 0;
      this._supportPointerEvents = Boolean(window.PointerEvent);
      this._initEvents();
    }
    // Getters
    static get Default() {
      return Default$c;
    }
    static get DefaultType() {
      return DefaultType$c;
    }
    static get NAME() {
      return NAME$d;
    }
    // Public
    dispose() {
      EventHandler.off(this._element, EVENT_KEY$9);
    }
    // Private
    _start(event) {
      if (!this._supportPointerEvents) {
        this._deltaX = event.touches[0].clientX;
        return;
      }
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX;
      }
    }
    _end(event) {
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX - this._deltaX;
      }
      this._handleSwipe();
      execute(this._config.endCallback);
    }
    _move(event) {
      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const absDeltaX = Math.abs(this._deltaX);
      if (absDeltaX <= SWIPE_THRESHOLD) {
        return;
      }
      const direction = absDeltaX / this._deltaX;
      this._deltaX = 0;
      if (!direction) {
        return;
      }
      execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      if (this._supportPointerEvents) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, (event) => this._start(event));
        EventHandler.on(this._element, EVENT_POINTERUP, (event) => this._end(event));
        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, (event) => this._start(event));
        EventHandler.on(this._element, EVENT_TOUCHMOVE, (event) => this._move(event));
        EventHandler.on(this._element, EVENT_TOUCHEND, (event) => this._end(event));
      }
    }
    _eventIsPointerPenTouch(event) {
      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    }
    // Static
    static isSupported() {
      return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
    }
  };
  var NAME$c = "carousel";
  var DATA_KEY$8 = "bs.carousel";
  var EVENT_KEY$8 = `.${DATA_KEY$8}`;
  var DATA_API_KEY$5 = ".data-api";
  var ARROW_LEFT_KEY$1 = "ArrowLeft";
  var ARROW_RIGHT_KEY$1 = "ArrowRight";
  var TOUCHEVENT_COMPAT_WAIT = 500;
  var ORDER_NEXT = "next";
  var ORDER_PREV = "prev";
  var DIRECTION_LEFT = "left";
  var DIRECTION_RIGHT = "right";
  var EVENT_SLIDE = `slide${EVENT_KEY$8}`;
  var EVENT_SLID = `slid${EVENT_KEY$8}`;
  var EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
  var EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
  var EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
  var EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
  var EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
  var EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
  var CLASS_NAME_CAROUSEL = "carousel";
  var CLASS_NAME_ACTIVE$2 = "active";
  var CLASS_NAME_SLIDE = "slide";
  var CLASS_NAME_END = "carousel-item-end";
  var CLASS_NAME_START = "carousel-item-start";
  var CLASS_NAME_NEXT = "carousel-item-next";
  var CLASS_NAME_PREV = "carousel-item-prev";
  var SELECTOR_ACTIVE = ".active";
  var SELECTOR_ITEM = ".carousel-item";
  var SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
  var SELECTOR_ITEM_IMG = ".carousel-item img";
  var SELECTOR_INDICATORS = ".carousel-indicators";
  var SELECTOR_DATA_SLIDE = "[data-bs-slide], [data-bs-slide-to]";
  var SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  var KEY_TO_DIRECTION = {
    [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
    [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
  };
  var Default$b = {
    interval: 5e3,
    keyboard: true,
    pause: "hover",
    ride: false,
    touch: true,
    wrap: true
  };
  var DefaultType$b = {
    interval: "(number|boolean)",
    // TODO:v6 remove boolean support
    keyboard: "boolean",
    pause: "(string|boolean)",
    ride: "(boolean|string)",
    touch: "boolean",
    wrap: "boolean"
  };
  var Carousel = class _Carousel extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._interval = null;
      this._activeElement = null;
      this._isSliding = false;
      this.touchTimeout = null;
      this._swipeHelper = null;
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
      this._addEventListeners();
      if (this._config.ride === CLASS_NAME_CAROUSEL) {
        this.cycle();
      }
    }
    // Getters
    static get Default() {
      return Default$b;
    }
    static get DefaultType() {
      return DefaultType$b;
    }
    static get NAME() {
      return NAME$c;
    }
    // Public
    next() {
      this._slide(ORDER_NEXT);
    }
    nextWhenVisible() {
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }
    prev() {
      this._slide(ORDER_PREV);
    }
    pause() {
      if (this._isSliding) {
        triggerTransitionEnd(this._element);
      }
      this._clearInterval();
    }
    cycle() {
      this._clearInterval();
      this._updateInterval();
      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    }
    _maybeEnableCycle() {
      if (!this._config.ride) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
        return;
      }
      this.cycle();
    }
    to(index) {
      const items = this._getItems();
      if (index > items.length - 1 || index < 0) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
        return;
      }
      const activeIndex = this._getItemIndex(this._getActive());
      if (activeIndex === index) {
        return;
      }
      const order2 = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
      this._slide(order2, items[index]);
    }
    dispose() {
      if (this._swipeHelper) {
        this._swipeHelper.dispose();
      }
      super.dispose();
    }
    // Private
    _configAfterMerge(config) {
      config.defaultInterval = config.interval;
      return config;
    }
    _addEventListeners() {
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN$1, (event) => this._keydown(event));
      }
      if (this._config.pause === "hover") {
        EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
        EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
      }
      if (this._config.touch && Swipe.isSupported()) {
        this._addTouchEventListeners();
      }
    }
    _addTouchEventListeners() {
      for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
        EventHandler.on(img, EVENT_DRAG_START, (event) => event.preventDefault());
      }
      const endCallBack = () => {
        if (this._config.pause !== "hover") {
          return;
        }
        this.pause();
        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout);
        }
        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
      };
      const swipeConfig = {
        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
        endCallback: endCallBack
      };
      this._swipeHelper = new Swipe(this._element, swipeConfig);
    }
    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }
      const direction = KEY_TO_DIRECTION[event.key];
      if (direction) {
        event.preventDefault();
        this._slide(this._directionToOrder(direction));
      }
    }
    _getItemIndex(element) {
      return this._getItems().indexOf(element);
    }
    _setActiveIndicatorElement(index) {
      if (!this._indicatorsElement) {
        return;
      }
      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute("aria-current");
      const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
      if (newActiveIndicator) {
        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
        newActiveIndicator.setAttribute("aria-current", "true");
      }
    }
    _updateInterval() {
      const element = this._activeElement || this._getActive();
      if (!element) {
        return;
      }
      const elementInterval = Number.parseInt(element.getAttribute("data-bs-interval"), 10);
      this._config.interval = elementInterval || this._config.defaultInterval;
    }
    _slide(order2, element = null) {
      if (this._isSliding) {
        return;
      }
      const activeElement = this._getActive();
      const isNext = order2 === ORDER_NEXT;
      const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
      if (nextElement === activeElement) {
        return;
      }
      const nextElementIndex = this._getItemIndex(nextElement);
      const triggerEvent = (eventName) => {
        return EventHandler.trigger(this._element, eventName, {
          relatedTarget: nextElement,
          direction: this._orderToDirection(order2),
          from: this._getItemIndex(activeElement),
          to: nextElementIndex
        });
      };
      const slideEvent = triggerEvent(EVENT_SLIDE);
      if (slideEvent.defaultPrevented) {
        return;
      }
      if (!activeElement || !nextElement) {
        return;
      }
      const isCycling = Boolean(this._interval);
      this.pause();
      this._isSliding = true;
      this._setActiveIndicatorElement(nextElementIndex);
      this._activeElement = nextElement;
      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);
      const completeCallBack = () => {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        this._isSliding = false;
        triggerEvent(EVENT_SLID);
      };
      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
      if (isCycling) {
        this.cycle();
      }
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_SLIDE);
    }
    _getActive() {
      return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    }
    _getItems() {
      return SelectorEngine.find(SELECTOR_ITEM, this._element);
    }
    _clearInterval() {
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    }
    _directionToOrder(direction) {
      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }
      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }
    _orderToDirection(order2) {
      if (isRTL()) {
        return order2 === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }
      return order2 === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Carousel.getOrCreateInstance(this, config);
        if (typeof config === "number") {
          data.to(config);
          return;
        }
        if (typeof config === "string") {
          if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  };
  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function(event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }
    event.preventDefault();
    const carousel = Carousel.getOrCreateInstance(target);
    const slideIndex = this.getAttribute("data-bs-slide-to");
    if (slideIndex) {
      carousel.to(slideIndex);
      carousel._maybeEnableCycle();
      return;
    }
    if (Manipulator.getDataAttribute(this, "slide") === "next") {
      carousel.next();
      carousel._maybeEnableCycle();
      return;
    }
    carousel.prev();
    carousel._maybeEnableCycle();
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
    for (const carousel of carousels) {
      Carousel.getOrCreateInstance(carousel);
    }
  });
  defineJQueryPlugin(Carousel);
  var NAME$b = "collapse";
  var DATA_KEY$7 = "bs.collapse";
  var EVENT_KEY$7 = `.${DATA_KEY$7}`;
  var DATA_API_KEY$4 = ".data-api";
  var EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
  var EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
  var EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
  var EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
  var EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
  var CLASS_NAME_SHOW$7 = "show";
  var CLASS_NAME_COLLAPSE = "collapse";
  var CLASS_NAME_COLLAPSING = "collapsing";
  var CLASS_NAME_COLLAPSED = "collapsed";
  var CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  var CLASS_NAME_HORIZONTAL = "collapse-horizontal";
  var WIDTH = "width";
  var HEIGHT = "height";
  var SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
  var SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
  var Default$a = {
    parent: null,
    toggle: true
  };
  var DefaultType$a = {
    parent: "(null|element)",
    toggle: "boolean"
  };
  var Collapse = class _Collapse extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isTransitioning = false;
      this._triggerArray = [];
      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
      for (const elem of toggleList) {
        const selector = SelectorEngine.getSelectorFromElement(elem);
        const filterElement = SelectorEngine.find(selector).filter((foundElement) => foundElement === this._element);
        if (selector !== null && filterElement.length) {
          this._triggerArray.push(elem);
        }
      }
      this._initializeChildren();
      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }
      if (this._config.toggle) {
        this.toggle();
      }
    }
    // Getters
    static get Default() {
      return Default$a;
    }
    static get DefaultType() {
      return DefaultType$a;
    }
    static get NAME() {
      return NAME$b;
    }
    // Public
    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }
    show() {
      if (this._isTransitioning || this._isShown()) {
        return;
      }
      let activeChildren = [];
      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter((element) => element !== this._element).map((element) => _Collapse.getOrCreateInstance(element, {
          toggle: false
        }));
      }
      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      for (const activeInstance of activeChildren) {
        activeInstance.hide();
      }
      const dimension = this._getDimension();
      this._element.classList.remove(CLASS_NAME_COLLAPSE);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;
      this._addAriaAndCollapsedClass(this._triggerArray, true);
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
        this._element.style[dimension] = "";
        EventHandler.trigger(this._element, EVENT_SHOWN$6);
      };
      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;
      this._queueCallback(complete, this._element, true);
      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return;
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      const dimension = this._getDimension();
      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      for (const trigger of this._triggerArray) {
        const element = SelectorEngine.getElementFromSelector(trigger);
        if (element && !this._isShown(element)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE);
        EventHandler.trigger(this._element, EVENT_HIDDEN$6);
      };
      this._element.style[dimension] = "";
      this._queueCallback(complete, this._element, true);
    }
    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW$7);
    }
    // Private
    _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle);
      config.parent = getElement(config.parent);
      return config;
    }
    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }
    _initializeChildren() {
      if (!this._config.parent) {
        return;
      }
      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
      for (const element of children) {
        const selected = SelectorEngine.getElementFromSelector(element);
        if (selected) {
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
        }
      }
    }
    _getFirstLevelChildren(selector) {
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      return SelectorEngine.find(selector, this._config.parent).filter((element) => !children.includes(element));
    }
    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }
      for (const element of triggerArray) {
        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
        element.setAttribute("aria-expanded", isOpen);
      }
    }
    // Static
    static jQueryInterface(config) {
      const _config = {};
      if (typeof config === "string" && /show|hide/.test(config)) {
        _config.toggle = false;
      }
      return this.each(function() {
        const data = _Collapse.getOrCreateInstance(this, _config);
        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  };
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function(event) {
    if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
      event.preventDefault();
    }
    for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    }
  });
  defineJQueryPlugin(Collapse);
  var NAME$a = "dropdown";
  var DATA_KEY$6 = "bs.dropdown";
  var EVENT_KEY$6 = `.${DATA_KEY$6}`;
  var DATA_API_KEY$3 = ".data-api";
  var ESCAPE_KEY$2 = "Escape";
  var TAB_KEY$1 = "Tab";
  var ARROW_UP_KEY$1 = "ArrowUp";
  var ARROW_DOWN_KEY$1 = "ArrowDown";
  var RIGHT_MOUSE_BUTTON = 2;
  var EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
  var EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
  var EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
  var EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
  var EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
  var EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
  var EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
  var CLASS_NAME_SHOW$6 = "show";
  var CLASS_NAME_DROPUP = "dropup";
  var CLASS_NAME_DROPEND = "dropend";
  var CLASS_NAME_DROPSTART = "dropstart";
  var CLASS_NAME_DROPUP_CENTER = "dropup-center";
  var CLASS_NAME_DROPDOWN_CENTER = "dropdown-center";
  var SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
  var SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
  var SELECTOR_MENU = ".dropdown-menu";
  var SELECTOR_NAVBAR = ".navbar";
  var SELECTOR_NAVBAR_NAV = ".navbar-nav";
  var SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
  var PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
  var PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
  var PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
  var PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
  var PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
  var PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
  var PLACEMENT_TOPCENTER = "top";
  var PLACEMENT_BOTTOMCENTER = "bottom";
  var Default$9 = {
    autoClose: true,
    boundary: "clippingParents",
    display: "dynamic",
    offset: [0, 2],
    popperConfig: null,
    reference: "toggle"
  };
  var DefaultType$9 = {
    autoClose: "(boolean|string)",
    boundary: "(string|element)",
    display: "string",
    offset: "(array|string|function)",
    popperConfig: "(null|object|function)",
    reference: "(string|element|object)"
  };
  var Dropdown = class _Dropdown extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._popper = null;
      this._parent = this._element.parentNode;
      this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
      this._inNavbar = this._detectNavbar();
    }
    // Getters
    static get Default() {
      return Default$9;
    }
    static get DefaultType() {
      return DefaultType$9;
    }
    static get NAME() {
      return NAME$a;
    }
    // Public
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (isDisabled(this._element) || this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._createPopper();
      if ("ontouchstart" in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, "mouseover", noop);
        }
      }
      this._element.focus();
      this._element.setAttribute("aria-expanded", true);
      this._menu.classList.add(CLASS_NAME_SHOW$6);
      this._element.classList.add(CLASS_NAME_SHOW$6);
      EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
    }
    hide() {
      if (isDisabled(this._element) || !this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      this._completeHide(relatedTarget);
    }
    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }
      super.dispose();
    }
    update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper) {
        this._popper.update();
      }
    }
    // Private
    _completeHide(relatedTarget) {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
      if (hideEvent.defaultPrevented) {
        return;
      }
      if ("ontouchstart" in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, "mouseover", noop);
        }
      }
      if (this._popper) {
        this._popper.destroy();
      }
      this._menu.classList.remove(CLASS_NAME_SHOW$6);
      this._element.classList.remove(CLASS_NAME_SHOW$6);
      this._element.setAttribute("aria-expanded", "false");
      Manipulator.removeDataAttribute(this._menu, "popper");
      EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
    }
    _getConfig(config) {
      config = super._getConfig(config);
      if (typeof config.reference === "object" && !isElement2(config.reference) && typeof config.reference.getBoundingClientRect !== "function") {
        throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      }
      return config;
    }
    _createPopper() {
      if (typeof lib_exports === "undefined") {
        throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
      }
      let referenceElement = this._element;
      if (this._config.reference === "parent") {
        referenceElement = this._parent;
      } else if (isElement2(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === "object") {
        referenceElement = this._config.reference;
      }
      const popperConfig = this._getPopperConfig();
      this._popper = createPopper3(referenceElement, this._menu, popperConfig);
    }
    _isShown() {
      return this._menu.classList.contains(CLASS_NAME_SHOW$6);
    }
    _getPlacement() {
      const parentDropdown = this._parent;
      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
        return PLACEMENT_TOPCENTER;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
        return PLACEMENT_BOTTOMCENTER;
      }
      const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }
      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }
    _detectNavbar() {
      return this._element.closest(SELECTOR_NAVBAR) !== null;
    }
    _getOffset() {
      const {
        offset: offset2
      } = this._config;
      if (typeof offset2 === "string") {
        return offset2.split(",").map((value) => Number.parseInt(value, 10));
      }
      if (typeof offset2 === "function") {
        return (popperData) => offset2(popperData, this._element);
      }
      return offset2;
    }
    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: "preventOverflow",
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: "offset",
          options: {
            offset: this._getOffset()
          }
        }]
      };
      if (this._inNavbar || this._config.display === "static") {
        Manipulator.setDataAttribute(this._menu, "popper", "static");
        defaultBsPopperConfig.modifiers = [{
          name: "applyStyles",
          enabled: false
        }];
      }
      return __spreadValues(__spreadValues({}, defaultBsPopperConfig), execute(this._config.popperConfig, [void 0, defaultBsPopperConfig]));
    }
    _selectMenuItem({
      key,
      target
    }) {
      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter((element) => isVisible(element));
      if (!items.length) {
        return;
      }
      getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Dropdown.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
    static clearMenus(event) {
      if (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY$1) {
        return;
      }
      const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
      for (const toggle of openToggles) {
        const context = _Dropdown.getInstance(toggle);
        if (!context || context._config.autoClose === false) {
          continue;
        }
        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);
        if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) {
          continue;
        }
        if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }
        const relatedTarget = {
          relatedTarget: context._element
        };
        if (event.type === "click") {
          relatedTarget.clickEvent = event;
        }
        context._completeHide(relatedTarget);
      }
    }
    static dataApiKeydownHandler(event) {
      const isInput = /input|textarea/i.test(event.target.tagName);
      const isEscapeEvent = event.key === ESCAPE_KEY$2;
      const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
      if (!isUpOrDownEvent && !isEscapeEvent) {
        return;
      }
      if (isInput && !isEscapeEvent) {
        return;
      }
      event.preventDefault();
      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
      const instance = _Dropdown.getOrCreateInstance(getToggleButton);
      if (isUpOrDownEvent) {
        event.stopPropagation();
        instance.show();
        instance._selectMenuItem(event);
        return;
      }
      if (instance._isShown()) {
        event.stopPropagation();
        instance.hide();
        getToggleButton.focus();
      }
    }
  };
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function(event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });
  defineJQueryPlugin(Dropdown);
  var NAME$9 = "backdrop";
  var CLASS_NAME_FADE$4 = "fade";
  var CLASS_NAME_SHOW$5 = "show";
  var EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
  var Default$8 = {
    className: "modal-backdrop",
    clickCallback: null,
    isAnimated: false,
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    rootElement: "body"
    // give the choice to place backdrop under different elements
  };
  var DefaultType$8 = {
    className: "string",
    clickCallback: "(function|null)",
    isAnimated: "boolean",
    isVisible: "boolean",
    rootElement: "(element|string)"
  };
  var Backdrop = class extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    }
    // Getters
    static get Default() {
      return Default$8;
    }
    static get DefaultType() {
      return DefaultType$8;
    }
    static get NAME() {
      return NAME$9;
    }
    // Public
    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._append();
      const element = this._getElement();
      if (this._config.isAnimated) {
        reflow(element);
      }
      element.classList.add(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        execute(callback);
      });
    }
    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._getElement().classList.remove(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    }
    dispose() {
      if (!this._isAppended) {
        return;
      }
      EventHandler.off(this._element, EVENT_MOUSEDOWN);
      this._element.remove();
      this._isAppended = false;
    }
    // Private
    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement("div");
        backdrop.className = this._config.className;
        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$4);
        }
        this._element = backdrop;
      }
      return this._element;
    }
    _configAfterMerge(config) {
      config.rootElement = getElement(config.rootElement);
      return config;
    }
    _append() {
      if (this._isAppended) {
        return;
      }
      const element = this._getElement();
      this._config.rootElement.append(element);
      EventHandler.on(element, EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }
    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }
  };
  var NAME$8 = "focustrap";
  var DATA_KEY$5 = "bs.focustrap";
  var EVENT_KEY$5 = `.${DATA_KEY$5}`;
  var EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
  var EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
  var TAB_KEY = "Tab";
  var TAB_NAV_FORWARD = "forward";
  var TAB_NAV_BACKWARD = "backward";
  var Default$7 = {
    autofocus: true,
    trapElement: null
    // The element to trap focus inside of
  };
  var DefaultType$7 = {
    autofocus: "boolean",
    trapElement: "element"
  };
  var FocusTrap = class extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    }
    // Getters
    static get Default() {
      return Default$7;
    }
    static get DefaultType() {
      return DefaultType$7;
    }
    static get NAME() {
      return NAME$8;
    }
    // Public
    activate() {
      if (this._isActive) {
        return;
      }
      if (this._config.autofocus) {
        this._config.trapElement.focus();
      }
      EventHandler.off(document, EVENT_KEY$5);
      EventHandler.on(document, EVENT_FOCUSIN$2, (event) => this._handleFocusin(event));
      EventHandler.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
      this._isActive = true;
    }
    deactivate() {
      if (!this._isActive) {
        return;
      }
      this._isActive = false;
      EventHandler.off(document, EVENT_KEY$5);
    }
    // Private
    _handleFocusin(event) {
      const {
        trapElement
      } = this._config;
      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
        return;
      }
      const elements = SelectorEngine.focusableChildren(trapElement);
      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }
    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }
      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }
  };
  var SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
  var SELECTOR_STICKY_CONTENT = ".sticky-top";
  var PROPERTY_PADDING = "padding-right";
  var PROPERTY_MARGIN = "margin-right";
  var ScrollBarHelper = class {
    constructor() {
      this._element = document.body;
    }
    // Public
    getWidth() {
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }
    hide() {
      const width = this.getWidth();
      this._disableOverFlow();
      this._setElementAttributes(this._element, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, (calculatedValue) => calculatedValue - width);
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow");
      this._resetElementAttributes(this._element, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
    // Private
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow");
      this._element.style.overflow = "hidden";
    }
    _setElementAttributes(selector, styleProperty, callback) {
      const scrollbarWidth = this.getWidth();
      const manipulationCallBack = (element) => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }
        this._saveInitialAttribute(element, styleProperty);
        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _saveInitialAttribute(element, styleProperty) {
      const actualValue = element.style.getPropertyValue(styleProperty);
      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProperty, actualValue);
      }
    }
    _resetElementAttributes(selector, styleProperty) {
      const manipulationCallBack = (element) => {
        const value = Manipulator.getDataAttribute(element, styleProperty);
        if (value === null) {
          element.style.removeProperty(styleProperty);
          return;
        }
        Manipulator.removeDataAttribute(element, styleProperty);
        element.style.setProperty(styleProperty, value);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _applyManipulationCallback(selector, callBack) {
      if (isElement2(selector)) {
        callBack(selector);
        return;
      }
      for (const sel of SelectorEngine.find(selector, this._element)) {
        callBack(sel);
      }
    }
  };
  var NAME$7 = "modal";
  var DATA_KEY$4 = "bs.modal";
  var EVENT_KEY$4 = `.${DATA_KEY$4}`;
  var DATA_API_KEY$2 = ".data-api";
  var ESCAPE_KEY$1 = "Escape";
  var EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
  var EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
  var EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
  var EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
  var EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
  var EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
  var EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
  var EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
  var EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
  var EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
  var CLASS_NAME_OPEN = "modal-open";
  var CLASS_NAME_FADE$3 = "fade";
  var CLASS_NAME_SHOW$4 = "show";
  var CLASS_NAME_STATIC = "modal-static";
  var OPEN_SELECTOR$1 = ".modal.show";
  var SELECTOR_DIALOG = ".modal-dialog";
  var SELECTOR_MODAL_BODY = ".modal-body";
  var SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
  var Default$6 = {
    backdrop: true,
    focus: true,
    keyboard: true
  };
  var DefaultType$6 = {
    backdrop: "(boolean|string)",
    focus: "boolean",
    keyboard: "boolean"
  };
  var Modal = class _Modal extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._isShown = false;
      this._isTransitioning = false;
      this._scrollBar = new ScrollBarHelper();
      this._addEventListeners();
    }
    // Getters
    static get Default() {
      return Default$6;
    }
    static get DefaultType() {
      return DefaultType$6;
    }
    static get NAME() {
      return NAME$7;
    }
    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._isTransitioning = true;
      this._scrollBar.hide();
      document.body.classList.add(CLASS_NAME_OPEN);
      this._adjustDialog();
      this._backdrop.show(() => this._showElement(relatedTarget));
    }
    hide() {
      if (!this._isShown || this._isTransitioning) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._isShown = false;
      this._isTransitioning = true;
      this._focustrap.deactivate();
      this._element.classList.remove(CLASS_NAME_SHOW$4);
      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
    }
    dispose() {
      EventHandler.off(window, EVENT_KEY$4);
      EventHandler.off(this._dialog, EVENT_KEY$4);
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }
    // Private
    _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value,
        isAnimated: this._isAnimated()
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _showElement(relatedTarget) {
      if (!document.body.contains(this._element)) {
        document.body.append(this._element);
      }
      this._element.style.display = "block";
      this._element.removeAttribute("aria-hidden");
      this._element.setAttribute("aria-modal", true);
      this._element.setAttribute("role", "dialog");
      this._element.scrollTop = 0;
      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW$4);
      const transitionComplete = () => {
        if (this._config.focus) {
          this._focustrap.activate();
        }
        this._isTransitioning = false;
        EventHandler.trigger(this._element, EVENT_SHOWN$4, {
          relatedTarget
        });
      };
      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
    }
    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, (event) => {
        if (event.key !== ESCAPE_KEY$1) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      });
      EventHandler.on(window, EVENT_RESIZE$1, () => {
        if (this._isShown && !this._isTransitioning) {
          this._adjustDialog();
        }
      });
      EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, (event) => {
        EventHandler.one(this._element, EVENT_CLICK_DISMISS, (event2) => {
          if (this._element !== event.target || this._element !== event2.target) {
            return;
          }
          if (this._config.backdrop === "static") {
            this._triggerBackdropTransition();
            return;
          }
          if (this._config.backdrop) {
            this.hide();
          }
        });
      });
    }
    _hideModal() {
      this._element.style.display = "none";
      this._element.setAttribute("aria-hidden", true);
      this._element.removeAttribute("aria-modal");
      this._element.removeAttribute("role");
      this._isTransitioning = false;
      this._backdrop.hide(() => {
        document.body.classList.remove(CLASS_NAME_OPEN);
        this._resetAdjustments();
        this._scrollBar.reset();
        EventHandler.trigger(this._element, EVENT_HIDDEN$4);
      });
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$3);
    }
    _triggerBackdropTransition() {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const initialOverflowY = this._element.style.overflowY;
      if (initialOverflowY === "hidden" || this._element.classList.contains(CLASS_NAME_STATIC)) {
        return;
      }
      if (!isModalOverflowing) {
        this._element.style.overflowY = "hidden";
      }
      this._element.classList.add(CLASS_NAME_STATIC);
      this._queueCallback(() => {
        this._element.classList.remove(CLASS_NAME_STATIC);
        this._queueCallback(() => {
          this._element.style.overflowY = initialOverflowY;
        }, this._dialog);
      }, this._dialog);
      this._element.focus();
    }
    /**
     * The following methods are used to handle overflowing modals
     */
    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const scrollbarWidth = this._scrollBar.getWidth();
      const isBodyOverflowing = scrollbarWidth > 0;
      if (isBodyOverflowing && !isModalOverflowing) {
        const property = isRTL() ? "paddingLeft" : "paddingRight";
        this._element.style[property] = `${scrollbarWidth}px`;
      }
      if (!isBodyOverflowing && isModalOverflowing) {
        const property = isRTL() ? "paddingRight" : "paddingLeft";
        this._element.style[property] = `${scrollbarWidth}px`;
      }
    }
    _resetAdjustments() {
      this._element.style.paddingLeft = "";
      this._element.style.paddingRight = "";
    }
    // Static
    static jQueryInterface(config, relatedTarget) {
      return this.each(function() {
        const data = _Modal.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](relatedTarget);
      });
    }
  };
  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function(event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    EventHandler.one(target, EVENT_SHOW$4, (showEvent) => {
      if (showEvent.defaultPrevented) {
        return;
      }
      EventHandler.one(target, EVENT_HIDDEN$4, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    });
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
    if (alreadyOpen) {
      Modal.getInstance(alreadyOpen).hide();
    }
    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal);
  defineJQueryPlugin(Modal);
  var NAME$6 = "offcanvas";
  var DATA_KEY$3 = "bs.offcanvas";
  var EVENT_KEY$3 = `.${DATA_KEY$3}`;
  var DATA_API_KEY$1 = ".data-api";
  var EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
  var ESCAPE_KEY = "Escape";
  var CLASS_NAME_SHOW$3 = "show";
  var CLASS_NAME_SHOWING$1 = "showing";
  var CLASS_NAME_HIDING = "hiding";
  var CLASS_NAME_BACKDROP = "offcanvas-backdrop";
  var OPEN_SELECTOR = ".offcanvas.show";
  var EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
  var EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
  var EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
  var EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
  var EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
  var EVENT_RESIZE = `resize${EVENT_KEY$3}`;
  var EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
  var EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
  var SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
  var Default$5 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  var DefaultType$5 = {
    backdrop: "(boolean|string)",
    keyboard: "boolean",
    scroll: "boolean"
  };
  var Offcanvas = class _Offcanvas extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._addEventListeners();
    }
    // Getters
    static get Default() {
      return Default$5;
    }
    static get DefaultType() {
      return DefaultType$5;
    }
    static get NAME() {
      return NAME$6;
    }
    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._backdrop.show();
      if (!this._config.scroll) {
        new ScrollBarHelper().hide();
      }
      this._element.setAttribute("aria-modal", true);
      this._element.setAttribute("role", "dialog");
      this._element.classList.add(CLASS_NAME_SHOWING$1);
      const completeCallBack = () => {
        if (!this._config.scroll || this._config.backdrop) {
          this._focustrap.activate();
        }
        this._element.classList.add(CLASS_NAME_SHOW$3);
        this._element.classList.remove(CLASS_NAME_SHOWING$1);
        EventHandler.trigger(this._element, EVENT_SHOWN$3, {
          relatedTarget
        });
      };
      this._queueCallback(completeCallBack, this._element, true);
    }
    hide() {
      if (!this._isShown) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._focustrap.deactivate();
      this._element.blur();
      this._isShown = false;
      this._element.classList.add(CLASS_NAME_HIDING);
      this._backdrop.hide();
      const completeCallback = () => {
        this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
        this._element.removeAttribute("aria-modal");
        this._element.removeAttribute("role");
        if (!this._config.scroll) {
          new ScrollBarHelper().reset();
        }
        EventHandler.trigger(this._element, EVENT_HIDDEN$3);
      };
      this._queueCallback(completeCallback, this._element, true);
    }
    dispose() {
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }
    // Private
    _initializeBackDrop() {
      const clickCallback = () => {
        if (this._config.backdrop === "static") {
          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }
        this.hide();
      };
      const isVisible2 = Boolean(this._config.backdrop);
      return new Backdrop({
        className: CLASS_NAME_BACKDROP,
        isVisible: isVisible2,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: isVisible2 ? clickCallback : null
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
        if (event.key !== ESCAPE_KEY) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
      });
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Offcanvas.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  };
  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function(event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$3, () => {
      if (isVisible(this)) {
        this.focus();
      }
    });
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas.getInstance(alreadyOpen).hide();
    }
    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
    for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
      Offcanvas.getOrCreateInstance(selector).show();
    }
  });
  EventHandler.on(window, EVENT_RESIZE, () => {
    for (const element of SelectorEngine.find("[aria-modal][class*=show][class*=offcanvas-]")) {
      if (getComputedStyle(element).position !== "fixed") {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    }
  });
  enableDismissTrigger(Offcanvas);
  defineJQueryPlugin(Offcanvas);
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
    a: ["target", "href", "title", "rel"],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    dd: [],
    div: [],
    dl: [],
    dt: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ["src", "srcset", "alt", "title", "width", "height"],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  var uriAttributes = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]);
  var SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
  var allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase();
    if (allowedAttributeList.includes(attributeName)) {
      if (uriAttributes.has(attributeName)) {
        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
      }
      return true;
    }
    return allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp).some((regex) => regex.test(attributeName));
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }
    if (sanitizeFunction && typeof sanitizeFunction === "function") {
      return sanitizeFunction(unsafeHtml);
    }
    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
    const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
    for (const element of elements) {
      const elementName = element.nodeName.toLowerCase();
      if (!Object.keys(allowList).includes(elementName)) {
        element.remove();
        continue;
      }
      const attributeList = [].concat(...element.attributes);
      const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
      for (const attribute of attributeList) {
        if (!allowedAttribute(attribute, allowedAttributes)) {
          element.removeAttribute(attribute.nodeName);
        }
      }
    }
    return createdDocument.body.innerHTML;
  }
  var NAME$5 = "TemplateFactory";
  var Default$4 = {
    allowList: DefaultAllowlist,
    content: {},
    // { selector : text ,  selector2 : text2 , }
    extraClass: "",
    html: false,
    sanitize: true,
    sanitizeFn: null,
    template: "<div></div>"
  };
  var DefaultType$4 = {
    allowList: "object",
    content: "object",
    extraClass: "(string|function)",
    html: "boolean",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    template: "string"
  };
  var DefaultContentType = {
    entry: "(string|element|function|null)",
    selector: "(string|element)"
  };
  var TemplateFactory = class extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
    }
    // Getters
    static get Default() {
      return Default$4;
    }
    static get DefaultType() {
      return DefaultType$4;
    }
    static get NAME() {
      return NAME$5;
    }
    // Public
    getContent() {
      return Object.values(this._config.content).map((config) => this._resolvePossibleFunction(config)).filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(content) {
      this._checkContent(content);
      this._config.content = __spreadValues(__spreadValues({}, this._config.content), content);
      return this;
    }
    toHtml() {
      const templateWrapper = document.createElement("div");
      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
      for (const [selector, text] of Object.entries(this._config.content)) {
        this._setContent(templateWrapper, text, selector);
      }
      const template = templateWrapper.children[0];
      const extraClass = this._resolvePossibleFunction(this._config.extraClass);
      if (extraClass) {
        template.classList.add(...extraClass.split(" "));
      }
      return template;
    }
    // Private
    _typeCheckConfig(config) {
      super._typeCheckConfig(config);
      this._checkContent(config.content);
    }
    _checkContent(arg) {
      for (const [selector, content] of Object.entries(arg)) {
        super._typeCheckConfig({
          selector,
          entry: content
        }, DefaultContentType);
      }
    }
    _setContent(template, content, selector) {
      const templateElement = SelectorEngine.findOne(selector, template);
      if (!templateElement) {
        return;
      }
      content = this._resolvePossibleFunction(content);
      if (!content) {
        templateElement.remove();
        return;
      }
      if (isElement2(content)) {
        this._putElementInTemplate(getElement(content), templateElement);
        return;
      }
      if (this._config.html) {
        templateElement.innerHTML = this._maybeSanitize(content);
        return;
      }
      templateElement.textContent = content;
    }
    _maybeSanitize(arg) {
      return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [void 0, this]);
    }
    _putElementInTemplate(element, templateElement) {
      if (this._config.html) {
        templateElement.innerHTML = "";
        templateElement.append(element);
        return;
      }
      templateElement.textContent = element.textContent;
    }
  };
  var NAME$4 = "tooltip";
  var DISALLOWED_ATTRIBUTES = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]);
  var CLASS_NAME_FADE$2 = "fade";
  var CLASS_NAME_MODAL = "modal";
  var CLASS_NAME_SHOW$2 = "show";
  var SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
  var SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
  var EVENT_MODAL_HIDE = "hide.bs.modal";
  var TRIGGER_HOVER = "hover";
  var TRIGGER_FOCUS = "focus";
  var TRIGGER_CLICK = "click";
  var TRIGGER_MANUAL = "manual";
  var EVENT_HIDE$2 = "hide";
  var EVENT_HIDDEN$2 = "hidden";
  var EVENT_SHOW$2 = "show";
  var EVENT_SHOWN$2 = "shown";
  var EVENT_INSERTED = "inserted";
  var EVENT_CLICK$1 = "click";
  var EVENT_FOCUSIN$1 = "focusin";
  var EVENT_FOCUSOUT$1 = "focusout";
  var EVENT_MOUSEENTER = "mouseenter";
  var EVENT_MOUSELEAVE = "mouseleave";
  var AttachmentMap = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: isRTL() ? "left" : "right",
    BOTTOM: "bottom",
    LEFT: isRTL() ? "right" : "left"
  };
  var Default$3 = {
    allowList: DefaultAllowlist,
    animation: true,
    boundary: "clippingParents",
    container: false,
    customClass: "",
    delay: 0,
    fallbackPlacements: ["top", "right", "bottom", "left"],
    html: false,
    offset: [0, 6],
    placement: "top",
    popperConfig: null,
    sanitize: true,
    sanitizeFn: null,
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    title: "",
    trigger: "hover focus"
  };
  var DefaultType$3 = {
    allowList: "object",
    animation: "boolean",
    boundary: "(string|element)",
    container: "(string|element|boolean)",
    customClass: "(string|function)",
    delay: "(number|object)",
    fallbackPlacements: "array",
    html: "boolean",
    offset: "(array|string|function)",
    placement: "(string|function)",
    popperConfig: "(null|object|function)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    selector: "(string|boolean)",
    template: "string",
    title: "(string|element|function)",
    trigger: "string"
  };
  var Tooltip = class _Tooltip extends BaseComponent {
    constructor(element, config) {
      if (typeof lib_exports === "undefined") {
        throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");
      }
      super(element, config);
      this._isEnabled = true;
      this._timeout = 0;
      this._isHovered = null;
      this._activeTrigger = {};
      this._popper = null;
      this._templateFactory = null;
      this._newContent = null;
      this.tip = null;
      this._setListeners();
      if (!this._config.selector) {
        this._fixTitle();
      }
    }
    // Getters
    static get Default() {
      return Default$3;
    }
    static get DefaultType() {
      return DefaultType$3;
    }
    static get NAME() {
      return NAME$4;
    }
    // Public
    enable() {
      this._isEnabled = true;
    }
    disable() {
      this._isEnabled = false;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      if (!this._isEnabled) {
        return;
      }
      if (this._isShown()) {
        this._leave();
        return;
      }
      this._enter();
    }
    dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
      if (this._element.getAttribute("data-bs-original-title")) {
        this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title"));
      }
      this._disposePopper();
      super.dispose();
    }
    show() {
      if (this._element.style.display === "none") {
        throw new Error("Please use show on visible elements");
      }
      if (!(this._isWithContent() && this._isEnabled)) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
      const shadowRoot = findShadowRoot(this._element);
      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }
      this._disposePopper();
      const tip = this._getTipElement();
      this._element.setAttribute("aria-describedby", tip.getAttribute("id"));
      const {
        container
      } = this._config;
      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
      }
      this._popper = this._createPopper(tip);
      tip.classList.add(CLASS_NAME_SHOW$2);
      if ("ontouchstart" in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, "mouseover", noop);
        }
      }
      const complete = () => {
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
        if (this._isHovered === false) {
          this._leave();
        }
        this._isHovered = false;
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    hide() {
      if (!this._isShown()) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
      if (hideEvent.defaultPrevented) {
        return;
      }
      const tip = this._getTipElement();
      tip.classList.remove(CLASS_NAME_SHOW$2);
      if ("ontouchstart" in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, "mouseover", noop);
        }
      }
      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      this._isHovered = null;
      const complete = () => {
        if (this._isWithActiveTrigger()) {
          return;
        }
        if (!this._isHovered) {
          this._disposePopper();
        }
        this._element.removeAttribute("aria-describedby");
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    update() {
      if (this._popper) {
        this._popper.update();
      }
    }
    // Protected
    _isWithContent() {
      return Boolean(this._getTitle());
    }
    _getTipElement() {
      if (!this.tip) {
        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
      }
      return this.tip;
    }
    _createTipElement(content) {
      const tip = this._getTemplateFactory(content).toHtml();
      if (!tip) {
        return null;
      }
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
      const tipId = getUID(this.constructor.NAME).toString();
      tip.setAttribute("id", tipId);
      if (this._isAnimated()) {
        tip.classList.add(CLASS_NAME_FADE$2);
      }
      return tip;
    }
    setContent(content) {
      this._newContent = content;
      if (this._isShown()) {
        this._disposePopper();
        this.show();
      }
    }
    _getTemplateFactory(content) {
      if (this._templateFactory) {
        this._templateFactory.changeContent(content);
      } else {
        this._templateFactory = new TemplateFactory(__spreadProps(__spreadValues({}, this._config), {
          // the `content` var has to be after `this._config`
          // to override config.content in case of popover
          content,
          extraClass: this._resolvePossibleFunction(this._config.customClass)
        }));
      }
      return this._templateFactory;
    }
    _getContentForTemplate() {
      return {
        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
      };
    }
    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
    }
    // Private
    _initializeOnDelegatedTarget(event) {
      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }
    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
    }
    _createPopper(tip) {
      const placement = execute(this._config.placement, [this, tip, this._element]);
      const attachment = AttachmentMap[placement.toUpperCase()];
      return createPopper3(this._element, tip, this._getPopperConfig(attachment));
    }
    _getOffset() {
      const {
        offset: offset2
      } = this._config;
      if (typeof offset2 === "string") {
        return offset2.split(",").map((value) => Number.parseInt(value, 10));
      }
      if (typeof offset2 === "function") {
        return (popperData) => offset2(popperData, this._element);
      }
      return offset2;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [this._element, this._element]);
    }
    _getPopperConfig(attachment) {
      const defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: "flip",
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: "offset",
          options: {
            offset: this._getOffset()
          }
        }, {
          name: "preventOverflow",
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: "arrow",
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        }, {
          name: "preSetPlacement",
          enabled: true,
          phase: "beforeMain",
          fn: (data) => {
            this._getTipElement().setAttribute("data-popper-placement", data.state.placement);
          }
        }]
      };
      return __spreadValues(__spreadValues({}, defaultBsPopperConfig), execute(this._config.popperConfig, [void 0, defaultBsPopperConfig]));
    }
    _setListeners() {
      const triggers = this._config.trigger.split(" ");
      for (const trigger of triggers) {
        if (trigger === "click") {
          EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, (event) => {
            const context = this._initializeOnDelegatedTarget(event);
            context.toggle();
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
          EventHandler.on(this._element, eventIn, this._config.selector, (event) => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
            context._enter();
          });
          EventHandler.on(this._element, eventOut, this._config.selector, (event) => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
            context._leave();
          });
        }
      }
      this._hideModalHandler = () => {
        if (this._element) {
          this.hide();
        }
      };
      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    }
    _fixTitle() {
      const title = this._element.getAttribute("title");
      if (!title) {
        return;
      }
      if (!this._element.getAttribute("aria-label") && !this._element.textContent.trim()) {
        this._element.setAttribute("aria-label", title);
      }
      this._element.setAttribute("data-bs-original-title", title);
      this._element.removeAttribute("title");
    }
    _enter() {
      if (this._isShown() || this._isHovered) {
        this._isHovered = true;
        return;
      }
      this._isHovered = true;
      this._setTimeout(() => {
        if (this._isHovered) {
          this.show();
        }
      }, this._config.delay.show);
    }
    _leave() {
      if (this._isWithActiveTrigger()) {
        return;
      }
      this._isHovered = false;
      this._setTimeout(() => {
        if (!this._isHovered) {
          this.hide();
        }
      }, this._config.delay.hide);
    }
    _setTimeout(handler, timeout) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(handler, timeout);
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }
    _getConfig(config) {
      const dataAttributes = Manipulator.getDataAttributes(this._element);
      for (const dataAttribute of Object.keys(dataAttributes)) {
        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
          delete dataAttributes[dataAttribute];
        }
      }
      config = __spreadValues(__spreadValues({}, dataAttributes), typeof config === "object" && config ? config : {});
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      config.container = config.container === false ? document.body : getElement(config.container);
      if (typeof config.delay === "number") {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }
      if (typeof config.title === "number") {
        config.title = config.title.toString();
      }
      if (typeof config.content === "number") {
        config.content = config.content.toString();
      }
      return config;
    }
    _getDelegateConfig() {
      const config = {};
      for (const [key, value] of Object.entries(this._config)) {
        if (this.constructor.Default[key] !== value) {
          config[key] = value;
        }
      }
      config.selector = false;
      config.trigger = "manual";
      return config;
    }
    _disposePopper() {
      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
      if (this.tip) {
        this.tip.remove();
        this.tip = null;
      }
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Tooltip.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  };
  defineJQueryPlugin(Tooltip);
  var NAME$3 = "popover";
  var SELECTOR_TITLE = ".popover-header";
  var SELECTOR_CONTENT = ".popover-body";
  var Default$2 = __spreadProps(__spreadValues({}, Tooltip.Default), {
    content: "",
    offset: [0, 8],
    placement: "right",
    template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    trigger: "click"
  });
  var DefaultType$2 = __spreadProps(__spreadValues({}, Tooltip.DefaultType), {
    content: "(null|string|element|function)"
  });
  var Popover = class _Popover extends Tooltip {
    // Getters
    static get Default() {
      return Default$2;
    }
    static get DefaultType() {
      return DefaultType$2;
    }
    static get NAME() {
      return NAME$3;
    }
    // Overrides
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }
    // Private
    _getContentForTemplate() {
      return {
        [SELECTOR_TITLE]: this._getTitle(),
        [SELECTOR_CONTENT]: this._getContent()
      };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Popover.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  };
  defineJQueryPlugin(Popover);
  var NAME$2 = "scrollspy";
  var DATA_KEY$2 = "bs.scrollspy";
  var EVENT_KEY$2 = `.${DATA_KEY$2}`;
  var DATA_API_KEY = ".data-api";
  var EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
  var EVENT_CLICK = `click${EVENT_KEY$2}`;
  var EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
  var CLASS_NAME_DROPDOWN_ITEM = "dropdown-item";
  var CLASS_NAME_ACTIVE$1 = "active";
  var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  var SELECTOR_TARGET_LINKS = "[href]";
  var SELECTOR_NAV_LIST_GROUP = ".nav, .list-group";
  var SELECTOR_NAV_LINKS = ".nav-link";
  var SELECTOR_NAV_ITEMS = ".nav-item";
  var SELECTOR_LIST_ITEMS = ".list-group-item";
  var SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
  var SELECTOR_DROPDOWN = ".dropdown";
  var SELECTOR_DROPDOWN_TOGGLE$1 = ".dropdown-toggle";
  var Default$1 = {
    offset: null,
    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: "0px 0px -25%",
    smoothScroll: false,
    target: null,
    threshold: [0.1, 0.5, 1]
  };
  var DefaultType$1 = {
    offset: "(number|null)",
    // TODO v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: "string",
    smoothScroll: "boolean",
    target: "element",
    threshold: "array"
  };
  var ScrollSpy = class _ScrollSpy extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._targetLinks = /* @__PURE__ */ new Map();
      this._observableSections = /* @__PURE__ */ new Map();
      this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element;
      this._activeTarget = null;
      this._observer = null;
      this._previousScrollData = {
        visibleEntryTop: 0,
        parentScrollTop: 0
      };
      this.refresh();
    }
    // Getters
    static get Default() {
      return Default$1;
    }
    static get DefaultType() {
      return DefaultType$1;
    }
    static get NAME() {
      return NAME$2;
    }
    // Public
    refresh() {
      this._initializeTargetsAndObservables();
      this._maybeEnableSmoothScroll();
      if (this._observer) {
        this._observer.disconnect();
      } else {
        this._observer = this._getNewObserver();
      }
      for (const section of this._observableSections.values()) {
        this._observer.observe(section);
      }
    }
    dispose() {
      this._observer.disconnect();
      super.dispose();
    }
    // Private
    _configAfterMerge(config) {
      config.target = getElement(config.target) || document.body;
      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
      if (typeof config.threshold === "string") {
        config.threshold = config.threshold.split(",").map((value) => Number.parseFloat(value));
      }
      return config;
    }
    _maybeEnableSmoothScroll() {
      if (!this._config.smoothScroll) {
        return;
      }
      EventHandler.off(this._config.target, EVENT_CLICK);
      EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, (event) => {
        const observableSection = this._observableSections.get(event.target.hash);
        if (observableSection) {
          event.preventDefault();
          const root = this._rootElement || window;
          const height = observableSection.offsetTop - this._element.offsetTop;
          if (root.scrollTo) {
            root.scrollTo({
              top: height,
              behavior: "smooth"
            });
            return;
          }
          root.scrollTop = height;
        }
      });
    }
    _getNewObserver() {
      const options = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin
      };
      return new IntersectionObserver((entries) => this._observerCallback(entries), options);
    }
    // The logic of selection
    _observerCallback(entries) {
      const targetElement = (entry) => this._targetLinks.get(`#${entry.target.id}`);
      const activate = (entry) => {
        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
        this._process(targetElement(entry));
      };
      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = parentScrollTop;
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          this._activeTarget = null;
          this._clearActiveClass(targetElement(entry));
          continue;
        }
        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        if (userScrollsDown && entryIsLowerThanPrevious) {
          activate(entry);
          if (!parentScrollTop) {
            return;
          }
          continue;
        }
        if (!userScrollsDown && !entryIsLowerThanPrevious) {
          activate(entry);
        }
      }
    }
    _initializeTargetsAndObservables() {
      this._targetLinks = /* @__PURE__ */ new Map();
      this._observableSections = /* @__PURE__ */ new Map();
      const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
      for (const anchor of targetLinks) {
        if (!anchor.hash || isDisabled(anchor)) {
          continue;
        }
        const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);
        if (isVisible(observableSection)) {
          this._targetLinks.set(decodeURI(anchor.hash), anchor);
          this._observableSections.set(anchor.hash, observableSection);
        }
      }
    }
    _process(target) {
      if (this._activeTarget === target) {
        return;
      }
      this._clearActiveClass(this._config.target);
      this._activeTarget = target;
      target.classList.add(CLASS_NAME_ACTIVE$1);
      this._activateParents(target);
      EventHandler.trigger(this._element, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }
    _activateParents(target) {
      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
        return;
      }
      for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
        for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
          item.classList.add(CLASS_NAME_ACTIVE$1);
        }
      }
    }
    _clearActiveClass(parent) {
      parent.classList.remove(CLASS_NAME_ACTIVE$1);
      const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
      for (const node of activeNodes) {
        node.classList.remove(CLASS_NAME_ACTIVE$1);
      }
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _ScrollSpy.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  };
  EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
    for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
      ScrollSpy.getOrCreateInstance(spy);
    }
  });
  defineJQueryPlugin(ScrollSpy);
  var NAME$1 = "tab";
  var DATA_KEY$1 = "bs.tab";
  var EVENT_KEY$1 = `.${DATA_KEY$1}`;
  var EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  var EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  var EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  var EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  var EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
  var EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
  var EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
  var ARROW_LEFT_KEY = "ArrowLeft";
  var ARROW_RIGHT_KEY = "ArrowRight";
  var ARROW_UP_KEY = "ArrowUp";
  var ARROW_DOWN_KEY = "ArrowDown";
  var HOME_KEY = "Home";
  var END_KEY = "End";
  var CLASS_NAME_ACTIVE = "active";
  var CLASS_NAME_FADE$1 = "fade";
  var CLASS_NAME_SHOW$1 = "show";
  var CLASS_DROPDOWN = "dropdown";
  var SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
  var SELECTOR_DROPDOWN_MENU = ".dropdown-menu";
  var NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
  var SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
  var SELECTOR_OUTER = ".nav-item, .list-group-item";
  var SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
  var SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
  var SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
  var Tab = class _Tab extends BaseComponent {
    constructor(element) {
      super(element);
      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
      if (!this._parent) {
        return;
      }
      this._setInitialAttributes(this._parent, this._getChildren());
      EventHandler.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
    }
    // Getters
    static get NAME() {
      return NAME$1;
    }
    // Public
    show() {
      const innerElem = this._element;
      if (this._elemIsActive(innerElem)) {
        return;
      }
      const active = this._getActiveElem();
      const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
        relatedTarget: innerElem
      }) : null;
      const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
        relatedTarget: active
      });
      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
        return;
      }
      this._deactivate(active, innerElem);
      this._activate(innerElem, active);
    }
    // Private
    _activate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.add(CLASS_NAME_ACTIVE);
      this._activate(SelectorEngine.getElementFromSelector(element));
      const complete = () => {
        if (element.getAttribute("role") !== "tab") {
          element.classList.add(CLASS_NAME_SHOW$1);
          return;
        }
        element.removeAttribute("tabindex");
        element.setAttribute("aria-selected", true);
        this._toggleDropDown(element, true);
        EventHandler.trigger(element, EVENT_SHOWN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
    _deactivate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.remove(CLASS_NAME_ACTIVE);
      element.blur();
      this._deactivate(SelectorEngine.getElementFromSelector(element));
      const complete = () => {
        if (element.getAttribute("role") !== "tab") {
          element.classList.remove(CLASS_NAME_SHOW$1);
          return;
        }
        element.setAttribute("aria-selected", false);
        element.setAttribute("tabindex", "-1");
        this._toggleDropDown(element, false);
        EventHandler.trigger(element, EVENT_HIDDEN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
    _keydown(event) {
      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      const children = this._getChildren().filter((element) => !isDisabled(element));
      let nextActiveElement;
      if ([HOME_KEY, END_KEY].includes(event.key)) {
        nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
      } else {
        const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
        nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
      }
      if (nextActiveElement) {
        nextActiveElement.focus({
          preventScroll: true
        });
        _Tab.getOrCreateInstance(nextActiveElement).show();
      }
    }
    _getChildren() {
      return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find((child) => this._elemIsActive(child)) || null;
    }
    _setInitialAttributes(parent, children) {
      this._setAttributeIfNotExists(parent, "role", "tablist");
      for (const child of children) {
        this._setInitialAttributesOnChild(child);
      }
    }
    _setInitialAttributesOnChild(child) {
      child = this._getInnerElement(child);
      const isActive = this._elemIsActive(child);
      const outerElem = this._getOuterElement(child);
      child.setAttribute("aria-selected", isActive);
      if (outerElem !== child) {
        this._setAttributeIfNotExists(outerElem, "role", "presentation");
      }
      if (!isActive) {
        child.setAttribute("tabindex", "-1");
      }
      this._setAttributeIfNotExists(child, "role", "tab");
      this._setInitialAttributesOnTargetPanel(child);
    }
    _setInitialAttributesOnTargetPanel(child) {
      const target = SelectorEngine.getElementFromSelector(child);
      if (!target) {
        return;
      }
      this._setAttributeIfNotExists(target, "role", "tabpanel");
      if (child.id) {
        this._setAttributeIfNotExists(target, "aria-labelledby", `${child.id}`);
      }
    }
    _toggleDropDown(element, open) {
      const outerElem = this._getOuterElement(element);
      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
        return;
      }
      const toggle = (selector, className) => {
        const element2 = SelectorEngine.findOne(selector, outerElem);
        if (element2) {
          element2.classList.toggle(className, open);
        }
      };
      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
      outerElem.setAttribute("aria-expanded", open);
    }
    _setAttributeIfNotExists(element, attribute, value) {
      if (!element.hasAttribute(attribute)) {
        element.setAttribute(attribute, value);
      }
    }
    _elemIsActive(elem) {
      return elem.classList.contains(CLASS_NAME_ACTIVE);
    }
    // Try to get the inner element (usually the .nav-link)
    _getInnerElement(elem) {
      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
    }
    // Try to get the outer element (usually the .nav-item)
    _getOuterElement(elem) {
      return elem.closest(SELECTOR_OUTER) || elem;
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Tab.getOrCreateInstance(this);
        if (typeof config !== "string") {
          return;
        }
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  };
  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    Tab.getOrCreateInstance(this).show();
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
      Tab.getOrCreateInstance(element);
    }
  });
  defineJQueryPlugin(Tab);
  var NAME = "toast";
  var DATA_KEY = "bs.toast";
  var EVENT_KEY = `.${DATA_KEY}`;
  var EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
  var EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
  var EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  var EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
  var EVENT_HIDE = `hide${EVENT_KEY}`;
  var EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  var EVENT_SHOW = `show${EVENT_KEY}`;
  var EVENT_SHOWN = `shown${EVENT_KEY}`;
  var CLASS_NAME_FADE = "fade";
  var CLASS_NAME_HIDE = "hide";
  var CLASS_NAME_SHOW = "show";
  var CLASS_NAME_SHOWING = "showing";
  var DefaultType = {
    animation: "boolean",
    autohide: "boolean",
    delay: "number"
  };
  var Default = {
    animation: true,
    autohide: true,
    delay: 5e3
  };
  var Toast = class _Toast extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._timeout = null;
      this._hasMouseInteraction = false;
      this._hasKeyboardInteraction = false;
      this._setListeners();
    }
    // Getters
    static get Default() {
      return Default;
    }
    static get DefaultType() {
      return DefaultType;
    }
    static get NAME() {
      return NAME;
    }
    // Public
    show() {
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._clearTimeout();
      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }
      const complete = () => {
        this._element.classList.remove(CLASS_NAME_SHOWING);
        EventHandler.trigger(this._element, EVENT_SHOWN);
        this._maybeScheduleHide();
      };
      this._element.classList.remove(CLASS_NAME_HIDE);
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    hide() {
      if (!this.isShown()) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const complete = () => {
        this._element.classList.add(CLASS_NAME_HIDE);
        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
        EventHandler.trigger(this._element, EVENT_HIDDEN);
      };
      this._element.classList.add(CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    dispose() {
      this._clearTimeout();
      if (this.isShown()) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }
      super.dispose();
    }
    isShown() {
      return this._element.classList.contains(CLASS_NAME_SHOW);
    }
    // Private
    _maybeScheduleHide() {
      if (!this._config.autohide) {
        return;
      }
      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }
      this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay);
    }
    _onInteraction(event, isInteracting) {
      switch (event.type) {
        case "mouseover":
        case "mouseout": {
          this._hasMouseInteraction = isInteracting;
          break;
        }
        case "focusin":
        case "focusout": {
          this._hasKeyboardInteraction = isInteracting;
          break;
        }
      }
      if (isInteracting) {
        this._clearTimeout();
        return;
      }
      const nextElement = event.relatedTarget;
      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }
      this._maybeScheduleHide();
    }
    _setListeners() {
      EventHandler.on(this._element, EVENT_MOUSEOVER, (event) => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_MOUSEOUT, (event) => this._onInteraction(event, false));
      EventHandler.on(this._element, EVENT_FOCUSIN, (event) => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_FOCUSOUT, (event) => this._onInteraction(event, false));
    }
    _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Toast.getOrCreateInstance(this, config);
        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config](this);
        }
      });
    }
  };
  enableDismissTrigger(Toast);
  defineJQueryPlugin(Toast);

  // <stdin>
  (() => {
    "use strict";
    const searchToggleMobile = document.getElementById("searchToggleMobile");
    const searchToggleDesktop = document.getElementById("searchToggleDesktop");
    const searchModal = document.getElementById("searchModal");
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("query");
    const searchResults = document.getElementById("searchResults");
    const flexSearchModal = new Modal(searchModal, {
      focus: true
    });
    searchToggleMobile.addEventListener("click", showModalOnClick);
    searchToggleDesktop.addEventListener("click", showModalOnClick);
    function showModalOnClick() {
      flexSearchModal.toggle();
      document.querySelector(".search-no-recent").classList.remove("d-none");
    }
    document.addEventListener("keydown", onKeyDownHandler);
    function onKeyDownHandler(event) {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        flexSearchModal.show();
        searchForm.reset();
        searchResults.textContent = "";
        document.querySelector(".search-no-recent").classList.remove("d-none");
      }
      if (event.key === "Escape") {
        searchForm.reset();
        searchResults.textContent = "";
        if (searchResultSelected) {
          removeClass(searchResultSelected, "selected");
          index = -1;
        }
        document.querySelector(".search-no-results").classList.add("d-none");
      }
    }
    document.addEventListener("click", function(event) {
      var modalElement = searchModal.contains(event.target);
      if (!modalElement) {
        searchForm.reset();
        searchResults.textContent = "";
        document.querySelector(".search-no-results").classList.add("d-none");
      }
      if (searchResultSelected) {
        removeClass(searchResultSelected, "selected");
        index = -1;
      }
    });
    searchModal.addEventListener("shown.bs.modal", () => {
      searchInput.focus();
    });
    var searchResultSelected;
    var index = -1;
    document.addEventListener(
      "keydown",
      function(event) {
        var len = searchResults.getElementsByTagName("article").length - 1;
        if (event.key === "ArrowDown") {
          index++;
          if (searchResultSelected) {
            removeClass(searchResultSelected, "selected");
            const next = searchResults.getElementsByTagName("article")[index];
            if (typeof next !== "undefined" && index <= len) {
              searchResultSelected = next;
            } else {
              index = 0;
              searchResultSelected = searchResults.getElementsByTagName("article")[0];
            }
            addClass(searchResultSelected, "selected");
          } else {
            index = 0;
            searchResultSelected = searchResults.getElementsByTagName("article")[0];
            addClass(searchResultSelected, "selected");
          }
        } else if (event.key === "ArrowUp") {
          if (searchResultSelected) {
            removeClass(searchResultSelected, "selected");
            index--;
            const next = searchResults.getElementsByTagName("article")[index];
            if (typeof next !== "undefined" && index >= 0) {
              searchResultSelected = next;
            } else {
              index = len;
              searchResultSelected = searchResults.getElementsByTagName("article")[len];
            }
            addClass(searchResultSelected, "selected");
          } else {
            index = 0;
            searchResultSelected = searchResults.getElementsByTagName("article")[len];
            addClass(searchResultSelected, "selected");
          }
        }
      },
      false
    );
    function removeClass(el, className) {
      if (el.classList) {
        el.classList.remove(className);
      } else {
        el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
      }
      searchResultSelected.querySelector("a").blur();
    }
    function addClass(el, className) {
      if (el.classList) {
        el.classList.add(className);
      } else {
        el.className += " " + className;
      }
      searchResultSelected.querySelector("a").focus();
    }
    searchResults.addEventListener(
      "mouseover",
      () => {
        if (searchResultSelected) {
          removeClass(searchResultSelected, "selected");
        }
      },
      false
    );
  })();
})();
/*!
 * Search modal for Bootstrap based Thulite sites
 * Copyright 2021-2024 Thulite
 * Licensed under the MIT License
 */
/*! Bundled license information:

bootstrap/dist/js/bootstrap.esm.js:
  (*!
    * Bootstrap v5.3.4 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2VudW1zLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldE5vZGVOYW1lLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFdpbmRvdy5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2FwcGx5U3R5bGVzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL21hdGguanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy91c2VyQWdlbnQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvaXNMYXlvdXRWaWV3cG9ydC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0TGF5b3V0UmVjdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9jb250YWlucy5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRDb21wdXRlZFN0eWxlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2lzVGFibGVFbGVtZW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldERvY3VtZW50RWxlbWVudC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRQYXJlbnROb2RlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldE9mZnNldFBhcmVudC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3dpdGhpbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldEZyZXNoU2lkZU9iamVjdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL21lcmdlUGFkZGluZ09iamVjdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2V4cGFuZFRvSGFzaE1hcC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9hcnJvdy5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldFZhcmlhdGlvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9jb21wdXRlU3R5bGVzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2V2ZW50TGlzdGVuZXJzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0T3Bwb3NpdGVQbGFjZW1lbnQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRXaW5kb3dTY3JvbGwuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0V2luZG93U2Nyb2xsQmFyWC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRWaWV3cG9ydFJlY3QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRSZWN0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2lzU2Nyb2xsUGFyZW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFNjcm9sbFBhcmVudC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9saXN0U2Nyb2xsUGFyZW50cy5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3JlY3RUb0NsaWVudFJlY3QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q2xpcHBpbmdSZWN0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvY29tcHV0ZU9mZnNldHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9kZXRlY3RPdmVyZmxvdy5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2NvbXB1dGVBdXRvUGxhY2VtZW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2ZsaXAuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvaGlkZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9vZmZzZXQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvcG9wcGVyT2Zmc2V0cy5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldEFsdEF4aXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvcHJldmVudE92ZXJmbG93LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldE5vZGVTY3JvbGwuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q29tcG9zaXRlUmVjdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL29yZGVyTW9kaWZpZXJzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZGVib3VuY2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9tZXJnZUJ5TmFtZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2NyZWF0ZVBvcHBlci5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3BvcHBlci1saXRlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvcG9wcGVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvc3JjL2RvbS9kYXRhLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvc3JjL3V0aWwvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy9zcmMvZG9tL2V2ZW50LWhhbmRsZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy9zcmMvZG9tL21hbmlwdWxhdG9yLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvc3JjL3V0aWwvY29uZmlnLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvc3JjL2Jhc2UtY29tcG9uZW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvc3JjL2RvbS9zZWxlY3Rvci1lbmdpbmUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy9zcmMvdXRpbC9jb21wb25lbnQtZnVuY3Rpb25zLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvc3JjL2FsZXJ0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvc3JjL2J1dHRvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL2pzL3NyYy91dGlsL3N3aXBlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvc3JjL2Nhcm91c2VsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvc3JjL2NvbGxhcHNlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvc3JjL2Ryb3Bkb3duLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvc3JjL3V0aWwvYmFja2Ryb3AuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy9zcmMvdXRpbC9mb2N1c3RyYXAuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy9zcmMvdXRpbC9zY3JvbGxiYXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy9zcmMvbW9kYWwuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy9zcmMvb2ZmY2FudmFzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvc3JjL3V0aWwvc2FuaXRpemVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvc3JjL3V0aWwvdGVtcGxhdGUtZmFjdG9yeS5qcyIsICIuLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL2pzL3NyYy90b29sdGlwLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvc3JjL3BvcG92ZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy9zcmMvc2Nyb2xsc3B5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvc3JjL3RhYi5qcyIsICIuLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL2pzL3NyYy90b2FzdC5qcyIsICI8c3RkaW4+Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tIFwiLi9lbnVtcy5qc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vbW9kaWZpZXJzL2luZGV4LmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgcG9wcGVyR2VuZXJhdG9yLCBkZXRlY3RPdmVyZmxvdywgY3JlYXRlUG9wcGVyIGFzIGNyZWF0ZVBvcHBlckJhc2UgfSBmcm9tIFwiLi9jcmVhdGVQb3BwZXIuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBjcmVhdGVQb3BwZXIgfSBmcm9tIFwiLi9wb3BwZXIuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBjcmVhdGVQb3BwZXIgYXMgY3JlYXRlUG9wcGVyTGl0ZSB9IGZyb20gXCIuL3BvcHBlci1saXRlLmpzXCI7IiwgImV4cG9ydCB2YXIgdG9wID0gJ3RvcCc7XG5leHBvcnQgdmFyIGJvdHRvbSA9ICdib3R0b20nO1xuZXhwb3J0IHZhciByaWdodCA9ICdyaWdodCc7XG5leHBvcnQgdmFyIGxlZnQgPSAnbGVmdCc7XG5leHBvcnQgdmFyIGF1dG8gPSAnYXV0byc7XG5leHBvcnQgdmFyIGJhc2VQbGFjZW1lbnRzID0gW3RvcCwgYm90dG9tLCByaWdodCwgbGVmdF07XG5leHBvcnQgdmFyIHN0YXJ0ID0gJ3N0YXJ0JztcbmV4cG9ydCB2YXIgZW5kID0gJ2VuZCc7XG5leHBvcnQgdmFyIGNsaXBwaW5nUGFyZW50cyA9ICdjbGlwcGluZ1BhcmVudHMnO1xuZXhwb3J0IHZhciB2aWV3cG9ydCA9ICd2aWV3cG9ydCc7XG5leHBvcnQgdmFyIHBvcHBlciA9ICdwb3BwZXInO1xuZXhwb3J0IHZhciByZWZlcmVuY2UgPSAncmVmZXJlbmNlJztcbmV4cG9ydCB2YXIgdmFyaWF0aW9uUGxhY2VtZW50cyA9IC8qI19fUFVSRV9fKi9iYXNlUGxhY2VtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGxhY2VtZW50KSB7XG4gIHJldHVybiBhY2MuY29uY2F0KFtwbGFjZW1lbnQgKyBcIi1cIiArIHN0YXJ0LCBwbGFjZW1lbnQgKyBcIi1cIiArIGVuZF0pO1xufSwgW10pO1xuZXhwb3J0IHZhciBwbGFjZW1lbnRzID0gLyojX19QVVJFX18qL1tdLmNvbmNhdChiYXNlUGxhY2VtZW50cywgW2F1dG9dKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGxhY2VtZW50KSB7XG4gIHJldHVybiBhY2MuY29uY2F0KFtwbGFjZW1lbnQsIHBsYWNlbWVudCArIFwiLVwiICsgc3RhcnQsIHBsYWNlbWVudCArIFwiLVwiICsgZW5kXSk7XG59LCBbXSk7IC8vIG1vZGlmaWVycyB0aGF0IG5lZWQgdG8gcmVhZCB0aGUgRE9NXG5cbmV4cG9ydCB2YXIgYmVmb3JlUmVhZCA9ICdiZWZvcmVSZWFkJztcbmV4cG9ydCB2YXIgcmVhZCA9ICdyZWFkJztcbmV4cG9ydCB2YXIgYWZ0ZXJSZWFkID0gJ2FmdGVyUmVhZCc7IC8vIHB1cmUtbG9naWMgbW9kaWZpZXJzXG5cbmV4cG9ydCB2YXIgYmVmb3JlTWFpbiA9ICdiZWZvcmVNYWluJztcbmV4cG9ydCB2YXIgbWFpbiA9ICdtYWluJztcbmV4cG9ydCB2YXIgYWZ0ZXJNYWluID0gJ2FmdGVyTWFpbic7IC8vIG1vZGlmaWVyIHdpdGggdGhlIHB1cnBvc2UgdG8gd3JpdGUgdG8gdGhlIERPTSAob3Igd3JpdGUgaW50byBhIGZyYW1ld29yayBzdGF0ZSlcblxuZXhwb3J0IHZhciBiZWZvcmVXcml0ZSA9ICdiZWZvcmVXcml0ZSc7XG5leHBvcnQgdmFyIHdyaXRlID0gJ3dyaXRlJztcbmV4cG9ydCB2YXIgYWZ0ZXJXcml0ZSA9ICdhZnRlcldyaXRlJztcbmV4cG9ydCB2YXIgbW9kaWZpZXJQaGFzZXMgPSBbYmVmb3JlUmVhZCwgcmVhZCwgYWZ0ZXJSZWFkLCBiZWZvcmVNYWluLCBtYWluLCBhZnRlck1haW4sIGJlZm9yZVdyaXRlLCB3cml0ZSwgYWZ0ZXJXcml0ZV07IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE5vZGVOYW1lKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgPyAoZWxlbWVudC5ub2RlTmFtZSB8fCAnJykudG9Mb3dlckNhc2UoKSA6IG51bGw7XG59IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvdyhub2RlKSB7XG4gIGlmIChub2RlID09IG51bGwpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgaWYgKG5vZGUudG9TdHJpbmcoKSAhPT0gJ1tvYmplY3QgV2luZG93XScpIHtcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICByZXR1cm4gb3duZXJEb2N1bWVudCA/IG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93IDogd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG5vZGU7XG59IiwgImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5cbmZ1bmN0aW9uIGlzRWxlbWVudChub2RlKSB7XG4gIHZhciBPd25FbGVtZW50ID0gZ2V0V2luZG93KG5vZGUpLkVsZW1lbnQ7XG4gIHJldHVybiBub2RlIGluc3RhbmNlb2YgT3duRWxlbWVudCB8fCBub2RlIGluc3RhbmNlb2YgRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gaXNIVE1MRWxlbWVudChub2RlKSB7XG4gIHZhciBPd25FbGVtZW50ID0gZ2V0V2luZG93KG5vZGUpLkhUTUxFbGVtZW50O1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE93bkVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBpc1NoYWRvd1Jvb3Qobm9kZSkge1xuICAvLyBJRSAxMSBoYXMgbm8gU2hhZG93Um9vdFxuICBpZiAodHlwZW9mIFNoYWRvd1Jvb3QgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuU2hhZG93Um9vdDtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBPd25FbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBTaGFkb3dSb290O1xufVxuXG5leHBvcnQgeyBpc0VsZW1lbnQsIGlzSFRNTEVsZW1lbnQsIGlzU2hhZG93Um9vdCB9OyIsICJpbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4uL2RvbS11dGlscy9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiOyAvLyBUaGlzIG1vZGlmaWVyIHRha2VzIHRoZSBzdHlsZXMgcHJlcGFyZWQgYnkgdGhlIGBjb21wdXRlU3R5bGVzYCBtb2RpZmllclxuLy8gYW5kIGFwcGxpZXMgdGhlbSB0byB0aGUgSFRNTEVsZW1lbnRzIHN1Y2ggYXMgcG9wcGVyIGFuZCBhcnJvd1xuXG5mdW5jdGlvbiBhcHBseVN0eWxlcyhfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGU7XG4gIE9iamVjdC5rZXlzKHN0YXRlLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIHN0eWxlID0gc3RhdGUuc3R5bGVzW25hbWVdIHx8IHt9O1xuICAgIHZhciBhdHRyaWJ1dGVzID0gc3RhdGUuYXR0cmlidXRlc1tuYW1lXSB8fCB7fTtcbiAgICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW25hbWVdOyAvLyBhcnJvdyBpcyBvcHRpb25hbCArIHZpcnR1YWwgZWxlbWVudHNcblxuICAgIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCAhZ2V0Tm9kZU5hbWUoZWxlbWVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIEZsb3cgZG9lc24ndCBzdXBwb3J0IHRvIGV4dGVuZCB0aGlzIHByb3BlcnR5LCBidXQgaXQncyB0aGUgbW9zdFxuICAgIC8vIGVmZmVjdGl2ZSB3YXkgdG8gYXBwbHkgc3R5bGVzIHRvIGFuIEhUTUxFbGVtZW50XG4gICAgLy8gJEZsb3dGaXhNZVtjYW5ub3Qtd3JpdGVdXG5cblxuICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgc3R5bGUpO1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGF0dHJpYnV0ZXNbbmFtZV07XG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogdmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYyKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlO1xuICB2YXIgaW5pdGlhbFN0eWxlcyA9IHtcbiAgICBwb3BwZXI6IHtcbiAgICAgIHBvc2l0aW9uOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5LFxuICAgICAgbGVmdDogJzAnLFxuICAgICAgdG9wOiAnMCcsXG4gICAgICBtYXJnaW46ICcwJ1xuICAgIH0sXG4gICAgYXJyb3c6IHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgfSxcbiAgICByZWZlcmVuY2U6IHt9XG4gIH07XG4gIE9iamVjdC5hc3NpZ24oc3RhdGUuZWxlbWVudHMucG9wcGVyLnN0eWxlLCBpbml0aWFsU3R5bGVzLnBvcHBlcik7XG4gIHN0YXRlLnN0eWxlcyA9IGluaXRpYWxTdHlsZXM7XG5cbiAgaWYgKHN0YXRlLmVsZW1lbnRzLmFycm93KSB7XG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZS5lbGVtZW50cy5hcnJvdy5zdHlsZSwgaW5pdGlhbFN0eWxlcy5hcnJvdyk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIE9iamVjdC5rZXlzKHN0YXRlLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW25hbWVdO1xuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBzdGF0ZS5hdHRyaWJ1dGVzW25hbWVdIHx8IHt9O1xuICAgICAgdmFyIHN0eWxlUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHN0YXRlLnN0eWxlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IHN0YXRlLnN0eWxlc1tuYW1lXSA6IGluaXRpYWxTdHlsZXNbbmFtZV0pOyAvLyBTZXQgYWxsIHZhbHVlcyB0byBhbiBlbXB0eSBzdHJpbmcgdG8gdW5zZXQgdGhlbVxuXG4gICAgICB2YXIgc3R5bGUgPSBzdHlsZVByb3BlcnRpZXMucmVkdWNlKGZ1bmN0aW9uIChzdHlsZSwgcHJvcGVydHkpIHtcbiAgICAgICAgc3R5bGVbcHJvcGVydHldID0gJyc7XG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgIH0sIHt9KTsgLy8gYXJyb3cgaXMgb3B0aW9uYWwgKyB2aXJ0dWFsIGVsZW1lbnRzXG5cbiAgICAgIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCAhZ2V0Tm9kZU5hbWUoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHN0eWxlKTtcbiAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGF0dHJpYnV0ZSkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdhcHBseVN0eWxlcycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnd3JpdGUnLFxuICBmbjogYXBwbHlTdHlsZXMsXG4gIGVmZmVjdDogZWZmZWN0LFxuICByZXF1aXJlczogWydjb21wdXRlU3R5bGVzJ11cbn07IiwgImltcG9ydCB7IGF1dG8gfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbn0iLCAiZXhwb3J0IHZhciBtYXggPSBNYXRoLm1heDtcbmV4cG9ydCB2YXIgbWluID0gTWF0aC5taW47XG5leHBvcnQgdmFyIHJvdW5kID0gTWF0aC5yb3VuZDsiLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VUFTdHJpbmcoKSB7XG4gIHZhciB1YURhdGEgPSBuYXZpZ2F0b3IudXNlckFnZW50RGF0YTtcblxuICBpZiAodWFEYXRhICE9IG51bGwgJiYgdWFEYXRhLmJyYW5kcyAmJiBBcnJheS5pc0FycmF5KHVhRGF0YS5icmFuZHMpKSB7XG4gICAgcmV0dXJuIHVhRGF0YS5icmFuZHMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS5icmFuZCArIFwiL1wiICsgaXRlbS52ZXJzaW9uO1xuICAgIH0pLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50O1xufSIsICJpbXBvcnQgZ2V0VUFTdHJpbmcgZnJvbSBcIi4uL3V0aWxzL3VzZXJBZ2VudC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNMYXlvdXRWaWV3cG9ydCgpIHtcbiAgcmV0dXJuICEvXigoPyFjaHJvbWV8YW5kcm9pZCkuKSpzYWZhcmkvaS50ZXN0KGdldFVBU3RyaW5nKCkpO1xufSIsICJpbXBvcnQgeyBpc0VsZW1lbnQsIGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgeyByb3VuZCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuaW1wb3J0IGlzTGF5b3V0Vmlld3BvcnQgZnJvbSBcIi4vaXNMYXlvdXRWaWV3cG9ydC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQsIGluY2x1ZGVTY2FsZSwgaXNGaXhlZFN0cmF0ZWd5KSB7XG4gIGlmIChpbmNsdWRlU2NhbGUgPT09IHZvaWQgMCkge1xuICAgIGluY2x1ZGVTY2FsZSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKGlzRml4ZWRTdHJhdGVneSA9PT0gdm9pZCAwKSB7XG4gICAgaXNGaXhlZFN0cmF0ZWd5ID0gZmFsc2U7XG4gIH1cblxuICB2YXIgY2xpZW50UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBzY2FsZVggPSAxO1xuICB2YXIgc2NhbGVZID0gMTtcblxuICBpZiAoaW5jbHVkZVNjYWxlICYmIGlzSFRNTEVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICBzY2FsZVggPSBlbGVtZW50Lm9mZnNldFdpZHRoID4gMCA/IHJvdW5kKGNsaWVudFJlY3Qud2lkdGgpIC8gZWxlbWVudC5vZmZzZXRXaWR0aCB8fCAxIDogMTtcbiAgICBzY2FsZVkgPSBlbGVtZW50Lm9mZnNldEhlaWdodCA+IDAgPyByb3VuZChjbGllbnRSZWN0LmhlaWdodCkgLyBlbGVtZW50Lm9mZnNldEhlaWdodCB8fCAxIDogMTtcbiAgfVxuXG4gIHZhciBfcmVmID0gaXNFbGVtZW50KGVsZW1lbnQpID8gZ2V0V2luZG93KGVsZW1lbnQpIDogd2luZG93LFxuICAgICAgdmlzdWFsVmlld3BvcnQgPSBfcmVmLnZpc3VhbFZpZXdwb3J0O1xuXG4gIHZhciBhZGRWaXN1YWxPZmZzZXRzID0gIWlzTGF5b3V0Vmlld3BvcnQoKSAmJiBpc0ZpeGVkU3RyYXRlZ3k7XG4gIHZhciB4ID0gKGNsaWVudFJlY3QubGVmdCArIChhZGRWaXN1YWxPZmZzZXRzICYmIHZpc3VhbFZpZXdwb3J0ID8gdmlzdWFsVmlld3BvcnQub2Zmc2V0TGVmdCA6IDApKSAvIHNjYWxlWDtcbiAgdmFyIHkgPSAoY2xpZW50UmVjdC50b3AgKyAoYWRkVmlzdWFsT2Zmc2V0cyAmJiB2aXN1YWxWaWV3cG9ydCA/IHZpc3VhbFZpZXdwb3J0Lm9mZnNldFRvcCA6IDApKSAvIHNjYWxlWTtcbiAgdmFyIHdpZHRoID0gY2xpZW50UmVjdC53aWR0aCAvIHNjYWxlWDtcbiAgdmFyIGhlaWdodCA9IGNsaWVudFJlY3QuaGVpZ2h0IC8gc2NhbGVZO1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICB0b3A6IHksXG4gICAgcmlnaHQ6IHggKyB3aWR0aCxcbiAgICBib3R0b206IHkgKyBoZWlnaHQsXG4gICAgbGVmdDogeCxcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfTtcbn0iLCAiaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjsgLy8gUmV0dXJucyB0aGUgbGF5b3V0IHJlY3Qgb2YgYW4gZWxlbWVudCByZWxhdGl2ZSB0byBpdHMgb2Zmc2V0UGFyZW50LiBMYXlvdXRcbi8vIG1lYW5zIGl0IGRvZXNuJ3QgdGFrZSBpbnRvIGFjY291bnQgdHJhbnNmb3Jtcy5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TGF5b3V0UmVjdChlbGVtZW50KSB7XG4gIHZhciBjbGllbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQpOyAvLyBVc2UgdGhlIGNsaWVudFJlY3Qgc2l6ZXMgaWYgaXQncyBub3QgYmVlbiB0cmFuc2Zvcm1lZC5cbiAgLy8gRml4ZXMgaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMjIzXG5cbiAgdmFyIHdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgdmFyIGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gIGlmIChNYXRoLmFicyhjbGllbnRSZWN0LndpZHRoIC0gd2lkdGgpIDw9IDEpIHtcbiAgICB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGg7XG4gIH1cblxuICBpZiAoTWF0aC5hYnMoY2xpZW50UmVjdC5oZWlnaHQgLSBoZWlnaHQpIDw9IDEpIHtcbiAgICBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgeDogZWxlbWVudC5vZmZzZXRMZWZ0LFxuICAgIHk6IGVsZW1lbnQub2Zmc2V0VG9wLFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xufSIsICJpbXBvcnQgeyBpc1NoYWRvd1Jvb3QgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb250YWlucyhwYXJlbnQsIGNoaWxkKSB7XG4gIHZhciByb290Tm9kZSA9IGNoaWxkLmdldFJvb3ROb2RlICYmIGNoaWxkLmdldFJvb3ROb2RlKCk7IC8vIEZpcnN0LCBhdHRlbXB0IHdpdGggZmFzdGVyIG5hdGl2ZSBtZXRob2RcblxuICBpZiAocGFyZW50LmNvbnRhaW5zKGNoaWxkKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IC8vIHRoZW4gZmFsbGJhY2sgdG8gY3VzdG9tIGltcGxlbWVudGF0aW9uIHdpdGggU2hhZG93IERPTSBzdXBwb3J0XG4gIGVsc2UgaWYgKHJvb3ROb2RlICYmIGlzU2hhZG93Um9vdChyb290Tm9kZSkpIHtcbiAgICAgIHZhciBuZXh0ID0gY2hpbGQ7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKG5leHQgJiYgcGFyZW50LmlzU2FtZU5vZGUobmV4dCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ106IG5lZWQgYSBiZXR0ZXIgd2F5IHRvIGhhbmRsZSB0aGlzLi4uXG5cblxuICAgICAgICBuZXh0ID0gbmV4dC5wYXJlbnROb2RlIHx8IG5leHQuaG9zdDtcbiAgICAgIH0gd2hpbGUgKG5leHQpO1xuICAgIH0gLy8gR2l2ZSB1cCwgdGhlIHJlc3VsdCBpcyBmYWxzZVxuXG5cbiAgcmV0dXJuIGZhbHNlO1xufSIsICJpbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSB7XG4gIHJldHVybiBnZXRXaW5kb3coZWxlbWVudCkuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbn0iLCAiaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1RhYmxlRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiBbJ3RhYmxlJywgJ3RkJywgJ3RoJ10uaW5kZXhPZihnZXROb2RlTmFtZShlbGVtZW50KSkgPj0gMDtcbn0iLCAiaW1wb3J0IHsgaXNFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpIHtcbiAgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXTogYXNzdW1lIGJvZHkgaXMgYWx3YXlzIGF2YWlsYWJsZVxuICByZXR1cm4gKChpc0VsZW1lbnQoZWxlbWVudCkgPyBlbGVtZW50Lm93bmVyRG9jdW1lbnQgOiAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgZWxlbWVudC5kb2N1bWVudCkgfHwgd2luZG93LmRvY3VtZW50KS5kb2N1bWVudEVsZW1lbnQ7XG59IiwgImltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhcmVudE5vZGUoZWxlbWVudCkge1xuICBpZiAoZ2V0Tm9kZU5hbWUoZWxlbWVudCkgPT09ICdodG1sJykge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcmV0dXJuICgvLyB0aGlzIGlzIGEgcXVpY2tlciAoYnV0IGxlc3MgdHlwZSBzYWZlKSB3YXkgdG8gc2F2ZSBxdWl0ZSBzb21lIGJ5dGVzIGZyb20gdGhlIGJ1bmRsZVxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl1cbiAgICAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICBlbGVtZW50LmFzc2lnbmVkU2xvdCB8fCAvLyBzdGVwIGludG8gdGhlIHNoYWRvdyBET00gb2YgdGhlIHBhcmVudCBvZiBhIHNsb3R0ZWQgbm9kZVxuICAgIGVsZW1lbnQucGFyZW50Tm9kZSB8fCAoIC8vIERPTSBFbGVtZW50IGRldGVjdGVkXG4gICAgaXNTaGFkb3dSb290KGVsZW1lbnQpID8gZWxlbWVudC5ob3N0IDogbnVsbCkgfHwgLy8gU2hhZG93Um9vdCBkZXRlY3RlZFxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBIVE1MRWxlbWVudCBpcyBhIE5vZGVcbiAgICBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkgLy8gZmFsbGJhY2tcblxuICApO1xufSIsICJpbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50LCBpc1NoYWRvd1Jvb3QgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgaXNUYWJsZUVsZW1lbnQgZnJvbSBcIi4vaXNUYWJsZUVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRQYXJlbnROb2RlIGZyb20gXCIuL2dldFBhcmVudE5vZGUuanNcIjtcbmltcG9ydCBnZXRVQVN0cmluZyBmcm9tIFwiLi4vdXRpbHMvdXNlckFnZW50LmpzXCI7XG5cbmZ1bmN0aW9uIGdldFRydWVPZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICBpZiAoIWlzSFRNTEVsZW1lbnQoZWxlbWVudCkgfHwgLy8gaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy84MzdcbiAgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5wb3NpdGlvbiA9PT0gJ2ZpeGVkJykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0UGFyZW50O1xufSAvLyBgLm9mZnNldFBhcmVudGAgcmVwb3J0cyBgbnVsbGAgZm9yIGZpeGVkIGVsZW1lbnRzLCB3aGlsZSBhYnNvbHV0ZSBlbGVtZW50c1xuLy8gcmV0dXJuIHRoZSBjb250YWluaW5nIGJsb2NrXG5cblxuZnVuY3Rpb24gZ2V0Q29udGFpbmluZ0Jsb2NrKGVsZW1lbnQpIHtcbiAgdmFyIGlzRmlyZWZveCA9IC9maXJlZm94L2kudGVzdChnZXRVQVN0cmluZygpKTtcbiAgdmFyIGlzSUUgPSAvVHJpZGVudC9pLnRlc3QoZ2V0VUFTdHJpbmcoKSk7XG5cbiAgaWYgKGlzSUUgJiYgaXNIVE1MRWxlbWVudChlbGVtZW50KSkge1xuICAgIC8vIEluIElFIDksIDEwIGFuZCAxMSBmaXhlZCBlbGVtZW50cyBjb250YWluaW5nIGJsb2NrIGlzIGFsd2F5cyBlc3RhYmxpc2hlZCBieSB0aGUgdmlld3BvcnRcbiAgICB2YXIgZWxlbWVudENzcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG5cbiAgICBpZiAoZWxlbWVudENzcy5wb3NpdGlvbiA9PT0gJ2ZpeGVkJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgdmFyIGN1cnJlbnROb2RlID0gZ2V0UGFyZW50Tm9kZShlbGVtZW50KTtcblxuICBpZiAoaXNTaGFkb3dSb290KGN1cnJlbnROb2RlKSkge1xuICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUuaG9zdDtcbiAgfVxuXG4gIHdoaWxlIChpc0hUTUxFbGVtZW50KGN1cnJlbnROb2RlKSAmJiBbJ2h0bWwnLCAnYm9keSddLmluZGV4T2YoZ2V0Tm9kZU5hbWUoY3VycmVudE5vZGUpKSA8IDApIHtcbiAgICB2YXIgY3NzID0gZ2V0Q29tcHV0ZWRTdHlsZShjdXJyZW50Tm9kZSk7IC8vIFRoaXMgaXMgbm9uLWV4aGF1c3RpdmUgYnV0IGNvdmVycyB0aGUgbW9zdCBjb21tb24gQ1NTIHByb3BlcnRpZXMgdGhhdFxuICAgIC8vIGNyZWF0ZSBhIGNvbnRhaW5pbmcgYmxvY2suXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQ1NTL0NvbnRhaW5pbmdfYmxvY2sjaWRlbnRpZnlpbmdfdGhlX2NvbnRhaW5pbmdfYmxvY2tcblxuICAgIGlmIChjc3MudHJhbnNmb3JtICE9PSAnbm9uZScgfHwgY3NzLnBlcnNwZWN0aXZlICE9PSAnbm9uZScgfHwgY3NzLmNvbnRhaW4gPT09ICdwYWludCcgfHwgWyd0cmFuc2Zvcm0nLCAncGVyc3BlY3RpdmUnXS5pbmRleE9mKGNzcy53aWxsQ2hhbmdlKSAhPT0gLTEgfHwgaXNGaXJlZm94ICYmIGNzcy53aWxsQ2hhbmdlID09PSAnZmlsdGVyJyB8fCBpc0ZpcmVmb3ggJiYgY3NzLmZpbHRlciAmJiBjc3MuZmlsdGVyICE9PSAnbm9uZScpIHtcbiAgICAgIHJldHVybiBjdXJyZW50Tm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufSAvLyBHZXRzIHRoZSBjbG9zZXN0IGFuY2VzdG9yIHBvc2l0aW9uZWQgZWxlbWVudC4gSGFuZGxlcyBzb21lIGVkZ2UgY2FzZXMsXG4vLyBzdWNoIGFzIHRhYmxlIGFuY2VzdG9ycyBhbmQgY3Jvc3MgYnJvd3NlciBidWdzLlxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE9mZnNldFBhcmVudChlbGVtZW50KSB7XG4gIHZhciB3aW5kb3cgPSBnZXRXaW5kb3coZWxlbWVudCk7XG4gIHZhciBvZmZzZXRQYXJlbnQgPSBnZXRUcnVlT2Zmc2V0UGFyZW50KGVsZW1lbnQpO1xuXG4gIHdoaWxlIChvZmZzZXRQYXJlbnQgJiYgaXNUYWJsZUVsZW1lbnQob2Zmc2V0UGFyZW50KSAmJiBnZXRDb21wdXRlZFN0eWxlKG9mZnNldFBhcmVudCkucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XG4gICAgb2Zmc2V0UGFyZW50ID0gZ2V0VHJ1ZU9mZnNldFBhcmVudChvZmZzZXRQYXJlbnQpO1xuICB9XG5cbiAgaWYgKG9mZnNldFBhcmVudCAmJiAoZ2V0Tm9kZU5hbWUob2Zmc2V0UGFyZW50KSA9PT0gJ2h0bWwnIHx8IGdldE5vZGVOYW1lKG9mZnNldFBhcmVudCkgPT09ICdib2R5JyAmJiBnZXRDb21wdXRlZFN0eWxlKG9mZnNldFBhcmVudCkucG9zaXRpb24gPT09ICdzdGF0aWMnKSkge1xuICAgIHJldHVybiB3aW5kb3c7XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0UGFyZW50IHx8IGdldENvbnRhaW5pbmdCbG9jayhlbGVtZW50KSB8fCB3aW5kb3c7XG59IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIFsndG9wJywgJ2JvdHRvbSddLmluZGV4T2YocGxhY2VtZW50KSA+PSAwID8gJ3gnIDogJ3knO1xufSIsICJpbXBvcnQgeyBtYXggYXMgbWF0aE1heCwgbWluIGFzIG1hdGhNaW4gfSBmcm9tIFwiLi9tYXRoLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gd2l0aGluKG1pbiwgdmFsdWUsIG1heCkge1xuICByZXR1cm4gbWF0aE1heChtaW4sIG1hdGhNaW4odmFsdWUsIG1heCkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhpbk1heENsYW1wKG1pbiwgdmFsdWUsIG1heCkge1xuICB2YXIgdiA9IHdpdGhpbihtaW4sIHZhbHVlLCBtYXgpO1xuICByZXR1cm4gdiA+IG1heCA/IG1heCA6IHY7XG59IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEZyZXNoU2lkZU9iamVjdCgpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgYm90dG9tOiAwLFxuICAgIGxlZnQ6IDBcbiAgfTtcbn0iLCAiaW1wb3J0IGdldEZyZXNoU2lkZU9iamVjdCBmcm9tIFwiLi9nZXRGcmVzaFNpZGVPYmplY3QuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlUGFkZGluZ09iamVjdChwYWRkaW5nT2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBnZXRGcmVzaFNpZGVPYmplY3QoKSwgcGFkZGluZ09iamVjdCk7XG59IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4cGFuZFRvSGFzaE1hcCh2YWx1ZSwga2V5cykge1xuICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKGhhc2hNYXAsIGtleSkge1xuICAgIGhhc2hNYXBba2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiBoYXNoTWFwO1xuICB9LCB7fSk7XG59IiwgImltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldExheW91dFJlY3QuanNcIjtcbmltcG9ydCBjb250YWlucyBmcm9tIFwiLi4vZG9tLXV0aWxzL2NvbnRhaW5zLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanNcIjtcbmltcG9ydCB7IHdpdGhpbiB9IGZyb20gXCIuLi91dGlscy93aXRoaW4uanNcIjtcbmltcG9ydCBtZXJnZVBhZGRpbmdPYmplY3QgZnJvbSBcIi4uL3V0aWxzL21lcmdlUGFkZGluZ09iamVjdC5qc1wiO1xuaW1wb3J0IGV4cGFuZFRvSGFzaE1hcCBmcm9tIFwiLi4vdXRpbHMvZXhwYW5kVG9IYXNoTWFwLmpzXCI7XG5pbXBvcnQgeyBsZWZ0LCByaWdodCwgYmFzZVBsYWNlbWVudHMsIHRvcCwgYm90dG9tIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxudmFyIHRvUGFkZGluZ09iamVjdCA9IGZ1bmN0aW9uIHRvUGFkZGluZ09iamVjdChwYWRkaW5nLCBzdGF0ZSkge1xuICBwYWRkaW5nID0gdHlwZW9mIHBhZGRpbmcgPT09ICdmdW5jdGlvbicgPyBwYWRkaW5nKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlY3RzLCB7XG4gICAgcGxhY2VtZW50OiBzdGF0ZS5wbGFjZW1lbnRcbiAgfSkpIDogcGFkZGluZztcbiAgcmV0dXJuIG1lcmdlUGFkZGluZ09iamVjdCh0eXBlb2YgcGFkZGluZyAhPT0gJ251bWJlcicgPyBwYWRkaW5nIDogZXhwYW5kVG9IYXNoTWFwKHBhZGRpbmcsIGJhc2VQbGFjZW1lbnRzKSk7XG59O1xuXG5mdW5jdGlvbiBhcnJvdyhfcmVmKSB7XG4gIHZhciBfc3RhdGUkbW9kaWZpZXJzRGF0YSQ7XG5cbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuICB2YXIgYXJyb3dFbGVtZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3c7XG4gIHZhciBwb3BwZXJPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzO1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQoc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIGF4aXMgPSBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCk7XG4gIHZhciBpc1ZlcnRpY2FsID0gW2xlZnQsIHJpZ2h0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID49IDA7XG4gIHZhciBsZW4gPSBpc1ZlcnRpY2FsID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gIGlmICghYXJyb3dFbGVtZW50IHx8ICFwb3BwZXJPZmZzZXRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHBhZGRpbmdPYmplY3QgPSB0b1BhZGRpbmdPYmplY3Qob3B0aW9ucy5wYWRkaW5nLCBzdGF0ZSk7XG4gIHZhciBhcnJvd1JlY3QgPSBnZXRMYXlvdXRSZWN0KGFycm93RWxlbWVudCk7XG4gIHZhciBtaW5Qcm9wID0gYXhpcyA9PT0gJ3knID8gdG9wIDogbGVmdDtcbiAgdmFyIG1heFByb3AgPSBheGlzID09PSAneScgPyBib3R0b20gOiByaWdodDtcbiAgdmFyIGVuZERpZmYgPSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2VbbGVuXSArIHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtheGlzXSAtIHBvcHBlck9mZnNldHNbYXhpc10gLSBzdGF0ZS5yZWN0cy5wb3BwZXJbbGVuXTtcbiAgdmFyIHN0YXJ0RGlmZiA9IHBvcHBlck9mZnNldHNbYXhpc10gLSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2VbYXhpc107XG4gIHZhciBhcnJvd09mZnNldFBhcmVudCA9IGdldE9mZnNldFBhcmVudChhcnJvd0VsZW1lbnQpO1xuICB2YXIgY2xpZW50U2l6ZSA9IGFycm93T2Zmc2V0UGFyZW50ID8gYXhpcyA9PT0gJ3knID8gYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50SGVpZ2h0IHx8IDAgOiBhcnJvd09mZnNldFBhcmVudC5jbGllbnRXaWR0aCB8fCAwIDogMDtcbiAgdmFyIGNlbnRlclRvUmVmZXJlbmNlID0gZW5kRGlmZiAvIDIgLSBzdGFydERpZmYgLyAyOyAvLyBNYWtlIHN1cmUgdGhlIGFycm93IGRvZXNuJ3Qgb3ZlcmZsb3cgdGhlIHBvcHBlciBpZiB0aGUgY2VudGVyIHBvaW50IGlzXG4gIC8vIG91dHNpZGUgb2YgdGhlIHBvcHBlciBib3VuZHNcblxuICB2YXIgbWluID0gcGFkZGluZ09iamVjdFttaW5Qcm9wXTtcbiAgdmFyIG1heCA9IGNsaWVudFNpemUgLSBhcnJvd1JlY3RbbGVuXSAtIHBhZGRpbmdPYmplY3RbbWF4UHJvcF07XG4gIHZhciBjZW50ZXIgPSBjbGllbnRTaXplIC8gMiAtIGFycm93UmVjdFtsZW5dIC8gMiArIGNlbnRlclRvUmVmZXJlbmNlO1xuICB2YXIgb2Zmc2V0ID0gd2l0aGluKG1pbiwgY2VudGVyLCBtYXgpOyAvLyBQcmV2ZW50cyBicmVha2luZyBzeW50YXggaGlnaGxpZ2h0aW5nLi4uXG5cbiAgdmFyIGF4aXNQcm9wID0gYXhpcztcbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IChfc3RhdGUkbW9kaWZpZXJzRGF0YSQgPSB7fSwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkW2F4aXNQcm9wXSA9IG9mZnNldCwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkLmNlbnRlck9mZnNldCA9IG9mZnNldCAtIGNlbnRlciwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkKTtcbn1cblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYyKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYyLm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRlbGVtZW50ID0gb3B0aW9ucy5lbGVtZW50LFxuICAgICAgYXJyb3dFbGVtZW50ID0gX29wdGlvbnMkZWxlbWVudCA9PT0gdm9pZCAwID8gJ1tkYXRhLXBvcHBlci1hcnJvd10nIDogX29wdGlvbnMkZWxlbWVudDtcblxuICBpZiAoYXJyb3dFbGVtZW50ID09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH0gLy8gQ1NTIHNlbGVjdG9yXG5cblxuICBpZiAodHlwZW9mIGFycm93RWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICBhcnJvd0VsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5wb3BwZXIucXVlcnlTZWxlY3RvcihhcnJvd0VsZW1lbnQpO1xuXG4gICAgaWYgKCFhcnJvd0VsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbnRhaW5zKHN0YXRlLmVsZW1lbnRzLnBvcHBlciwgYXJyb3dFbGVtZW50KSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHN0YXRlLmVsZW1lbnRzLmFycm93ID0gYXJyb3dFbGVtZW50O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYXJyb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogYXJyb3csXG4gIGVmZmVjdDogZWZmZWN0LFxuICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsncHJldmVudE92ZXJmbG93J11cbn07IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFZhcmlhdGlvbihwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5zcGxpdCgnLScpWzFdO1xufSIsICJpbXBvcnQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBib3R0b20sIGVuZCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldE9mZnNldFBhcmVudCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldE9mZnNldFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldFdpbmRvdy5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldFZhcmlhdGlvbiBmcm9tIFwiLi4vdXRpbHMvZ2V0VmFyaWF0aW9uLmpzXCI7XG5pbXBvcnQgeyByb3VuZCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxudmFyIHVuc2V0U2lkZXMgPSB7XG4gIHRvcDogJ2F1dG8nLFxuICByaWdodDogJ2F1dG8nLFxuICBib3R0b206ICdhdXRvJyxcbiAgbGVmdDogJ2F1dG8nXG59OyAvLyBSb3VuZCB0aGUgb2Zmc2V0cyB0byB0aGUgbmVhcmVzdCBzdWl0YWJsZSBzdWJwaXhlbCBiYXNlZCBvbiB0aGUgRFBSLlxuLy8gWm9vbWluZyBjYW4gY2hhbmdlIHRoZSBEUFIsIGJ1dCBpdCBzZWVtcyB0byByZXBvcnQgYSB2YWx1ZSB0aGF0IHdpbGxcbi8vIGNsZWFubHkgZGl2aWRlIHRoZSB2YWx1ZXMgaW50byB0aGUgYXBwcm9wcmlhdGUgc3VicGl4ZWxzLlxuXG5mdW5jdGlvbiByb3VuZE9mZnNldHNCeURQUihfcmVmLCB3aW4pIHtcbiAgdmFyIHggPSBfcmVmLngsXG4gICAgICB5ID0gX3JlZi55O1xuICB2YXIgZHByID0gd2luLmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgcmV0dXJuIHtcbiAgICB4OiByb3VuZCh4ICogZHByKSAvIGRwciB8fCAwLFxuICAgIHk6IHJvdW5kKHkgKiBkcHIpIC8gZHByIHx8IDBcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvU3R5bGVzKF9yZWYyKSB7XG4gIHZhciBfT2JqZWN0JGFzc2lnbjI7XG5cbiAgdmFyIHBvcHBlciA9IF9yZWYyLnBvcHBlcixcbiAgICAgIHBvcHBlclJlY3QgPSBfcmVmMi5wb3BwZXJSZWN0LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZjIucGxhY2VtZW50LFxuICAgICAgdmFyaWF0aW9uID0gX3JlZjIudmFyaWF0aW9uLFxuICAgICAgb2Zmc2V0cyA9IF9yZWYyLm9mZnNldHMsXG4gICAgICBwb3NpdGlvbiA9IF9yZWYyLnBvc2l0aW9uLFxuICAgICAgZ3B1QWNjZWxlcmF0aW9uID0gX3JlZjIuZ3B1QWNjZWxlcmF0aW9uLFxuICAgICAgYWRhcHRpdmUgPSBfcmVmMi5hZGFwdGl2ZSxcbiAgICAgIHJvdW5kT2Zmc2V0cyA9IF9yZWYyLnJvdW5kT2Zmc2V0cyxcbiAgICAgIGlzRml4ZWQgPSBfcmVmMi5pc0ZpeGVkO1xuICB2YXIgX29mZnNldHMkeCA9IG9mZnNldHMueCxcbiAgICAgIHggPSBfb2Zmc2V0cyR4ID09PSB2b2lkIDAgPyAwIDogX29mZnNldHMkeCxcbiAgICAgIF9vZmZzZXRzJHkgPSBvZmZzZXRzLnksXG4gICAgICB5ID0gX29mZnNldHMkeSA9PT0gdm9pZCAwID8gMCA6IF9vZmZzZXRzJHk7XG5cbiAgdmFyIF9yZWYzID0gdHlwZW9mIHJvdW5kT2Zmc2V0cyA9PT0gJ2Z1bmN0aW9uJyA/IHJvdW5kT2Zmc2V0cyh7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH0pIDoge1xuICAgIHg6IHgsXG4gICAgeTogeVxuICB9O1xuXG4gIHggPSBfcmVmMy54O1xuICB5ID0gX3JlZjMueTtcbiAgdmFyIGhhc1ggPSBvZmZzZXRzLmhhc093blByb3BlcnR5KCd4Jyk7XG4gIHZhciBoYXNZID0gb2Zmc2V0cy5oYXNPd25Qcm9wZXJ0eSgneScpO1xuICB2YXIgc2lkZVggPSBsZWZ0O1xuICB2YXIgc2lkZVkgPSB0b3A7XG4gIHZhciB3aW4gPSB3aW5kb3c7XG5cbiAgaWYgKGFkYXB0aXZlKSB7XG4gICAgdmFyIG9mZnNldFBhcmVudCA9IGdldE9mZnNldFBhcmVudChwb3BwZXIpO1xuICAgIHZhciBoZWlnaHRQcm9wID0gJ2NsaWVudEhlaWdodCc7XG4gICAgdmFyIHdpZHRoUHJvcCA9ICdjbGllbnRXaWR0aCc7XG5cbiAgICBpZiAob2Zmc2V0UGFyZW50ID09PSBnZXRXaW5kb3cocG9wcGVyKSkge1xuICAgICAgb2Zmc2V0UGFyZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KHBvcHBlcik7XG5cbiAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKG9mZnNldFBhcmVudCkucG9zaXRpb24gIT09ICdzdGF0aWMnICYmIHBvc2l0aW9uID09PSAnYWJzb2x1dGUnKSB7XG4gICAgICAgIGhlaWdodFByb3AgPSAnc2Nyb2xsSGVpZ2h0JztcbiAgICAgICAgd2lkdGhQcm9wID0gJ3Njcm9sbFdpZHRoJztcbiAgICAgIH1cbiAgICB9IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhc3RdOiBmb3JjZSB0eXBlIHJlZmluZW1lbnQsIHdlIGNvbXBhcmUgb2Zmc2V0UGFyZW50IHdpdGggd2luZG93IGFib3ZlLCBidXQgRmxvdyBkb2Vzbid0IGRldGVjdCBpdFxuXG5cbiAgICBvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQ7XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSB0b3AgfHwgKHBsYWNlbWVudCA9PT0gbGVmdCB8fCBwbGFjZW1lbnQgPT09IHJpZ2h0KSAmJiB2YXJpYXRpb24gPT09IGVuZCkge1xuICAgICAgc2lkZVkgPSBib3R0b207XG4gICAgICB2YXIgb2Zmc2V0WSA9IGlzRml4ZWQgJiYgb2Zmc2V0UGFyZW50ID09PSB3aW4gJiYgd2luLnZpc3VhbFZpZXdwb3J0ID8gd2luLnZpc3VhbFZpZXdwb3J0LmhlaWdodCA6IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICAgICAgb2Zmc2V0UGFyZW50W2hlaWdodFByb3BdO1xuICAgICAgeSAtPSBvZmZzZXRZIC0gcG9wcGVyUmVjdC5oZWlnaHQ7XG4gICAgICB5ICo9IGdwdUFjY2VsZXJhdGlvbiA/IDEgOiAtMTtcbiAgICB9XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSBsZWZ0IHx8IChwbGFjZW1lbnQgPT09IHRvcCB8fCBwbGFjZW1lbnQgPT09IGJvdHRvbSkgJiYgdmFyaWF0aW9uID09PSBlbmQpIHtcbiAgICAgIHNpZGVYID0gcmlnaHQ7XG4gICAgICB2YXIgb2Zmc2V0WCA9IGlzRml4ZWQgJiYgb2Zmc2V0UGFyZW50ID09PSB3aW4gJiYgd2luLnZpc3VhbFZpZXdwb3J0ID8gd2luLnZpc3VhbFZpZXdwb3J0LndpZHRoIDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gICAgICBvZmZzZXRQYXJlbnRbd2lkdGhQcm9wXTtcbiAgICAgIHggLT0gb2Zmc2V0WCAtIHBvcHBlclJlY3Qud2lkdGg7XG4gICAgICB4ICo9IGdwdUFjY2VsZXJhdGlvbiA/IDEgOiAtMTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29tbW9uU3R5bGVzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgcG9zaXRpb246IHBvc2l0aW9uXG4gIH0sIGFkYXB0aXZlICYmIHVuc2V0U2lkZXMpO1xuXG4gIHZhciBfcmVmNCA9IHJvdW5kT2Zmc2V0cyA9PT0gdHJ1ZSA/IHJvdW5kT2Zmc2V0c0J5RFBSKHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfSwgZ2V0V2luZG93KHBvcHBlcikpIDoge1xuICAgIHg6IHgsXG4gICAgeTogeVxuICB9O1xuXG4gIHggPSBfcmVmNC54O1xuICB5ID0gX3JlZjQueTtcblxuICBpZiAoZ3B1QWNjZWxlcmF0aW9uKSB7XG4gICAgdmFyIF9PYmplY3QkYXNzaWduO1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywgKF9PYmplY3QkYXNzaWduID0ge30sIF9PYmplY3QkYXNzaWduW3NpZGVZXSA9IGhhc1kgPyAnMCcgOiAnJywgX09iamVjdCRhc3NpZ25bc2lkZVhdID0gaGFzWCA/ICcwJyA6ICcnLCBfT2JqZWN0JGFzc2lnbi50cmFuc2Zvcm0gPSAod2luLmRldmljZVBpeGVsUmF0aW8gfHwgMSkgPD0gMSA/IFwidHJhbnNsYXRlKFwiICsgeCArIFwicHgsIFwiICsgeSArIFwicHgpXCIgOiBcInRyYW5zbGF0ZTNkKFwiICsgeCArIFwicHgsIFwiICsgeSArIFwicHgsIDApXCIsIF9PYmplY3QkYXNzaWduKSk7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCAoX09iamVjdCRhc3NpZ24yID0ge30sIF9PYmplY3QkYXNzaWduMltzaWRlWV0gPSBoYXNZID8geSArIFwicHhcIiA6ICcnLCBfT2JqZWN0JGFzc2lnbjJbc2lkZVhdID0gaGFzWCA/IHggKyBcInB4XCIgOiAnJywgX09iamVjdCRhc3NpZ24yLnRyYW5zZm9ybSA9ICcnLCBfT2JqZWN0JGFzc2lnbjIpKTtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZVN0eWxlcyhfcmVmNSkge1xuICB2YXIgc3RhdGUgPSBfcmVmNS5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmNS5vcHRpb25zO1xuICB2YXIgX29wdGlvbnMkZ3B1QWNjZWxlcmF0ID0gb3B0aW9ucy5ncHVBY2NlbGVyYXRpb24sXG4gICAgICBncHVBY2NlbGVyYXRpb24gPSBfb3B0aW9ucyRncHVBY2NlbGVyYXQgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRncHVBY2NlbGVyYXQsXG4gICAgICBfb3B0aW9ucyRhZGFwdGl2ZSA9IG9wdGlvbnMuYWRhcHRpdmUsXG4gICAgICBhZGFwdGl2ZSA9IF9vcHRpb25zJGFkYXB0aXZlID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkYWRhcHRpdmUsXG4gICAgICBfb3B0aW9ucyRyb3VuZE9mZnNldHMgPSBvcHRpb25zLnJvdW5kT2Zmc2V0cyxcbiAgICAgIHJvdW5kT2Zmc2V0cyA9IF9vcHRpb25zJHJvdW5kT2Zmc2V0cyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHJvdW5kT2Zmc2V0cztcbiAgdmFyIGNvbW1vblN0eWxlcyA9IHtcbiAgICBwbGFjZW1lbnQ6IGdldEJhc2VQbGFjZW1lbnQoc3RhdGUucGxhY2VtZW50KSxcbiAgICB2YXJpYXRpb246IGdldFZhcmlhdGlvbihzdGF0ZS5wbGFjZW1lbnQpLFxuICAgIHBvcHBlcjogc3RhdGUuZWxlbWVudHMucG9wcGVyLFxuICAgIHBvcHBlclJlY3Q6IHN0YXRlLnJlY3RzLnBvcHBlcixcbiAgICBncHVBY2NlbGVyYXRpb246IGdwdUFjY2VsZXJhdGlvbixcbiAgICBpc0ZpeGVkOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5ID09PSAnZml4ZWQnXG4gIH07XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyAhPSBudWxsKSB7XG4gICAgc3RhdGUuc3R5bGVzLnBvcHBlciA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnN0eWxlcy5wb3BwZXIsIG1hcFRvU3R5bGVzKE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywge1xuICAgICAgb2Zmc2V0czogc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLFxuICAgICAgcG9zaXRpb246IHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3ksXG4gICAgICBhZGFwdGl2ZTogYWRhcHRpdmUsXG4gICAgICByb3VuZE9mZnNldHM6IHJvdW5kT2Zmc2V0c1xuICAgIH0pKSk7XG4gIH1cblxuICBpZiAoc3RhdGUubW9kaWZpZXJzRGF0YS5hcnJvdyAhPSBudWxsKSB7XG4gICAgc3RhdGUuc3R5bGVzLmFycm93ID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc3R5bGVzLmFycm93LCBtYXBUb1N0eWxlcyhPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIHtcbiAgICAgIG9mZnNldHM6IHN0YXRlLm1vZGlmaWVyc0RhdGEuYXJyb3csXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIGFkYXB0aXZlOiBmYWxzZSxcbiAgICAgIHJvdW5kT2Zmc2V0czogcm91bmRPZmZzZXRzXG4gICAgfSkpKTtcbiAgfVxuXG4gIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIsIHtcbiAgICAnZGF0YS1wb3BwZXItcGxhY2VtZW50Jzogc3RhdGUucGxhY2VtZW50XG4gIH0pO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnY29tcHV0ZVN0eWxlcycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnYmVmb3JlV3JpdGUnLFxuICBmbjogY29tcHV0ZVN0eWxlcyxcbiAgZGF0YToge31cbn07IiwgImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRXaW5kb3cuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG52YXIgcGFzc2l2ZSA9IHtcbiAgcGFzc2l2ZTogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIGluc3RhbmNlID0gX3JlZi5pbnN0YW5jZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRzY3JvbGwgPSBvcHRpb25zLnNjcm9sbCxcbiAgICAgIHNjcm9sbCA9IF9vcHRpb25zJHNjcm9sbCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHNjcm9sbCxcbiAgICAgIF9vcHRpb25zJHJlc2l6ZSA9IG9wdGlvbnMucmVzaXplLFxuICAgICAgcmVzaXplID0gX29wdGlvbnMkcmVzaXplID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkcmVzaXplO1xuICB2YXIgd2luZG93ID0gZ2V0V2luZG93KHN0YXRlLmVsZW1lbnRzLnBvcHBlcik7XG4gIHZhciBzY3JvbGxQYXJlbnRzID0gW10uY29uY2F0KHN0YXRlLnNjcm9sbFBhcmVudHMucmVmZXJlbmNlLCBzdGF0ZS5zY3JvbGxQYXJlbnRzLnBvcHBlcik7XG5cbiAgaWYgKHNjcm9sbCkge1xuICAgIHNjcm9sbFBhcmVudHMuZm9yRWFjaChmdW5jdGlvbiAoc2Nyb2xsUGFyZW50KSB7XG4gICAgICBzY3JvbGxQYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChyZXNpemUpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHNjcm9sbCkge1xuICAgICAgc2Nyb2xsUGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzY3JvbGxQYXJlbnQpIHtcbiAgICAgICAgc2Nyb2xsUGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVzaXplKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICB9XG4gIH07XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdldmVudExpc3RlbmVycycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnd3JpdGUnLFxuICBmbjogZnVuY3Rpb24gZm4oKSB7fSxcbiAgZWZmZWN0OiBlZmZlY3QsXG4gIGRhdGE6IHt9XG59OyIsICJ2YXIgaGFzaCA9IHtcbiAgbGVmdDogJ3JpZ2h0JyxcbiAgcmlnaHQ6ICdsZWZ0JyxcbiAgYm90dG9tOiAndG9wJyxcbiAgdG9wOiAnYm90dG9tJ1xufTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnJlcGxhY2UoL2xlZnR8cmlnaHR8Ym90dG9tfHRvcC9nLCBmdW5jdGlvbiAobWF0Y2hlZCkge1xuICAgIHJldHVybiBoYXNoW21hdGNoZWRdO1xuICB9KTtcbn0iLCAidmFyIGhhc2ggPSB7XG4gIHN0YXJ0OiAnZW5kJyxcbiAgZW5kOiAnc3RhcnQnXG59O1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBwbGFjZW1lbnQucmVwbGFjZSgvc3RhcnR8ZW5kL2csIGZ1bmN0aW9uIChtYXRjaGVkKSB7XG4gICAgcmV0dXJuIGhhc2hbbWF0Y2hlZF07XG4gIH0pO1xufSIsICJpbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0V2luZG93U2Nyb2xsKG5vZGUpIHtcbiAgdmFyIHdpbiA9IGdldFdpbmRvdyhub2RlKTtcbiAgdmFyIHNjcm9sbExlZnQgPSB3aW4ucGFnZVhPZmZzZXQ7XG4gIHZhciBzY3JvbGxUb3AgPSB3aW4ucGFnZVlPZmZzZXQ7XG4gIHJldHVybiB7XG4gICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcFxuICB9O1xufSIsICJpbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3dTY3JvbGwgZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpIHtcbiAgLy8gSWYgPGh0bWw+IGhhcyBhIENTUyB3aWR0aCBncmVhdGVyIHRoYW4gdGhlIHZpZXdwb3J0LCB0aGVuIHRoaXMgd2lsbCBiZVxuICAvLyBpbmNvcnJlY3QgZm9yIFJUTC5cbiAgLy8gUG9wcGVyIDEgaXMgYnJva2VuIGluIHRoaXMgY2FzZSBhbmQgbmV2ZXIgaGFkIGEgYnVnIHJlcG9ydCBzbyBsZXQncyBhc3N1bWVcbiAgLy8gaXQncyBub3QgYW4gaXNzdWUuIEkgZG9uJ3QgdGhpbmsgYW55b25lIGV2ZXIgc3BlY2lmaWVzIHdpZHRoIG9uIDxodG1sPlxuICAvLyBhbnl3YXkuXG4gIC8vIEJyb3dzZXJzIHdoZXJlIHRoZSBsZWZ0IHNjcm9sbGJhciBkb2Vzbid0IGNhdXNlIGFuIGlzc3VlIHJlcG9ydCBgMGAgZm9yXG4gIC8vIHRoaXMgKGUuZy4gRWRnZSAyMDE5LCBJRTExLCBTYWZhcmkpXG4gIHJldHVybiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpKS5sZWZ0ICsgZ2V0V2luZG93U2Nyb2xsKGVsZW1lbnQpLnNjcm9sbExlZnQ7XG59IiwgImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvd1Njcm9sbEJhclggZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsQmFyWC5qc1wiO1xuaW1wb3J0IGlzTGF5b3V0Vmlld3BvcnQgZnJvbSBcIi4vaXNMYXlvdXRWaWV3cG9ydC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Vmlld3BvcnRSZWN0KGVsZW1lbnQsIHN0cmF0ZWd5KSB7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3coZWxlbWVudCk7XG4gIHZhciBodG1sID0gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpO1xuICB2YXIgdmlzdWFsVmlld3BvcnQgPSB3aW4udmlzdWFsVmlld3BvcnQ7XG4gIHZhciB3aWR0aCA9IGh0bWwuY2xpZW50V2lkdGg7XG4gIHZhciBoZWlnaHQgPSBodG1sLmNsaWVudEhlaWdodDtcbiAgdmFyIHggPSAwO1xuICB2YXIgeSA9IDA7XG5cbiAgaWYgKHZpc3VhbFZpZXdwb3J0KSB7XG4gICAgd2lkdGggPSB2aXN1YWxWaWV3cG9ydC53aWR0aDtcbiAgICBoZWlnaHQgPSB2aXN1YWxWaWV3cG9ydC5oZWlnaHQ7XG4gICAgdmFyIGxheW91dFZpZXdwb3J0ID0gaXNMYXlvdXRWaWV3cG9ydCgpO1xuXG4gICAgaWYgKGxheW91dFZpZXdwb3J0IHx8ICFsYXlvdXRWaWV3cG9ydCAmJiBzdHJhdGVneSA9PT0gJ2ZpeGVkJykge1xuICAgICAgeCA9IHZpc3VhbFZpZXdwb3J0Lm9mZnNldExlZnQ7XG4gICAgICB5ID0gdmlzdWFsVmlld3BvcnQub2Zmc2V0VG9wO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0LFxuICAgIHg6IHggKyBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpLFxuICAgIHk6IHlcbiAgfTtcbn0iLCAiaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCBnZXRXaW5kb3dTY3JvbGxCYXJYIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbEJhclguanNcIjtcbmltcG9ydCBnZXRXaW5kb3dTY3JvbGwgZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsLmpzXCI7XG5pbXBvcnQgeyBtYXggfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiOyAvLyBHZXRzIHRoZSBlbnRpcmUgc2l6ZSBvZiB0aGUgc2Nyb2xsYWJsZSBkb2N1bWVudCBhcmVhLCBldmVuIGV4dGVuZGluZyBvdXRzaWRlXG4vLyBvZiB0aGUgYDxodG1sPmAgYW5kIGA8Ym9keT5gIHJlY3QgYm91bmRzIGlmIGhvcml6b250YWxseSBzY3JvbGxhYmxlXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldERvY3VtZW50UmVjdChlbGVtZW50KSB7XG4gIHZhciBfZWxlbWVudCRvd25lckRvY3VtZW47XG5cbiAgdmFyIGh0bWwgPSBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCk7XG4gIHZhciB3aW5TY3JvbGwgPSBnZXRXaW5kb3dTY3JvbGwoZWxlbWVudCk7XG4gIHZhciBib2R5ID0gKF9lbGVtZW50JG93bmVyRG9jdW1lbiA9IGVsZW1lbnQub3duZXJEb2N1bWVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9lbGVtZW50JG93bmVyRG9jdW1lbi5ib2R5O1xuICB2YXIgd2lkdGggPSBtYXgoaHRtbC5zY3JvbGxXaWR0aCwgaHRtbC5jbGllbnRXaWR0aCwgYm9keSA/IGJvZHkuc2Nyb2xsV2lkdGggOiAwLCBib2R5ID8gYm9keS5jbGllbnRXaWR0aCA6IDApO1xuICB2YXIgaGVpZ2h0ID0gbWF4KGh0bWwuc2Nyb2xsSGVpZ2h0LCBodG1sLmNsaWVudEhlaWdodCwgYm9keSA/IGJvZHkuc2Nyb2xsSGVpZ2h0IDogMCwgYm9keSA/IGJvZHkuY2xpZW50SGVpZ2h0IDogMCk7XG4gIHZhciB4ID0gLXdpblNjcm9sbC5zY3JvbGxMZWZ0ICsgZ2V0V2luZG93U2Nyb2xsQmFyWChlbGVtZW50KTtcbiAgdmFyIHkgPSAtd2luU2Nyb2xsLnNjcm9sbFRvcDtcblxuICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShib2R5IHx8IGh0bWwpLmRpcmVjdGlvbiA9PT0gJ3J0bCcpIHtcbiAgICB4ICs9IG1heChodG1sLmNsaWVudFdpZHRoLCBib2R5ID8gYm9keS5jbGllbnRXaWR0aCA6IDApIC0gd2lkdGg7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfTtcbn0iLCAiaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNTY3JvbGxQYXJlbnQoZWxlbWVudCkge1xuICAvLyBGaXJlZm94IHdhbnRzIHVzIHRvIGNoZWNrIGAteGAgYW5kIGAteWAgdmFyaWF0aW9ucyBhcyB3ZWxsXG4gIHZhciBfZ2V0Q29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCksXG4gICAgICBvdmVyZmxvdyA9IF9nZXRDb21wdXRlZFN0eWxlLm92ZXJmbG93LFxuICAgICAgb3ZlcmZsb3dYID0gX2dldENvbXB1dGVkU3R5bGUub3ZlcmZsb3dYLFxuICAgICAgb3ZlcmZsb3dZID0gX2dldENvbXB1dGVkU3R5bGUub3ZlcmZsb3dZO1xuXG4gIHJldHVybiAvYXV0b3xzY3JvbGx8b3ZlcmxheXxoaWRkZW4vLnRlc3Qob3ZlcmZsb3cgKyBvdmVyZmxvd1kgKyBvdmVyZmxvd1gpO1xufSIsICJpbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgaXNTY3JvbGxQYXJlbnQgZnJvbSBcIi4vaXNTY3JvbGxQYXJlbnQuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNjcm9sbFBhcmVudChub2RlKSB7XG4gIGlmIChbJ2h0bWwnLCAnYm9keScsICcjZG9jdW1lbnQnXS5pbmRleE9mKGdldE5vZGVOYW1lKG5vZGUpKSA+PSAwKSB7XG4gICAgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXTogYXNzdW1lIGJvZHkgaXMgYWx3YXlzIGF2YWlsYWJsZVxuICAgIHJldHVybiBub2RlLm93bmVyRG9jdW1lbnQuYm9keTtcbiAgfVxuXG4gIGlmIChpc0hUTUxFbGVtZW50KG5vZGUpICYmIGlzU2Nyb2xsUGFyZW50KG5vZGUpKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICByZXR1cm4gZ2V0U2Nyb2xsUGFyZW50KGdldFBhcmVudE5vZGUobm9kZSkpO1xufSIsICJpbXBvcnQgZ2V0U2Nyb2xsUGFyZW50IGZyb20gXCIuL2dldFNjcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldFBhcmVudE5vZGUgZnJvbSBcIi4vZ2V0UGFyZW50Tm9kZS5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuLypcbmdpdmVuIGEgRE9NIGVsZW1lbnQsIHJldHVybiB0aGUgbGlzdCBvZiBhbGwgc2Nyb2xsIHBhcmVudHMsIHVwIHRoZSBsaXN0IG9mIGFuY2Vzb3JzXG51bnRpbCB3ZSBnZXQgdG8gdGhlIHRvcCB3aW5kb3cgb2JqZWN0LiBUaGlzIGxpc3QgaXMgd2hhdCB3ZSBhdHRhY2ggc2Nyb2xsIGxpc3RlbmVyc1xudG8sIGJlY2F1c2UgaWYgYW55IG9mIHRoZXNlIHBhcmVudCBlbGVtZW50cyBzY3JvbGwsIHdlJ2xsIG5lZWQgdG8gcmUtY2FsY3VsYXRlIHRoZVxucmVmZXJlbmNlIGVsZW1lbnQncyBwb3NpdGlvbi5cbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpc3RTY3JvbGxQYXJlbnRzKGVsZW1lbnQsIGxpc3QpIHtcbiAgdmFyIF9lbGVtZW50JG93bmVyRG9jdW1lbjtcblxuICBpZiAobGlzdCA9PT0gdm9pZCAwKSB7XG4gICAgbGlzdCA9IFtdO1xuICB9XG5cbiAgdmFyIHNjcm9sbFBhcmVudCA9IGdldFNjcm9sbFBhcmVudChlbGVtZW50KTtcbiAgdmFyIGlzQm9keSA9IHNjcm9sbFBhcmVudCA9PT0gKChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keSk7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3coc2Nyb2xsUGFyZW50KTtcbiAgdmFyIHRhcmdldCA9IGlzQm9keSA/IFt3aW5dLmNvbmNhdCh3aW4udmlzdWFsVmlld3BvcnQgfHwgW10sIGlzU2Nyb2xsUGFyZW50KHNjcm9sbFBhcmVudCkgPyBzY3JvbGxQYXJlbnQgOiBbXSkgOiBzY3JvbGxQYXJlbnQ7XG4gIHZhciB1cGRhdGVkTGlzdCA9IGxpc3QuY29uY2F0KHRhcmdldCk7XG4gIHJldHVybiBpc0JvZHkgPyB1cGRhdGVkTGlzdCA6IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBpc0JvZHkgdGVsbHMgdXMgdGFyZ2V0IHdpbGwgYmUgYW4gSFRNTEVsZW1lbnQgaGVyZVxuICB1cGRhdGVkTGlzdC5jb25jYXQobGlzdFNjcm9sbFBhcmVudHMoZ2V0UGFyZW50Tm9kZSh0YXJnZXQpKSk7XG59IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlY3RUb0NsaWVudFJlY3QocmVjdCkge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcmVjdCwge1xuICAgIGxlZnQ6IHJlY3QueCxcbiAgICB0b3A6IHJlY3QueSxcbiAgICByaWdodDogcmVjdC54ICsgcmVjdC53aWR0aCxcbiAgICBib3R0b206IHJlY3QueSArIHJlY3QuaGVpZ2h0XG4gIH0pO1xufSIsICJpbXBvcnQgeyB2aWV3cG9ydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldFZpZXdwb3J0UmVjdCBmcm9tIFwiLi9nZXRWaWV3cG9ydFJlY3QuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudFJlY3QgZnJvbSBcIi4vZ2V0RG9jdW1lbnRSZWN0LmpzXCI7XG5pbXBvcnQgbGlzdFNjcm9sbFBhcmVudHMgZnJvbSBcIi4vbGlzdFNjcm9sbFBhcmVudHMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4vZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IHsgaXNFbGVtZW50LCBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCBnZXRQYXJlbnROb2RlIGZyb20gXCIuL2dldFBhcmVudE5vZGUuanNcIjtcbmltcG9ydCBjb250YWlucyBmcm9tIFwiLi9jb250YWlucy5qc1wiO1xuaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgcmVjdFRvQ2xpZW50UmVjdCBmcm9tIFwiLi4vdXRpbHMvcmVjdFRvQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IHsgbWF4LCBtaW4gfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuXG5mdW5jdGlvbiBnZXRJbm5lckJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50LCBzdHJhdGVneSkge1xuICB2YXIgcmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50LCBmYWxzZSwgc3RyYXRlZ3kgPT09ICdmaXhlZCcpO1xuICByZWN0LnRvcCA9IHJlY3QudG9wICsgZWxlbWVudC5jbGllbnRUb3A7XG4gIHJlY3QubGVmdCA9IHJlY3QubGVmdCArIGVsZW1lbnQuY2xpZW50TGVmdDtcbiAgcmVjdC5ib3R0b20gPSByZWN0LnRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICByZWN0LnJpZ2h0ID0gcmVjdC5sZWZ0ICsgZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgcmVjdC53aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIHJlY3QuaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIHJlY3QueCA9IHJlY3QubGVmdDtcbiAgcmVjdC55ID0gcmVjdC50b3A7XG4gIHJldHVybiByZWN0O1xufVxuXG5mdW5jdGlvbiBnZXRDbGllbnRSZWN0RnJvbU1peGVkVHlwZShlbGVtZW50LCBjbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpIHtcbiAgcmV0dXJuIGNsaXBwaW5nUGFyZW50ID09PSB2aWV3cG9ydCA/IHJlY3RUb0NsaWVudFJlY3QoZ2V0Vmlld3BvcnRSZWN0KGVsZW1lbnQsIHN0cmF0ZWd5KSkgOiBpc0VsZW1lbnQoY2xpcHBpbmdQYXJlbnQpID8gZ2V0SW5uZXJCb3VuZGluZ0NsaWVudFJlY3QoY2xpcHBpbmdQYXJlbnQsIHN0cmF0ZWd5KSA6IHJlY3RUb0NsaWVudFJlY3QoZ2V0RG9jdW1lbnRSZWN0KGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSkpO1xufSAvLyBBIFwiY2xpcHBpbmcgcGFyZW50XCIgaXMgYW4gb3ZlcmZsb3dhYmxlIGNvbnRhaW5lciB3aXRoIHRoZSBjaGFyYWN0ZXJpc3RpYyBvZlxuLy8gY2xpcHBpbmcgKG9yIGhpZGluZykgb3ZlcmZsb3dpbmcgZWxlbWVudHMgd2l0aCBhIHBvc2l0aW9uIGRpZmZlcmVudCBmcm9tXG4vLyBgaW5pdGlhbGBcblxuXG5mdW5jdGlvbiBnZXRDbGlwcGluZ1BhcmVudHMoZWxlbWVudCkge1xuICB2YXIgY2xpcHBpbmdQYXJlbnRzID0gbGlzdFNjcm9sbFBhcmVudHMoZ2V0UGFyZW50Tm9kZShlbGVtZW50KSk7XG4gIHZhciBjYW5Fc2NhcGVDbGlwcGluZyA9IFsnYWJzb2x1dGUnLCAnZml4ZWQnXS5pbmRleE9mKGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24pID49IDA7XG4gIHZhciBjbGlwcGVyRWxlbWVudCA9IGNhbkVzY2FwZUNsaXBwaW5nICYmIGlzSFRNTEVsZW1lbnQoZWxlbWVudCkgPyBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudCkgOiBlbGVtZW50O1xuXG4gIGlmICghaXNFbGVtZW50KGNsaXBwZXJFbGVtZW50KSkge1xuICAgIHJldHVybiBbXTtcbiAgfSAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmxvdy9pc3N1ZXMvMTQxNFxuXG5cbiAgcmV0dXJuIGNsaXBwaW5nUGFyZW50cy5maWx0ZXIoZnVuY3Rpb24gKGNsaXBwaW5nUGFyZW50KSB7XG4gICAgcmV0dXJuIGlzRWxlbWVudChjbGlwcGluZ1BhcmVudCkgJiYgY29udGFpbnMoY2xpcHBpbmdQYXJlbnQsIGNsaXBwZXJFbGVtZW50KSAmJiBnZXROb2RlTmFtZShjbGlwcGluZ1BhcmVudCkgIT09ICdib2R5JztcbiAgfSk7XG59IC8vIEdldHMgdGhlIG1heGltdW0gYXJlYSB0aGF0IHRoZSBlbGVtZW50IGlzIHZpc2libGUgaW4gZHVlIHRvIGFueSBudW1iZXIgb2Zcbi8vIGNsaXBwaW5nIHBhcmVudHNcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDbGlwcGluZ1JlY3QoZWxlbWVudCwgYm91bmRhcnksIHJvb3RCb3VuZGFyeSwgc3RyYXRlZ3kpIHtcbiAgdmFyIG1haW5DbGlwcGluZ1BhcmVudHMgPSBib3VuZGFyeSA9PT0gJ2NsaXBwaW5nUGFyZW50cycgPyBnZXRDbGlwcGluZ1BhcmVudHMoZWxlbWVudCkgOiBbXS5jb25jYXQoYm91bmRhcnkpO1xuICB2YXIgY2xpcHBpbmdQYXJlbnRzID0gW10uY29uY2F0KG1haW5DbGlwcGluZ1BhcmVudHMsIFtyb290Qm91bmRhcnldKTtcbiAgdmFyIGZpcnN0Q2xpcHBpbmdQYXJlbnQgPSBjbGlwcGluZ1BhcmVudHNbMF07XG4gIHZhciBjbGlwcGluZ1JlY3QgPSBjbGlwcGluZ1BhcmVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2NSZWN0LCBjbGlwcGluZ1BhcmVudCkge1xuICAgIHZhciByZWN0ID0gZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgY2xpcHBpbmdQYXJlbnQsIHN0cmF0ZWd5KTtcbiAgICBhY2NSZWN0LnRvcCA9IG1heChyZWN0LnRvcCwgYWNjUmVjdC50b3ApO1xuICAgIGFjY1JlY3QucmlnaHQgPSBtaW4ocmVjdC5yaWdodCwgYWNjUmVjdC5yaWdodCk7XG4gICAgYWNjUmVjdC5ib3R0b20gPSBtaW4ocmVjdC5ib3R0b20sIGFjY1JlY3QuYm90dG9tKTtcbiAgICBhY2NSZWN0LmxlZnQgPSBtYXgocmVjdC5sZWZ0LCBhY2NSZWN0LmxlZnQpO1xuICAgIHJldHVybiBhY2NSZWN0O1xuICB9LCBnZXRDbGllbnRSZWN0RnJvbU1peGVkVHlwZShlbGVtZW50LCBmaXJzdENsaXBwaW5nUGFyZW50LCBzdHJhdGVneSkpO1xuICBjbGlwcGluZ1JlY3Qud2lkdGggPSBjbGlwcGluZ1JlY3QucmlnaHQgLSBjbGlwcGluZ1JlY3QubGVmdDtcbiAgY2xpcHBpbmdSZWN0LmhlaWdodCA9IGNsaXBwaW5nUmVjdC5ib3R0b20gLSBjbGlwcGluZ1JlY3QudG9wO1xuICBjbGlwcGluZ1JlY3QueCA9IGNsaXBwaW5nUmVjdC5sZWZ0O1xuICBjbGlwcGluZ1JlY3QueSA9IGNsaXBwaW5nUmVjdC50b3A7XG4gIHJldHVybiBjbGlwcGluZ1JlY3Q7XG59IiwgImltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4vZ2V0VmFyaWF0aW9uLmpzXCI7XG5pbXBvcnQgZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50IGZyb20gXCIuL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHsgdG9wLCByaWdodCwgYm90dG9tLCBsZWZ0LCBzdGFydCwgZW5kIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wdXRlT2Zmc2V0cyhfcmVmKSB7XG4gIHZhciByZWZlcmVuY2UgPSBfcmVmLnJlZmVyZW5jZSxcbiAgICAgIGVsZW1lbnQgPSBfcmVmLmVsZW1lbnQsXG4gICAgICBwbGFjZW1lbnQgPSBfcmVmLnBsYWNlbWVudDtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBwbGFjZW1lbnQgPyBnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCkgOiBudWxsO1xuICB2YXIgdmFyaWF0aW9uID0gcGxhY2VtZW50ID8gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkgOiBudWxsO1xuICB2YXIgY29tbW9uWCA9IHJlZmVyZW5jZS54ICsgcmVmZXJlbmNlLndpZHRoIC8gMiAtIGVsZW1lbnQud2lkdGggLyAyO1xuICB2YXIgY29tbW9uWSA9IHJlZmVyZW5jZS55ICsgcmVmZXJlbmNlLmhlaWdodCAvIDIgLSBlbGVtZW50LmhlaWdodCAvIDI7XG4gIHZhciBvZmZzZXRzO1xuXG4gIHN3aXRjaCAoYmFzZVBsYWNlbWVudCkge1xuICAgIGNhc2UgdG9wOlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogY29tbW9uWCxcbiAgICAgICAgeTogcmVmZXJlbmNlLnkgLSBlbGVtZW50LmhlaWdodFxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBib3R0b206XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICB4OiBjb21tb25YLFxuICAgICAgICB5OiByZWZlcmVuY2UueSArIHJlZmVyZW5jZS5oZWlnaHRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcmlnaHQ6XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICB4OiByZWZlcmVuY2UueCArIHJlZmVyZW5jZS53aWR0aCxcbiAgICAgICAgeTogY29tbW9uWVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBsZWZ0OlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogcmVmZXJlbmNlLnggLSBlbGVtZW50LndpZHRoLFxuICAgICAgICB5OiBjb21tb25ZXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogcmVmZXJlbmNlLngsXG4gICAgICAgIHk6IHJlZmVyZW5jZS55XG4gICAgICB9O1xuICB9XG5cbiAgdmFyIG1haW5BeGlzID0gYmFzZVBsYWNlbWVudCA/IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KSA6IG51bGw7XG5cbiAgaWYgKG1haW5BeGlzICE9IG51bGwpIHtcbiAgICB2YXIgbGVuID0gbWFpbkF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICAgIHN3aXRjaCAodmFyaWF0aW9uKSB7XG4gICAgICBjYXNlIHN0YXJ0OlxuICAgICAgICBvZmZzZXRzW21haW5BeGlzXSA9IG9mZnNldHNbbWFpbkF4aXNdIC0gKHJlZmVyZW5jZVtsZW5dIC8gMiAtIGVsZW1lbnRbbGVuXSAvIDIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBlbmQ6XG4gICAgICAgIG9mZnNldHNbbWFpbkF4aXNdID0gb2Zmc2V0c1ttYWluQXhpc10gKyAocmVmZXJlbmNlW2xlbl0gLyAyIC0gZWxlbWVudFtsZW5dIC8gMik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvZmZzZXRzO1xufSIsICJpbXBvcnQgZ2V0Q2xpcHBpbmdSZWN0IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0Q2xpcHBpbmdSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgY29tcHV0ZU9mZnNldHMgZnJvbSBcIi4vY29tcHV0ZU9mZnNldHMuanNcIjtcbmltcG9ydCByZWN0VG9DbGllbnRSZWN0IGZyb20gXCIuL3JlY3RUb0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCB7IGNsaXBwaW5nUGFyZW50cywgcmVmZXJlbmNlLCBwb3BwZXIsIGJvdHRvbSwgdG9wLCByaWdodCwgYmFzZVBsYWNlbWVudHMsIHZpZXdwb3J0IH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgeyBpc0VsZW1lbnQgfSBmcm9tIFwiLi4vZG9tLXV0aWxzL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCBtZXJnZVBhZGRpbmdPYmplY3QgZnJvbSBcIi4vbWVyZ2VQYWRkaW5nT2JqZWN0LmpzXCI7XG5pbXBvcnQgZXhwYW5kVG9IYXNoTWFwIGZyb20gXCIuL2V4cGFuZFRvSGFzaE1hcC5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRldGVjdE92ZXJmbG93KHN0YXRlLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgX29wdGlvbnMgPSBvcHRpb25zLFxuICAgICAgX29wdGlvbnMkcGxhY2VtZW50ID0gX29wdGlvbnMucGxhY2VtZW50LFxuICAgICAgcGxhY2VtZW50ID0gX29wdGlvbnMkcGxhY2VtZW50ID09PSB2b2lkIDAgPyBzdGF0ZS5wbGFjZW1lbnQgOiBfb3B0aW9ucyRwbGFjZW1lbnQsXG4gICAgICBfb3B0aW9ucyRzdHJhdGVneSA9IF9vcHRpb25zLnN0cmF0ZWd5LFxuICAgICAgc3RyYXRlZ3kgPSBfb3B0aW9ucyRzdHJhdGVneSA9PT0gdm9pZCAwID8gc3RhdGUuc3RyYXRlZ3kgOiBfb3B0aW9ucyRzdHJhdGVneSxcbiAgICAgIF9vcHRpb25zJGJvdW5kYXJ5ID0gX29wdGlvbnMuYm91bmRhcnksXG4gICAgICBib3VuZGFyeSA9IF9vcHRpb25zJGJvdW5kYXJ5ID09PSB2b2lkIDAgPyBjbGlwcGluZ1BhcmVudHMgOiBfb3B0aW9ucyRib3VuZGFyeSxcbiAgICAgIF9vcHRpb25zJHJvb3RCb3VuZGFyeSA9IF9vcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeSA9IF9vcHRpb25zJHJvb3RCb3VuZGFyeSA9PT0gdm9pZCAwID8gdmlld3BvcnQgOiBfb3B0aW9ucyRyb290Qm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRlbGVtZW50Q29udGUgPSBfb3B0aW9ucy5lbGVtZW50Q29udGV4dCxcbiAgICAgIGVsZW1lbnRDb250ZXh0ID0gX29wdGlvbnMkZWxlbWVudENvbnRlID09PSB2b2lkIDAgPyBwb3BwZXIgOiBfb3B0aW9ucyRlbGVtZW50Q29udGUsXG4gICAgICBfb3B0aW9ucyRhbHRCb3VuZGFyeSA9IF9vcHRpb25zLmFsdEJvdW5kYXJ5LFxuICAgICAgYWx0Qm91bmRhcnkgPSBfb3B0aW9ucyRhbHRCb3VuZGFyeSA9PT0gdm9pZCAwID8gZmFsc2UgOiBfb3B0aW9ucyRhbHRCb3VuZGFyeSxcbiAgICAgIF9vcHRpb25zJHBhZGRpbmcgPSBfb3B0aW9ucy5wYWRkaW5nLFxuICAgICAgcGFkZGluZyA9IF9vcHRpb25zJHBhZGRpbmcgPT09IHZvaWQgMCA/IDAgOiBfb3B0aW9ucyRwYWRkaW5nO1xuICB2YXIgcGFkZGluZ09iamVjdCA9IG1lcmdlUGFkZGluZ09iamVjdCh0eXBlb2YgcGFkZGluZyAhPT0gJ251bWJlcicgPyBwYWRkaW5nIDogZXhwYW5kVG9IYXNoTWFwKHBhZGRpbmcsIGJhc2VQbGFjZW1lbnRzKSk7XG4gIHZhciBhbHRDb250ZXh0ID0gZWxlbWVudENvbnRleHQgPT09IHBvcHBlciA/IHJlZmVyZW5jZSA6IHBvcHBlcjtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciBlbGVtZW50ID0gc3RhdGUuZWxlbWVudHNbYWx0Qm91bmRhcnkgPyBhbHRDb250ZXh0IDogZWxlbWVudENvbnRleHRdO1xuICB2YXIgY2xpcHBpbmdDbGllbnRSZWN0ID0gZ2V0Q2xpcHBpbmdSZWN0KGlzRWxlbWVudChlbGVtZW50KSA/IGVsZW1lbnQgOiBlbGVtZW50LmNvbnRleHRFbGVtZW50IHx8IGdldERvY3VtZW50RWxlbWVudChzdGF0ZS5lbGVtZW50cy5wb3BwZXIpLCBib3VuZGFyeSwgcm9vdEJvdW5kYXJ5LCBzdHJhdGVneSk7XG4gIHZhciByZWZlcmVuY2VDbGllbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KHN0YXRlLmVsZW1lbnRzLnJlZmVyZW5jZSk7XG4gIHZhciBwb3BwZXJPZmZzZXRzID0gY29tcHV0ZU9mZnNldHMoe1xuICAgIHJlZmVyZW5jZTogcmVmZXJlbmNlQ2xpZW50UmVjdCxcbiAgICBlbGVtZW50OiBwb3BwZXJSZWN0LFxuICAgIHN0cmF0ZWd5OiAnYWJzb2x1dGUnLFxuICAgIHBsYWNlbWVudDogcGxhY2VtZW50XG4gIH0pO1xuICB2YXIgcG9wcGVyQ2xpZW50UmVjdCA9IHJlY3RUb0NsaWVudFJlY3QoT2JqZWN0LmFzc2lnbih7fSwgcG9wcGVyUmVjdCwgcG9wcGVyT2Zmc2V0cykpO1xuICB2YXIgZWxlbWVudENsaWVudFJlY3QgPSBlbGVtZW50Q29udGV4dCA9PT0gcG9wcGVyID8gcG9wcGVyQ2xpZW50UmVjdCA6IHJlZmVyZW5jZUNsaWVudFJlY3Q7IC8vIHBvc2l0aXZlID0gb3ZlcmZsb3dpbmcgdGhlIGNsaXBwaW5nIHJlY3RcbiAgLy8gMCBvciBuZWdhdGl2ZSA9IHdpdGhpbiB0aGUgY2xpcHBpbmcgcmVjdFxuXG4gIHZhciBvdmVyZmxvd09mZnNldHMgPSB7XG4gICAgdG9wOiBjbGlwcGluZ0NsaWVudFJlY3QudG9wIC0gZWxlbWVudENsaWVudFJlY3QudG9wICsgcGFkZGluZ09iamVjdC50b3AsXG4gICAgYm90dG9tOiBlbGVtZW50Q2xpZW50UmVjdC5ib3R0b20gLSBjbGlwcGluZ0NsaWVudFJlY3QuYm90dG9tICsgcGFkZGluZ09iamVjdC5ib3R0b20sXG4gICAgbGVmdDogY2xpcHBpbmdDbGllbnRSZWN0LmxlZnQgLSBlbGVtZW50Q2xpZW50UmVjdC5sZWZ0ICsgcGFkZGluZ09iamVjdC5sZWZ0LFxuICAgIHJpZ2h0OiBlbGVtZW50Q2xpZW50UmVjdC5yaWdodCAtIGNsaXBwaW5nQ2xpZW50UmVjdC5yaWdodCArIHBhZGRpbmdPYmplY3QucmlnaHRcbiAgfTtcbiAgdmFyIG9mZnNldERhdGEgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldDsgLy8gT2Zmc2V0cyBjYW4gYmUgYXBwbGllZCBvbmx5IHRvIHRoZSBwb3BwZXIgZWxlbWVudFxuXG4gIGlmIChlbGVtZW50Q29udGV4dCA9PT0gcG9wcGVyICYmIG9mZnNldERhdGEpIHtcbiAgICB2YXIgb2Zmc2V0ID0gb2Zmc2V0RGF0YVtwbGFjZW1lbnRdO1xuICAgIE9iamVjdC5rZXlzKG92ZXJmbG93T2Zmc2V0cykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgbXVsdGlwbHkgPSBbcmlnaHQsIGJvdHRvbV0uaW5kZXhPZihrZXkpID49IDAgPyAxIDogLTE7XG4gICAgICB2YXIgYXhpcyA9IFt0b3AsIGJvdHRvbV0uaW5kZXhPZihrZXkpID49IDAgPyAneScgOiAneCc7XG4gICAgICBvdmVyZmxvd09mZnNldHNba2V5XSArPSBvZmZzZXRbYXhpc10gKiBtdWx0aXBseTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBvdmVyZmxvd09mZnNldHM7XG59IiwgImltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4vZ2V0VmFyaWF0aW9uLmpzXCI7XG5pbXBvcnQgeyB2YXJpYXRpb25QbGFjZW1lbnRzLCBiYXNlUGxhY2VtZW50cywgcGxhY2VtZW50cyBhcyBhbGxQbGFjZW1lbnRzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4vZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXB1dGVBdXRvUGxhY2VtZW50KHN0YXRlLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgX29wdGlvbnMgPSBvcHRpb25zLFxuICAgICAgcGxhY2VtZW50ID0gX29wdGlvbnMucGxhY2VtZW50LFxuICAgICAgYm91bmRhcnkgPSBfb3B0aW9ucy5ib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeSA9IF9vcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmcgPSBfb3B0aW9ucy5wYWRkaW5nLFxuICAgICAgZmxpcFZhcmlhdGlvbnMgPSBfb3B0aW9ucy5mbGlwVmFyaWF0aW9ucyxcbiAgICAgIF9vcHRpb25zJGFsbG93ZWRBdXRvUCA9IF9vcHRpb25zLmFsbG93ZWRBdXRvUGxhY2VtZW50cyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50cyA9IF9vcHRpb25zJGFsbG93ZWRBdXRvUCA9PT0gdm9pZCAwID8gYWxsUGxhY2VtZW50cyA6IF9vcHRpb25zJGFsbG93ZWRBdXRvUDtcbiAgdmFyIHZhcmlhdGlvbiA9IGdldFZhcmlhdGlvbihwbGFjZW1lbnQpO1xuICB2YXIgcGxhY2VtZW50cyA9IHZhcmlhdGlvbiA/IGZsaXBWYXJpYXRpb25zID8gdmFyaWF0aW9uUGxhY2VtZW50cyA6IHZhcmlhdGlvblBsYWNlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkgPT09IHZhcmlhdGlvbjtcbiAgfSkgOiBiYXNlUGxhY2VtZW50cztcbiAgdmFyIGFsbG93ZWRQbGFjZW1lbnRzID0gcGxhY2VtZW50cy5maWx0ZXIoZnVuY3Rpb24gKHBsYWNlbWVudCkge1xuICAgIHJldHVybiBhbGxvd2VkQXV0b1BsYWNlbWVudHMuaW5kZXhPZihwbGFjZW1lbnQpID49IDA7XG4gIH0pO1xuXG4gIGlmIChhbGxvd2VkUGxhY2VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBhbGxvd2VkUGxhY2VtZW50cyA9IHBsYWNlbWVudHM7XG4gIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtdHlwZV06IEZsb3cgc2VlbXMgdG8gaGF2ZSBwcm9ibGVtcyB3aXRoIHR3byBhcnJheSB1bmlvbnMuLi5cblxuXG4gIHZhciBvdmVyZmxvd3MgPSBhbGxvd2VkUGxhY2VtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGxhY2VtZW50KSB7XG4gICAgYWNjW3BsYWNlbWVudF0gPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQsXG4gICAgICBib3VuZGFyeTogYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmc6IHBhZGRpbmdcbiAgICB9KVtnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCldO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG92ZXJmbG93cykuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBvdmVyZmxvd3NbYV0gLSBvdmVyZmxvd3NbYl07XG4gIH0pO1xufSIsICJpbXBvcnQgZ2V0T3Bwb3NpdGVQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE9wcG9zaXRlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuLi91dGlscy9kZXRlY3RPdmVyZmxvdy5qc1wiO1xuaW1wb3J0IGNvbXB1dGVBdXRvUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9jb21wdXRlQXV0b1BsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHsgYm90dG9tLCB0b3AsIHN0YXJ0LCByaWdodCwgbGVmdCwgYXV0byB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldFZhcmlhdGlvbiBmcm9tIFwiLi4vdXRpbHMvZ2V0VmFyaWF0aW9uLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZnVuY3Rpb24gZ2V0RXhwYW5kZWRGYWxsYmFja1BsYWNlbWVudHMocGxhY2VtZW50KSB7XG4gIGlmIChnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCkgPT09IGF1dG8pIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgb3Bwb3NpdGVQbGFjZW1lbnQgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICByZXR1cm4gW2dldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50KHBsYWNlbWVudCksIG9wcG9zaXRlUGxhY2VtZW50LCBnZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudChvcHBvc2l0ZVBsYWNlbWVudCldO1xufVxuXG5mdW5jdGlvbiBmbGlwKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnMsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdLl9za2lwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIF9vcHRpb25zJG1haW5BeGlzID0gb3B0aW9ucy5tYWluQXhpcyxcbiAgICAgIGNoZWNrTWFpbkF4aXMgPSBfb3B0aW9ucyRtYWluQXhpcyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJG1haW5BeGlzLFxuICAgICAgX29wdGlvbnMkYWx0QXhpcyA9IG9wdGlvbnMuYWx0QXhpcyxcbiAgICAgIGNoZWNrQWx0QXhpcyA9IF9vcHRpb25zJGFsdEF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRhbHRBeGlzLFxuICAgICAgc3BlY2lmaWVkRmFsbGJhY2tQbGFjZW1lbnRzID0gb3B0aW9ucy5mYWxsYmFja1BsYWNlbWVudHMsXG4gICAgICBwYWRkaW5nID0gb3B0aW9ucy5wYWRkaW5nLFxuICAgICAgYm91bmRhcnkgPSBvcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5ID0gb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeSA9IG9wdGlvbnMuYWx0Qm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRmbGlwVmFyaWF0aW8gPSBvcHRpb25zLmZsaXBWYXJpYXRpb25zLFxuICAgICAgZmxpcFZhcmlhdGlvbnMgPSBfb3B0aW9ucyRmbGlwVmFyaWF0aW8gPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRmbGlwVmFyaWF0aW8sXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHMgPSBvcHRpb25zLmFsbG93ZWRBdXRvUGxhY2VtZW50cztcbiAgdmFyIHByZWZlcnJlZFBsYWNlbWVudCA9IHN0YXRlLm9wdGlvbnMucGxhY2VtZW50O1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocHJlZmVycmVkUGxhY2VtZW50KTtcbiAgdmFyIGlzQmFzZVBsYWNlbWVudCA9IGJhc2VQbGFjZW1lbnQgPT09IHByZWZlcnJlZFBsYWNlbWVudDtcbiAgdmFyIGZhbGxiYWNrUGxhY2VtZW50cyA9IHNwZWNpZmllZEZhbGxiYWNrUGxhY2VtZW50cyB8fCAoaXNCYXNlUGxhY2VtZW50IHx8ICFmbGlwVmFyaWF0aW9ucyA/IFtnZXRPcHBvc2l0ZVBsYWNlbWVudChwcmVmZXJyZWRQbGFjZW1lbnQpXSA6IGdldEV4cGFuZGVkRmFsbGJhY2tQbGFjZW1lbnRzKHByZWZlcnJlZFBsYWNlbWVudCkpO1xuICB2YXIgcGxhY2VtZW50cyA9IFtwcmVmZXJyZWRQbGFjZW1lbnRdLmNvbmNhdChmYWxsYmFja1BsYWNlbWVudHMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gYWNjLmNvbmNhdChnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCkgPT09IGF1dG8gPyBjb21wdXRlQXV0b1BsYWNlbWVudChzdGF0ZSwge1xuICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQsXG4gICAgICBib3VuZGFyeTogYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmc6IHBhZGRpbmcsXG4gICAgICBmbGlwVmFyaWF0aW9uczogZmxpcFZhcmlhdGlvbnMsXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHM6IGFsbG93ZWRBdXRvUGxhY2VtZW50c1xuICAgIH0pIDogcGxhY2VtZW50KTtcbiAgfSwgW10pO1xuICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciBjaGVja3NNYXAgPSBuZXcgTWFwKCk7XG4gIHZhciBtYWtlRmFsbGJhY2tDaGVja3MgPSB0cnVlO1xuICB2YXIgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50c1swXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWNlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcGxhY2VtZW50ID0gcGxhY2VtZW50c1tpXTtcblxuICAgIHZhciBfYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KTtcblxuICAgIHZhciBpc1N0YXJ0VmFyaWF0aW9uID0gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkgPT09IHN0YXJ0O1xuICAgIHZhciBpc1ZlcnRpY2FsID0gW3RvcCwgYm90dG9tXS5pbmRleE9mKF9iYXNlUGxhY2VtZW50KSA+PSAwO1xuICAgIHZhciBsZW4gPSBpc1ZlcnRpY2FsID8gJ3dpZHRoJyA6ICdoZWlnaHQnO1xuICAgIHZhciBvdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgYWx0Qm91bmRhcnk6IGFsdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZ1xuICAgIH0pO1xuICAgIHZhciBtYWluVmFyaWF0aW9uU2lkZSA9IGlzVmVydGljYWwgPyBpc1N0YXJ0VmFyaWF0aW9uID8gcmlnaHQgOiBsZWZ0IDogaXNTdGFydFZhcmlhdGlvbiA/IGJvdHRvbSA6IHRvcDtcblxuICAgIGlmIChyZWZlcmVuY2VSZWN0W2xlbl0gPiBwb3BwZXJSZWN0W2xlbl0pIHtcbiAgICAgIG1haW5WYXJpYXRpb25TaWRlID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQobWFpblZhcmlhdGlvblNpZGUpO1xuICAgIH1cblxuICAgIHZhciBhbHRWYXJpYXRpb25TaWRlID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQobWFpblZhcmlhdGlvblNpZGUpO1xuICAgIHZhciBjaGVja3MgPSBbXTtcblxuICAgIGlmIChjaGVja01haW5BeGlzKSB7XG4gICAgICBjaGVja3MucHVzaChvdmVyZmxvd1tfYmFzZVBsYWNlbWVudF0gPD0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrQWx0QXhpcykge1xuICAgICAgY2hlY2tzLnB1c2gob3ZlcmZsb3dbbWFpblZhcmlhdGlvblNpZGVdIDw9IDAsIG92ZXJmbG93W2FsdFZhcmlhdGlvblNpZGVdIDw9IDApO1xuICAgIH1cblxuICAgIGlmIChjaGVja3MuZXZlcnkoZnVuY3Rpb24gKGNoZWNrKSB7XG4gICAgICByZXR1cm4gY2hlY2s7XG4gICAgfSkpIHtcbiAgICAgIGZpcnN0Rml0dGluZ1BsYWNlbWVudCA9IHBsYWNlbWVudDtcbiAgICAgIG1ha2VGYWxsYmFja0NoZWNrcyA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2hlY2tzTWFwLnNldChwbGFjZW1lbnQsIGNoZWNrcyk7XG4gIH1cblxuICBpZiAobWFrZUZhbGxiYWNrQ2hlY2tzKSB7XG4gICAgLy8gYDJgIG1heSBiZSBkZXNpcmVkIGluIHNvbWUgY2FzZXMgXHUyMDEzIHJlc2VhcmNoIGxhdGVyXG4gICAgdmFyIG51bWJlck9mQ2hlY2tzID0gZmxpcFZhcmlhdGlvbnMgPyAzIDogMTtcblxuICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKF9pKSB7XG4gICAgICB2YXIgZml0dGluZ1BsYWNlbWVudCA9IHBsYWNlbWVudHMuZmluZChmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgICAgIHZhciBjaGVja3MgPSBjaGVja3NNYXAuZ2V0KHBsYWNlbWVudCk7XG5cbiAgICAgICAgaWYgKGNoZWNrcykge1xuICAgICAgICAgIHJldHVybiBjaGVja3Muc2xpY2UoMCwgX2kpLmV2ZXJ5KGZ1bmN0aW9uIChjaGVjaykge1xuICAgICAgICAgICAgcmV0dXJuIGNoZWNrO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKGZpdHRpbmdQbGFjZW1lbnQpIHtcbiAgICAgICAgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gZml0dGluZ1BsYWNlbWVudDtcbiAgICAgICAgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZm9yICh2YXIgX2kgPSBudW1iZXJPZkNoZWNrczsgX2kgPiAwOyBfaS0tKSB7XG4gICAgICB2YXIgX3JldCA9IF9sb29wKF9pKTtcblxuICAgICAgaWYgKF9yZXQgPT09IFwiYnJlYWtcIikgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLnBsYWNlbWVudCAhPT0gZmlyc3RGaXR0aW5nUGxhY2VtZW50KSB7XG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXS5fc2tpcCA9IHRydWU7XG4gICAgc3RhdGUucGxhY2VtZW50ID0gZmlyc3RGaXR0aW5nUGxhY2VtZW50O1xuICAgIHN0YXRlLnJlc2V0ID0gdHJ1ZTtcbiAgfVxufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnZmxpcCcsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIGZuOiBmbGlwLFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ29mZnNldCddLFxuICBkYXRhOiB7XG4gICAgX3NraXA6IGZhbHNlXG4gIH1cbn07IiwgImltcG9ydCB7IHRvcCwgYm90dG9tLCBsZWZ0LCByaWdodCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuLi91dGlscy9kZXRlY3RPdmVyZmxvdy5qc1wiO1xuXG5mdW5jdGlvbiBnZXRTaWRlT2Zmc2V0cyhvdmVyZmxvdywgcmVjdCwgcHJldmVudGVkT2Zmc2V0cykge1xuICBpZiAocHJldmVudGVkT2Zmc2V0cyA9PT0gdm9pZCAwKSB7XG4gICAgcHJldmVudGVkT2Zmc2V0cyA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9wOiBvdmVyZmxvdy50b3AgLSByZWN0LmhlaWdodCAtIHByZXZlbnRlZE9mZnNldHMueSxcbiAgICByaWdodDogb3ZlcmZsb3cucmlnaHQgLSByZWN0LndpZHRoICsgcHJldmVudGVkT2Zmc2V0cy54LFxuICAgIGJvdHRvbTogb3ZlcmZsb3cuYm90dG9tIC0gcmVjdC5oZWlnaHQgKyBwcmV2ZW50ZWRPZmZzZXRzLnksXG4gICAgbGVmdDogb3ZlcmZsb3cubGVmdCAtIHJlY3Qud2lkdGggLSBwcmV2ZW50ZWRPZmZzZXRzLnhcbiAgfTtcbn1cblxuZnVuY3Rpb24gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKG92ZXJmbG93KSB7XG4gIHJldHVybiBbdG9wLCByaWdodCwgYm90dG9tLCBsZWZ0XS5zb21lKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgcmV0dXJuIG92ZXJmbG93W3NpZGVdID49IDA7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoaWRlKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIHByZXZlbnRlZE9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnByZXZlbnRPdmVyZmxvdztcbiAgdmFyIHJlZmVyZW5jZU92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICBlbGVtZW50Q29udGV4dDogJ3JlZmVyZW5jZSdcbiAgfSk7XG4gIHZhciBwb3BwZXJBbHRPdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgYWx0Qm91bmRhcnk6IHRydWVcbiAgfSk7XG4gIHZhciByZWZlcmVuY2VDbGlwcGluZ09mZnNldHMgPSBnZXRTaWRlT2Zmc2V0cyhyZWZlcmVuY2VPdmVyZmxvdywgcmVmZXJlbmNlUmVjdCk7XG4gIHZhciBwb3BwZXJFc2NhcGVPZmZzZXRzID0gZ2V0U2lkZU9mZnNldHMocG9wcGVyQWx0T3ZlcmZsb3csIHBvcHBlclJlY3QsIHByZXZlbnRlZE9mZnNldHMpO1xuICB2YXIgaXNSZWZlcmVuY2VIaWRkZW4gPSBpc0FueVNpZGVGdWxseUNsaXBwZWQocmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzKTtcbiAgdmFyIGhhc1BvcHBlckVzY2FwZWQgPSBpc0FueVNpZGVGdWxseUNsaXBwZWQocG9wcGVyRXNjYXBlT2Zmc2V0cyk7XG4gIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSB7XG4gICAgcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzOiByZWZlcmVuY2VDbGlwcGluZ09mZnNldHMsXG4gICAgcG9wcGVyRXNjYXBlT2Zmc2V0czogcG9wcGVyRXNjYXBlT2Zmc2V0cyxcbiAgICBpc1JlZmVyZW5jZUhpZGRlbjogaXNSZWZlcmVuY2VIaWRkZW4sXG4gICAgaGFzUG9wcGVyRXNjYXBlZDogaGFzUG9wcGVyRXNjYXBlZFxuICB9O1xuICBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyLCB7XG4gICAgJ2RhdGEtcG9wcGVyLXJlZmVyZW5jZS1oaWRkZW4nOiBpc1JlZmVyZW5jZUhpZGRlbixcbiAgICAnZGF0YS1wb3BwZXItZXNjYXBlZCc6IGhhc1BvcHBlckVzY2FwZWRcbiAgfSk7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdoaWRlJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgcmVxdWlyZXNJZkV4aXN0czogWydwcmV2ZW50T3ZlcmZsb3cnXSxcbiAgZm46IGhpZGVcbn07IiwgImltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBwbGFjZW1lbnRzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RhbmNlQW5kU2tpZGRpbmdUb1hZKHBsYWNlbWVudCwgcmVjdHMsIG9mZnNldCkge1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgdmFyIGludmVydERpc3RhbmNlID0gW2xlZnQsIHRvcF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSA+PSAwID8gLTEgOiAxO1xuXG4gIHZhciBfcmVmID0gdHlwZW9mIG9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IG9mZnNldChPYmplY3QuYXNzaWduKHt9LCByZWN0cywge1xuICAgIHBsYWNlbWVudDogcGxhY2VtZW50XG4gIH0pKSA6IG9mZnNldCxcbiAgICAgIHNraWRkaW5nID0gX3JlZlswXSxcbiAgICAgIGRpc3RhbmNlID0gX3JlZlsxXTtcblxuICBza2lkZGluZyA9IHNraWRkaW5nIHx8IDA7XG4gIGRpc3RhbmNlID0gKGRpc3RhbmNlIHx8IDApICogaW52ZXJ0RGlzdGFuY2U7XG4gIHJldHVybiBbbGVmdCwgcmlnaHRdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMCA/IHtcbiAgICB4OiBkaXN0YW5jZSxcbiAgICB5OiBza2lkZGluZ1xuICB9IDoge1xuICAgIHg6IHNraWRkaW5nLFxuICAgIHk6IGRpc3RhbmNlXG4gIH07XG59XG5cbmZ1bmN0aW9uIG9mZnNldChfcmVmMikge1xuICB2YXIgc3RhdGUgPSBfcmVmMi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmMi5vcHRpb25zLFxuICAgICAgbmFtZSA9IF9yZWYyLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRvZmZzZXQgPSBvcHRpb25zLm9mZnNldCxcbiAgICAgIG9mZnNldCA9IF9vcHRpb25zJG9mZnNldCA9PT0gdm9pZCAwID8gWzAsIDBdIDogX29wdGlvbnMkb2Zmc2V0O1xuICB2YXIgZGF0YSA9IHBsYWNlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIGFjY1twbGFjZW1lbnRdID0gZGlzdGFuY2VBbmRTa2lkZGluZ1RvWFkocGxhY2VtZW50LCBzdGF0ZS5yZWN0cywgb2Zmc2V0KTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG4gIHZhciBfZGF0YSRzdGF0ZSRwbGFjZW1lbnQgPSBkYXRhW3N0YXRlLnBsYWNlbWVudF0sXG4gICAgICB4ID0gX2RhdGEkc3RhdGUkcGxhY2VtZW50LngsXG4gICAgICB5ID0gX2RhdGEkc3RhdGUkcGxhY2VtZW50Lnk7XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyAhPSBudWxsKSB7XG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLnggKz0geDtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMueSArPSB5O1xuICB9XG5cbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGRhdGE7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdvZmZzZXQnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gIGZuOiBvZmZzZXRcbn07IiwgImltcG9ydCBjb21wdXRlT2Zmc2V0cyBmcm9tIFwiLi4vdXRpbHMvY29tcHV0ZU9mZnNldHMuanNcIjtcblxuZnVuY3Rpb24gcG9wcGVyT2Zmc2V0cyhfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuICAvLyBPZmZzZXRzIGFyZSB0aGUgYWN0dWFsIHBvc2l0aW9uIHRoZSBwb3BwZXIgbmVlZHMgdG8gaGF2ZSB0byBiZVxuICAvLyBwcm9wZXJseSBwb3NpdGlvbmVkIG5lYXIgaXRzIHJlZmVyZW5jZSBlbGVtZW50XG4gIC8vIFRoaXMgaXMgdGhlIG1vc3QgYmFzaWMgcGxhY2VtZW50LCBhbmQgd2lsbCBiZSBhZGp1c3RlZCBieVxuICAvLyB0aGUgbW9kaWZpZXJzIGluIHRoZSBuZXh0IHN0ZXBcbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGNvbXB1dGVPZmZzZXRzKHtcbiAgICByZWZlcmVuY2U6IHN0YXRlLnJlY3RzLnJlZmVyZW5jZSxcbiAgICBlbGVtZW50OiBzdGF0ZS5yZWN0cy5wb3BwZXIsXG4gICAgc3RyYXRlZ3k6ICdhYnNvbHV0ZScsXG4gICAgcGxhY2VtZW50OiBzdGF0ZS5wbGFjZW1lbnRcbiAgfSk7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdwb3BwZXJPZmZzZXRzJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdyZWFkJyxcbiAgZm46IHBvcHBlck9mZnNldHMsXG4gIGRhdGE6IHt9XG59OyIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRBbHRBeGlzKGF4aXMpIHtcbiAgcmV0dXJuIGF4aXMgPT09ICd4JyA/ICd5JyA6ICd4Jztcbn0iLCAiaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCBzdGFydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldEFsdEF4aXMgZnJvbSBcIi4uL3V0aWxzL2dldEFsdEF4aXMuanNcIjtcbmltcG9ydCB7IHdpdGhpbiwgd2l0aGluTWF4Q2xhbXAgfSBmcm9tIFwiLi4vdXRpbHMvd2l0aGluLmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldExheW91dFJlY3QuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4uL3V0aWxzL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IGdldEZyZXNoU2lkZU9iamVjdCBmcm9tIFwiLi4vdXRpbHMvZ2V0RnJlc2hTaWRlT2JqZWN0LmpzXCI7XG5pbXBvcnQgeyBtaW4gYXMgbWF0aE1pbiwgbWF4IGFzIG1hdGhNYXggfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuXG5mdW5jdGlvbiBwcmV2ZW50T3ZlcmZsb3coX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRtYWluQXhpcyA9IG9wdGlvbnMubWFpbkF4aXMsXG4gICAgICBjaGVja01haW5BeGlzID0gX29wdGlvbnMkbWFpbkF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRtYWluQXhpcyxcbiAgICAgIF9vcHRpb25zJGFsdEF4aXMgPSBvcHRpb25zLmFsdEF4aXMsXG4gICAgICBjaGVja0FsdEF4aXMgPSBfb3B0aW9ucyRhbHRBeGlzID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBfb3B0aW9ucyR0ZXRoZXIgPSBvcHRpb25zLnRldGhlcixcbiAgICAgIHRldGhlciA9IF9vcHRpb25zJHRldGhlciA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHRldGhlcixcbiAgICAgIF9vcHRpb25zJHRldGhlck9mZnNldCA9IG9wdGlvbnMudGV0aGVyT2Zmc2V0LFxuICAgICAgdGV0aGVyT2Zmc2V0ID0gX29wdGlvbnMkdGV0aGVyT2Zmc2V0ID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkdGV0aGVyT2Zmc2V0O1xuICB2YXIgb3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICBwYWRkaW5nOiBwYWRkaW5nLFxuICAgIGFsdEJvdW5kYXJ5OiBhbHRCb3VuZGFyeVxuICB9KTtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCk7XG4gIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIGlzQmFzZVBsYWNlbWVudCA9ICF2YXJpYXRpb247XG4gIHZhciBtYWluQXhpcyA9IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KTtcbiAgdmFyIGFsdEF4aXMgPSBnZXRBbHRBeGlzKG1haW5BeGlzKTtcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHM7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIHRldGhlck9mZnNldFZhbHVlID0gdHlwZW9mIHRldGhlck9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IHRldGhlck9mZnNldChPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZWN0cywge1xuICAgIHBsYWNlbWVudDogc3RhdGUucGxhY2VtZW50XG4gIH0pKSA6IHRldGhlck9mZnNldDtcbiAgdmFyIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZSA9IHR5cGVvZiB0ZXRoZXJPZmZzZXRWYWx1ZSA9PT0gJ251bWJlcicgPyB7XG4gICAgbWFpbkF4aXM6IHRldGhlck9mZnNldFZhbHVlLFxuICAgIGFsdEF4aXM6IHRldGhlck9mZnNldFZhbHVlXG4gIH0gOiBPYmplY3QuYXNzaWduKHtcbiAgICBtYWluQXhpczogMCxcbiAgICBhbHRBeGlzOiAwXG4gIH0sIHRldGhlck9mZnNldFZhbHVlKTtcbiAgdmFyIG9mZnNldE1vZGlmaWVyU3RhdGUgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldCA/IHN0YXRlLm1vZGlmaWVyc0RhdGEub2Zmc2V0W3N0YXRlLnBsYWNlbWVudF0gOiBudWxsO1xuICB2YXIgZGF0YSA9IHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcblxuICBpZiAoIXBvcHBlck9mZnNldHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY2hlY2tNYWluQXhpcykge1xuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQ7XG5cbiAgICB2YXIgbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3knID8gdG9wIDogbGVmdDtcbiAgICB2YXIgYWx0U2lkZSA9IG1haW5BeGlzID09PSAneScgPyBib3R0b20gOiByaWdodDtcbiAgICB2YXIgbGVuID0gbWFpbkF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICB2YXIgb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1ttYWluQXhpc107XG4gICAgdmFyIG1pbiA9IG9mZnNldCArIG92ZXJmbG93W21haW5TaWRlXTtcbiAgICB2YXIgbWF4ID0gb2Zmc2V0IC0gb3ZlcmZsb3dbYWx0U2lkZV07XG4gICAgdmFyIGFkZGl0aXZlID0gdGV0aGVyID8gLXBvcHBlclJlY3RbbGVuXSAvIDIgOiAwO1xuICAgIHZhciBtaW5MZW4gPSB2YXJpYXRpb24gPT09IHN0YXJ0ID8gcmVmZXJlbmNlUmVjdFtsZW5dIDogcG9wcGVyUmVjdFtsZW5dO1xuICAgIHZhciBtYXhMZW4gPSB2YXJpYXRpb24gPT09IHN0YXJ0ID8gLXBvcHBlclJlY3RbbGVuXSA6IC1yZWZlcmVuY2VSZWN0W2xlbl07IC8vIFdlIG5lZWQgdG8gaW5jbHVkZSB0aGUgYXJyb3cgaW4gdGhlIGNhbGN1bGF0aW9uIHNvIHRoZSBhcnJvdyBkb2Vzbid0IGdvXG4gICAgLy8gb3V0c2lkZSB0aGUgcmVmZXJlbmNlIGJvdW5kc1xuXG4gICAgdmFyIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93O1xuICAgIHZhciBhcnJvd1JlY3QgPSB0ZXRoZXIgJiYgYXJyb3dFbGVtZW50ID8gZ2V0TGF5b3V0UmVjdChhcnJvd0VsZW1lbnQpIDoge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDBcbiAgICB9O1xuICAgIHZhciBhcnJvd1BhZGRpbmdPYmplY3QgPSBzdGF0ZS5tb2RpZmllcnNEYXRhWydhcnJvdyNwZXJzaXN0ZW50J10gPyBzdGF0ZS5tb2RpZmllcnNEYXRhWydhcnJvdyNwZXJzaXN0ZW50J10ucGFkZGluZyA6IGdldEZyZXNoU2lkZU9iamVjdCgpO1xuICAgIHZhciBhcnJvd1BhZGRpbmdNaW4gPSBhcnJvd1BhZGRpbmdPYmplY3RbbWFpblNpZGVdO1xuICAgIHZhciBhcnJvd1BhZGRpbmdNYXggPSBhcnJvd1BhZGRpbmdPYmplY3RbYWx0U2lkZV07IC8vIElmIHRoZSByZWZlcmVuY2UgbGVuZ3RoIGlzIHNtYWxsZXIgdGhhbiB0aGUgYXJyb3cgbGVuZ3RoLCB3ZSBkb24ndCB3YW50XG4gICAgLy8gdG8gaW5jbHVkZSBpdHMgZnVsbCBzaXplIGluIHRoZSBjYWxjdWxhdGlvbi4gSWYgdGhlIHJlZmVyZW5jZSBpcyBzbWFsbFxuICAgIC8vIGFuZCBuZWFyIHRoZSBlZGdlIG9mIGEgYm91bmRhcnksIHRoZSBwb3BwZXIgY2FuIG92ZXJmbG93IGV2ZW4gaWYgdGhlXG4gICAgLy8gcmVmZXJlbmNlIGlzIG5vdCBvdmVyZmxvd2luZyBhcyB3ZWxsIChlLmcuIHZpcnR1YWwgZWxlbWVudHMgd2l0aCBub1xuICAgIC8vIHdpZHRoIG9yIGhlaWdodClcblxuICAgIHZhciBhcnJvd0xlbiA9IHdpdGhpbigwLCByZWZlcmVuY2VSZWN0W2xlbl0sIGFycm93UmVjdFtsZW5dKTtcbiAgICB2YXIgbWluT2Zmc2V0ID0gaXNCYXNlUGxhY2VtZW50ID8gcmVmZXJlbmNlUmVjdFtsZW5dIC8gMiAtIGFkZGl0aXZlIC0gYXJyb3dMZW4gLSBhcnJvd1BhZGRpbmdNaW4gLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXMgOiBtaW5MZW4gLSBhcnJvd0xlbiAtIGFycm93UGFkZGluZ01pbiAtIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5tYWluQXhpcztcbiAgICB2YXIgbWF4T2Zmc2V0ID0gaXNCYXNlUGxhY2VtZW50ID8gLXJlZmVyZW5jZVJlY3RbbGVuXSAvIDIgKyBhZGRpdGl2ZSArIGFycm93TGVuICsgYXJyb3dQYWRkaW5nTWF4ICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzIDogbWF4TGVuICsgYXJyb3dMZW4gKyBhcnJvd1BhZGRpbmdNYXggKyBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXM7XG4gICAgdmFyIGFycm93T2Zmc2V0UGFyZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3cgJiYgZ2V0T2Zmc2V0UGFyZW50KHN0YXRlLmVsZW1lbnRzLmFycm93KTtcbiAgICB2YXIgY2xpZW50T2Zmc2V0ID0gYXJyb3dPZmZzZXRQYXJlbnQgPyBtYWluQXhpcyA9PT0gJ3knID8gYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50VG9wIHx8IDAgOiBhcnJvd09mZnNldFBhcmVudC5jbGllbnRMZWZ0IHx8IDAgOiAwO1xuICAgIHZhciBvZmZzZXRNb2RpZmllclZhbHVlID0gKF9vZmZzZXRNb2RpZmllclN0YXRlJCA9IG9mZnNldE1vZGlmaWVyU3RhdGUgPT0gbnVsbCA/IHZvaWQgMCA6IG9mZnNldE1vZGlmaWVyU3RhdGVbbWFpbkF4aXNdKSAhPSBudWxsID8gX29mZnNldE1vZGlmaWVyU3RhdGUkIDogMDtcbiAgICB2YXIgdGV0aGVyTWluID0gb2Zmc2V0ICsgbWluT2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZSAtIGNsaWVudE9mZnNldDtcbiAgICB2YXIgdGV0aGVyTWF4ID0gb2Zmc2V0ICsgbWF4T2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZTtcbiAgICB2YXIgcHJldmVudGVkT2Zmc2V0ID0gd2l0aGluKHRldGhlciA/IG1hdGhNaW4obWluLCB0ZXRoZXJNaW4pIDogbWluLCBvZmZzZXQsIHRldGhlciA/IG1hdGhNYXgobWF4LCB0ZXRoZXJNYXgpIDogbWF4KTtcbiAgICBwb3BwZXJPZmZzZXRzW21haW5BeGlzXSA9IHByZXZlbnRlZE9mZnNldDtcbiAgICBkYXRhW21haW5BeGlzXSA9IHByZXZlbnRlZE9mZnNldCAtIG9mZnNldDtcbiAgfVxuXG4gIGlmIChjaGVja0FsdEF4aXMpIHtcbiAgICB2YXIgX29mZnNldE1vZGlmaWVyU3RhdGUkMjtcblxuICAgIHZhciBfbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3gnID8gdG9wIDogbGVmdDtcblxuICAgIHZhciBfYWx0U2lkZSA9IG1haW5BeGlzID09PSAneCcgPyBib3R0b20gOiByaWdodDtcblxuICAgIHZhciBfb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1thbHRBeGlzXTtcblxuICAgIHZhciBfbGVuID0gYWx0QXhpcyA9PT0gJ3knID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gICAgdmFyIF9taW4gPSBfb2Zmc2V0ICsgb3ZlcmZsb3dbX21haW5TaWRlXTtcblxuICAgIHZhciBfbWF4ID0gX29mZnNldCAtIG92ZXJmbG93W19hbHRTaWRlXTtcblxuICAgIHZhciBpc09yaWdpblNpZGUgPSBbdG9wLCBsZWZ0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpICE9PSAtMTtcblxuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJWYWx1ZSA9IChfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQyID0gb2Zmc2V0TW9kaWZpZXJTdGF0ZSA9PSBudWxsID8gdm9pZCAwIDogb2Zmc2V0TW9kaWZpZXJTdGF0ZVthbHRBeGlzXSkgIT0gbnVsbCA/IF9vZmZzZXRNb2RpZmllclN0YXRlJDIgOiAwO1xuXG4gICAgdmFyIF90ZXRoZXJNaW4gPSBpc09yaWdpblNpZGUgPyBfbWluIDogX29mZnNldCAtIHJlZmVyZW5jZVJlY3RbX2xlbl0gLSBwb3BwZXJSZWN0W19sZW5dIC0gX29mZnNldE1vZGlmaWVyVmFsdWUgKyBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUuYWx0QXhpcztcblxuICAgIHZhciBfdGV0aGVyTWF4ID0gaXNPcmlnaW5TaWRlID8gX29mZnNldCArIHJlZmVyZW5jZVJlY3RbX2xlbl0gKyBwb3BwZXJSZWN0W19sZW5dIC0gX29mZnNldE1vZGlmaWVyVmFsdWUgLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUuYWx0QXhpcyA6IF9tYXg7XG5cbiAgICB2YXIgX3ByZXZlbnRlZE9mZnNldCA9IHRldGhlciAmJiBpc09yaWdpblNpZGUgPyB3aXRoaW5NYXhDbGFtcChfdGV0aGVyTWluLCBfb2Zmc2V0LCBfdGV0aGVyTWF4KSA6IHdpdGhpbih0ZXRoZXIgPyBfdGV0aGVyTWluIDogX21pbiwgX29mZnNldCwgdGV0aGVyID8gX3RldGhlck1heCA6IF9tYXgpO1xuXG4gICAgcG9wcGVyT2Zmc2V0c1thbHRBeGlzXSA9IF9wcmV2ZW50ZWRPZmZzZXQ7XG4gICAgZGF0YVthbHRBeGlzXSA9IF9wcmV2ZW50ZWRPZmZzZXQgLSBfb2Zmc2V0O1xuICB9XG5cbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGRhdGE7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdwcmV2ZW50T3ZlcmZsb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogcHJldmVudE92ZXJmbG93LFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ29mZnNldCddXG59OyIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRIVE1MRWxlbWVudFNjcm9sbChlbGVtZW50KSB7XG4gIHJldHVybiB7XG4gICAgc2Nyb2xsTGVmdDogZWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgIHNjcm9sbFRvcDogZWxlbWVudC5zY3JvbGxUb3BcbiAgfTtcbn0iLCAiaW1wb3J0IGdldFdpbmRvd1Njcm9sbCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGwuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGdldEhUTUxFbGVtZW50U2Nyb2xsIGZyb20gXCIuL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlU2Nyb2xsKG5vZGUpIHtcbiAgaWYgKG5vZGUgPT09IGdldFdpbmRvdyhub2RlKSB8fCAhaXNIVE1MRWxlbWVudChub2RlKSkge1xuICAgIHJldHVybiBnZXRXaW5kb3dTY3JvbGwobm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50U2Nyb2xsKG5vZGUpO1xuICB9XG59IiwgImltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZVNjcm9sbCBmcm9tIFwiLi9nZXROb2RlU2Nyb2xsLmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGlzU2Nyb2xsUGFyZW50IGZyb20gXCIuL2lzU2Nyb2xsUGFyZW50LmpzXCI7XG5pbXBvcnQgeyByb3VuZCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7XG5cbmZ1bmN0aW9uIGlzRWxlbWVudFNjYWxlZChlbGVtZW50KSB7XG4gIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHNjYWxlWCA9IHJvdW5kKHJlY3Qud2lkdGgpIC8gZWxlbWVudC5vZmZzZXRXaWR0aCB8fCAxO1xuICB2YXIgc2NhbGVZID0gcm91bmQocmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMTtcbiAgcmV0dXJuIHNjYWxlWCAhPT0gMSB8fCBzY2FsZVkgIT09IDE7XG59IC8vIFJldHVybnMgdGhlIGNvbXBvc2l0ZSByZWN0IG9mIGFuIGVsZW1lbnQgcmVsYXRpdmUgdG8gaXRzIG9mZnNldFBhcmVudC5cbi8vIENvbXBvc2l0ZSBtZWFucyBpdCB0YWtlcyBpbnRvIGFjY291bnQgdHJhbnNmb3JtcyBhcyB3ZWxsIGFzIGxheW91dC5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wb3NpdGVSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnQsIGlzRml4ZWQpIHtcbiAgaWYgKGlzRml4ZWQgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBpc09mZnNldFBhcmVudEFuRWxlbWVudCA9IGlzSFRNTEVsZW1lbnQob2Zmc2V0UGFyZW50KTtcbiAgdmFyIG9mZnNldFBhcmVudElzU2NhbGVkID0gaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpICYmIGlzRWxlbWVudFNjYWxlZChvZmZzZXRQYXJlbnQpO1xuICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KG9mZnNldFBhcmVudCk7XG4gIHZhciByZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnRJc1NjYWxlZCwgaXNGaXhlZCk7XG4gIHZhciBzY3JvbGwgPSB7XG4gICAgc2Nyb2xsTGVmdDogMCxcbiAgICBzY3JvbGxUb3A6IDBcbiAgfTtcbiAgdmFyIG9mZnNldHMgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG5cbiAgaWYgKGlzT2Zmc2V0UGFyZW50QW5FbGVtZW50IHx8ICFpc09mZnNldFBhcmVudEFuRWxlbWVudCAmJiAhaXNGaXhlZCkge1xuICAgIGlmIChnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpICE9PSAnYm9keScgfHwgLy8gaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMDc4XG4gICAgaXNTY3JvbGxQYXJlbnQoZG9jdW1lbnRFbGVtZW50KSkge1xuICAgICAgc2Nyb2xsID0gZ2V0Tm9kZVNjcm9sbChvZmZzZXRQYXJlbnQpO1xuICAgIH1cblxuICAgIGlmIChpc0hUTUxFbGVtZW50KG9mZnNldFBhcmVudCkpIHtcbiAgICAgIG9mZnNldHMgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qob2Zmc2V0UGFyZW50LCB0cnVlKTtcbiAgICAgIG9mZnNldHMueCArPSBvZmZzZXRQYXJlbnQuY2xpZW50TGVmdDtcbiAgICAgIG9mZnNldHMueSArPSBvZmZzZXRQYXJlbnQuY2xpZW50VG9wO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICBvZmZzZXRzLnggPSBnZXRXaW5kb3dTY3JvbGxCYXJYKGRvY3VtZW50RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB4OiByZWN0LmxlZnQgKyBzY3JvbGwuc2Nyb2xsTGVmdCAtIG9mZnNldHMueCxcbiAgICB5OiByZWN0LnRvcCArIHNjcm9sbC5zY3JvbGxUb3AgLSBvZmZzZXRzLnksXG4gICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiByZWN0LmhlaWdodFxuICB9O1xufSIsICJpbXBvcnQgeyBtb2RpZmllclBoYXNlcyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiOyAvLyBzb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ5ODc1MjU1XG5cbmZ1bmN0aW9uIG9yZGVyKG1vZGlmaWVycykge1xuICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICB2YXIgdmlzaXRlZCA9IG5ldyBTZXQoKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBtYXAuc2V0KG1vZGlmaWVyLm5hbWUsIG1vZGlmaWVyKTtcbiAgfSk7IC8vIE9uIHZpc2l0aW5nIG9iamVjdCwgY2hlY2sgZm9yIGl0cyBkZXBlbmRlbmNpZXMgYW5kIHZpc2l0IHRoZW0gcmVjdXJzaXZlbHlcblxuICBmdW5jdGlvbiBzb3J0KG1vZGlmaWVyKSB7XG4gICAgdmlzaXRlZC5hZGQobW9kaWZpZXIubmFtZSk7XG4gICAgdmFyIHJlcXVpcmVzID0gW10uY29uY2F0KG1vZGlmaWVyLnJlcXVpcmVzIHx8IFtdLCBtb2RpZmllci5yZXF1aXJlc0lmRXhpc3RzIHx8IFtdKTtcbiAgICByZXF1aXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChkZXApIHtcbiAgICAgIGlmICghdmlzaXRlZC5oYXMoZGVwKSkge1xuICAgICAgICB2YXIgZGVwTW9kaWZpZXIgPSBtYXAuZ2V0KGRlcCk7XG5cbiAgICAgICAgaWYgKGRlcE1vZGlmaWVyKSB7XG4gICAgICAgICAgc29ydChkZXBNb2RpZmllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXN1bHQucHVzaChtb2RpZmllcik7XG4gIH1cblxuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBpZiAoIXZpc2l0ZWQuaGFzKG1vZGlmaWVyLm5hbWUpKSB7XG4gICAgICAvLyBjaGVjayBmb3IgdmlzaXRlZCBvYmplY3RcbiAgICAgIHNvcnQobW9kaWZpZXIpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9yZGVyTW9kaWZpZXJzKG1vZGlmaWVycykge1xuICAvLyBvcmRlciBiYXNlZCBvbiBkZXBlbmRlbmNpZXNcbiAgdmFyIG9yZGVyZWRNb2RpZmllcnMgPSBvcmRlcihtb2RpZmllcnMpOyAvLyBvcmRlciBiYXNlZCBvbiBwaGFzZVxuXG4gIHJldHVybiBtb2RpZmllclBoYXNlcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGhhc2UpIHtcbiAgICByZXR1cm4gYWNjLmNvbmNhdChvcmRlcmVkTW9kaWZpZXJzLmZpbHRlcihmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICAgIHJldHVybiBtb2RpZmllci5waGFzZSA9PT0gcGhhc2U7XG4gICAgfSkpO1xuICB9LCBbXSk7XG59IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlYm91bmNlKGZuKSB7XG4gIHZhciBwZW5kaW5nO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmICghcGVuZGluZykge1xuICAgICAgcGVuZGluZyA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHBlbmRpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgcmVzb2x2ZShmbigpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGVuZGluZztcbiAgfTtcbn0iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VCeU5hbWUobW9kaWZpZXJzKSB7XG4gIHZhciBtZXJnZWQgPSBtb2RpZmllcnMucmVkdWNlKGZ1bmN0aW9uIChtZXJnZWQsIGN1cnJlbnQpIHtcbiAgICB2YXIgZXhpc3RpbmcgPSBtZXJnZWRbY3VycmVudC5uYW1lXTtcbiAgICBtZXJnZWRbY3VycmVudC5uYW1lXSA9IGV4aXN0aW5nID8gT2JqZWN0LmFzc2lnbih7fSwgZXhpc3RpbmcsIGN1cnJlbnQsIHtcbiAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLm9wdGlvbnMsIGN1cnJlbnQub3B0aW9ucyksXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBleGlzdGluZy5kYXRhLCBjdXJyZW50LmRhdGEpXG4gICAgfSkgOiBjdXJyZW50O1xuICAgIHJldHVybiBtZXJnZWQ7XG4gIH0sIHt9KTsgLy8gSUUxMSBkb2VzIG5vdCBzdXBwb3J0IE9iamVjdC52YWx1ZXNcblxuICByZXR1cm4gT2JqZWN0LmtleXMobWVyZ2VkKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBtZXJnZWRba2V5XTtcbiAgfSk7XG59IiwgImltcG9ydCBnZXRDb21wb3NpdGVSZWN0IGZyb20gXCIuL2RvbS11dGlscy9nZXRDb21wb3NpdGVSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi9kb20tdXRpbHMvZ2V0TGF5b3V0UmVjdC5qc1wiO1xuaW1wb3J0IGxpc3RTY3JvbGxQYXJlbnRzIGZyb20gXCIuL2RvbS11dGlscy9saXN0U2Nyb2xsUGFyZW50cy5qc1wiO1xuaW1wb3J0IGdldE9mZnNldFBhcmVudCBmcm9tIFwiLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgb3JkZXJNb2RpZmllcnMgZnJvbSBcIi4vdXRpbHMvb3JkZXJNb2RpZmllcnMuanNcIjtcbmltcG9ydCBkZWJvdW5jZSBmcm9tIFwiLi91dGlscy9kZWJvdW5jZS5qc1wiO1xuaW1wb3J0IG1lcmdlQnlOYW1lIGZyb20gXCIuL3V0aWxzL21lcmdlQnlOYW1lLmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCB7IGlzRWxlbWVudCB9IGZyb20gXCIuL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7XG52YXIgREVGQVVMVF9PUFRJT05TID0ge1xuICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICBtb2RpZmllcnM6IFtdLFxuICBzdHJhdGVneTogJ2Fic29sdXRlJ1xufTtcblxuZnVuY3Rpb24gYXJlVmFsaWRFbGVtZW50cygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiAhYXJncy5zb21lKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuICEoZWxlbWVudCAmJiB0eXBlb2YgZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPT09ICdmdW5jdGlvbicpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHBlckdlbmVyYXRvcihnZW5lcmF0b3JPcHRpb25zKSB7XG4gIGlmIChnZW5lcmF0b3JPcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBnZW5lcmF0b3JPcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgX2dlbmVyYXRvck9wdGlvbnMgPSBnZW5lcmF0b3JPcHRpb25zLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmID0gX2dlbmVyYXRvck9wdGlvbnMuZGVmYXVsdE1vZGlmaWVycyxcbiAgICAgIGRlZmF1bHRNb2RpZmllcnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYgPT09IHZvaWQgMCA/IFtdIDogX2dlbmVyYXRvck9wdGlvbnMkZGVmLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmMiA9IF9nZW5lcmF0b3JPcHRpb25zLmRlZmF1bHRPcHRpb25zLFxuICAgICAgZGVmYXVsdE9wdGlvbnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyID09PSB2b2lkIDAgPyBERUZBVUxUX09QVElPTlMgOiBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyO1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlUG9wcGVyKHJlZmVyZW5jZSwgcG9wcGVyLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xuICAgIH1cblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgICBvcmRlcmVkTW9kaWZpZXJzOiBbXSxcbiAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgZGVmYXVsdE9wdGlvbnMpLFxuICAgICAgbW9kaWZpZXJzRGF0YToge30sXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICByZWZlcmVuY2U6IHJlZmVyZW5jZSxcbiAgICAgICAgcG9wcGVyOiBwb3BwZXJcbiAgICAgIH0sXG4gICAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9O1xuICAgIHZhciBlZmZlY3RDbGVhbnVwRm5zID0gW107XG4gICAgdmFyIGlzRGVzdHJveWVkID0gZmFsc2U7XG4gICAgdmFyIGluc3RhbmNlID0ge1xuICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgc2V0T3B0aW9uczogZnVuY3Rpb24gc2V0T3B0aW9ucyhzZXRPcHRpb25zQWN0aW9uKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIHNldE9wdGlvbnNBY3Rpb24gPT09ICdmdW5jdGlvbicgPyBzZXRPcHRpb25zQWN0aW9uKHN0YXRlLm9wdGlvbnMpIDogc2V0T3B0aW9uc0FjdGlvbjtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBzdGF0ZS5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIHN0YXRlLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBzdGF0ZS5zY3JvbGxQYXJlbnRzID0ge1xuICAgICAgICAgIHJlZmVyZW5jZTogaXNFbGVtZW50KHJlZmVyZW5jZSkgPyBsaXN0U2Nyb2xsUGFyZW50cyhyZWZlcmVuY2UpIDogcmVmZXJlbmNlLmNvbnRleHRFbGVtZW50ID8gbGlzdFNjcm9sbFBhcmVudHMocmVmZXJlbmNlLmNvbnRleHRFbGVtZW50KSA6IFtdLFxuICAgICAgICAgIHBvcHBlcjogbGlzdFNjcm9sbFBhcmVudHMocG9wcGVyKVxuICAgICAgICB9OyAvLyBPcmRlcnMgdGhlIG1vZGlmaWVycyBiYXNlZCBvbiB0aGVpciBkZXBlbmRlbmNpZXMgYW5kIGBwaGFzZWBcbiAgICAgICAgLy8gcHJvcGVydGllc1xuXG4gICAgICAgIHZhciBvcmRlcmVkTW9kaWZpZXJzID0gb3JkZXJNb2RpZmllcnMobWVyZ2VCeU5hbWUoW10uY29uY2F0KGRlZmF1bHRNb2RpZmllcnMsIHN0YXRlLm9wdGlvbnMubW9kaWZpZXJzKSkpOyAvLyBTdHJpcCBvdXQgZGlzYWJsZWQgbW9kaWZpZXJzXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycyA9IG9yZGVyZWRNb2RpZmllcnMuZmlsdGVyKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgcmV0dXJuIG0uZW5hYmxlZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJ1bk1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UudXBkYXRlKCk7XG4gICAgICB9LFxuICAgICAgLy8gU3luYyB1cGRhdGUgXHUyMDEzIGl0IHdpbGwgYWx3YXlzIGJlIGV4ZWN1dGVkLCBldmVuIGlmIG5vdCBuZWNlc3NhcnkuIFRoaXNcbiAgICAgIC8vIGlzIHVzZWZ1bCBmb3IgbG93IGZyZXF1ZW5jeSB1cGRhdGVzIHdoZXJlIHN5bmMgYmVoYXZpb3Igc2ltcGxpZmllcyB0aGVcbiAgICAgIC8vIGxvZ2ljLlxuICAgICAgLy8gRm9yIGhpZ2ggZnJlcXVlbmN5IHVwZGF0ZXMgKGUuZy4gYHJlc2l6ZWAgYW5kIGBzY3JvbGxgIGV2ZW50cyksIGFsd2F5c1xuICAgICAgLy8gcHJlZmVyIHRoZSBhc3luYyBQb3BwZXIjdXBkYXRlIG1ldGhvZFxuICAgICAgZm9yY2VVcGRhdGU6IGZ1bmN0aW9uIGZvcmNlVXBkYXRlKCkge1xuICAgICAgICBpZiAoaXNEZXN0cm95ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX3N0YXRlJGVsZW1lbnRzID0gc3RhdGUuZWxlbWVudHMsXG4gICAgICAgICAgICByZWZlcmVuY2UgPSBfc3RhdGUkZWxlbWVudHMucmVmZXJlbmNlLFxuICAgICAgICAgICAgcG9wcGVyID0gX3N0YXRlJGVsZW1lbnRzLnBvcHBlcjsgLy8gRG9uJ3QgcHJvY2VlZCBpZiBgcmVmZXJlbmNlYCBvciBgcG9wcGVyYCBhcmUgbm90IHZhbGlkIGVsZW1lbnRzXG4gICAgICAgIC8vIGFueW1vcmVcblxuICAgICAgICBpZiAoIWFyZVZhbGlkRWxlbWVudHMocmVmZXJlbmNlLCBwb3BwZXIpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIFN0b3JlIHRoZSByZWZlcmVuY2UgYW5kIHBvcHBlciByZWN0cyB0byBiZSByZWFkIGJ5IG1vZGlmaWVyc1xuXG5cbiAgICAgICAgc3RhdGUucmVjdHMgPSB7XG4gICAgICAgICAgcmVmZXJlbmNlOiBnZXRDb21wb3NpdGVSZWN0KHJlZmVyZW5jZSwgZ2V0T2Zmc2V0UGFyZW50KHBvcHBlciksIHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3kgPT09ICdmaXhlZCcpLFxuICAgICAgICAgIHBvcHBlcjogZ2V0TGF5b3V0UmVjdChwb3BwZXIpXG4gICAgICAgIH07IC8vIE1vZGlmaWVycyBoYXZlIHRoZSBhYmlsaXR5IHRvIHJlc2V0IHRoZSBjdXJyZW50IHVwZGF0ZSBjeWNsZS4gVGhlXG4gICAgICAgIC8vIG1vc3QgY29tbW9uIHVzZSBjYXNlIGZvciB0aGlzIGlzIHRoZSBgZmxpcGAgbW9kaWZpZXIgY2hhbmdpbmcgdGhlXG4gICAgICAgIC8vIHBsYWNlbWVudCwgd2hpY2ggdGhlbiBuZWVkcyB0byByZS1ydW4gYWxsIHRoZSBtb2RpZmllcnMsIGJlY2F1c2UgdGhlXG4gICAgICAgIC8vIGxvZ2ljIHdhcyBwcmV2aW91c2x5IHJhbiBmb3IgdGhlIHByZXZpb3VzIHBsYWNlbWVudCBhbmQgaXMgdGhlcmVmb3JlXG4gICAgICAgIC8vIHN0YWxlL2luY29ycmVjdFxuXG4gICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgIHN0YXRlLnBsYWNlbWVudCA9IHN0YXRlLm9wdGlvbnMucGxhY2VtZW50OyAvLyBPbiBlYWNoIHVwZGF0ZSBjeWNsZSwgdGhlIGBtb2RpZmllcnNEYXRhYCBwcm9wZXJ0eSBmb3IgZWFjaCBtb2RpZmllclxuICAgICAgICAvLyBpcyBmaWxsZWQgd2l0aCB0aGUgaW5pdGlhbCBkYXRhIHNwZWNpZmllZCBieSB0aGUgbW9kaWZpZXIuIFRoaXMgbWVhbnNcbiAgICAgICAgLy8gaXQgZG9lc24ndCBwZXJzaXN0IGFuZCBpcyBmcmVzaCBvbiBlYWNoIHVwZGF0ZS5cbiAgICAgICAgLy8gVG8gZW5zdXJlIHBlcnNpc3RlbnQgZGF0YSwgdXNlIGAke25hbWV9I3BlcnNpc3RlbnRgXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgICAgICAgIHJldHVybiBzdGF0ZS5tb2RpZmllcnNEYXRhW21vZGlmaWVyLm5hbWVdID0gT2JqZWN0LmFzc2lnbih7fSwgbW9kaWZpZXIuZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgIGlmIChzdGF0ZS5yZXNldCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc3RhdGUucmVzZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIGluZGV4ID0gLTE7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgX3N0YXRlJG9yZGVyZWRNb2RpZmllID0gc3RhdGUub3JkZXJlZE1vZGlmaWVyc1tpbmRleF0sXG4gICAgICAgICAgICAgIGZuID0gX3N0YXRlJG9yZGVyZWRNb2RpZmllLmZuLFxuICAgICAgICAgICAgICBfc3RhdGUkb3JkZXJlZE1vZGlmaWUyID0gX3N0YXRlJG9yZGVyZWRNb2RpZmllLm9wdGlvbnMsXG4gICAgICAgICAgICAgIF9vcHRpb25zID0gX3N0YXRlJG9yZGVyZWRNb2RpZmllMiA9PT0gdm9pZCAwID8ge30gOiBfc3RhdGUkb3JkZXJlZE1vZGlmaWUyLFxuICAgICAgICAgICAgICBuYW1lID0gX3N0YXRlJG9yZGVyZWRNb2RpZmllLm5hbWU7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IGZuKHtcbiAgICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgICBvcHRpb25zOiBfb3B0aW9ucyxcbiAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgaW5zdGFuY2U6IGluc3RhbmNlXG4gICAgICAgICAgICB9KSB8fCBzdGF0ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyBBc3luYyBhbmQgb3B0aW1pc3RpY2FsbHkgb3B0aW1pemVkIHVwZGF0ZSBcdTIwMTMgaXQgd2lsbCBub3QgYmUgZXhlY3V0ZWQgaWZcbiAgICAgIC8vIG5vdCBuZWNlc3NhcnkgKGRlYm91bmNlZCB0byBydW4gYXQgbW9zdCBvbmNlLXBlci10aWNrKVxuICAgICAgdXBkYXRlOiBkZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgIGluc3RhbmNlLmZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgcmVzb2x2ZShzdGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSksXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICBjbGVhbnVwTW9kaWZpZXJFZmZlY3RzKCk7XG4gICAgICAgIGlzRGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKCFhcmVWYWxpZEVsZW1lbnRzKHJlZmVyZW5jZSwgcG9wcGVyKSkge1xuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH1cblxuICAgIGluc3RhbmNlLnNldE9wdGlvbnMob3B0aW9ucykudGhlbihmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgIGlmICghaXNEZXN0cm95ZWQgJiYgb3B0aW9ucy5vbkZpcnN0VXBkYXRlKSB7XG4gICAgICAgIG9wdGlvbnMub25GaXJzdFVwZGF0ZShzdGF0ZSk7XG4gICAgICB9XG4gICAgfSk7IC8vIE1vZGlmaWVycyBoYXZlIHRoZSBhYmlsaXR5IHRvIGV4ZWN1dGUgYXJiaXRyYXJ5IGNvZGUgYmVmb3JlIHRoZSBmaXJzdFxuICAgIC8vIHVwZGF0ZSBjeWNsZSBydW5zLiBUaGV5IHdpbGwgYmUgZXhlY3V0ZWQgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlIHVwZGF0ZVxuICAgIC8vIGN5Y2xlLiBUaGlzIGlzIHVzZWZ1bCB3aGVuIGEgbW9kaWZpZXIgYWRkcyBzb21lIHBlcnNpc3RlbnQgZGF0YSB0aGF0XG4gICAgLy8gb3RoZXIgbW9kaWZpZXJzIG5lZWQgdG8gdXNlLCBidXQgdGhlIG1vZGlmaWVyIGlzIHJ1biBhZnRlciB0aGUgZGVwZW5kZW50XG4gICAgLy8gb25lLlxuXG4gICAgZnVuY3Rpb24gcnVuTW9kaWZpZXJFZmZlY3RzKCkge1xuICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgIHZhciBuYW1lID0gX3JlZi5uYW1lLFxuICAgICAgICAgICAgX3JlZiRvcHRpb25zID0gX3JlZi5vcHRpb25zLFxuICAgICAgICAgICAgb3B0aW9ucyA9IF9yZWYkb3B0aW9ucyA9PT0gdm9pZCAwID8ge30gOiBfcmVmJG9wdGlvbnMsXG4gICAgICAgICAgICBlZmZlY3QgPSBfcmVmLmVmZmVjdDtcblxuICAgICAgICBpZiAodHlwZW9mIGVmZmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBjbGVhbnVwRm4gPSBlZmZlY3Qoe1xuICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHZhciBub29wRm4gPSBmdW5jdGlvbiBub29wRm4oKSB7fTtcblxuICAgICAgICAgIGVmZmVjdENsZWFudXBGbnMucHVzaChjbGVhbnVwRm4gfHwgbm9vcEZuKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpIHtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICB9KTtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMgPSBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG59XG5leHBvcnQgdmFyIGNyZWF0ZVBvcHBlciA9IC8qI19fUFVSRV9fKi9wb3BwZXJHZW5lcmF0b3IoKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBkZXRlY3RPdmVyZmxvdyB9OyIsICJpbXBvcnQgeyBwb3BwZXJHZW5lcmF0b3IsIGRldGVjdE92ZXJmbG93IH0gZnJvbSBcIi4vY3JlYXRlUG9wcGVyLmpzXCI7XG5pbXBvcnQgZXZlbnRMaXN0ZW5lcnMgZnJvbSBcIi4vbW9kaWZpZXJzL2V2ZW50TGlzdGVuZXJzLmpzXCI7XG5pbXBvcnQgcG9wcGVyT2Zmc2V0cyBmcm9tIFwiLi9tb2RpZmllcnMvcG9wcGVyT2Zmc2V0cy5qc1wiO1xuaW1wb3J0IGNvbXB1dGVTdHlsZXMgZnJvbSBcIi4vbW9kaWZpZXJzL2NvbXB1dGVTdHlsZXMuanNcIjtcbmltcG9ydCBhcHBseVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvYXBwbHlTdHlsZXMuanNcIjtcbnZhciBkZWZhdWx0TW9kaWZpZXJzID0gW2V2ZW50TGlzdGVuZXJzLCBwb3BwZXJPZmZzZXRzLCBjb21wdXRlU3R5bGVzLCBhcHBseVN0eWxlc107XG52YXIgY3JlYXRlUG9wcGVyID0gLyojX19QVVJFX18qL3BvcHBlckdlbmVyYXRvcih7XG4gIGRlZmF1bHRNb2RpZmllcnM6IGRlZmF1bHRNb2RpZmllcnNcbn0pOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciwgcG9wcGVyR2VuZXJhdG9yLCBkZWZhdWx0TW9kaWZpZXJzLCBkZXRlY3RPdmVyZmxvdyB9OyIsICJpbXBvcnQgeyBwb3BwZXJHZW5lcmF0b3IsIGRldGVjdE92ZXJmbG93IH0gZnJvbSBcIi4vY3JlYXRlUG9wcGVyLmpzXCI7XG5pbXBvcnQgZXZlbnRMaXN0ZW5lcnMgZnJvbSBcIi4vbW9kaWZpZXJzL2V2ZW50TGlzdGVuZXJzLmpzXCI7XG5pbXBvcnQgcG9wcGVyT2Zmc2V0cyBmcm9tIFwiLi9tb2RpZmllcnMvcG9wcGVyT2Zmc2V0cy5qc1wiO1xuaW1wb3J0IGNvbXB1dGVTdHlsZXMgZnJvbSBcIi4vbW9kaWZpZXJzL2NvbXB1dGVTdHlsZXMuanNcIjtcbmltcG9ydCBhcHBseVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvYXBwbHlTdHlsZXMuanNcIjtcbmltcG9ydCBvZmZzZXQgZnJvbSBcIi4vbW9kaWZpZXJzL29mZnNldC5qc1wiO1xuaW1wb3J0IGZsaXAgZnJvbSBcIi4vbW9kaWZpZXJzL2ZsaXAuanNcIjtcbmltcG9ydCBwcmV2ZW50T3ZlcmZsb3cgZnJvbSBcIi4vbW9kaWZpZXJzL3ByZXZlbnRPdmVyZmxvdy5qc1wiO1xuaW1wb3J0IGFycm93IGZyb20gXCIuL21vZGlmaWVycy9hcnJvdy5qc1wiO1xuaW1wb3J0IGhpZGUgZnJvbSBcIi4vbW9kaWZpZXJzL2hpZGUuanNcIjtcbnZhciBkZWZhdWx0TW9kaWZpZXJzID0gW2V2ZW50TGlzdGVuZXJzLCBwb3BwZXJPZmZzZXRzLCBjb21wdXRlU3R5bGVzLCBhcHBseVN0eWxlcywgb2Zmc2V0LCBmbGlwLCBwcmV2ZW50T3ZlcmZsb3csIGFycm93LCBoaWRlXTtcbnZhciBjcmVhdGVQb3BwZXIgPSAvKiNfX1BVUkVfXyovcG9wcGVyR2VuZXJhdG9yKHtcbiAgZGVmYXVsdE1vZGlmaWVyczogZGVmYXVsdE1vZGlmaWVyc1xufSk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgY3JlYXRlUG9wcGVyLCBwb3BwZXJHZW5lcmF0b3IsIGRlZmF1bHRNb2RpZmllcnMsIGRldGVjdE92ZXJmbG93IH07IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgY3JlYXRlUG9wcGVyIGFzIGNyZWF0ZVBvcHBlckxpdGUgfSBmcm9tIFwiLi9wb3BwZXItbGl0ZS5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCAqIGZyb20gXCIuL21vZGlmaWVycy9pbmRleC5qc1wiOyIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgZG9tL2RhdGEuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IGVsZW1lbnRNYXAgPSBuZXcgTWFwKClcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzZXQoZWxlbWVudCwga2V5LCBpbnN0YW5jZSkge1xuICAgIGlmICghZWxlbWVudE1hcC5oYXMoZWxlbWVudCkpIHtcbiAgICAgIGVsZW1lbnRNYXAuc2V0KGVsZW1lbnQsIG5ldyBNYXAoKSlcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YW5jZU1hcCA9IGVsZW1lbnRNYXAuZ2V0KGVsZW1lbnQpXG5cbiAgICAvLyBtYWtlIGl0IGNsZWFyIHdlIG9ubHkgd2FudCBvbmUgaW5zdGFuY2UgcGVyIGVsZW1lbnRcbiAgICAvLyBjYW4gYmUgcmVtb3ZlZCBsYXRlciB3aGVuIG11bHRpcGxlIGtleS9pbnN0YW5jZXMgYXJlIGZpbmUgdG8gYmUgdXNlZFxuICAgIGlmICghaW5zdGFuY2VNYXAuaGFzKGtleSkgJiYgaW5zdGFuY2VNYXAuc2l6ZSAhPT0gMCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEJvb3RzdHJhcCBkb2Vzbid0IGFsbG93IG1vcmUgdGhhbiBvbmUgaW5zdGFuY2UgcGVyIGVsZW1lbnQuIEJvdW5kIGluc3RhbmNlOiAke0FycmF5LmZyb20oaW5zdGFuY2VNYXAua2V5cygpKVswXX0uYClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGluc3RhbmNlTWFwLnNldChrZXksIGluc3RhbmNlKVxuICB9LFxuXG4gIGdldChlbGVtZW50LCBrZXkpIHtcbiAgICBpZiAoZWxlbWVudE1hcC5oYXMoZWxlbWVudCkpIHtcbiAgICAgIHJldHVybiBlbGVtZW50TWFwLmdldChlbGVtZW50KS5nZXQoa2V5KSB8fCBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGxcbiAgfSxcblxuICByZW1vdmUoZWxlbWVudCwga2V5KSB7XG4gICAgaWYgKCFlbGVtZW50TWFwLmhhcyhlbGVtZW50KSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgaW5zdGFuY2VNYXAgPSBlbGVtZW50TWFwLmdldChlbGVtZW50KVxuXG4gICAgaW5zdGFuY2VNYXAuZGVsZXRlKGtleSlcblxuICAgIC8vIGZyZWUgdXAgZWxlbWVudCByZWZlcmVuY2VzIGlmIHRoZXJlIGFyZSBubyBpbnN0YW5jZXMgbGVmdCBmb3IgYW4gZWxlbWVudFxuICAgIGlmIChpbnN0YW5jZU1hcC5zaXplID09PSAwKSB7XG4gICAgICBlbGVtZW50TWFwLmRlbGV0ZShlbGVtZW50KVxuICAgIH1cbiAgfVxufVxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB1dGlsL2luZGV4LmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgTUFYX1VJRCA9IDFfMDAwXzAwMFxuY29uc3QgTUlMTElTRUNPTkRTX01VTFRJUExJRVIgPSAxMDAwXG5jb25zdCBUUkFOU0lUSU9OX0VORCA9ICd0cmFuc2l0aW9uZW5kJ1xuXG4vKipcbiAqIFByb3Blcmx5IGVzY2FwZSBJRHMgc2VsZWN0b3JzIHRvIGhhbmRsZSB3ZWlyZCBJRHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuY29uc3QgcGFyc2VTZWxlY3RvciA9IHNlbGVjdG9yID0+IHtcbiAgaWYgKHNlbGVjdG9yICYmIHdpbmRvdy5DU1MgJiYgd2luZG93LkNTUy5lc2NhcGUpIHtcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIG5lZWRzIGVzY2FwaW5nIHRvIGhhbmRsZSBJRHMgKGh0bWw1KykgY29udGFpbmluZyBmb3IgaW5zdGFuY2UgL1xuICAgIHNlbGVjdG9yID0gc2VsZWN0b3IucmVwbGFjZSgvIyhbXlxcc1wiIyddKykvZywgKG1hdGNoLCBpZCkgPT4gYCMke0NTUy5lc2NhcGUoaWQpfWApXG4gIH1cblxuICByZXR1cm4gc2VsZWN0b3Jcbn1cblxuLy8gU2hvdXQtb3V0IEFuZ3VzIENyb2xsIChodHRwczovL2dvby5nbC9weHdRR3ApXG5jb25zdCB0b1R5cGUgPSBvYmplY3QgPT4ge1xuICBpZiAob2JqZWN0ID09PSBudWxsIHx8IG9iamVjdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGAke29iamVjdH1gXG4gIH1cblxuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkubWF0Y2goL1xccyhbYS16XSspL2kpWzFdLnRvTG93ZXJDYXNlKClcbn1cblxuLyoqXG4gKiBQdWJsaWMgVXRpbCBBUElcbiAqL1xuXG5jb25zdCBnZXRVSUQgPSBwcmVmaXggPT4ge1xuICBkbyB7XG4gICAgcHJlZml4ICs9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1BWF9VSUQpXG4gIH0gd2hpbGUgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByZWZpeCkpXG5cbiAgcmV0dXJuIHByZWZpeFxufVxuXG5jb25zdCBnZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCA9IGVsZW1lbnQgPT4ge1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICByZXR1cm4gMFxuICB9XG5cbiAgLy8gR2V0IHRyYW5zaXRpb24tZHVyYXRpb24gb2YgdGhlIGVsZW1lbnRcbiAgbGV0IHsgdHJhbnNpdGlvbkR1cmF0aW9uLCB0cmFuc2l0aW9uRGVsYXkgfSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpXG5cbiAgY29uc3QgZmxvYXRUcmFuc2l0aW9uRHVyYXRpb24gPSBOdW1iZXIucGFyc2VGbG9hdCh0cmFuc2l0aW9uRHVyYXRpb24pXG4gIGNvbnN0IGZsb2F0VHJhbnNpdGlvbkRlbGF5ID0gTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNpdGlvbkRlbGF5KVxuXG4gIC8vIFJldHVybiAwIGlmIGVsZW1lbnQgb3IgdHJhbnNpdGlvbiBkdXJhdGlvbiBpcyBub3QgZm91bmRcbiAgaWYgKCFmbG9hdFRyYW5zaXRpb25EdXJhdGlvbiAmJiAhZmxvYXRUcmFuc2l0aW9uRGVsYXkpIHtcbiAgICByZXR1cm4gMFxuICB9XG5cbiAgLy8gSWYgbXVsdGlwbGUgZHVyYXRpb25zIGFyZSBkZWZpbmVkLCB0YWtlIHRoZSBmaXJzdFxuICB0cmFuc2l0aW9uRHVyYXRpb24gPSB0cmFuc2l0aW9uRHVyYXRpb24uc3BsaXQoJywnKVswXVxuICB0cmFuc2l0aW9uRGVsYXkgPSB0cmFuc2l0aW9uRGVsYXkuc3BsaXQoJywnKVswXVxuXG4gIHJldHVybiAoTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNpdGlvbkR1cmF0aW9uKSArIE51bWJlci5wYXJzZUZsb2F0KHRyYW5zaXRpb25EZWxheSkpICogTUlMTElTRUNPTkRTX01VTFRJUExJRVJcbn1cblxuY29uc3QgdHJpZ2dlclRyYW5zaXRpb25FbmQgPSBlbGVtZW50ID0+IHtcbiAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChUUkFOU0lUSU9OX0VORCkpXG59XG5cbmNvbnN0IGlzRWxlbWVudCA9IG9iamVjdCA9PiB7XG4gIGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZiAodHlwZW9mIG9iamVjdC5qcXVlcnkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgb2JqZWN0ID0gb2JqZWN0WzBdXG4gIH1cblxuICByZXR1cm4gdHlwZW9mIG9iamVjdC5ub2RlVHlwZSAhPT0gJ3VuZGVmaW5lZCdcbn1cblxuY29uc3QgZ2V0RWxlbWVudCA9IG9iamVjdCA9PiB7XG4gIC8vIGl0J3MgYSBqUXVlcnkgb2JqZWN0IG9yIGEgbm9kZSBlbGVtZW50XG4gIGlmIChpc0VsZW1lbnQob2JqZWN0KSkge1xuICAgIHJldHVybiBvYmplY3QuanF1ZXJ5ID8gb2JqZWN0WzBdIDogb2JqZWN0XG4gIH1cblxuICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgb2JqZWN0Lmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwYXJzZVNlbGVjdG9yKG9iamVjdCkpXG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG5jb25zdCBpc1Zpc2libGUgPSBlbGVtZW50ID0+IHtcbiAgaWYgKCFpc0VsZW1lbnQoZWxlbWVudCkgfHwgZWxlbWVudC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgZWxlbWVudElzVmlzaWJsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgndmlzaWJpbGl0eScpID09PSAndmlzaWJsZSdcbiAgLy8gSGFuZGxlIGBkZXRhaWxzYCBlbGVtZW50IGFzIGl0cyBjb250ZW50IG1heSBmYWxzaWUgYXBwZWFyIHZpc2libGUgd2hlbiBpdCBpcyBjbG9zZWRcbiAgY29uc3QgY2xvc2VkRGV0YWlscyA9IGVsZW1lbnQuY2xvc2VzdCgnZGV0YWlsczpub3QoW29wZW5dKScpXG5cbiAgaWYgKCFjbG9zZWREZXRhaWxzKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRJc1Zpc2libGVcbiAgfVxuXG4gIGlmIChjbG9zZWREZXRhaWxzICE9PSBlbGVtZW50KSB7XG4gICAgY29uc3Qgc3VtbWFyeSA9IGVsZW1lbnQuY2xvc2VzdCgnc3VtbWFyeScpXG4gICAgaWYgKHN1bW1hcnkgJiYgc3VtbWFyeS5wYXJlbnROb2RlICE9PSBjbG9zZWREZXRhaWxzKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoc3VtbWFyeSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnRJc1Zpc2libGVcbn1cblxuY29uc3QgaXNEaXNhYmxlZCA9IGVsZW1lbnQgPT4ge1xuICBpZiAoIWVsZW1lbnQgfHwgZWxlbWVudC5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlmICh0eXBlb2YgZWxlbWVudC5kaXNhYmxlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZWxlbWVudC5kaXNhYmxlZFxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpICE9PSAnZmFsc2UnXG59XG5cbmNvbnN0IGZpbmRTaGFkb3dSb290ID0gZWxlbWVudCA9PiB7XG4gIGlmICghZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmF0dGFjaFNoYWRvdykge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICAvLyBDYW4gZmluZCB0aGUgc2hhZG93IHJvb3Qgb3RoZXJ3aXNlIGl0J2xsIHJldHVybiB0aGUgZG9jdW1lbnRcbiAgaWYgKHR5cGVvZiBlbGVtZW50LmdldFJvb3ROb2RlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3Qgcm9vdCA9IGVsZW1lbnQuZ2V0Um9vdE5vZGUoKVxuICAgIHJldHVybiByb290IGluc3RhbmNlb2YgU2hhZG93Um9vdCA/IHJvb3QgOiBudWxsXG4gIH1cblxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QpIHtcbiAgICByZXR1cm4gZWxlbWVudFxuICB9XG5cbiAgLy8gd2hlbiB3ZSBkb24ndCBmaW5kIGEgc2hhZG93IHJvb3RcbiAgaWYgKCFlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcmV0dXJuIGZpbmRTaGFkb3dSb290KGVsZW1lbnQucGFyZW50Tm9kZSlcbn1cblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9XG5cbi8qKlxuICogVHJpY2sgdG8gcmVzdGFydCBhbiBlbGVtZW50J3MgYW5pbWF0aW9uXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB2b2lkXG4gKlxuICogQHNlZSBodHRwczovL3d3dy5oYXJyeXRoZW8uY29tL2Jsb2cvMjAyMS8wMi9yZXN0YXJ0LWEtY3NzLWFuaW1hdGlvbi13aXRoLWphdmFzY3JpcHQvI3Jlc3RhcnRpbmctYS1jc3MtYW5pbWF0aW9uXG4gKi9cbmNvbnN0IHJlZmxvdyA9IGVsZW1lbnQgPT4ge1xuICBlbGVtZW50Lm9mZnNldEhlaWdodCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xufVxuXG5jb25zdCBnZXRqUXVlcnkgPSAoKSA9PiB7XG4gIGlmICh3aW5kb3cualF1ZXJ5ICYmICFkb2N1bWVudC5ib2R5Lmhhc0F0dHJpYnV0ZSgnZGF0YS1icy1uby1qcXVlcnknKSkge1xuICAgIHJldHVybiB3aW5kb3cualF1ZXJ5XG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG5jb25zdCBET01Db250ZW50TG9hZGVkQ2FsbGJhY2tzID0gW11cblxuY29uc3Qgb25ET01Db250ZW50TG9hZGVkID0gY2FsbGJhY2sgPT4ge1xuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgLy8gYWRkIGxpc3RlbmVyIG9uIHRoZSBmaXJzdCBjYWxsIHdoZW4gdGhlIGRvY3VtZW50IGlzIGluIGxvYWRpbmcgc3RhdGVcbiAgICBpZiAoIURPTUNvbnRlbnRMb2FkZWRDYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIERPTUNvbnRlbnRMb2FkZWRDYWxsYmFja3MpIHtcbiAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgRE9NQ29udGVudExvYWRlZENhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKVxuICB9IGVsc2Uge1xuICAgIGNhbGxiYWNrKClcbiAgfVxufVxuXG5jb25zdCBpc1JUTCA9ICgpID0+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kaXIgPT09ICdydGwnXG5cbmNvbnN0IGRlZmluZUpRdWVyeVBsdWdpbiA9IHBsdWdpbiA9PiB7XG4gIG9uRE9NQ29udGVudExvYWRlZCgoKSA9PiB7XG4gICAgY29uc3QgJCA9IGdldGpRdWVyeSgpXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCQpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBwbHVnaW4uTkFNRVxuICAgICAgY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltuYW1lXVxuICAgICAgJC5mbltuYW1lXSA9IHBsdWdpbi5qUXVlcnlJbnRlcmZhY2VcbiAgICAgICQuZm5bbmFtZV0uQ29uc3RydWN0b3IgPSBwbHVnaW5cbiAgICAgICQuZm5bbmFtZV0ubm9Db25mbGljdCA9ICgpID0+IHtcbiAgICAgICAgJC5mbltuYW1lXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgICAgICByZXR1cm4gcGx1Z2luLmpRdWVyeUludGVyZmFjZVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cblxuY29uc3QgZXhlY3V0ZSA9IChwb3NzaWJsZUNhbGxiYWNrLCBhcmdzID0gW10sIGRlZmF1bHRWYWx1ZSA9IHBvc3NpYmxlQ2FsbGJhY2spID0+IHtcbiAgcmV0dXJuIHR5cGVvZiBwb3NzaWJsZUNhbGxiYWNrID09PSAnZnVuY3Rpb24nID8gcG9zc2libGVDYWxsYmFjay5jYWxsKC4uLmFyZ3MpIDogZGVmYXVsdFZhbHVlXG59XG5cbmNvbnN0IGV4ZWN1dGVBZnRlclRyYW5zaXRpb24gPSAoY2FsbGJhY2ssIHRyYW5zaXRpb25FbGVtZW50LCB3YWl0Rm9yVHJhbnNpdGlvbiA9IHRydWUpID0+IHtcbiAgaWYgKCF3YWl0Rm9yVHJhbnNpdGlvbikge1xuICAgIGV4ZWN1dGUoY2FsbGJhY2spXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBkdXJhdGlvblBhZGRpbmcgPSA1XG4gIGNvbnN0IGVtdWxhdGVkRHVyYXRpb24gPSBnZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0cmFuc2l0aW9uRWxlbWVudCkgKyBkdXJhdGlvblBhZGRpbmdcblxuICBsZXQgY2FsbGVkID0gZmFsc2VcblxuICBjb25zdCBoYW5kbGVyID0gKHsgdGFyZ2V0IH0pID0+IHtcbiAgICBpZiAodGFyZ2V0ICE9PSB0cmFuc2l0aW9uRWxlbWVudCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY2FsbGVkID0gdHJ1ZVxuICAgIHRyYW5zaXRpb25FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoVFJBTlNJVElPTl9FTkQsIGhhbmRsZXIpXG4gICAgZXhlY3V0ZShjYWxsYmFjaylcbiAgfVxuXG4gIHRyYW5zaXRpb25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoVFJBTlNJVElPTl9FTkQsIGhhbmRsZXIpXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmICghY2FsbGVkKSB7XG4gICAgICB0cmlnZ2VyVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRWxlbWVudClcbiAgICB9XG4gIH0sIGVtdWxhdGVkRHVyYXRpb24pXG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBwcmV2aW91cy9uZXh0IGVsZW1lbnQgb2YgYSBsaXN0LlxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IGxpc3QgICAgVGhlIGxpc3Qgb2YgZWxlbWVudHNcbiAqIEBwYXJhbSBhY3RpdmVFbGVtZW50ICAgVGhlIGFjdGl2ZSBlbGVtZW50XG4gKiBAcGFyYW0gc2hvdWxkR2V0TmV4dCAgIENob29zZSB0byBnZXQgbmV4dCBvciBwcmV2aW91cyBlbGVtZW50XG4gKiBAcGFyYW0gaXNDeWNsZUFsbG93ZWRcbiAqIEByZXR1cm4ge0VsZW1lbnR8ZWxlbX0gVGhlIHByb3BlciBlbGVtZW50XG4gKi9cbmNvbnN0IGdldE5leHRBY3RpdmVFbGVtZW50ID0gKGxpc3QsIGFjdGl2ZUVsZW1lbnQsIHNob3VsZEdldE5leHQsIGlzQ3ljbGVBbGxvd2VkKSA9PiB7XG4gIGNvbnN0IGxpc3RMZW5ndGggPSBsaXN0Lmxlbmd0aFxuICBsZXQgaW5kZXggPSBsaXN0LmluZGV4T2YoYWN0aXZlRWxlbWVudClcblxuICAvLyBpZiB0aGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgbGlzdCByZXR1cm4gYW4gZWxlbWVudFxuICAvLyBkZXBlbmRpbmcgb24gdGhlIGRpcmVjdGlvbiBhbmQgaWYgY3ljbGUgaXMgYWxsb3dlZFxuICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgcmV0dXJuICFzaG91bGRHZXROZXh0ICYmIGlzQ3ljbGVBbGxvd2VkID8gbGlzdFtsaXN0TGVuZ3RoIC0gMV0gOiBsaXN0WzBdXG4gIH1cblxuICBpbmRleCArPSBzaG91bGRHZXROZXh0ID8gMSA6IC0xXG5cbiAgaWYgKGlzQ3ljbGVBbGxvd2VkKSB7XG4gICAgaW5kZXggPSAoaW5kZXggKyBsaXN0TGVuZ3RoKSAlIGxpc3RMZW5ndGhcbiAgfVxuXG4gIHJldHVybiBsaXN0W01hdGgubWF4KDAsIE1hdGgubWluKGluZGV4LCBsaXN0TGVuZ3RoIC0gMSkpXVxufVxuXG5leHBvcnQge1xuICBkZWZpbmVKUXVlcnlQbHVnaW4sXG4gIGV4ZWN1dGUsXG4gIGV4ZWN1dGVBZnRlclRyYW5zaXRpb24sXG4gIGZpbmRTaGFkb3dSb290LFxuICBnZXRFbGVtZW50LFxuICBnZXRqUXVlcnksXG4gIGdldE5leHRBY3RpdmVFbGVtZW50LFxuICBnZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCxcbiAgZ2V0VUlELFxuICBpc0Rpc2FibGVkLFxuICBpc0VsZW1lbnQsXG4gIGlzUlRMLFxuICBpc1Zpc2libGUsXG4gIG5vb3AsXG4gIG9uRE9NQ29udGVudExvYWRlZCxcbiAgcGFyc2VTZWxlY3RvcixcbiAgcmVmbG93LFxuICB0cmlnZ2VyVHJhbnNpdGlvbkVuZCxcbiAgdG9UeXBlXG59XG4iLCAiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIGRvbS9ldmVudC1oYW5kbGVyLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuaW1wb3J0IHsgZ2V0alF1ZXJ5IH0gZnJvbSAnLi4vdXRpbC9pbmRleC5qcydcblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCBuYW1lc3BhY2VSZWdleCA9IC9bXi5dKig/PVxcLi4qKVxcLnwuKi9cbmNvbnN0IHN0cmlwTmFtZVJlZ2V4ID0gL1xcLi4qL1xuY29uc3Qgc3RyaXBVaWRSZWdleCA9IC86OlxcZCskL1xuY29uc3QgZXZlbnRSZWdpc3RyeSA9IHt9IC8vIEV2ZW50cyBzdG9yYWdlXG5sZXQgdWlkRXZlbnQgPSAxXG5jb25zdCBjdXN0b21FdmVudHMgPSB7XG4gIG1vdXNlZW50ZXI6ICdtb3VzZW92ZXInLFxuICBtb3VzZWxlYXZlOiAnbW91c2VvdXQnXG59XG5cbmNvbnN0IG5hdGl2ZUV2ZW50cyA9IG5ldyBTZXQoW1xuICAnY2xpY2snLFxuICAnZGJsY2xpY2snLFxuICAnbW91c2V1cCcsXG4gICdtb3VzZWRvd24nLFxuICAnY29udGV4dG1lbnUnLFxuICAnbW91c2V3aGVlbCcsXG4gICdET01Nb3VzZVNjcm9sbCcsXG4gICdtb3VzZW92ZXInLFxuICAnbW91c2VvdXQnLFxuICAnbW91c2Vtb3ZlJyxcbiAgJ3NlbGVjdHN0YXJ0JyxcbiAgJ3NlbGVjdGVuZCcsXG4gICdrZXlkb3duJyxcbiAgJ2tleXByZXNzJyxcbiAgJ2tleXVwJyxcbiAgJ29yaWVudGF0aW9uY2hhbmdlJyxcbiAgJ3RvdWNoc3RhcnQnLFxuICAndG91Y2htb3ZlJyxcbiAgJ3RvdWNoZW5kJyxcbiAgJ3RvdWNoY2FuY2VsJyxcbiAgJ3BvaW50ZXJkb3duJyxcbiAgJ3BvaW50ZXJtb3ZlJyxcbiAgJ3BvaW50ZXJ1cCcsXG4gICdwb2ludGVybGVhdmUnLFxuICAncG9pbnRlcmNhbmNlbCcsXG4gICdnZXN0dXJlc3RhcnQnLFxuICAnZ2VzdHVyZWNoYW5nZScsXG4gICdnZXN0dXJlZW5kJyxcbiAgJ2ZvY3VzJyxcbiAgJ2JsdXInLFxuICAnY2hhbmdlJyxcbiAgJ3Jlc2V0JyxcbiAgJ3NlbGVjdCcsXG4gICdzdWJtaXQnLFxuICAnZm9jdXNpbicsXG4gICdmb2N1c291dCcsXG4gICdsb2FkJyxcbiAgJ3VubG9hZCcsXG4gICdiZWZvcmV1bmxvYWQnLFxuICAncmVzaXplJyxcbiAgJ21vdmUnLFxuICAnRE9NQ29udGVudExvYWRlZCcsXG4gICdyZWFkeXN0YXRlY2hhbmdlJyxcbiAgJ2Vycm9yJyxcbiAgJ2Fib3J0JyxcbiAgJ3Njcm9sbCdcbl0pXG5cbi8qKlxuICogUHJpdmF0ZSBtZXRob2RzXG4gKi9cblxuZnVuY3Rpb24gbWFrZUV2ZW50VWlkKGVsZW1lbnQsIHVpZCkge1xuICByZXR1cm4gKHVpZCAmJiBgJHt1aWR9Ojoke3VpZEV2ZW50Kyt9YCkgfHwgZWxlbWVudC51aWRFdmVudCB8fCB1aWRFdmVudCsrXG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnRFdmVudHMoZWxlbWVudCkge1xuICBjb25zdCB1aWQgPSBtYWtlRXZlbnRVaWQoZWxlbWVudClcblxuICBlbGVtZW50LnVpZEV2ZW50ID0gdWlkXG4gIGV2ZW50UmVnaXN0cnlbdWlkXSA9IGV2ZW50UmVnaXN0cnlbdWlkXSB8fCB7fVxuXG4gIHJldHVybiBldmVudFJlZ2lzdHJ5W3VpZF1cbn1cblxuZnVuY3Rpb24gYm9vdHN0cmFwSGFuZGxlcihlbGVtZW50LCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgIGh5ZHJhdGVPYmooZXZlbnQsIHsgZGVsZWdhdGVUYXJnZXQ6IGVsZW1lbnQgfSlcblxuICAgIGlmIChoYW5kbGVyLm9uZU9mZikge1xuICAgICAgRXZlbnRIYW5kbGVyLm9mZihlbGVtZW50LCBldmVudC50eXBlLCBmbilcbiAgICB9XG5cbiAgICByZXR1cm4gZm4uYXBwbHkoZWxlbWVudCwgW2V2ZW50XSlcbiAgfVxufVxuXG5mdW5jdGlvbiBib290c3RyYXBEZWxlZ2F0aW9uSGFuZGxlcihlbGVtZW50LCBzZWxlY3RvciwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCBkb21FbGVtZW50cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcilcblxuICAgIGZvciAobGV0IHsgdGFyZ2V0IH0gPSBldmVudDsgdGFyZ2V0ICYmIHRhcmdldCAhPT0gdGhpczsgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGUpIHtcbiAgICAgIGZvciAoY29uc3QgZG9tRWxlbWVudCBvZiBkb21FbGVtZW50cykge1xuICAgICAgICBpZiAoZG9tRWxlbWVudCAhPT0gdGFyZ2V0KSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGh5ZHJhdGVPYmooZXZlbnQsIHsgZGVsZWdhdGVUYXJnZXQ6IHRhcmdldCB9KVxuXG4gICAgICAgIGlmIChoYW5kbGVyLm9uZU9mZikge1xuICAgICAgICAgIEV2ZW50SGFuZGxlci5vZmYoZWxlbWVudCwgZXZlbnQudHlwZSwgc2VsZWN0b3IsIGZuKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRhcmdldCwgW2V2ZW50XSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEhhbmRsZXIoZXZlbnRzLCBjYWxsYWJsZSwgZGVsZWdhdGlvblNlbGVjdG9yID0gbnVsbCkge1xuICByZXR1cm4gT2JqZWN0LnZhbHVlcyhldmVudHMpXG4gICAgLmZpbmQoZXZlbnQgPT4gZXZlbnQuY2FsbGFibGUgPT09IGNhbGxhYmxlICYmIGV2ZW50LmRlbGVnYXRpb25TZWxlY3RvciA9PT0gZGVsZWdhdGlvblNlbGVjdG9yKVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVQYXJhbWV0ZXJzKG9yaWdpbmFsVHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24pIHtcbiAgY29uc3QgaXNEZWxlZ2F0ZWQgPSB0eXBlb2YgaGFuZGxlciA9PT0gJ3N0cmluZydcbiAgLy8gVE9ETzogdG9vbHRpcCBwYXNzZXMgYGZhbHNlYCBpbnN0ZWFkIG9mIHNlbGVjdG9yLCBzbyB3ZSBuZWVkIHRvIGNoZWNrXG4gIGNvbnN0IGNhbGxhYmxlID0gaXNEZWxlZ2F0ZWQgPyBkZWxlZ2F0aW9uRnVuY3Rpb24gOiAoaGFuZGxlciB8fCBkZWxlZ2F0aW9uRnVuY3Rpb24pXG4gIGxldCB0eXBlRXZlbnQgPSBnZXRUeXBlRXZlbnQob3JpZ2luYWxUeXBlRXZlbnQpXG5cbiAgaWYgKCFuYXRpdmVFdmVudHMuaGFzKHR5cGVFdmVudCkpIHtcbiAgICB0eXBlRXZlbnQgPSBvcmlnaW5hbFR5cGVFdmVudFxuICB9XG5cbiAgcmV0dXJuIFtpc0RlbGVnYXRlZCwgY2FsbGFibGUsIHR5cGVFdmVudF1cbn1cblxuZnVuY3Rpb24gYWRkSGFuZGxlcihlbGVtZW50LCBvcmlnaW5hbFR5cGVFdmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uLCBvbmVPZmYpIHtcbiAgaWYgKHR5cGVvZiBvcmlnaW5hbFR5cGVFdmVudCAhPT0gJ3N0cmluZycgfHwgIWVsZW1lbnQpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGxldCBbaXNEZWxlZ2F0ZWQsIGNhbGxhYmxlLCB0eXBlRXZlbnRdID0gbm9ybWFsaXplUGFyYW1ldGVycyhvcmlnaW5hbFR5cGVFdmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKVxuXG4gIC8vIGluIGNhc2Ugb2YgbW91c2VlbnRlciBvciBtb3VzZWxlYXZlIHdyYXAgdGhlIGhhbmRsZXIgd2l0aGluIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgZm9yIGl0cyBET00gcG9zaXRpb25cbiAgLy8gdGhpcyBwcmV2ZW50cyB0aGUgaGFuZGxlciBmcm9tIGJlaW5nIGRpc3BhdGNoZWQgdGhlIHNhbWUgd2F5IGFzIG1vdXNlb3ZlciBvciBtb3VzZW91dCBkb2VzXG4gIGlmIChvcmlnaW5hbFR5cGVFdmVudCBpbiBjdXN0b21FdmVudHMpIHtcbiAgICBjb25zdCB3cmFwRnVuY3Rpb24gPSBmbiA9PiB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQucmVsYXRlZFRhcmdldCB8fCAoZXZlbnQucmVsYXRlZFRhcmdldCAhPT0gZXZlbnQuZGVsZWdhdGVUYXJnZXQgJiYgIWV2ZW50LmRlbGVnYXRlVGFyZ2V0LmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSkge1xuICAgICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FsbGFibGUgPSB3cmFwRnVuY3Rpb24oY2FsbGFibGUpXG4gIH1cblxuICBjb25zdCBldmVudHMgPSBnZXRFbGVtZW50RXZlbnRzKGVsZW1lbnQpXG4gIGNvbnN0IGhhbmRsZXJzID0gZXZlbnRzW3R5cGVFdmVudF0gfHwgKGV2ZW50c1t0eXBlRXZlbnRdID0ge30pXG4gIGNvbnN0IHByZXZpb3VzRnVuY3Rpb24gPSBmaW5kSGFuZGxlcihoYW5kbGVycywgY2FsbGFibGUsIGlzRGVsZWdhdGVkID8gaGFuZGxlciA6IG51bGwpXG5cbiAgaWYgKHByZXZpb3VzRnVuY3Rpb24pIHtcbiAgICBwcmV2aW91c0Z1bmN0aW9uLm9uZU9mZiA9IHByZXZpb3VzRnVuY3Rpb24ub25lT2ZmICYmIG9uZU9mZlxuXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCB1aWQgPSBtYWtlRXZlbnRVaWQoY2FsbGFibGUsIG9yaWdpbmFsVHlwZUV2ZW50LnJlcGxhY2UobmFtZXNwYWNlUmVnZXgsICcnKSlcbiAgY29uc3QgZm4gPSBpc0RlbGVnYXRlZCA/XG4gICAgYm9vdHN0cmFwRGVsZWdhdGlvbkhhbmRsZXIoZWxlbWVudCwgaGFuZGxlciwgY2FsbGFibGUpIDpcbiAgICBib290c3RyYXBIYW5kbGVyKGVsZW1lbnQsIGNhbGxhYmxlKVxuXG4gIGZuLmRlbGVnYXRpb25TZWxlY3RvciA9IGlzRGVsZWdhdGVkID8gaGFuZGxlciA6IG51bGxcbiAgZm4uY2FsbGFibGUgPSBjYWxsYWJsZVxuICBmbi5vbmVPZmYgPSBvbmVPZmZcbiAgZm4udWlkRXZlbnQgPSB1aWRcbiAgaGFuZGxlcnNbdWlkXSA9IGZuXG5cbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGVFdmVudCwgZm4sIGlzRGVsZWdhdGVkKVxufVxuXG5mdW5jdGlvbiByZW1vdmVIYW5kbGVyKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uU2VsZWN0b3IpIHtcbiAgY29uc3QgZm4gPSBmaW5kSGFuZGxlcihldmVudHNbdHlwZUV2ZW50XSwgaGFuZGxlciwgZGVsZWdhdGlvblNlbGVjdG9yKVxuXG4gIGlmICghZm4pIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlRXZlbnQsIGZuLCBCb29sZWFuKGRlbGVnYXRpb25TZWxlY3RvcikpXG4gIGRlbGV0ZSBldmVudHNbdHlwZUV2ZW50XVtmbi51aWRFdmVudF1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlTmFtZXNwYWNlZEhhbmRsZXJzKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBuYW1lc3BhY2UpIHtcbiAgY29uc3Qgc3RvcmVFbGVtZW50RXZlbnQgPSBldmVudHNbdHlwZUV2ZW50XSB8fCB7fVxuXG4gIGZvciAoY29uc3QgW2hhbmRsZXJLZXksIGV2ZW50XSBvZiBPYmplY3QuZW50cmllcyhzdG9yZUVsZW1lbnRFdmVudCkpIHtcbiAgICBpZiAoaGFuZGxlcktleS5pbmNsdWRlcyhuYW1lc3BhY2UpKSB7XG4gICAgICByZW1vdmVIYW5kbGVyKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBldmVudC5jYWxsYWJsZSwgZXZlbnQuZGVsZWdhdGlvblNlbGVjdG9yKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUeXBlRXZlbnQoZXZlbnQpIHtcbiAgLy8gYWxsb3cgdG8gZ2V0IHRoZSBuYXRpdmUgZXZlbnRzIGZyb20gbmFtZXNwYWNlZCBldmVudHMgKCdjbGljay5icy5idXR0b24nIC0tPiAnY2xpY2snKVxuICBldmVudCA9IGV2ZW50LnJlcGxhY2Uoc3RyaXBOYW1lUmVnZXgsICcnKVxuICByZXR1cm4gY3VzdG9tRXZlbnRzW2V2ZW50XSB8fCBldmVudFxufVxuXG5jb25zdCBFdmVudEhhbmRsZXIgPSB7XG4gIG9uKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24pIHtcbiAgICBhZGRIYW5kbGVyKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24sIGZhbHNlKVxuICB9LFxuXG4gIG9uZShlbGVtZW50LCBldmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKSB7XG4gICAgYWRkSGFuZGxlcihlbGVtZW50LCBldmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uLCB0cnVlKVxuICB9LFxuXG4gIG9mZihlbGVtZW50LCBvcmlnaW5hbFR5cGVFdmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiBvcmlnaW5hbFR5cGVFdmVudCAhPT0gJ3N0cmluZycgfHwgIWVsZW1lbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IFtpc0RlbGVnYXRlZCwgY2FsbGFibGUsIHR5cGVFdmVudF0gPSBub3JtYWxpemVQYXJhbWV0ZXJzKG9yaWdpbmFsVHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24pXG4gICAgY29uc3QgaW5OYW1lc3BhY2UgPSB0eXBlRXZlbnQgIT09IG9yaWdpbmFsVHlwZUV2ZW50XG4gICAgY29uc3QgZXZlbnRzID0gZ2V0RWxlbWVudEV2ZW50cyhlbGVtZW50KVxuICAgIGNvbnN0IHN0b3JlRWxlbWVudEV2ZW50ID0gZXZlbnRzW3R5cGVFdmVudF0gfHwge31cbiAgICBjb25zdCBpc05hbWVzcGFjZSA9IG9yaWdpbmFsVHlwZUV2ZW50LnN0YXJ0c1dpdGgoJy4nKVxuXG4gICAgaWYgKHR5cGVvZiBjYWxsYWJsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFNpbXBsZXN0IGNhc2U6IGhhbmRsZXIgaXMgcGFzc2VkLCByZW1vdmUgdGhhdCBsaXN0ZW5lciBPTkxZLlxuICAgICAgaWYgKCFPYmplY3Qua2V5cyhzdG9yZUVsZW1lbnRFdmVudCkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICByZW1vdmVIYW5kbGVyKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBjYWxsYWJsZSwgaXNEZWxlZ2F0ZWQgPyBoYW5kbGVyIDogbnVsbClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChpc05hbWVzcGFjZSkge1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50RXZlbnQgb2YgT2JqZWN0LmtleXMoZXZlbnRzKSkge1xuICAgICAgICByZW1vdmVOYW1lc3BhY2VkSGFuZGxlcnMoZWxlbWVudCwgZXZlbnRzLCBlbGVtZW50RXZlbnQsIG9yaWdpbmFsVHlwZUV2ZW50LnNsaWNlKDEpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgW2tleUhhbmRsZXJzLCBldmVudF0gb2YgT2JqZWN0LmVudHJpZXMoc3RvcmVFbGVtZW50RXZlbnQpKSB7XG4gICAgICBjb25zdCBoYW5kbGVyS2V5ID0ga2V5SGFuZGxlcnMucmVwbGFjZShzdHJpcFVpZFJlZ2V4LCAnJylcblxuICAgICAgaWYgKCFpbk5hbWVzcGFjZSB8fCBvcmlnaW5hbFR5cGVFdmVudC5pbmNsdWRlcyhoYW5kbGVyS2V5KSkge1xuICAgICAgICByZW1vdmVIYW5kbGVyKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBldmVudC5jYWxsYWJsZSwgZXZlbnQuZGVsZWdhdGlvblNlbGVjdG9yKVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB0cmlnZ2VyKGVsZW1lbnQsIGV2ZW50LCBhcmdzKSB7XG4gICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgY29uc3QgJCA9IGdldGpRdWVyeSgpXG4gICAgY29uc3QgdHlwZUV2ZW50ID0gZ2V0VHlwZUV2ZW50KGV2ZW50KVxuICAgIGNvbnN0IGluTmFtZXNwYWNlID0gZXZlbnQgIT09IHR5cGVFdmVudFxuXG4gICAgbGV0IGpRdWVyeUV2ZW50ID0gbnVsbFxuICAgIGxldCBidWJibGVzID0gdHJ1ZVxuICAgIGxldCBuYXRpdmVEaXNwYXRjaCA9IHRydWVcbiAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlXG5cbiAgICBpZiAoaW5OYW1lc3BhY2UgJiYgJCkge1xuICAgICAgalF1ZXJ5RXZlbnQgPSAkLkV2ZW50KGV2ZW50LCBhcmdzKVxuXG4gICAgICAkKGVsZW1lbnQpLnRyaWdnZXIoalF1ZXJ5RXZlbnQpXG4gICAgICBidWJibGVzID0gIWpRdWVyeUV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKClcbiAgICAgIG5hdGl2ZURpc3BhdGNoID0gIWpRdWVyeUV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKClcbiAgICAgIGRlZmF1bHRQcmV2ZW50ZWQgPSBqUXVlcnlFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKVxuICAgIH1cblxuICAgIGNvbnN0IGV2dCA9IGh5ZHJhdGVPYmoobmV3IEV2ZW50KGV2ZW50LCB7IGJ1YmJsZXMsIGNhbmNlbGFibGU6IHRydWUgfSksIGFyZ3MpXG5cbiAgICBpZiAoZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICBpZiAobmF0aXZlRGlzcGF0Y2gpIHtcbiAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldnQpXG4gICAgfVxuXG4gICAgaWYgKGV2dC5kZWZhdWx0UHJldmVudGVkICYmIGpRdWVyeUV2ZW50KSB7XG4gICAgICBqUXVlcnlFdmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgcmV0dXJuIGV2dFxuICB9XG59XG5cbmZ1bmN0aW9uIGh5ZHJhdGVPYmoob2JqLCBtZXRhID0ge30pIHtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMobWV0YSkpIHtcbiAgICB0cnkge1xuICAgICAgb2JqW2tleV0gPSB2YWx1ZVxuICAgIH0gY2F0Y2gge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmpcbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRIYW5kbGVyXG4iLCAiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIGRvbS9tYW5pcHVsYXRvci5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZURhdGEodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZiAodmFsdWUgPT09IE51bWJlcih2YWx1ZSkudG9TdHJpbmcoKSkge1xuICAgIHJldHVybiBOdW1iZXIodmFsdWUpXG4gIH1cblxuICBpZiAodmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSAnbnVsbCcpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSlcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplRGF0YUtleShrZXkpIHtcbiAgcmV0dXJuIGtleS5yZXBsYWNlKC9bQS1aXS9nLCBjaHIgPT4gYC0ke2Noci50b0xvd2VyQ2FzZSgpfWApXG59XG5cbmNvbnN0IE1hbmlwdWxhdG9yID0ge1xuICBzZXREYXRhQXR0cmlidXRlKGVsZW1lbnQsIGtleSwgdmFsdWUpIHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShgZGF0YS1icy0ke25vcm1hbGl6ZURhdGFLZXkoa2V5KX1gLCB2YWx1ZSlcbiAgfSxcblxuICByZW1vdmVEYXRhQXR0cmlidXRlKGVsZW1lbnQsIGtleSkge1xuICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGBkYXRhLWJzLSR7bm9ybWFsaXplRGF0YUtleShrZXkpfWApXG4gIH0sXG5cbiAgZ2V0RGF0YUF0dHJpYnV0ZXMoZWxlbWVudCkge1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgcmV0dXJuIHt9XG4gICAgfVxuXG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHt9XG4gICAgY29uc3QgYnNLZXlzID0gT2JqZWN0LmtleXMoZWxlbWVudC5kYXRhc2V0KS5maWx0ZXIoa2V5ID0+IGtleS5zdGFydHNXaXRoKCdicycpICYmICFrZXkuc3RhcnRzV2l0aCgnYnNDb25maWcnKSlcblxuICAgIGZvciAoY29uc3Qga2V5IG9mIGJzS2V5cykge1xuICAgICAgbGV0IHB1cmVLZXkgPSBrZXkucmVwbGFjZSgvXmJzLywgJycpXG4gICAgICBwdXJlS2V5ID0gcHVyZUtleS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHB1cmVLZXkuc2xpY2UoMSlcbiAgICAgIGF0dHJpYnV0ZXNbcHVyZUtleV0gPSBub3JtYWxpemVEYXRhKGVsZW1lbnQuZGF0YXNldFtrZXldKVxuICAgIH1cblxuICAgIHJldHVybiBhdHRyaWJ1dGVzXG4gIH0sXG5cbiAgZ2V0RGF0YUF0dHJpYnV0ZShlbGVtZW50LCBrZXkpIHtcbiAgICByZXR1cm4gbm9ybWFsaXplRGF0YShlbGVtZW50LmdldEF0dHJpYnV0ZShgZGF0YS1icy0ke25vcm1hbGl6ZURhdGFLZXkoa2V5KX1gKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYW5pcHVsYXRvclxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB1dGlsL2NvbmZpZy5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmltcG9ydCBNYW5pcHVsYXRvciBmcm9tICcuLi9kb20vbWFuaXB1bGF0b3IuanMnXG5pbXBvcnQgeyBpc0VsZW1lbnQsIHRvVHlwZSB9IGZyb20gJy4vaW5kZXguanMnXG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIENvbmZpZyB7XG4gIC8vIEdldHRlcnNcbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiB7fVxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4ge31cbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBoYXZlIHRvIGltcGxlbWVudCB0aGUgc3RhdGljIG1ldGhvZCBcIk5BTUVcIiwgZm9yIGVhY2ggY29tcG9uZW50IScpXG4gIH1cblxuICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IHRoaXMuX21lcmdlQ29uZmlnT2JqKGNvbmZpZylcbiAgICBjb25maWcgPSB0aGlzLl9jb25maWdBZnRlck1lcmdlKGNvbmZpZylcbiAgICB0aGlzLl90eXBlQ2hlY2tDb25maWcoY29uZmlnKVxuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9jb25maWdBZnRlck1lcmdlKGNvbmZpZykge1xuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9tZXJnZUNvbmZpZ09iaihjb25maWcsIGVsZW1lbnQpIHtcbiAgICBjb25zdCBqc29uQ29uZmlnID0gaXNFbGVtZW50KGVsZW1lbnQpID8gTWFuaXB1bGF0b3IuZ2V0RGF0YUF0dHJpYnV0ZShlbGVtZW50LCAnY29uZmlnJykgOiB7fSAvLyB0cnkgdG8gcGFyc2VcblxuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHQsXG4gICAgICAuLi4odHlwZW9mIGpzb25Db25maWcgPT09ICdvYmplY3QnID8ganNvbkNvbmZpZyA6IHt9KSxcbiAgICAgIC4uLihpc0VsZW1lbnQoZWxlbWVudCkgPyBNYW5pcHVsYXRvci5nZXREYXRhQXR0cmlidXRlcyhlbGVtZW50KSA6IHt9KSxcbiAgICAgIC4uLih0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyA/IGNvbmZpZyA6IHt9KVxuICAgIH1cbiAgfVxuXG4gIF90eXBlQ2hlY2tDb25maWcoY29uZmlnLCBjb25maWdUeXBlcyA9IHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFR5cGUpIHtcbiAgICBmb3IgKGNvbnN0IFtwcm9wZXJ0eSwgZXhwZWN0ZWRUeXBlc10gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnVHlwZXMpKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbmZpZ1twcm9wZXJ0eV1cbiAgICAgIGNvbnN0IHZhbHVlVHlwZSA9IGlzRWxlbWVudCh2YWx1ZSkgPyAnZWxlbWVudCcgOiB0b1R5cGUodmFsdWUpXG5cbiAgICAgIGlmICghbmV3IFJlZ0V4cChleHBlY3RlZFR5cGVzKS50ZXN0KHZhbHVlVHlwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBgJHt0aGlzLmNvbnN0cnVjdG9yLk5BTUUudG9VcHBlckNhc2UoKX06IE9wdGlvbiBcIiR7cHJvcGVydHl9XCIgcHJvdmlkZWQgdHlwZSBcIiR7dmFsdWVUeXBlfVwiIGJ1dCBleHBlY3RlZCB0eXBlIFwiJHtleHBlY3RlZFR5cGVzfVwiLmBcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb25maWdcbiIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgYmFzZS1jb21wb25lbnQuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgRGF0YSBmcm9tICcuL2RvbS9kYXRhLmpzJ1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tICcuL2RvbS9ldmVudC1oYW5kbGVyLmpzJ1xuaW1wb3J0IENvbmZpZyBmcm9tICcuL3V0aWwvY29uZmlnLmpzJ1xuaW1wb3J0IHsgZXhlY3V0ZUFmdGVyVHJhbnNpdGlvbiwgZ2V0RWxlbWVudCB9IGZyb20gJy4vdXRpbC9pbmRleC5qcydcblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCBWRVJTSU9OID0gJzUuMy40J1xuXG4vKipcbiAqIENsYXNzIGRlZmluaXRpb25cbiAqL1xuXG5jbGFzcyBCYXNlQ29tcG9uZW50IGV4dGVuZHMgQ29uZmlnIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgc3VwZXIoKVxuXG4gICAgZWxlbWVudCA9IGdldEVsZW1lbnQoZWxlbWVudClcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50XG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZylcblxuICAgIERhdGEuc2V0KHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVksIHRoaXMpXG4gIH1cblxuICAvLyBQdWJsaWNcbiAgZGlzcG9zZSgpIHtcbiAgICBEYXRhLnJlbW92ZSh0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZKVxuICAgIEV2ZW50SGFuZGxlci5vZmYodGhpcy5fZWxlbWVudCwgdGhpcy5jb25zdHJ1Y3Rvci5FVkVOVF9LRVkpXG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5TmFtZSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKSkge1xuICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIF9xdWV1ZUNhbGxiYWNrKGNhbGxiYWNrLCBlbGVtZW50LCBpc0FuaW1hdGVkID0gdHJ1ZSkge1xuICAgIGV4ZWN1dGVBZnRlclRyYW5zaXRpb24oY2FsbGJhY2ssIGVsZW1lbnQsIGlzQW5pbWF0ZWQpXG4gIH1cblxuICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IHRoaXMuX21lcmdlQ29uZmlnT2JqKGNvbmZpZywgdGhpcy5fZWxlbWVudClcbiAgICBjb25maWcgPSB0aGlzLl9jb25maWdBZnRlck1lcmdlKGNvbmZpZylcbiAgICB0aGlzLl90eXBlQ2hlY2tDb25maWcoY29uZmlnKVxuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIC8vIFN0YXRpY1xuICBzdGF0aWMgZ2V0SW5zdGFuY2UoZWxlbWVudCkge1xuICAgIHJldHVybiBEYXRhLmdldChnZXRFbGVtZW50KGVsZW1lbnQpLCB0aGlzLkRBVEFfS0VZKVxuICB9XG5cbiAgc3RhdGljIGdldE9yQ3JlYXRlSW5zdGFuY2UoZWxlbWVudCwgY29uZmlnID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5nZXRJbnN0YW5jZShlbGVtZW50KSB8fCBuZXcgdGhpcyhlbGVtZW50LCB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyA/IGNvbmZpZyA6IG51bGwpXG4gIH1cblxuICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgcmV0dXJuIFZFUlNJT05cbiAgfVxuXG4gIHN0YXRpYyBnZXQgREFUQV9LRVkoKSB7XG4gICAgcmV0dXJuIGBicy4ke3RoaXMuTkFNRX1gXG4gIH1cblxuICBzdGF0aWMgZ2V0IEVWRU5UX0tFWSgpIHtcbiAgICByZXR1cm4gYC4ke3RoaXMuREFUQV9LRVl9YFxuICB9XG5cbiAgc3RhdGljIGV2ZW50TmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIGAke25hbWV9JHt0aGlzLkVWRU5UX0tFWX1gXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZUNvbXBvbmVudFxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCBkb20vc2VsZWN0b3ItZW5naW5lLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuaW1wb3J0IHsgaXNEaXNhYmxlZCwgaXNWaXNpYmxlLCBwYXJzZVNlbGVjdG9yIH0gZnJvbSAnLi4vdXRpbC9pbmRleC5qcydcblxuY29uc3QgZ2V0U2VsZWN0b3IgPSBlbGVtZW50ID0+IHtcbiAgbGV0IHNlbGVjdG9yID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnMtdGFyZ2V0JylcblxuICBpZiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSAnIycpIHtcbiAgICBsZXQgaHJlZkF0dHJpYnV0ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJylcblxuICAgIC8vIFRoZSBvbmx5IHZhbGlkIGNvbnRlbnQgdGhhdCBjb3VsZCBkb3VibGUgYXMgYSBzZWxlY3RvciBhcmUgSURzIG9yIGNsYXNzZXMsXG4gICAgLy8gc28gZXZlcnl0aGluZyBzdGFydGluZyB3aXRoIGAjYCBvciBgLmAuIElmIGEgXCJyZWFsXCIgVVJMIGlzIHVzZWQgYXMgdGhlIHNlbGVjdG9yLFxuICAgIC8vIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yYCB3aWxsIHJpZ2h0ZnVsbHkgY29tcGxhaW4gaXQgaXMgaW52YWxpZC5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2lzc3Vlcy8zMjI3M1xuICAgIGlmICghaHJlZkF0dHJpYnV0ZSB8fCAoIWhyZWZBdHRyaWJ1dGUuaW5jbHVkZXMoJyMnKSAmJiAhaHJlZkF0dHJpYnV0ZS5zdGFydHNXaXRoKCcuJykpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIC8vIEp1c3QgaW4gY2FzZSBzb21lIENNUyBwdXRzIG91dCBhIGZ1bGwgVVJMIHdpdGggdGhlIGFuY2hvciBhcHBlbmRlZFxuICAgIGlmIChocmVmQXR0cmlidXRlLmluY2x1ZGVzKCcjJykgJiYgIWhyZWZBdHRyaWJ1dGUuc3RhcnRzV2l0aCgnIycpKSB7XG4gICAgICBocmVmQXR0cmlidXRlID0gYCMke2hyZWZBdHRyaWJ1dGUuc3BsaXQoJyMnKVsxXX1gXG4gICAgfVxuXG4gICAgc2VsZWN0b3IgPSBocmVmQXR0cmlidXRlICYmIGhyZWZBdHRyaWJ1dGUgIT09ICcjJyA/IGhyZWZBdHRyaWJ1dGUudHJpbSgpIDogbnVsbFxuICB9XG5cbiAgcmV0dXJuIHNlbGVjdG9yID8gc2VsZWN0b3Iuc3BsaXQoJywnKS5tYXAoc2VsID0+IHBhcnNlU2VsZWN0b3Ioc2VsKSkuam9pbignLCcpIDogbnVsbFxufVxuXG5jb25zdCBTZWxlY3RvckVuZ2luZSA9IHtcbiAgZmluZChzZWxlY3RvciwgZWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgIHJldHVybiBbXS5jb25jYXQoLi4uRWxlbWVudC5wcm90b3R5cGUucXVlcnlTZWxlY3RvckFsbC5jYWxsKGVsZW1lbnQsIHNlbGVjdG9yKSlcbiAgfSxcblxuICBmaW5kT25lKHNlbGVjdG9yLCBlbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgcmV0dXJuIEVsZW1lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3IuY2FsbChlbGVtZW50LCBzZWxlY3RvcilcbiAgfSxcblxuICBjaGlsZHJlbihlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgIHJldHVybiBbXS5jb25jYXQoLi4uZWxlbWVudC5jaGlsZHJlbikuZmlsdGVyKGNoaWxkID0+IGNoaWxkLm1hdGNoZXMoc2VsZWN0b3IpKVxuICB9LFxuXG4gIHBhcmVudHMoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICBjb25zdCBwYXJlbnRzID0gW11cbiAgICBsZXQgYW5jZXN0b3IgPSBlbGVtZW50LnBhcmVudE5vZGUuY2xvc2VzdChzZWxlY3RvcilcblxuICAgIHdoaWxlIChhbmNlc3Rvcikge1xuICAgICAgcGFyZW50cy5wdXNoKGFuY2VzdG9yKVxuICAgICAgYW5jZXN0b3IgPSBhbmNlc3Rvci5wYXJlbnROb2RlLmNsb3Nlc3Qoc2VsZWN0b3IpXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudHNcbiAgfSxcblxuICBwcmV2KGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgbGV0IHByZXZpb3VzID0gZWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXG5cbiAgICB3aGlsZSAocHJldmlvdXMpIHtcbiAgICAgIGlmIChwcmV2aW91cy5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gW3ByZXZpb3VzXVxuICAgICAgfVxuXG4gICAgICBwcmV2aW91cyA9IHByZXZpb3VzLnByZXZpb3VzRWxlbWVudFNpYmxpbmdcbiAgICB9XG5cbiAgICByZXR1cm4gW11cbiAgfSxcbiAgLy8gVE9ETzogdGhpcyBpcyBub3cgdW51c2VkOyByZW1vdmUgbGF0ZXIgYWxvbmcgd2l0aCBwcmV2KClcbiAgbmV4dChlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgIGxldCBuZXh0ID0gZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmdcblxuICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICBpZiAobmV4dC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gW25leHRdXG4gICAgICB9XG5cbiAgICAgIG5leHQgPSBuZXh0Lm5leHRFbGVtZW50U2libGluZ1xuICAgIH1cblxuICAgIHJldHVybiBbXVxuICB9LFxuXG4gIGZvY3VzYWJsZUNoaWxkcmVuKGVsZW1lbnQpIHtcbiAgICBjb25zdCBmb2N1c2FibGVzID0gW1xuICAgICAgJ2EnLFxuICAgICAgJ2J1dHRvbicsXG4gICAgICAnaW5wdXQnLFxuICAgICAgJ3RleHRhcmVhJyxcbiAgICAgICdzZWxlY3QnLFxuICAgICAgJ2RldGFpbHMnLFxuICAgICAgJ1t0YWJpbmRleF0nLFxuICAgICAgJ1tjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCJdJ1xuICAgIF0ubWFwKHNlbGVjdG9yID0+IGAke3NlbGVjdG9yfTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pYCkuam9pbignLCcpXG5cbiAgICByZXR1cm4gdGhpcy5maW5kKGZvY3VzYWJsZXMsIGVsZW1lbnQpLmZpbHRlcihlbCA9PiAhaXNEaXNhYmxlZChlbCkgJiYgaXNWaXNpYmxlKGVsKSlcbiAgfSxcblxuICBnZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IGdldFNlbGVjdG9yKGVsZW1lbnQpXG5cbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBTZWxlY3RvckVuZ2luZS5maW5kT25lKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogbnVsbFxuICAgIH1cblxuICAgIHJldHVybiBudWxsXG4gIH0sXG5cbiAgZ2V0RWxlbWVudEZyb21TZWxlY3RvcihlbGVtZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRTZWxlY3RvcihlbGVtZW50KVxuXG4gICAgcmV0dXJuIHNlbGVjdG9yID8gU2VsZWN0b3JFbmdpbmUuZmluZE9uZShzZWxlY3RvcikgOiBudWxsXG4gIH0sXG5cbiAgZ2V0TXVsdGlwbGVFbGVtZW50c0Zyb21TZWxlY3RvcihlbGVtZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRTZWxlY3RvcihlbGVtZW50KVxuXG4gICAgcmV0dXJuIHNlbGVjdG9yID8gU2VsZWN0b3JFbmdpbmUuZmluZChzZWxlY3RvcikgOiBbXVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdG9yRW5naW5lXG4iLCAiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIHV0aWwvY29tcG9uZW50LWZ1bmN0aW9ucy5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSAnLi4vZG9tL2V2ZW50LWhhbmRsZXIuanMnXG5pbXBvcnQgU2VsZWN0b3JFbmdpbmUgZnJvbSAnLi4vZG9tL3NlbGVjdG9yLWVuZ2luZS5qcydcbmltcG9ydCB7IGlzRGlzYWJsZWQgfSBmcm9tICcuL2luZGV4LmpzJ1xuXG5jb25zdCBlbmFibGVEaXNtaXNzVHJpZ2dlciA9IChjb21wb25lbnQsIG1ldGhvZCA9ICdoaWRlJykgPT4ge1xuICBjb25zdCBjbGlja0V2ZW50ID0gYGNsaWNrLmRpc21pc3Mke2NvbXBvbmVudC5FVkVOVF9LRVl9YFxuICBjb25zdCBuYW1lID0gY29tcG9uZW50Lk5BTUVcblxuICBFdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIGNsaWNrRXZlbnQsIGBbZGF0YS1icy1kaXNtaXNzPVwiJHtuYW1lfVwiXWAsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChbJ0EnLCAnQVJFQSddLmluY2x1ZGVzKHRoaXMudGFnTmFtZSkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICBpZiAoaXNEaXNhYmxlZCh0aGlzKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0ID0gU2VsZWN0b3JFbmdpbmUuZ2V0RWxlbWVudEZyb21TZWxlY3Rvcih0aGlzKSB8fCB0aGlzLmNsb3Nlc3QoYC4ke25hbWV9YClcbiAgICBjb25zdCBpbnN0YW5jZSA9IGNvbXBvbmVudC5nZXRPckNyZWF0ZUluc3RhbmNlKHRhcmdldClcblxuICAgIC8vIE1ldGhvZCBhcmd1bWVudCBpcyBsZWZ0LCBmb3IgQWxlcnQgYW5kIG9ubHksIGFzIGl0IGRvZXNuJ3QgaW1wbGVtZW50IHRoZSAnaGlkZScgbWV0aG9kXG4gICAgaW5zdGFuY2VbbWV0aG9kXSgpXG4gIH0pXG59XG5cbmV4cG9ydCB7XG4gIGVuYWJsZURpc21pc3NUcmlnZ2VyXG59XG4iLCAiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIGFsZXJ0LmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuaW1wb3J0IEJhc2VDb21wb25lbnQgZnJvbSAnLi9iYXNlLWNvbXBvbmVudC5qcydcbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSAnLi9kb20vZXZlbnQtaGFuZGxlci5qcydcbmltcG9ydCB7IGVuYWJsZURpc21pc3NUcmlnZ2VyIH0gZnJvbSAnLi91dGlsL2NvbXBvbmVudC1mdW5jdGlvbnMuanMnXG5pbXBvcnQgeyBkZWZpbmVKUXVlcnlQbHVnaW4gfSBmcm9tICcuL3V0aWwvaW5kZXguanMnXG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3QgTkFNRSA9ICdhbGVydCdcbmNvbnN0IERBVEFfS0VZID0gJ2JzLmFsZXJ0J1xuY29uc3QgRVZFTlRfS0VZID0gYC4ke0RBVEFfS0VZfWBcblxuY29uc3QgRVZFTlRfQ0xPU0UgPSBgY2xvc2Uke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9DTE9TRUQgPSBgY2xvc2VkJHtFVkVOVF9LRVl9YFxuY29uc3QgQ0xBU1NfTkFNRV9GQURFID0gJ2ZhZGUnXG5jb25zdCBDTEFTU19OQU1FX1NIT1cgPSAnc2hvdydcblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgQWxlcnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgLy8gR2V0dGVyc1xuICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIE5BTUVcbiAgfVxuXG4gIC8vIFB1YmxpY1xuICBjbG9zZSgpIHtcbiAgICBjb25zdCBjbG9zZUV2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfQ0xPU0UpXG5cbiAgICBpZiAoY2xvc2VFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XKVxuXG4gICAgY29uc3QgaXNBbmltYXRlZCA9IHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfRkFERSlcbiAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKCgpID0+IHRoaXMuX2Rlc3Ryb3lFbGVtZW50KCksIHRoaXMuX2VsZW1lbnQsIGlzQW5pbWF0ZWQpXG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF9kZXN0cm95RWxlbWVudCgpIHtcbiAgICB0aGlzLl9lbGVtZW50LnJlbW92ZSgpXG4gICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfQ0xPU0VEKVxuICAgIHRoaXMuZGlzcG9zZSgpXG4gIH1cblxuICAvLyBTdGF0aWNcbiAgc3RhdGljIGpRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBBbGVydC5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMpXG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGFbY29uZmlnXSA9PT0gdW5kZWZpbmVkIHx8IGNvbmZpZy5zdGFydHNXaXRoKCdfJykgfHwgY29uZmlnID09PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYClcbiAgICAgIH1cblxuICAgICAgZGF0YVtjb25maWddKHRoaXMpXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIERhdGEgQVBJIGltcGxlbWVudGF0aW9uXG4gKi9cblxuZW5hYmxlRGlzbWlzc1RyaWdnZXIoQWxlcnQsICdjbG9zZScpXG5cbi8qKlxuICogalF1ZXJ5XG4gKi9cblxuZGVmaW5lSlF1ZXJ5UGx1Z2luKEFsZXJ0KVxuXG5leHBvcnQgZGVmYXVsdCBBbGVydFxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCBidXR0b24uanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL2Jhc2UtY29tcG9uZW50LmpzJ1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tICcuL2RvbS9ldmVudC1oYW5kbGVyLmpzJ1xuaW1wb3J0IHsgZGVmaW5lSlF1ZXJ5UGx1Z2luIH0gZnJvbSAnLi91dGlsL2luZGV4LmpzJ1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUgPSAnYnV0dG9uJ1xuY29uc3QgREFUQV9LRVkgPSAnYnMuYnV0dG9uJ1xuY29uc3QgRVZFTlRfS0VZID0gYC4ke0RBVEFfS0VZfWBcbmNvbnN0IERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknXG5cbmNvbnN0IENMQVNTX05BTUVfQUNUSVZFID0gJ2FjdGl2ZSdcbmNvbnN0IFNFTEVDVE9SX0RBVEFfVE9HR0xFID0gJ1tkYXRhLWJzLXRvZ2dsZT1cImJ1dHRvblwiXSdcbmNvbnN0IEVWRU5UX0NMSUNLX0RBVEFfQVBJID0gYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxuXG4vKipcbiAqIENsYXNzIGRlZmluaXRpb25cbiAqL1xuXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgLy8gR2V0dGVyc1xuICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIE5BTUVcbiAgfVxuXG4gIC8vIFB1YmxpY1xuICB0b2dnbGUoKSB7XG4gICAgLy8gVG9nZ2xlIGNsYXNzIGFuZCBzeW5jIHRoZSBgYXJpYS1wcmVzc2VkYCBhdHRyaWJ1dGUgd2l0aCB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBgLnRvZ2dsZSgpYCBtZXRob2RcbiAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKENMQVNTX05BTUVfQUNUSVZFKSlcbiAgfVxuXG4gIC8vIFN0YXRpY1xuICBzdGF0aWMgalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZGF0YSA9IEJ1dHRvbi5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMpXG5cbiAgICAgIGlmIChjb25maWcgPT09ICd0b2dnbGUnKSB7XG4gICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIERhdGEgQVBJIGltcGxlbWVudGF0aW9uXG4gKi9cblxuRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9DTElDS19EQVRBX0FQSSwgU0VMRUNUT1JfREFUQV9UT0dHTEUsIGV2ZW50ID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFNFTEVDVE9SX0RBVEFfVE9HR0xFKVxuICBjb25zdCBkYXRhID0gQnV0dG9uLmdldE9yQ3JlYXRlSW5zdGFuY2UoYnV0dG9uKVxuXG4gIGRhdGEudG9nZ2xlKClcbn0pXG5cbi8qKlxuICogalF1ZXJ5XG4gKi9cblxuZGVmaW5lSlF1ZXJ5UGx1Z2luKEJ1dHRvbilcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uXG4iLCAiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIHV0aWwvc3dpcGUuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gJy4uL2RvbS9ldmVudC1oYW5kbGVyLmpzJ1xuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbmZpZy5qcydcbmltcG9ydCB7IGV4ZWN1dGUgfSBmcm9tICcuL2luZGV4LmpzJ1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUgPSAnc3dpcGUnXG5jb25zdCBFVkVOVF9LRVkgPSAnLmJzLnN3aXBlJ1xuY29uc3QgRVZFTlRfVE9VQ0hTVEFSVCA9IGB0b3VjaHN0YXJ0JHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfVE9VQ0hNT1ZFID0gYHRvdWNobW92ZSR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX1RPVUNIRU5EID0gYHRvdWNoZW5kJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfUE9JTlRFUkRPV04gPSBgcG9pbnRlcmRvd24ke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9QT0lOVEVSVVAgPSBgcG9pbnRlcnVwJHtFVkVOVF9LRVl9YFxuY29uc3QgUE9JTlRFUl9UWVBFX1RPVUNIID0gJ3RvdWNoJ1xuY29uc3QgUE9JTlRFUl9UWVBFX1BFTiA9ICdwZW4nXG5jb25zdCBDTEFTU19OQU1FX1BPSU5URVJfRVZFTlQgPSAncG9pbnRlci1ldmVudCdcbmNvbnN0IFNXSVBFX1RIUkVTSE9MRCA9IDQwXG5cbmNvbnN0IERlZmF1bHQgPSB7XG4gIGVuZENhbGxiYWNrOiBudWxsLFxuICBsZWZ0Q2FsbGJhY2s6IG51bGwsXG4gIHJpZ2h0Q2FsbGJhY2s6IG51bGxcbn1cblxuY29uc3QgRGVmYXVsdFR5cGUgPSB7XG4gIGVuZENhbGxiYWNrOiAnKGZ1bmN0aW9ufG51bGwpJyxcbiAgbGVmdENhbGxiYWNrOiAnKGZ1bmN0aW9ufG51bGwpJyxcbiAgcmlnaHRDYWxsYmFjazogJyhmdW5jdGlvbnxudWxsKSdcbn1cblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgU3dpcGUgZXh0ZW5kcyBDb25maWcge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnRcblxuICAgIGlmICghZWxlbWVudCB8fCAhU3dpcGUuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZylcbiAgICB0aGlzLl9kZWx0YVggPSAwXG4gICAgdGhpcy5fc3VwcG9ydFBvaW50ZXJFdmVudHMgPSBCb29sZWFuKHdpbmRvdy5Qb2ludGVyRXZlbnQpXG4gICAgdGhpcy5faW5pdEV2ZW50cygpXG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFR5cGVcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgLy8gUHVibGljXG4gIGRpc3Bvc2UoKSB7XG4gICAgRXZlbnRIYW5kbGVyLm9mZih0aGlzLl9lbGVtZW50LCBFVkVOVF9LRVkpXG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF9zdGFydChldmVudCkge1xuICAgIGlmICghdGhpcy5fc3VwcG9ydFBvaW50ZXJFdmVudHMpIHtcbiAgICAgIHRoaXMuX2RlbHRhWCA9IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WFxuXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRJc1BvaW50ZXJQZW5Ub3VjaChldmVudCkpIHtcbiAgICAgIHRoaXMuX2RlbHRhWCA9IGV2ZW50LmNsaWVudFhcbiAgICB9XG4gIH1cblxuICBfZW5kKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuX2V2ZW50SXNQb2ludGVyUGVuVG91Y2goZXZlbnQpKSB7XG4gICAgICB0aGlzLl9kZWx0YVggPSBldmVudC5jbGllbnRYIC0gdGhpcy5fZGVsdGFYXG4gICAgfVxuXG4gICAgdGhpcy5faGFuZGxlU3dpcGUoKVxuICAgIGV4ZWN1dGUodGhpcy5fY29uZmlnLmVuZENhbGxiYWNrKVxuICB9XG5cbiAgX21vdmUoZXZlbnQpIHtcbiAgICB0aGlzLl9kZWx0YVggPSBldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMSA/XG4gICAgICAwIDpcbiAgICAgIGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCAtIHRoaXMuX2RlbHRhWFxuICB9XG5cbiAgX2hhbmRsZVN3aXBlKCkge1xuICAgIGNvbnN0IGFic0RlbHRhWCA9IE1hdGguYWJzKHRoaXMuX2RlbHRhWClcblxuICAgIGlmIChhYnNEZWx0YVggPD0gU1dJUEVfVEhSRVNIT0xEKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBkaXJlY3Rpb24gPSBhYnNEZWx0YVggLyB0aGlzLl9kZWx0YVhcblxuICAgIHRoaXMuX2RlbHRhWCA9IDBcblxuICAgIGlmICghZGlyZWN0aW9uKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBleGVjdXRlKGRpcmVjdGlvbiA+IDAgPyB0aGlzLl9jb25maWcucmlnaHRDYWxsYmFjayA6IHRoaXMuX2NvbmZpZy5sZWZ0Q2FsbGJhY2spXG4gIH1cblxuICBfaW5pdEV2ZW50cygpIHtcbiAgICBpZiAodGhpcy5fc3VwcG9ydFBvaW50ZXJFdmVudHMpIHtcbiAgICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9QT0lOVEVSRE9XTiwgZXZlbnQgPT4gdGhpcy5fc3RhcnQoZXZlbnQpKVxuICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1BPSU5URVJVUCwgZXZlbnQgPT4gdGhpcy5fZW5kKGV2ZW50KSlcblxuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfUE9JTlRFUl9FVkVOVClcbiAgICB9IGVsc2Uge1xuICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1RPVUNIU1RBUlQsIGV2ZW50ID0+IHRoaXMuX3N0YXJ0KGV2ZW50KSlcbiAgICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9UT1VDSE1PVkUsIGV2ZW50ID0+IHRoaXMuX21vdmUoZXZlbnQpKVxuICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1RPVUNIRU5ELCBldmVudCA9PiB0aGlzLl9lbmQoZXZlbnQpKVxuICAgIH1cbiAgfVxuXG4gIF9ldmVudElzUG9pbnRlclBlblRvdWNoKGV2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuX3N1cHBvcnRQb2ludGVyRXZlbnRzICYmIChldmVudC5wb2ludGVyVHlwZSA9PT0gUE9JTlRFUl9UWVBFX1BFTiB8fCBldmVudC5wb2ludGVyVHlwZSA9PT0gUE9JTlRFUl9UWVBFX1RPVUNIKVxuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBpc1N1cHBvcnRlZCgpIHtcbiAgICByZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDBcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTd2lwZVxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCBjYXJvdXNlbC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmltcG9ydCBCYXNlQ29tcG9uZW50IGZyb20gJy4vYmFzZS1jb21wb25lbnQuanMnXG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gJy4vZG9tL2V2ZW50LWhhbmRsZXIuanMnXG5pbXBvcnQgTWFuaXB1bGF0b3IgZnJvbSAnLi9kb20vbWFuaXB1bGF0b3IuanMnXG5pbXBvcnQgU2VsZWN0b3JFbmdpbmUgZnJvbSAnLi9kb20vc2VsZWN0b3ItZW5naW5lLmpzJ1xuaW1wb3J0IHtcbiAgZGVmaW5lSlF1ZXJ5UGx1Z2luLFxuICBnZXROZXh0QWN0aXZlRWxlbWVudCxcbiAgaXNSVEwsXG4gIGlzVmlzaWJsZSxcbiAgcmVmbG93LFxuICB0cmlnZ2VyVHJhbnNpdGlvbkVuZFxufSBmcm9tICcuL3V0aWwvaW5kZXguanMnXG5pbXBvcnQgU3dpcGUgZnJvbSAnLi91dGlsL3N3aXBlLmpzJ1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUgPSAnY2Fyb3VzZWwnXG5jb25zdCBEQVRBX0tFWSA9ICdicy5jYXJvdXNlbCdcbmNvbnN0IEVWRU5UX0tFWSA9IGAuJHtEQVRBX0tFWX1gXG5jb25zdCBEQVRBX0FQSV9LRVkgPSAnLmRhdGEtYXBpJ1xuXG5jb25zdCBBUlJPV19MRUZUX0tFWSA9ICdBcnJvd0xlZnQnXG5jb25zdCBBUlJPV19SSUdIVF9LRVkgPSAnQXJyb3dSaWdodCdcbmNvbnN0IFRPVUNIRVZFTlRfQ09NUEFUX1dBSVQgPSA1MDAgLy8gVGltZSBmb3IgbW91c2UgY29tcGF0IGV2ZW50cyB0byBmaXJlIGFmdGVyIHRvdWNoXG5cbmNvbnN0IE9SREVSX05FWFQgPSAnbmV4dCdcbmNvbnN0IE9SREVSX1BSRVYgPSAncHJldidcbmNvbnN0IERJUkVDVElPTl9MRUZUID0gJ2xlZnQnXG5jb25zdCBESVJFQ1RJT05fUklHSFQgPSAncmlnaHQnXG5cbmNvbnN0IEVWRU5UX1NMSURFID0gYHNsaWRlJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfU0xJRCA9IGBzbGlkJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfS0VZRE9XTiA9IGBrZXlkb3duJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfTU9VU0VFTlRFUiA9IGBtb3VzZWVudGVyJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfTU9VU0VMRUFWRSA9IGBtb3VzZWxlYXZlJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfRFJBR19TVEFSVCA9IGBkcmFnc3RhcnQke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9MT0FEX0RBVEFfQVBJID0gYGxvYWQke0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gXG5jb25zdCBFVkVOVF9DTElDS19EQVRBX0FQSSA9IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcblxuY29uc3QgQ0xBU1NfTkFNRV9DQVJPVVNFTCA9ICdjYXJvdXNlbCdcbmNvbnN0IENMQVNTX05BTUVfQUNUSVZFID0gJ2FjdGl2ZSdcbmNvbnN0IENMQVNTX05BTUVfU0xJREUgPSAnc2xpZGUnXG5jb25zdCBDTEFTU19OQU1FX0VORCA9ICdjYXJvdXNlbC1pdGVtLWVuZCdcbmNvbnN0IENMQVNTX05BTUVfU1RBUlQgPSAnY2Fyb3VzZWwtaXRlbS1zdGFydCdcbmNvbnN0IENMQVNTX05BTUVfTkVYVCA9ICdjYXJvdXNlbC1pdGVtLW5leHQnXG5jb25zdCBDTEFTU19OQU1FX1BSRVYgPSAnY2Fyb3VzZWwtaXRlbS1wcmV2J1xuXG5jb25zdCBTRUxFQ1RPUl9BQ1RJVkUgPSAnLmFjdGl2ZSdcbmNvbnN0IFNFTEVDVE9SX0lURU0gPSAnLmNhcm91c2VsLWl0ZW0nXG5jb25zdCBTRUxFQ1RPUl9BQ1RJVkVfSVRFTSA9IFNFTEVDVE9SX0FDVElWRSArIFNFTEVDVE9SX0lURU1cbmNvbnN0IFNFTEVDVE9SX0lURU1fSU1HID0gJy5jYXJvdXNlbC1pdGVtIGltZydcbmNvbnN0IFNFTEVDVE9SX0lORElDQVRPUlMgPSAnLmNhcm91c2VsLWluZGljYXRvcnMnXG5jb25zdCBTRUxFQ1RPUl9EQVRBX1NMSURFID0gJ1tkYXRhLWJzLXNsaWRlXSwgW2RhdGEtYnMtc2xpZGUtdG9dJ1xuY29uc3QgU0VMRUNUT1JfREFUQV9SSURFID0gJ1tkYXRhLWJzLXJpZGU9XCJjYXJvdXNlbFwiXSdcblxuY29uc3QgS0VZX1RPX0RJUkVDVElPTiA9IHtcbiAgW0FSUk9XX0xFRlRfS0VZXTogRElSRUNUSU9OX1JJR0hULFxuICBbQVJST1dfUklHSFRfS0VZXTogRElSRUNUSU9OX0xFRlRcbn1cblxuY29uc3QgRGVmYXVsdCA9IHtcbiAgaW50ZXJ2YWw6IDUwMDAsXG4gIGtleWJvYXJkOiB0cnVlLFxuICBwYXVzZTogJ2hvdmVyJyxcbiAgcmlkZTogZmFsc2UsXG4gIHRvdWNoOiB0cnVlLFxuICB3cmFwOiB0cnVlXG59XG5cbmNvbnN0IERlZmF1bHRUeXBlID0ge1xuICBpbnRlcnZhbDogJyhudW1iZXJ8Ym9vbGVhbiknLCAvLyBUT0RPOnY2IHJlbW92ZSBib29sZWFuIHN1cHBvcnRcbiAga2V5Ym9hcmQ6ICdib29sZWFuJyxcbiAgcGF1c2U6ICcoc3RyaW5nfGJvb2xlYW4pJyxcbiAgcmlkZTogJyhib29sZWFufHN0cmluZyknLFxuICB0b3VjaDogJ2Jvb2xlYW4nLFxuICB3cmFwOiAnYm9vbGVhbidcbn1cblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgQ2Fyb3VzZWwgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgY29uZmlnKVxuXG4gICAgdGhpcy5faW50ZXJ2YWwgPSBudWxsXG4gICAgdGhpcy5fYWN0aXZlRWxlbWVudCA9IG51bGxcbiAgICB0aGlzLl9pc1NsaWRpbmcgPSBmYWxzZVxuICAgIHRoaXMudG91Y2hUaW1lb3V0ID0gbnVsbFxuICAgIHRoaXMuX3N3aXBlSGVscGVyID0gbnVsbFxuXG4gICAgdGhpcy5faW5kaWNhdG9yc0VsZW1lbnQgPSBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX0lORElDQVRPUlMsIHRoaXMuX2VsZW1lbnQpXG4gICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKVxuXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5yaWRlID09PSBDTEFTU19OQU1FX0NBUk9VU0VMKSB7XG4gICAgICB0aGlzLmN5Y2xlKClcbiAgICB9XG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFR5cGVcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgLy8gUHVibGljXG4gIG5leHQoKSB7XG4gICAgdGhpcy5fc2xpZGUoT1JERVJfTkVYVClcbiAgfVxuXG4gIG5leHRXaGVuVmlzaWJsZSgpIHtcbiAgICAvLyBGSVhNRSBUT0RPIHVzZSBgZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlYFxuICAgIC8vIERvbid0IGNhbGwgbmV4dCB3aGVuIHRoZSBwYWdlIGlzbid0IHZpc2libGVcbiAgICAvLyBvciB0aGUgY2Fyb3VzZWwgb3IgaXRzIHBhcmVudCBpc24ndCB2aXNpYmxlXG4gICAgaWYgKCFkb2N1bWVudC5oaWRkZW4gJiYgaXNWaXNpYmxlKHRoaXMuX2VsZW1lbnQpKSB7XG4gICAgICB0aGlzLm5leHQoKVxuICAgIH1cbiAgfVxuXG4gIHByZXYoKSB7XG4gICAgdGhpcy5fc2xpZGUoT1JERVJfUFJFVilcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIGlmICh0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgIHRyaWdnZXJUcmFuc2l0aW9uRW5kKHRoaXMuX2VsZW1lbnQpXG4gICAgfVxuXG4gICAgdGhpcy5fY2xlYXJJbnRlcnZhbCgpXG4gIH1cblxuICBjeWNsZSgpIHtcbiAgICB0aGlzLl9jbGVhckludGVydmFsKClcbiAgICB0aGlzLl91cGRhdGVJbnRlcnZhbCgpXG5cbiAgICB0aGlzLl9pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHRoaXMubmV4dFdoZW5WaXNpYmxlKCksIHRoaXMuX2NvbmZpZy5pbnRlcnZhbClcbiAgfVxuXG4gIF9tYXliZUVuYWJsZUN5Y2xlKCkge1xuICAgIGlmICghdGhpcy5fY29uZmlnLnJpZGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICh0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgIEV2ZW50SGFuZGxlci5vbmUodGhpcy5fZWxlbWVudCwgRVZFTlRfU0xJRCwgKCkgPT4gdGhpcy5jeWNsZSgpKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5jeWNsZSgpXG4gIH1cblxuICB0byhpbmRleCkge1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5fZ2V0SXRlbXMoKVxuICAgIGlmIChpbmRleCA+IGl0ZW1zLmxlbmd0aCAtIDEgfHwgaW5kZXggPCAwKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5faXNTbGlkaW5nKSB7XG4gICAgICBFdmVudEhhbmRsZXIub25lKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1NMSUQsICgpID0+IHRoaXMudG8oaW5kZXgpKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZlSW5kZXggPSB0aGlzLl9nZXRJdGVtSW5kZXgodGhpcy5fZ2V0QWN0aXZlKCkpXG4gICAgaWYgKGFjdGl2ZUluZGV4ID09PSBpbmRleCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgb3JkZXIgPSBpbmRleCA+IGFjdGl2ZUluZGV4ID8gT1JERVJfTkVYVCA6IE9SREVSX1BSRVZcblxuICAgIHRoaXMuX3NsaWRlKG9yZGVyLCBpdGVtc1tpbmRleF0pXG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgIGlmICh0aGlzLl9zd2lwZUhlbHBlcikge1xuICAgICAgdGhpcy5fc3dpcGVIZWxwZXIuZGlzcG9zZSgpXG4gICAgfVxuXG4gICAgc3VwZXIuZGlzcG9zZSgpXG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF9jb25maWdBZnRlck1lcmdlKGNvbmZpZykge1xuICAgIGNvbmZpZy5kZWZhdWx0SW50ZXJ2YWwgPSBjb25maWcuaW50ZXJ2YWxcbiAgICByZXR1cm4gY29uZmlnXG4gIH1cblxuICBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKHRoaXMuX2NvbmZpZy5rZXlib2FyZCkge1xuICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0tFWURPV04sIGV2ZW50ID0+IHRoaXMuX2tleWRvd24oZXZlbnQpKVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9jb25maWcucGF1c2UgPT09ICdob3ZlcicpIHtcbiAgICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9NT1VTRUVOVEVSLCAoKSA9PiB0aGlzLnBhdXNlKCkpXG4gICAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgRVZFTlRfTU9VU0VMRUFWRSwgKCkgPT4gdGhpcy5fbWF5YmVFbmFibGVDeWNsZSgpKVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9jb25maWcudG91Y2ggJiYgU3dpcGUuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgdGhpcy5fYWRkVG91Y2hFdmVudExpc3RlbmVycygpXG4gICAgfVxuICB9XG5cbiAgX2FkZFRvdWNoRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgZm9yIChjb25zdCBpbWcgb2YgU2VsZWN0b3JFbmdpbmUuZmluZChTRUxFQ1RPUl9JVEVNX0lNRywgdGhpcy5fZWxlbWVudCkpIHtcbiAgICAgIEV2ZW50SGFuZGxlci5vbihpbWcsIEVWRU5UX0RSQUdfU1RBUlQsIGV2ZW50ID0+IGV2ZW50LnByZXZlbnREZWZhdWx0KCkpXG4gICAgfVxuXG4gICAgY29uc3QgZW5kQ2FsbEJhY2sgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fY29uZmlnLnBhdXNlICE9PSAnaG92ZXInKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBJZiBpdCdzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2UsIG1vdXNlZW50ZXIvbGVhdmUgYXJlIGZpcmVkIGFzXG4gICAgICAvLyBwYXJ0IG9mIHRoZSBtb3VzZSBjb21wYXRpYmlsaXR5IGV2ZW50cyBvbiBmaXJzdCB0YXAgLSB0aGUgY2Fyb3VzZWxcbiAgICAgIC8vIHdvdWxkIHN0b3AgY3ljbGluZyB1bnRpbCB1c2VyIHRhcHBlZCBvdXQgb2YgaXQ7XG4gICAgICAvLyBoZXJlLCB3ZSBsaXN0ZW4gZm9yIHRvdWNoZW5kLCBleHBsaWNpdGx5IHBhdXNlIHRoZSBjYXJvdXNlbFxuICAgICAgLy8gKGFzIGlmIGl0J3MgdGhlIHNlY29uZCB0aW1lIHdlIHRhcCBvbiBpdCwgbW91c2VlbnRlciBjb21wYXQgZXZlbnRcbiAgICAgIC8vIGlzIE5PVCBmaXJlZCkgYW5kIGFmdGVyIGEgdGltZW91dCAodG8gYWxsb3cgZm9yIG1vdXNlIGNvbXBhdGliaWxpdHlcbiAgICAgIC8vIGV2ZW50cyB0byBmaXJlKSB3ZSBleHBsaWNpdGx5IHJlc3RhcnQgY3ljbGluZ1xuXG4gICAgICB0aGlzLnBhdXNlKClcbiAgICAgIGlmICh0aGlzLnRvdWNoVGltZW91dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50b3VjaFRpbWVvdXQpXG4gICAgICB9XG5cbiAgICAgIHRoaXMudG91Y2hUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLl9tYXliZUVuYWJsZUN5Y2xlKCksIFRPVUNIRVZFTlRfQ09NUEFUX1dBSVQgKyB0aGlzLl9jb25maWcuaW50ZXJ2YWwpXG4gICAgfVxuXG4gICAgY29uc3Qgc3dpcGVDb25maWcgPSB7XG4gICAgICBsZWZ0Q2FsbGJhY2s6ICgpID0+IHRoaXMuX3NsaWRlKHRoaXMuX2RpcmVjdGlvblRvT3JkZXIoRElSRUNUSU9OX0xFRlQpKSxcbiAgICAgIHJpZ2h0Q2FsbGJhY2s6ICgpID0+IHRoaXMuX3NsaWRlKHRoaXMuX2RpcmVjdGlvblRvT3JkZXIoRElSRUNUSU9OX1JJR0hUKSksXG4gICAgICBlbmRDYWxsYmFjazogZW5kQ2FsbEJhY2tcbiAgICB9XG5cbiAgICB0aGlzLl9zd2lwZUhlbHBlciA9IG5ldyBTd2lwZSh0aGlzLl9lbGVtZW50LCBzd2lwZUNvbmZpZylcbiAgfVxuXG4gIF9rZXlkb3duKGV2ZW50KSB7XG4gICAgaWYgKC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBkaXJlY3Rpb24gPSBLRVlfVE9fRElSRUNUSU9OW2V2ZW50LmtleV1cbiAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB0aGlzLl9zbGlkZSh0aGlzLl9kaXJlY3Rpb25Ub09yZGVyKGRpcmVjdGlvbikpXG4gICAgfVxuICB9XG5cbiAgX2dldEl0ZW1JbmRleChlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldEl0ZW1zKCkuaW5kZXhPZihlbGVtZW50KVxuICB9XG5cbiAgX3NldEFjdGl2ZUluZGljYXRvckVsZW1lbnQoaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMuX2luZGljYXRvcnNFbGVtZW50KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmVJbmRpY2F0b3IgPSBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX0FDVElWRSwgdGhpcy5faW5kaWNhdG9yc0VsZW1lbnQpXG5cbiAgICBhY3RpdmVJbmRpY2F0b3IuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX0FDVElWRSlcbiAgICBhY3RpdmVJbmRpY2F0b3IucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnKVxuXG4gICAgY29uc3QgbmV3QWN0aXZlSW5kaWNhdG9yID0gU2VsZWN0b3JFbmdpbmUuZmluZE9uZShgW2RhdGEtYnMtc2xpZGUtdG89XCIke2luZGV4fVwiXWAsIHRoaXMuX2luZGljYXRvcnNFbGVtZW50KVxuXG4gICAgaWYgKG5ld0FjdGl2ZUluZGljYXRvcikge1xuICAgICAgbmV3QWN0aXZlSW5kaWNhdG9yLmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9BQ1RJVkUpXG4gICAgICBuZXdBY3RpdmVJbmRpY2F0b3Iuc2V0QXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnLCAndHJ1ZScpXG4gICAgfVxuICB9XG5cbiAgX3VwZGF0ZUludGVydmFsKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9hY3RpdmVFbGVtZW50IHx8IHRoaXMuX2dldEFjdGl2ZSgpXG5cbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGVsZW1lbnRJbnRlcnZhbCA9IE51bWJlci5wYXJzZUludChlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1icy1pbnRlcnZhbCcpLCAxMClcblxuICAgIHRoaXMuX2NvbmZpZy5pbnRlcnZhbCA9IGVsZW1lbnRJbnRlcnZhbCB8fCB0aGlzLl9jb25maWcuZGVmYXVsdEludGVydmFsXG4gIH1cblxuICBfc2xpZGUob3JkZXIsIGVsZW1lbnQgPSBudWxsKSB7XG4gICAgaWYgKHRoaXMuX2lzU2xpZGluZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZlRWxlbWVudCA9IHRoaXMuX2dldEFjdGl2ZSgpXG4gICAgY29uc3QgaXNOZXh0ID0gb3JkZXIgPT09IE9SREVSX05FWFRcbiAgICBjb25zdCBuZXh0RWxlbWVudCA9IGVsZW1lbnQgfHwgZ2V0TmV4dEFjdGl2ZUVsZW1lbnQodGhpcy5fZ2V0SXRlbXMoKSwgYWN0aXZlRWxlbWVudCwgaXNOZXh0LCB0aGlzLl9jb25maWcud3JhcClcblxuICAgIGlmIChuZXh0RWxlbWVudCA9PT0gYWN0aXZlRWxlbWVudCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgbmV4dEVsZW1lbnRJbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleChuZXh0RWxlbWVudClcblxuICAgIGNvbnN0IHRyaWdnZXJFdmVudCA9IGV2ZW50TmFtZSA9PiB7XG4gICAgICByZXR1cm4gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgZXZlbnROYW1lLCB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IG5leHRFbGVtZW50LFxuICAgICAgICBkaXJlY3Rpb246IHRoaXMuX29yZGVyVG9EaXJlY3Rpb24ob3JkZXIpLFxuICAgICAgICBmcm9tOiB0aGlzLl9nZXRJdGVtSW5kZXgoYWN0aXZlRWxlbWVudCksXG4gICAgICAgIHRvOiBuZXh0RWxlbWVudEluZGV4XG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHNsaWRlRXZlbnQgPSB0cmlnZ2VyRXZlbnQoRVZFTlRfU0xJREUpXG5cbiAgICBpZiAoc2xpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoIWFjdGl2ZUVsZW1lbnQgfHwgIW5leHRFbGVtZW50KSB7XG4gICAgICAvLyBTb21lIHdlaXJkbmVzcyBpcyBoYXBwZW5pbmcsIHNvIHdlIGJhaWxcbiAgICAgIC8vIFRPRE86IGNoYW5nZSB0ZXN0cyB0aGF0IHVzZSBlbXB0eSBkaXZzIHRvIGF2b2lkIHRoaXMgY2hlY2tcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGlzQ3ljbGluZyA9IEJvb2xlYW4odGhpcy5faW50ZXJ2YWwpXG4gICAgdGhpcy5wYXVzZSgpXG5cbiAgICB0aGlzLl9pc1NsaWRpbmcgPSB0cnVlXG5cbiAgICB0aGlzLl9zZXRBY3RpdmVJbmRpY2F0b3JFbGVtZW50KG5leHRFbGVtZW50SW5kZXgpXG4gICAgdGhpcy5fYWN0aXZlRWxlbWVudCA9IG5leHRFbGVtZW50XG5cbiAgICBjb25zdCBkaXJlY3Rpb25hbENsYXNzTmFtZSA9IGlzTmV4dCA/IENMQVNTX05BTUVfU1RBUlQgOiBDTEFTU19OQU1FX0VORFxuICAgIGNvbnN0IG9yZGVyQ2xhc3NOYW1lID0gaXNOZXh0ID8gQ0xBU1NfTkFNRV9ORVhUIDogQ0xBU1NfTkFNRV9QUkVWXG5cbiAgICBuZXh0RWxlbWVudC5jbGFzc0xpc3QuYWRkKG9yZGVyQ2xhc3NOYW1lKVxuXG4gICAgcmVmbG93KG5leHRFbGVtZW50KVxuXG4gICAgYWN0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGRpcmVjdGlvbmFsQ2xhc3NOYW1lKVxuICAgIG5leHRFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGlyZWN0aW9uYWxDbGFzc05hbWUpXG5cbiAgICBjb25zdCBjb21wbGV0ZUNhbGxCYWNrID0gKCkgPT4ge1xuICAgICAgbmV4dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShkaXJlY3Rpb25hbENsYXNzTmFtZSwgb3JkZXJDbGFzc05hbWUpXG4gICAgICBuZXh0RWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfQUNUSVZFKVxuXG4gICAgICBhY3RpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9BQ1RJVkUsIG9yZGVyQ2xhc3NOYW1lLCBkaXJlY3Rpb25hbENsYXNzTmFtZSlcblxuICAgICAgdGhpcy5faXNTbGlkaW5nID0gZmFsc2VcblxuICAgICAgdHJpZ2dlckV2ZW50KEVWRU5UX1NMSUQpXG4gICAgfVxuXG4gICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZUNhbGxCYWNrLCBhY3RpdmVFbGVtZW50LCB0aGlzLl9pc0FuaW1hdGVkKCkpXG5cbiAgICBpZiAoaXNDeWNsaW5nKSB7XG4gICAgICB0aGlzLmN5Y2xlKClcbiAgICB9XG4gIH1cblxuICBfaXNBbmltYXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9TTElERSlcbiAgfVxuXG4gIF9nZXRBY3RpdmUoKSB7XG4gICAgcmV0dXJuIFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoU0VMRUNUT1JfQUNUSVZFX0lURU0sIHRoaXMuX2VsZW1lbnQpXG4gIH1cblxuICBfZ2V0SXRlbXMoKSB7XG4gICAgcmV0dXJuIFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfSVRFTSwgdGhpcy5fZWxlbWVudClcbiAgfVxuXG4gIF9jbGVhckludGVydmFsKCkge1xuICAgIGlmICh0aGlzLl9pbnRlcnZhbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbClcbiAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIF9kaXJlY3Rpb25Ub09yZGVyKGRpcmVjdGlvbikge1xuICAgIGlmIChpc1JUTCgpKSB7XG4gICAgICByZXR1cm4gZGlyZWN0aW9uID09PSBESVJFQ1RJT05fTEVGVCA/IE9SREVSX1BSRVYgOiBPUkRFUl9ORVhUXG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdGlvbiA9PT0gRElSRUNUSU9OX0xFRlQgPyBPUkRFUl9ORVhUIDogT1JERVJfUFJFVlxuICB9XG5cbiAgX29yZGVyVG9EaXJlY3Rpb24ob3JkZXIpIHtcbiAgICBpZiAoaXNSVEwoKSkge1xuICAgICAgcmV0dXJuIG9yZGVyID09PSBPUkRFUl9QUkVWID8gRElSRUNUSU9OX0xFRlQgOiBESVJFQ1RJT05fUklHSFRcbiAgICB9XG5cbiAgICByZXR1cm4gb3JkZXIgPT09IE9SREVSX1BSRVYgPyBESVJFQ1RJT05fUklHSFQgOiBESVJFQ1RJT05fTEVGVFxuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gQ2Fyb3VzZWwuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzLCBjb25maWcpXG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnbnVtYmVyJykge1xuICAgICAgICBkYXRhLnRvKGNvbmZpZylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoZGF0YVtjb25maWddID09PSB1bmRlZmluZWQgfHwgY29uZmlnLnN0YXJ0c1dpdGgoJ18nKSB8fCBjb25maWcgPT09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhW2NvbmZpZ10oKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBEYXRhIEFQSSBpbXBsZW1lbnRhdGlvblxuICovXG5cbkV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfQ0xJQ0tfREFUQV9BUEksIFNFTEVDVE9SX0RBVEFfU0xJREUsIGZ1bmN0aW9uIChldmVudCkge1xuICBjb25zdCB0YXJnZXQgPSBTZWxlY3RvckVuZ2luZS5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKHRoaXMpXG5cbiAgaWYgKCF0YXJnZXQgfHwgIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9DQVJPVVNFTCkpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICBjb25zdCBjYXJvdXNlbCA9IENhcm91c2VsLmdldE9yQ3JlYXRlSW5zdGFuY2UodGFyZ2V0KVxuICBjb25zdCBzbGlkZUluZGV4ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnMtc2xpZGUtdG8nKVxuXG4gIGlmIChzbGlkZUluZGV4KSB7XG4gICAgY2Fyb3VzZWwudG8oc2xpZGVJbmRleClcbiAgICBjYXJvdXNlbC5fbWF5YmVFbmFibGVDeWNsZSgpXG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoTWFuaXB1bGF0b3IuZ2V0RGF0YUF0dHJpYnV0ZSh0aGlzLCAnc2xpZGUnKSA9PT0gJ25leHQnKSB7XG4gICAgY2Fyb3VzZWwubmV4dCgpXG4gICAgY2Fyb3VzZWwuX21heWJlRW5hYmxlQ3ljbGUoKVxuICAgIHJldHVyblxuICB9XG5cbiAgY2Fyb3VzZWwucHJldigpXG4gIGNhcm91c2VsLl9tYXliZUVuYWJsZUN5Y2xlKClcbn0pXG5cbkV2ZW50SGFuZGxlci5vbih3aW5kb3csIEVWRU5UX0xPQURfREFUQV9BUEksICgpID0+IHtcbiAgY29uc3QgY2Fyb3VzZWxzID0gU2VsZWN0b3JFbmdpbmUuZmluZChTRUxFQ1RPUl9EQVRBX1JJREUpXG5cbiAgZm9yIChjb25zdCBjYXJvdXNlbCBvZiBjYXJvdXNlbHMpIHtcbiAgICBDYXJvdXNlbC5nZXRPckNyZWF0ZUluc3RhbmNlKGNhcm91c2VsKVxuICB9XG59KVxuXG4vKipcbiAqIGpRdWVyeVxuICovXG5cbmRlZmluZUpRdWVyeVBsdWdpbihDYXJvdXNlbClcblxuZXhwb3J0IGRlZmF1bHQgQ2Fyb3VzZWxcbiIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgY29sbGFwc2UuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL2Jhc2UtY29tcG9uZW50LmpzJ1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tICcuL2RvbS9ldmVudC1oYW5kbGVyLmpzJ1xuaW1wb3J0IFNlbGVjdG9yRW5naW5lIGZyb20gJy4vZG9tL3NlbGVjdG9yLWVuZ2luZS5qcydcbmltcG9ydCB7XG4gIGRlZmluZUpRdWVyeVBsdWdpbixcbiAgZ2V0RWxlbWVudCxcbiAgcmVmbG93XG59IGZyb20gJy4vdXRpbC9pbmRleC5qcydcblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCBOQU1FID0gJ2NvbGxhcHNlJ1xuY29uc3QgREFUQV9LRVkgPSAnYnMuY29sbGFwc2UnXG5jb25zdCBFVkVOVF9LRVkgPSBgLiR7REFUQV9LRVl9YFxuY29uc3QgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSdcblxuY29uc3QgRVZFTlRfU0hPVyA9IGBzaG93JHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfU0hPV04gPSBgc2hvd24ke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9ISURFID0gYGhpZGUke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9ISURERU4gPSBgaGlkZGVuJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfQ0xJQ0tfREFUQV9BUEkgPSBgY2xpY2ske0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gXG5cbmNvbnN0IENMQVNTX05BTUVfU0hPVyA9ICdzaG93J1xuY29uc3QgQ0xBU1NfTkFNRV9DT0xMQVBTRSA9ICdjb2xsYXBzZSdcbmNvbnN0IENMQVNTX05BTUVfQ09MTEFQU0lORyA9ICdjb2xsYXBzaW5nJ1xuY29uc3QgQ0xBU1NfTkFNRV9DT0xMQVBTRUQgPSAnY29sbGFwc2VkJ1xuY29uc3QgQ0xBU1NfTkFNRV9ERUVQRVJfQ0hJTERSRU4gPSBgOnNjb3BlIC4ke0NMQVNTX05BTUVfQ09MTEFQU0V9IC4ke0NMQVNTX05BTUVfQ09MTEFQU0V9YFxuY29uc3QgQ0xBU1NfTkFNRV9IT1JJWk9OVEFMID0gJ2NvbGxhcHNlLWhvcml6b250YWwnXG5cbmNvbnN0IFdJRFRIID0gJ3dpZHRoJ1xuY29uc3QgSEVJR0hUID0gJ2hlaWdodCdcblxuY29uc3QgU0VMRUNUT1JfQUNUSVZFUyA9ICcuY29sbGFwc2Uuc2hvdywgLmNvbGxhcHNlLmNvbGxhcHNpbmcnXG5jb25zdCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSA9ICdbZGF0YS1icy10b2dnbGU9XCJjb2xsYXBzZVwiXSdcblxuY29uc3QgRGVmYXVsdCA9IHtcbiAgcGFyZW50OiBudWxsLFxuICB0b2dnbGU6IHRydWVcbn1cblxuY29uc3QgRGVmYXVsdFR5cGUgPSB7XG4gIHBhcmVudDogJyhudWxsfGVsZW1lbnQpJyxcbiAgdG9nZ2xlOiAnYm9vbGVhbidcbn1cblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgQ29sbGFwc2UgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgY29uZmlnKVxuXG4gICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcbiAgICB0aGlzLl90cmlnZ2VyQXJyYXkgPSBbXVxuXG4gICAgY29uc3QgdG9nZ2xlTGlzdCA9IFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfREFUQV9UT0dHTEUpXG5cbiAgICBmb3IgKGNvbnN0IGVsZW0gb2YgdG9nZ2xlTGlzdCkge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBTZWxlY3RvckVuZ2luZS5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW0pXG4gICAgICBjb25zdCBmaWx0ZXJFbGVtZW50ID0gU2VsZWN0b3JFbmdpbmUuZmluZChzZWxlY3RvcilcbiAgICAgICAgLmZpbHRlcihmb3VuZEVsZW1lbnQgPT4gZm91bmRFbGVtZW50ID09PSB0aGlzLl9lbGVtZW50KVxuXG4gICAgICBpZiAoc2VsZWN0b3IgIT09IG51bGwgJiYgZmlsdGVyRWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckFycmF5LnB1c2goZWxlbSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9pbml0aWFsaXplQ2hpbGRyZW4oKVxuXG4gICAgaWYgKCF0aGlzLl9jb25maWcucGFyZW50KSB7XG4gICAgICB0aGlzLl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3ModGhpcy5fdHJpZ2dlckFycmF5LCB0aGlzLl9pc1Nob3duKCkpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NvbmZpZy50b2dnbGUpIHtcbiAgICAgIHRoaXMudG9nZ2xlKClcbiAgICB9XG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFR5cGVcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgLy8gUHVibGljXG4gIHRvZ2dsZSgpIHtcbiAgICBpZiAodGhpcy5faXNTaG93bigpKSB7XG4gICAgICB0aGlzLmhpZGUoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3coKVxuICAgIH1cbiAgfVxuXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbmluZyB8fCB0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBhY3RpdmVDaGlsZHJlbiA9IFtdXG5cbiAgICAvLyBmaW5kIGFjdGl2ZSBjaGlsZHJlblxuICAgIGlmICh0aGlzLl9jb25maWcucGFyZW50KSB7XG4gICAgICBhY3RpdmVDaGlsZHJlbiA9IHRoaXMuX2dldEZpcnN0TGV2ZWxDaGlsZHJlbihTRUxFQ1RPUl9BQ1RJVkVTKVxuICAgICAgICAuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudCAhPT0gdGhpcy5fZWxlbWVudClcbiAgICAgICAgLm1hcChlbGVtZW50ID0+IENvbGxhcHNlLmdldE9yQ3JlYXRlSW5zdGFuY2UoZWxlbWVudCwgeyB0b2dnbGU6IGZhbHNlIH0pKVxuICAgIH1cblxuICAgIGlmIChhY3RpdmVDaGlsZHJlbi5sZW5ndGggJiYgYWN0aXZlQ2hpbGRyZW5bMF0uX2lzVHJhbnNpdGlvbmluZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnRFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1NIT1cpXG4gICAgaWYgKHN0YXJ0RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBhY3RpdmVJbnN0YW5jZSBvZiBhY3RpdmVDaGlsZHJlbikge1xuICAgICAgYWN0aXZlSW5zdGFuY2UuaGlkZSgpXG4gICAgfVxuXG4gICAgY29uc3QgZGltZW5zaW9uID0gdGhpcy5fZ2V0RGltZW5zaW9uKClcblxuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX0NPTExBUFNFKVxuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0NPTExBUFNJTkcpXG5cbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAwXG5cbiAgICB0aGlzLl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3ModGhpcy5fdHJpZ2dlckFycmF5LCB0cnVlKVxuICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWVcblxuICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcblxuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQ09MTEFQU0lORylcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0NPTExBUFNFLCBDTEFTU19OQU1FX1NIT1cpXG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9ICcnXG5cbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1NIT1dOKVxuICAgIH1cblxuICAgIGNvbnN0IGNhcGl0YWxpemVkRGltZW5zaW9uID0gZGltZW5zaW9uWzBdLnRvVXBwZXJDYXNlKCkgKyBkaW1lbnNpb24uc2xpY2UoMSlcbiAgICBjb25zdCBzY3JvbGxTaXplID0gYHNjcm9sbCR7Y2FwaXRhbGl6ZWREaW1lbnNpb259YFxuXG4gICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZSwgdGhpcy5fZWxlbWVudCwgdHJ1ZSlcbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSBgJHt0aGlzLl9lbGVtZW50W3Njcm9sbFNpemVdfXB4YFxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8ICF0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0RXZlbnQgPSBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9ISURFKVxuICAgIGlmIChzdGFydEV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGRpbWVuc2lvbiA9IHRoaXMuX2dldERpbWVuc2lvbigpXG5cbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSBgJHt0aGlzLl9lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW2RpbWVuc2lvbl19cHhgXG5cbiAgICByZWZsb3codGhpcy5fZWxlbWVudClcblxuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0NPTExBUFNJTkcpXG4gICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQ09MTEFQU0UsIENMQVNTX05BTUVfU0hPVylcblxuICAgIGZvciAoY29uc3QgdHJpZ2dlciBvZiB0aGlzLl90cmlnZ2VyQXJyYXkpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBTZWxlY3RvckVuZ2luZS5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKHRyaWdnZXIpXG5cbiAgICAgIGlmIChlbGVtZW50ICYmICF0aGlzLl9pc1Nob3duKGVsZW1lbnQpKSB7XG4gICAgICAgIHRoaXMuX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyhbdHJpZ2dlcl0sIGZhbHNlKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWVcblxuICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX0NPTExBUFNJTkcpXG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9DT0xMQVBTRSlcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJRERFTilcbiAgICB9XG5cbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAnJ1xuXG4gICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZSwgdGhpcy5fZWxlbWVudCwgdHJ1ZSlcbiAgfVxuXG4gIF9pc1Nob3duKGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfU0hPVylcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX2NvbmZpZ0FmdGVyTWVyZ2UoY29uZmlnKSB7XG4gICAgY29uZmlnLnRvZ2dsZSA9IEJvb2xlYW4oY29uZmlnLnRvZ2dsZSkgLy8gQ29lcmNlIHN0cmluZyB2YWx1ZXNcbiAgICBjb25maWcucGFyZW50ID0gZ2V0RWxlbWVudChjb25maWcucGFyZW50KVxuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9nZXREaW1lbnNpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfSE9SSVpPTlRBTCkgPyBXSURUSCA6IEhFSUdIVFxuICB9XG5cbiAgX2luaXRpYWxpemVDaGlsZHJlbigpIHtcbiAgICBpZiAoIXRoaXMuX2NvbmZpZy5wYXJlbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5fZ2V0Rmlyc3RMZXZlbENoaWxkcmVuKFNFTEVDVE9SX0RBVEFfVE9HR0xFKVxuXG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNoaWxkcmVuKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZCA9IFNlbGVjdG9yRW5naW5lLmdldEVsZW1lbnRGcm9tU2VsZWN0b3IoZWxlbWVudClcblxuICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyhbZWxlbWVudF0sIHRoaXMuX2lzU2hvd24oc2VsZWN0ZWQpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9nZXRGaXJzdExldmVsQ2hpbGRyZW4oc2VsZWN0b3IpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFNlbGVjdG9yRW5naW5lLmZpbmQoQ0xBU1NfTkFNRV9ERUVQRVJfQ0hJTERSRU4sIHRoaXMuX2NvbmZpZy5wYXJlbnQpXG4gICAgLy8gcmVtb3ZlIGNoaWxkcmVuIGlmIGdyZWF0ZXIgZGVwdGhcbiAgICByZXR1cm4gU2VsZWN0b3JFbmdpbmUuZmluZChzZWxlY3RvciwgdGhpcy5fY29uZmlnLnBhcmVudCkuZmlsdGVyKGVsZW1lbnQgPT4gIWNoaWxkcmVuLmluY2x1ZGVzKGVsZW1lbnQpKVxuICB9XG5cbiAgX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyh0cmlnZ2VyQXJyYXksIGlzT3Blbikge1xuICAgIGlmICghdHJpZ2dlckFycmF5Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRyaWdnZXJBcnJheSkge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKENMQVNTX05BTUVfQ09MTEFQU0VELCAhaXNPcGVuKVxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBpc09wZW4pXG4gICAgfVxuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgY29uc3QgX2NvbmZpZyA9IHt9XG4gICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnICYmIC9zaG93fGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgX2NvbmZpZy50b2dnbGUgPSBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZGF0YSA9IENvbGxhcHNlLmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcywgX2NvbmZpZylcblxuICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYClcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIERhdGEgQVBJIGltcGxlbWVudGF0aW9uXG4gKi9cblxuRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9DTElDS19EQVRBX0FQSSwgU0VMRUNUT1JfREFUQV9UT0dHTEUsIGZ1bmN0aW9uIChldmVudCkge1xuICAvLyBwcmV2ZW50RGVmYXVsdCBvbmx5IGZvciA8YT4gZWxlbWVudHMgKHdoaWNoIGNoYW5nZSB0aGUgVVJMKSBub3QgaW5zaWRlIHRoZSBjb2xsYXBzaWJsZSBlbGVtZW50XG4gIGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gJ0EnIHx8IChldmVudC5kZWxlZ2F0ZVRhcmdldCAmJiBldmVudC5kZWxlZ2F0ZVRhcmdldC50YWdOYW1lID09PSAnQScpKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICB9XG5cbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIFNlbGVjdG9yRW5naW5lLmdldE11bHRpcGxlRWxlbWVudHNGcm9tU2VsZWN0b3IodGhpcykpIHtcbiAgICBDb2xsYXBzZS5nZXRPckNyZWF0ZUluc3RhbmNlKGVsZW1lbnQsIHsgdG9nZ2xlOiBmYWxzZSB9KS50b2dnbGUoKVxuICB9XG59KVxuXG4vKipcbiAqIGpRdWVyeVxuICovXG5cbmRlZmluZUpRdWVyeVBsdWdpbihDb2xsYXBzZSlcblxuZXhwb3J0IGRlZmF1bHQgQ29sbGFwc2VcbiIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgZHJvcGRvd24uanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgKiBhcyBQb3BwZXIgZnJvbSAnQHBvcHBlcmpzL2NvcmUnXG5pbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL2Jhc2UtY29tcG9uZW50LmpzJ1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tICcuL2RvbS9ldmVudC1oYW5kbGVyLmpzJ1xuaW1wb3J0IE1hbmlwdWxhdG9yIGZyb20gJy4vZG9tL21hbmlwdWxhdG9yLmpzJ1xuaW1wb3J0IFNlbGVjdG9yRW5naW5lIGZyb20gJy4vZG9tL3NlbGVjdG9yLWVuZ2luZS5qcydcbmltcG9ydCB7XG4gIGRlZmluZUpRdWVyeVBsdWdpbixcbiAgZXhlY3V0ZSxcbiAgZ2V0RWxlbWVudCxcbiAgZ2V0TmV4dEFjdGl2ZUVsZW1lbnQsXG4gIGlzRGlzYWJsZWQsXG4gIGlzRWxlbWVudCxcbiAgaXNSVEwsXG4gIGlzVmlzaWJsZSxcbiAgbm9vcFxufSBmcm9tICcuL3V0aWwvaW5kZXguanMnXG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3QgTkFNRSA9ICdkcm9wZG93bidcbmNvbnN0IERBVEFfS0VZID0gJ2JzLmRyb3Bkb3duJ1xuY29uc3QgRVZFTlRfS0VZID0gYC4ke0RBVEFfS0VZfWBcbmNvbnN0IERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknXG5cbmNvbnN0IEVTQ0FQRV9LRVkgPSAnRXNjYXBlJ1xuY29uc3QgVEFCX0tFWSA9ICdUYWInXG5jb25zdCBBUlJPV19VUF9LRVkgPSAnQXJyb3dVcCdcbmNvbnN0IEFSUk9XX0RPV05fS0VZID0gJ0Fycm93RG93bidcbmNvbnN0IFJJR0hUX01PVVNFX0JVVFRPTiA9IDIgLy8gTW91c2VFdmVudC5idXR0b24gdmFsdWUgZm9yIHRoZSBzZWNvbmRhcnkgYnV0dG9uLCB1c3VhbGx5IHRoZSByaWdodCBidXR0b25cblxuY29uc3QgRVZFTlRfSElERSA9IGBoaWRlJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfSElEREVOID0gYGhpZGRlbiR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX1NIT1cgPSBgc2hvdyR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX1NIT1dOID0gYHNob3duJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfQ0xJQ0tfREFUQV9BUEkgPSBgY2xpY2ske0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gXG5jb25zdCBFVkVOVF9LRVlET1dOX0RBVEFfQVBJID0gYGtleWRvd24ke0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gXG5jb25zdCBFVkVOVF9LRVlVUF9EQVRBX0FQSSA9IGBrZXl1cCR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcblxuY29uc3QgQ0xBU1NfTkFNRV9TSE9XID0gJ3Nob3cnXG5jb25zdCBDTEFTU19OQU1FX0RST1BVUCA9ICdkcm9wdXAnXG5jb25zdCBDTEFTU19OQU1FX0RST1BFTkQgPSAnZHJvcGVuZCdcbmNvbnN0IENMQVNTX05BTUVfRFJPUFNUQVJUID0gJ2Ryb3BzdGFydCdcbmNvbnN0IENMQVNTX05BTUVfRFJPUFVQX0NFTlRFUiA9ICdkcm9wdXAtY2VudGVyJ1xuY29uc3QgQ0xBU1NfTkFNRV9EUk9QRE9XTl9DRU5URVIgPSAnZHJvcGRvd24tY2VudGVyJ1xuXG5jb25zdCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSA9ICdbZGF0YS1icy10b2dnbGU9XCJkcm9wZG93blwiXTpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSdcbmNvbnN0IFNFTEVDVE9SX0RBVEFfVE9HR0xFX1NIT1dOID0gYCR7U0VMRUNUT1JfREFUQV9UT0dHTEV9LiR7Q0xBU1NfTkFNRV9TSE9XfWBcbmNvbnN0IFNFTEVDVE9SX01FTlUgPSAnLmRyb3Bkb3duLW1lbnUnXG5jb25zdCBTRUxFQ1RPUl9OQVZCQVIgPSAnLm5hdmJhcidcbmNvbnN0IFNFTEVDVE9SX05BVkJBUl9OQVYgPSAnLm5hdmJhci1uYXYnXG5jb25zdCBTRUxFQ1RPUl9WSVNJQkxFX0lURU1TID0gJy5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpJ1xuXG5jb25zdCBQTEFDRU1FTlRfVE9QID0gaXNSVEwoKSA/ICd0b3AtZW5kJyA6ICd0b3Atc3RhcnQnXG5jb25zdCBQTEFDRU1FTlRfVE9QRU5EID0gaXNSVEwoKSA/ICd0b3Atc3RhcnQnIDogJ3RvcC1lbmQnXG5jb25zdCBQTEFDRU1FTlRfQk9UVE9NID0gaXNSVEwoKSA/ICdib3R0b20tZW5kJyA6ICdib3R0b20tc3RhcnQnXG5jb25zdCBQTEFDRU1FTlRfQk9UVE9NRU5EID0gaXNSVEwoKSA/ICdib3R0b20tc3RhcnQnIDogJ2JvdHRvbS1lbmQnXG5jb25zdCBQTEFDRU1FTlRfUklHSFQgPSBpc1JUTCgpID8gJ2xlZnQtc3RhcnQnIDogJ3JpZ2h0LXN0YXJ0J1xuY29uc3QgUExBQ0VNRU5UX0xFRlQgPSBpc1JUTCgpID8gJ3JpZ2h0LXN0YXJ0JyA6ICdsZWZ0LXN0YXJ0J1xuY29uc3QgUExBQ0VNRU5UX1RPUENFTlRFUiA9ICd0b3AnXG5jb25zdCBQTEFDRU1FTlRfQk9UVE9NQ0VOVEVSID0gJ2JvdHRvbSdcblxuY29uc3QgRGVmYXVsdCA9IHtcbiAgYXV0b0Nsb3NlOiB0cnVlLFxuICBib3VuZGFyeTogJ2NsaXBwaW5nUGFyZW50cycsXG4gIGRpc3BsYXk6ICdkeW5hbWljJyxcbiAgb2Zmc2V0OiBbMCwgMl0sXG4gIHBvcHBlckNvbmZpZzogbnVsbCxcbiAgcmVmZXJlbmNlOiAndG9nZ2xlJ1xufVxuXG5jb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgYXV0b0Nsb3NlOiAnKGJvb2xlYW58c3RyaW5nKScsXG4gIGJvdW5kYXJ5OiAnKHN0cmluZ3xlbGVtZW50KScsXG4gIGRpc3BsYXk6ICdzdHJpbmcnLFxuICBvZmZzZXQ6ICcoYXJyYXl8c3RyaW5nfGZ1bmN0aW9uKScsXG4gIHBvcHBlckNvbmZpZzogJyhudWxsfG9iamVjdHxmdW5jdGlvbiknLFxuICByZWZlcmVuY2U6ICcoc3RyaW5nfGVsZW1lbnR8b2JqZWN0KSdcbn1cblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgRHJvcGRvd24gZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgY29uZmlnKVxuXG4gICAgdGhpcy5fcG9wcGVyID0gbnVsbFxuICAgIHRoaXMuX3BhcmVudCA9IHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZSAvLyBkcm9wZG93biB3cmFwcGVyXG4gICAgLy8gVE9ETzogdjYgcmV2ZXJ0ICMzNzAxMSAmIGNoYW5nZSBtYXJrdXAgaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvNS4zL2Zvcm1zL2lucHV0LWdyb3VwL1xuICAgIHRoaXMuX21lbnUgPSBTZWxlY3RvckVuZ2luZS5uZXh0KHRoaXMuX2VsZW1lbnQsIFNFTEVDVE9SX01FTlUpWzBdIHx8XG4gICAgICBTZWxlY3RvckVuZ2luZS5wcmV2KHRoaXMuX2VsZW1lbnQsIFNFTEVDVE9SX01FTlUpWzBdIHx8XG4gICAgICBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX01FTlUsIHRoaXMuX3BhcmVudClcbiAgICB0aGlzLl9pbk5hdmJhciA9IHRoaXMuX2RldGVjdE5hdmJhcigpXG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFR5cGVcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgLy8gUHVibGljXG4gIHRvZ2dsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTaG93bigpID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKVxuICB9XG5cbiAgc2hvdygpIHtcbiAgICBpZiAoaXNEaXNhYmxlZCh0aGlzLl9lbGVtZW50KSB8fCB0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHJlbGF0ZWRUYXJnZXQgPSB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzLl9lbGVtZW50XG4gICAgfVxuXG4gICAgY29uc3Qgc2hvd0V2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfU0hPVywgcmVsYXRlZFRhcmdldClcblxuICAgIGlmIChzaG93RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5fY3JlYXRlUG9wcGVyKClcblxuICAgIC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSBhZGQgZXh0cmFcbiAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHRvIHRoZSBib2R5J3MgaW1tZWRpYXRlIGNoaWxkcmVuO1xuICAgIC8vIG9ubHkgbmVlZGVkIGJlY2F1c2Ugb2YgYnJva2VuIGV2ZW50IGRlbGVnYXRpb24gb24gaU9TXG4gICAgLy8gaHR0cHM6Ly93d3cucXVpcmtzbW9kZS5vcmcvYmxvZy9hcmNoaXZlcy8yMDE0LzAyL21vdXNlX2V2ZW50X2J1Yi5odG1sXG4gICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiAhdGhpcy5fcGFyZW50LmNsb3Nlc3QoU0VMRUNUT1JfTkFWQkFSX05BVikpIHtcbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBbXS5jb25jYXQoLi4uZG9jdW1lbnQuYm9keS5jaGlsZHJlbikpIHtcbiAgICAgICAgRXZlbnRIYW5kbGVyLm9uKGVsZW1lbnQsICdtb3VzZW92ZXInLCBub29wKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2VsZW1lbnQuZm9jdXMoKVxuICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgIHRoaXMuX21lbnUuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX1NIT1cpXG4gICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVylcbiAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9TSE9XTiwgcmVsYXRlZFRhcmdldClcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgaWYgKGlzRGlzYWJsZWQodGhpcy5fZWxlbWVudCkgfHwgIXRoaXMuX2lzU2hvd24oKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuX2VsZW1lbnRcbiAgICB9XG5cbiAgICB0aGlzLl9jb21wbGV0ZUhpZGUocmVsYXRlZFRhcmdldClcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgaWYgKHRoaXMuX3BvcHBlcikge1xuICAgICAgdGhpcy5fcG9wcGVyLmRlc3Ryb3koKVxuICAgIH1cblxuICAgIHN1cGVyLmRpc3Bvc2UoKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMuX2luTmF2YmFyID0gdGhpcy5fZGV0ZWN0TmF2YmFyKClcbiAgICBpZiAodGhpcy5fcG9wcGVyKSB7XG4gICAgICB0aGlzLl9wb3BwZXIudXBkYXRlKClcbiAgICB9XG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF9jb21wbGV0ZUhpZGUocmVsYXRlZFRhcmdldCkge1xuICAgIGNvbnN0IGhpZGVFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJREUsIHJlbGF0ZWRUYXJnZXQpXG4gICAgaWYgKGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgcmVtb3ZlIHRoZSBleHRyYVxuICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgd2UgYWRkZWQgZm9yIGlPUyBzdXBwb3J0XG4gICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIFtdLmNvbmNhdCguLi5kb2N1bWVudC5ib2R5LmNoaWxkcmVuKSkge1xuICAgICAgICBFdmVudEhhbmRsZXIub2ZmKGVsZW1lbnQsICdtb3VzZW92ZXInLCBub29wKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9wb3BwZXIpIHtcbiAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KClcbiAgICB9XG5cbiAgICB0aGlzLl9tZW51LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XKVxuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX1NIT1cpXG4gICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxuICAgIE1hbmlwdWxhdG9yLnJlbW92ZURhdGFBdHRyaWJ1dGUodGhpcy5fbWVudSwgJ3BvcHBlcicpXG4gICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElEREVOLCByZWxhdGVkVGFyZ2V0KVxuICB9XG5cbiAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICBjb25maWcgPSBzdXBlci5fZ2V0Q29uZmlnKGNvbmZpZylcblxuICAgIGlmICh0eXBlb2YgY29uZmlnLnJlZmVyZW5jZSA9PT0gJ29iamVjdCcgJiYgIWlzRWxlbWVudChjb25maWcucmVmZXJlbmNlKSAmJlxuICAgICAgdHlwZW9mIGNvbmZpZy5yZWZlcmVuY2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICE9PSAnZnVuY3Rpb24nXG4gICAgKSB7XG4gICAgICAvLyBQb3BwZXIgdmlydHVhbCBlbGVtZW50cyByZXF1aXJlIGEgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG1ldGhvZFxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtOQU1FLnRvVXBwZXJDYXNlKCl9OiBPcHRpb24gXCJyZWZlcmVuY2VcIiBwcm92aWRlZCB0eXBlIFwib2JqZWN0XCIgd2l0aG91dCBhIHJlcXVpcmVkIFwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0XCIgbWV0aG9kLmApXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZpZ1xuICB9XG5cbiAgX2NyZWF0ZVBvcHBlcigpIHtcbiAgICBpZiAodHlwZW9mIFBvcHBlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgZHJvcGRvd25zIHJlcXVpcmUgUG9wcGVyIChodHRwczovL3BvcHBlci5qcy5vcmcvZG9jcy92Mi8pJylcbiAgICB9XG5cbiAgICBsZXQgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRcblxuICAgIGlmICh0aGlzLl9jb25maWcucmVmZXJlbmNlID09PSAncGFyZW50Jykge1xuICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX3BhcmVudFxuICAgIH0gZWxzZSBpZiAoaXNFbGVtZW50KHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UpKSB7XG4gICAgICByZWZlcmVuY2VFbGVtZW50ID0gZ2V0RWxlbWVudCh0aGlzLl9jb25maWcucmVmZXJlbmNlKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UgPT09ICdvYmplY3QnKSB7XG4gICAgICByZWZlcmVuY2VFbGVtZW50ID0gdGhpcy5fY29uZmlnLnJlZmVyZW5jZVxuICAgIH1cblxuICAgIGNvbnN0IHBvcHBlckNvbmZpZyA9IHRoaXMuX2dldFBvcHBlckNvbmZpZygpXG4gICAgdGhpcy5fcG9wcGVyID0gUG9wcGVyLmNyZWF0ZVBvcHBlcihyZWZlcmVuY2VFbGVtZW50LCB0aGlzLl9tZW51LCBwb3BwZXJDb25maWcpXG4gIH1cblxuICBfaXNTaG93bigpIHtcbiAgICByZXR1cm4gdGhpcy5fbWVudS5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9TSE9XKVxuICB9XG5cbiAgX2dldFBsYWNlbWVudCgpIHtcbiAgICBjb25zdCBwYXJlbnREcm9wZG93biA9IHRoaXMuX3BhcmVudFxuXG4gICAgaWYgKHBhcmVudERyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0RST1BFTkQpKSB7XG4gICAgICByZXR1cm4gUExBQ0VNRU5UX1JJR0hUXG4gICAgfVxuXG4gICAgaWYgKHBhcmVudERyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0RST1BTVEFSVCkpIHtcbiAgICAgIHJldHVybiBQTEFDRU1FTlRfTEVGVFxuICAgIH1cblxuICAgIGlmIChwYXJlbnREcm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9EUk9QVVBfQ0VOVEVSKSkge1xuICAgICAgcmV0dXJuIFBMQUNFTUVOVF9UT1BDRU5URVJcbiAgICB9XG5cbiAgICBpZiAocGFyZW50RHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfRFJPUERPV05fQ0VOVEVSKSkge1xuICAgICAgcmV0dXJuIFBMQUNFTUVOVF9CT1RUT01DRU5URVJcbiAgICB9XG5cbiAgICAvLyBXZSBuZWVkIHRvIHRyaW0gdGhlIHZhbHVlIGJlY2F1c2UgY3VzdG9tIHByb3BlcnRpZXMgY2FuIGFsc28gaW5jbHVkZSBzcGFjZXNcbiAgICBjb25zdCBpc0VuZCA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5fbWVudSkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1icy1wb3NpdGlvbicpLnRyaW0oKSA9PT0gJ2VuZCdcblxuICAgIGlmIChwYXJlbnREcm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9EUk9QVVApKSB7XG4gICAgICByZXR1cm4gaXNFbmQgPyBQTEFDRU1FTlRfVE9QRU5EIDogUExBQ0VNRU5UX1RPUFxuICAgIH1cblxuICAgIHJldHVybiBpc0VuZCA/IFBMQUNFTUVOVF9CT1RUT01FTkQgOiBQTEFDRU1FTlRfQk9UVE9NXG4gIH1cblxuICBfZGV0ZWN0TmF2YmFyKCkge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50LmNsb3Nlc3QoU0VMRUNUT1JfTkFWQkFSKSAhPT0gbnVsbFxuICB9XG5cbiAgX2dldE9mZnNldCgpIHtcbiAgICBjb25zdCB7IG9mZnNldCB9ID0gdGhpcy5fY29uZmlnXG5cbiAgICBpZiAodHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBvZmZzZXQuc3BsaXQoJywnKS5tYXAodmFsdWUgPT4gTnVtYmVyLnBhcnNlSW50KHZhbHVlLCAxMCkpXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvZmZzZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBwb3BwZXJEYXRhID0+IG9mZnNldChwb3BwZXJEYXRhLCB0aGlzLl9lbGVtZW50KVxuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXRcbiAgfVxuXG4gIF9nZXRQb3BwZXJDb25maWcoKSB7XG4gICAgY29uc3QgZGVmYXVsdEJzUG9wcGVyQ29uZmlnID0ge1xuICAgICAgcGxhY2VtZW50OiB0aGlzLl9nZXRQbGFjZW1lbnQoKSxcbiAgICAgIG1vZGlmaWVyczogW3tcbiAgICAgICAgbmFtZTogJ3ByZXZlbnRPdmVyZmxvdycsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBib3VuZGFyeTogdGhpcy5fY29uZmlnLmJvdW5kYXJ5XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdvZmZzZXQnLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgb2Zmc2V0OiB0aGlzLl9nZXRPZmZzZXQoKVxuICAgICAgICB9XG4gICAgICB9XVxuICAgIH1cblxuICAgIC8vIERpc2FibGUgUG9wcGVyIGlmIHdlIGhhdmUgYSBzdGF0aWMgZGlzcGxheSBvciBEcm9wZG93biBpcyBpbiBOYXZiYXJcbiAgICBpZiAodGhpcy5faW5OYXZiYXIgfHwgdGhpcy5fY29uZmlnLmRpc3BsYXkgPT09ICdzdGF0aWMnKSB7XG4gICAgICBNYW5pcHVsYXRvci5zZXREYXRhQXR0cmlidXRlKHRoaXMuX21lbnUsICdwb3BwZXInLCAnc3RhdGljJykgLy8gVE9ETzogdjYgcmVtb3ZlXG4gICAgICBkZWZhdWx0QnNQb3BwZXJDb25maWcubW9kaWZpZXJzID0gW3tcbiAgICAgICAgbmFtZTogJ2FwcGx5U3R5bGVzJyxcbiAgICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICAgIH1dXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmRlZmF1bHRCc1BvcHBlckNvbmZpZyxcbiAgICAgIC4uLmV4ZWN1dGUodGhpcy5fY29uZmlnLnBvcHBlckNvbmZpZywgW3VuZGVmaW5lZCwgZGVmYXVsdEJzUG9wcGVyQ29uZmlnXSlcbiAgICB9XG4gIH1cblxuICBfc2VsZWN0TWVudUl0ZW0oeyBrZXksIHRhcmdldCB9KSB7XG4gICAgY29uc3QgaXRlbXMgPSBTZWxlY3RvckVuZ2luZS5maW5kKFNFTEVDVE9SX1ZJU0lCTEVfSVRFTVMsIHRoaXMuX21lbnUpLmZpbHRlcihlbGVtZW50ID0+IGlzVmlzaWJsZShlbGVtZW50KSlcblxuICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBpZiB0YXJnZXQgaXNuJ3QgaW5jbHVkZWQgaW4gaXRlbXMgKGUuZy4gd2hlbiBleHBhbmRpbmcgdGhlIGRyb3Bkb3duKVxuICAgIC8vIGFsbG93IGN5Y2xpbmcgdG8gZ2V0IHRoZSBsYXN0IGl0ZW0gaW4gY2FzZSBrZXkgZXF1YWxzIEFSUk9XX1VQX0tFWVxuICAgIGdldE5leHRBY3RpdmVFbGVtZW50KGl0ZW1zLCB0YXJnZXQsIGtleSA9PT0gQVJST1dfRE9XTl9LRVksICFpdGVtcy5pbmNsdWRlcyh0YXJnZXQpKS5mb2N1cygpXG4gIH1cblxuICAvLyBTdGF0aWNcbiAgc3RhdGljIGpRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBEcm9wZG93bi5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMsIGNvbmZpZylcblxuICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgfVxuXG4gICAgICBkYXRhW2NvbmZpZ10oKVxuICAgIH0pXG4gIH1cblxuICBzdGF0aWMgY2xlYXJNZW51cyhldmVudCkge1xuICAgIGlmIChldmVudC5idXR0b24gPT09IFJJR0hUX01PVVNFX0JVVFRPTiB8fCAoZXZlbnQudHlwZSA9PT0gJ2tleXVwJyAmJiBldmVudC5rZXkgIT09IFRBQl9LRVkpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBvcGVuVG9nZ2xlcyA9IFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfREFUQV9UT0dHTEVfU0hPV04pXG5cbiAgICBmb3IgKGNvbnN0IHRvZ2dsZSBvZiBvcGVuVG9nZ2xlcykge1xuICAgICAgY29uc3QgY29udGV4dCA9IERyb3Bkb3duLmdldEluc3RhbmNlKHRvZ2dsZSlcbiAgICAgIGlmICghY29udGV4dCB8fCBjb250ZXh0Ll9jb25maWcuYXV0b0Nsb3NlID09PSBmYWxzZSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb21wb3NlZFBhdGggPSBldmVudC5jb21wb3NlZFBhdGgoKVxuICAgICAgY29uc3QgaXNNZW51VGFyZ2V0ID0gY29tcG9zZWRQYXRoLmluY2x1ZGVzKGNvbnRleHQuX21lbnUpXG4gICAgICBpZiAoXG4gICAgICAgIGNvbXBvc2VkUGF0aC5pbmNsdWRlcyhjb250ZXh0Ll9lbGVtZW50KSB8fFxuICAgICAgICAoY29udGV4dC5fY29uZmlnLmF1dG9DbG9zZSA9PT0gJ2luc2lkZScgJiYgIWlzTWVudVRhcmdldCkgfHxcbiAgICAgICAgKGNvbnRleHQuX2NvbmZpZy5hdXRvQ2xvc2UgPT09ICdvdXRzaWRlJyAmJiBpc01lbnVUYXJnZXQpXG4gICAgICApIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gVGFiIG5hdmlnYXRpb24gdGhyb3VnaCB0aGUgZHJvcGRvd24gbWVudSBvciBldmVudHMgZnJvbSBjb250YWluZWQgaW5wdXRzIHNob3VsZG4ndCBjbG9zZSB0aGUgbWVudVxuICAgICAgaWYgKGNvbnRleHQuX21lbnUuY29udGFpbnMoZXZlbnQudGFyZ2V0KSAmJiAoKGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgJiYgZXZlbnQua2V5ID09PSBUQUJfS0VZKSB8fCAvaW5wdXR8c2VsZWN0fG9wdGlvbnx0ZXh0YXJlYXxmb3JtL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSkpKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlbGF0ZWRUYXJnZXQgPSB7IHJlbGF0ZWRUYXJnZXQ6IGNvbnRleHQuX2VsZW1lbnQgfVxuXG4gICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2NsaWNrJykge1xuICAgICAgICByZWxhdGVkVGFyZ2V0LmNsaWNrRXZlbnQgPSBldmVudFxuICAgICAgfVxuXG4gICAgICBjb250ZXh0Ll9jb21wbGV0ZUhpZGUocmVsYXRlZFRhcmdldClcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGF0YUFwaUtleWRvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgLy8gSWYgbm90IGFuIFVQIHwgRE9XTiB8IEVTQ0FQRSBrZXkgPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgIC8vIElmIGlucHV0L3RleHRhcmVhICYmIGlmIGtleSBpcyBvdGhlciB0aGFuIEVTQ0FQRSA9PiBub3QgYSBkcm9wZG93biBjb21tYW5kXG5cbiAgICBjb25zdCBpc0lucHV0ID0gL2lucHV0fHRleHRhcmVhL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSlcbiAgICBjb25zdCBpc0VzY2FwZUV2ZW50ID0gZXZlbnQua2V5ID09PSBFU0NBUEVfS0VZXG4gICAgY29uc3QgaXNVcE9yRG93bkV2ZW50ID0gW0FSUk9XX1VQX0tFWSwgQVJST1dfRE9XTl9LRVldLmluY2x1ZGVzKGV2ZW50LmtleSlcblxuICAgIGlmICghaXNVcE9yRG93bkV2ZW50ICYmICFpc0VzY2FwZUV2ZW50KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoaXNJbnB1dCAmJiAhaXNFc2NhcGVFdmVudCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgLy8gVE9ETzogdjYgcmV2ZXJ0ICMzNzAxMSAmIGNoYW5nZSBtYXJrdXAgaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvNS4zL2Zvcm1zL2lucHV0LWdyb3VwL1xuICAgIGNvbnN0IGdldFRvZ2dsZUJ1dHRvbiA9IHRoaXMubWF0Y2hlcyhTRUxFQ1RPUl9EQVRBX1RPR0dMRSkgP1xuICAgICAgdGhpcyA6XG4gICAgICAoU2VsZWN0b3JFbmdpbmUucHJldih0aGlzLCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSlbMF0gfHxcbiAgICAgICAgU2VsZWN0b3JFbmdpbmUubmV4dCh0aGlzLCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSlbMF0gfHxcbiAgICAgICAgU2VsZWN0b3JFbmdpbmUuZmluZE9uZShTRUxFQ1RPUl9EQVRBX1RPR0dMRSwgZXZlbnQuZGVsZWdhdGVUYXJnZXQucGFyZW50Tm9kZSkpXG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IERyb3Bkb3duLmdldE9yQ3JlYXRlSW5zdGFuY2UoZ2V0VG9nZ2xlQnV0dG9uKVxuXG4gICAgaWYgKGlzVXBPckRvd25FdmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGluc3RhbmNlLnNob3coKVxuICAgICAgaW5zdGFuY2UuX3NlbGVjdE1lbnVJdGVtKGV2ZW50KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGluc3RhbmNlLl9pc1Nob3duKCkpIHsgLy8gZWxzZSBpcyBlc2NhcGUgYW5kIHdlIGNoZWNrIGlmIGl0IGlzIHNob3duXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgaW5zdGFuY2UuaGlkZSgpXG4gICAgICBnZXRUb2dnbGVCdXR0b24uZm9jdXMoKVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIERhdGEgQVBJIGltcGxlbWVudGF0aW9uXG4gKi9cblxuRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9LRVlET1dOX0RBVEFfQVBJLCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSwgRHJvcGRvd24uZGF0YUFwaUtleWRvd25IYW5kbGVyKVxuRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9LRVlET1dOX0RBVEFfQVBJLCBTRUxFQ1RPUl9NRU5VLCBEcm9wZG93bi5kYXRhQXBpS2V5ZG93bkhhbmRsZXIpXG5FdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIEVWRU5UX0NMSUNLX0RBVEFfQVBJLCBEcm9wZG93bi5jbGVhck1lbnVzKVxuRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9LRVlVUF9EQVRBX0FQSSwgRHJvcGRvd24uY2xlYXJNZW51cylcbkV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfQ0xJQ0tfREFUQV9BUEksIFNFTEVDVE9SX0RBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICBEcm9wZG93bi5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMpLnRvZ2dsZSgpXG59KVxuXG4vKipcbiAqIGpRdWVyeVxuICovXG5cbmRlZmluZUpRdWVyeVBsdWdpbihEcm9wZG93bilcblxuZXhwb3J0IGRlZmF1bHQgRHJvcGRvd25cbiIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgdXRpbC9iYWNrZHJvcC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSAnLi4vZG9tL2V2ZW50LWhhbmRsZXIuanMnXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uZmlnLmpzJ1xuaW1wb3J0IHtcbiAgZXhlY3V0ZSwgZXhlY3V0ZUFmdGVyVHJhbnNpdGlvbiwgZ2V0RWxlbWVudCwgcmVmbG93XG59IGZyb20gJy4vaW5kZXguanMnXG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3QgTkFNRSA9ICdiYWNrZHJvcCdcbmNvbnN0IENMQVNTX05BTUVfRkFERSA9ICdmYWRlJ1xuY29uc3QgQ0xBU1NfTkFNRV9TSE9XID0gJ3Nob3cnXG5jb25zdCBFVkVOVF9NT1VTRURPV04gPSBgbW91c2Vkb3duLmJzLiR7TkFNRX1gXG5cbmNvbnN0IERlZmF1bHQgPSB7XG4gIGNsYXNzTmFtZTogJ21vZGFsLWJhY2tkcm9wJyxcbiAgY2xpY2tDYWxsYmFjazogbnVsbCxcbiAgaXNBbmltYXRlZDogZmFsc2UsXG4gIGlzVmlzaWJsZTogdHJ1ZSwgLy8gaWYgZmFsc2UsIHdlIHVzZSB0aGUgYmFja2Ryb3AgaGVscGVyIHdpdGhvdXQgYWRkaW5nIGFueSBlbGVtZW50IHRvIHRoZSBkb21cbiAgcm9vdEVsZW1lbnQ6ICdib2R5JyAvLyBnaXZlIHRoZSBjaG9pY2UgdG8gcGxhY2UgYmFja2Ryb3AgdW5kZXIgZGlmZmVyZW50IGVsZW1lbnRzXG59XG5cbmNvbnN0IERlZmF1bHRUeXBlID0ge1xuICBjbGFzc05hbWU6ICdzdHJpbmcnLFxuICBjbGlja0NhbGxiYWNrOiAnKGZ1bmN0aW9ufG51bGwpJyxcbiAgaXNBbmltYXRlZDogJ2Jvb2xlYW4nLFxuICBpc1Zpc2libGU6ICdib29sZWFuJyxcbiAgcm9vdEVsZW1lbnQ6ICcoZWxlbWVudHxzdHJpbmcpJ1xufVxuXG4vKipcbiAqIENsYXNzIGRlZmluaXRpb25cbiAqL1xuXG5jbGFzcyBCYWNrZHJvcCBleHRlbmRzIENvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKVxuICAgIHRoaXMuX2lzQXBwZW5kZWQgPSBmYWxzZVxuICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsXG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFR5cGVcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgLy8gUHVibGljXG4gIHNob3coY2FsbGJhY2spIHtcbiAgICBpZiAoIXRoaXMuX2NvbmZpZy5pc1Zpc2libGUpIHtcbiAgICAgIGV4ZWN1dGUoY2FsbGJhY2spXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLl9hcHBlbmQoKVxuXG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2dldEVsZW1lbnQoKVxuICAgIGlmICh0aGlzLl9jb25maWcuaXNBbmltYXRlZCkge1xuICAgICAgcmVmbG93KGVsZW1lbnQpXG4gICAgfVxuXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVylcblxuICAgIHRoaXMuX2VtdWxhdGVBbmltYXRpb24oKCkgPT4ge1xuICAgICAgZXhlY3V0ZShjYWxsYmFjaylcbiAgICB9KVxuICB9XG5cbiAgaGlkZShjYWxsYmFjaykge1xuICAgIGlmICghdGhpcy5fY29uZmlnLmlzVmlzaWJsZSkge1xuICAgICAgZXhlY3V0ZShjYWxsYmFjaylcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX2dldEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfU0hPVylcblxuICAgIHRoaXMuX2VtdWxhdGVBbmltYXRpb24oKCkgPT4ge1xuICAgICAgdGhpcy5kaXNwb3NlKClcbiAgICAgIGV4ZWN1dGUoY2FsbGJhY2spXG4gICAgfSlcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgaWYgKCF0aGlzLl9pc0FwcGVuZGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBFdmVudEhhbmRsZXIub2ZmKHRoaXMuX2VsZW1lbnQsIEVWRU5UX01PVVNFRE9XTilcblxuICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKClcbiAgICB0aGlzLl9pc0FwcGVuZGVkID0gZmFsc2VcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX2dldEVsZW1lbnQoKSB7XG4gICAgaWYgKCF0aGlzLl9lbGVtZW50KSB7XG4gICAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBiYWNrZHJvcC5jbGFzc05hbWUgPSB0aGlzLl9jb25maWcuY2xhc3NOYW1lXG4gICAgICBpZiAodGhpcy5fY29uZmlnLmlzQW5pbWF0ZWQpIHtcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0ZBREUpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBiYWNrZHJvcFxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50XG4gIH1cblxuICBfY29uZmlnQWZ0ZXJNZXJnZShjb25maWcpIHtcbiAgICAvLyB1c2UgZ2V0RWxlbWVudCgpIHdpdGggdGhlIGRlZmF1bHQgXCJib2R5XCIgdG8gZ2V0IGEgZnJlc2ggRWxlbWVudCBvbiBlYWNoIGluc3RhbnRpYXRpb25cbiAgICBjb25maWcucm9vdEVsZW1lbnQgPSBnZXRFbGVtZW50KGNvbmZpZy5yb290RWxlbWVudClcbiAgICByZXR1cm4gY29uZmlnXG4gIH1cblxuICBfYXBwZW5kKCkge1xuICAgIGlmICh0aGlzLl9pc0FwcGVuZGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fZ2V0RWxlbWVudCgpXG4gICAgdGhpcy5fY29uZmlnLnJvb3RFbGVtZW50LmFwcGVuZChlbGVtZW50KVxuXG4gICAgRXZlbnRIYW5kbGVyLm9uKGVsZW1lbnQsIEVWRU5UX01PVVNFRE9XTiwgKCkgPT4ge1xuICAgICAgZXhlY3V0ZSh0aGlzLl9jb25maWcuY2xpY2tDYWxsYmFjaylcbiAgICB9KVxuXG4gICAgdGhpcy5faXNBcHBlbmRlZCA9IHRydWVcbiAgfVxuXG4gIF9lbXVsYXRlQW5pbWF0aW9uKGNhbGxiYWNrKSB7XG4gICAgZXhlY3V0ZUFmdGVyVHJhbnNpdGlvbihjYWxsYmFjaywgdGhpcy5fZ2V0RWxlbWVudCgpLCB0aGlzLl9jb25maWcuaXNBbmltYXRlZClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYWNrZHJvcFxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB1dGlsL2ZvY3VzdHJhcC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSAnLi4vZG9tL2V2ZW50LWhhbmRsZXIuanMnXG5pbXBvcnQgU2VsZWN0b3JFbmdpbmUgZnJvbSAnLi4vZG9tL3NlbGVjdG9yLWVuZ2luZS5qcydcbmltcG9ydCBDb25maWcgZnJvbSAnLi9jb25maWcuanMnXG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3QgTkFNRSA9ICdmb2N1c3RyYXAnXG5jb25zdCBEQVRBX0tFWSA9ICdicy5mb2N1c3RyYXAnXG5jb25zdCBFVkVOVF9LRVkgPSBgLiR7REFUQV9LRVl9YFxuY29uc3QgRVZFTlRfRk9DVVNJTiA9IGBmb2N1c2luJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfS0VZRE9XTl9UQUIgPSBga2V5ZG93bi50YWIke0VWRU5UX0tFWX1gXG5cbmNvbnN0IFRBQl9LRVkgPSAnVGFiJ1xuY29uc3QgVEFCX05BVl9GT1JXQVJEID0gJ2ZvcndhcmQnXG5jb25zdCBUQUJfTkFWX0JBQ0tXQVJEID0gJ2JhY2t3YXJkJ1xuXG5jb25zdCBEZWZhdWx0ID0ge1xuICBhdXRvZm9jdXM6IHRydWUsXG4gIHRyYXBFbGVtZW50OiBudWxsIC8vIFRoZSBlbGVtZW50IHRvIHRyYXAgZm9jdXMgaW5zaWRlIG9mXG59XG5cbmNvbnN0IERlZmF1bHRUeXBlID0ge1xuICBhdXRvZm9jdXM6ICdib29sZWFuJyxcbiAgdHJhcEVsZW1lbnQ6ICdlbGVtZW50J1xufVxuXG4vKipcbiAqIENsYXNzIGRlZmluaXRpb25cbiAqL1xuXG5jbGFzcyBGb2N1c1RyYXAgZXh0ZW5kcyBDb25maWcge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZylcbiAgICB0aGlzLl9pc0FjdGl2ZSA9IGZhbHNlXG4gICAgdGhpcy5fbGFzdFRhYk5hdkRpcmVjdGlvbiA9IG51bGxcbiAgfVxuXG4gIC8vIEdldHRlcnNcbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiBEZWZhdWx0XG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgIHJldHVybiBEZWZhdWx0VHlwZVxuICB9XG5cbiAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiBOQU1FXG4gIH1cblxuICAvLyBQdWJsaWNcbiAgYWN0aXZhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2lzQWN0aXZlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY29uZmlnLmF1dG9mb2N1cykge1xuICAgICAgdGhpcy5fY29uZmlnLnRyYXBFbGVtZW50LmZvY3VzKClcbiAgICB9XG5cbiAgICBFdmVudEhhbmRsZXIub2ZmKGRvY3VtZW50LCBFVkVOVF9LRVkpIC8vIGd1YXJkIGFnYWluc3QgaW5maW5pdGUgZm9jdXMgbG9vcFxuICAgIEV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfRk9DVVNJTiwgZXZlbnQgPT4gdGhpcy5faGFuZGxlRm9jdXNpbihldmVudCkpXG4gICAgRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9LRVlET1dOX1RBQiwgZXZlbnQgPT4gdGhpcy5faGFuZGxlS2V5ZG93bihldmVudCkpXG5cbiAgICB0aGlzLl9pc0FjdGl2ZSA9IHRydWVcbiAgfVxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgaWYgKCF0aGlzLl9pc0FjdGl2ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5faXNBY3RpdmUgPSBmYWxzZVxuICAgIEV2ZW50SGFuZGxlci5vZmYoZG9jdW1lbnQsIEVWRU5UX0tFWSlcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX2hhbmRsZUZvY3VzaW4oZXZlbnQpIHtcbiAgICBjb25zdCB7IHRyYXBFbGVtZW50IH0gPSB0aGlzLl9jb25maWdcblxuICAgIGlmIChldmVudC50YXJnZXQgPT09IGRvY3VtZW50IHx8IGV2ZW50LnRhcmdldCA9PT0gdHJhcEVsZW1lbnQgfHwgdHJhcEVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgZWxlbWVudHMgPSBTZWxlY3RvckVuZ2luZS5mb2N1c2FibGVDaGlsZHJlbih0cmFwRWxlbWVudClcblxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRyYXBFbGVtZW50LmZvY3VzKClcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2xhc3RUYWJOYXZEaXJlY3Rpb24gPT09IFRBQl9OQVZfQkFDS1dBUkQpIHtcbiAgICAgIGVsZW1lbnRzW2VsZW1lbnRzLmxlbmd0aCAtIDFdLmZvY3VzKClcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudHNbMF0uZm9jdXMoKVxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleSAhPT0gVEFCX0tFWSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5fbGFzdFRhYk5hdkRpcmVjdGlvbiA9IGV2ZW50LnNoaWZ0S2V5ID8gVEFCX05BVl9CQUNLV0FSRCA6IFRBQl9OQVZfRk9SV0FSRFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZvY3VzVHJhcFxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB1dGlsL3Njcm9sbEJhci5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmltcG9ydCBNYW5pcHVsYXRvciBmcm9tICcuLi9kb20vbWFuaXB1bGF0b3IuanMnXG5pbXBvcnQgU2VsZWN0b3JFbmdpbmUgZnJvbSAnLi4vZG9tL3NlbGVjdG9yLWVuZ2luZS5qcydcbmltcG9ydCB7IGlzRWxlbWVudCB9IGZyb20gJy4vaW5kZXguanMnXG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3QgU0VMRUNUT1JfRklYRURfQ09OVEVOVCA9ICcuZml4ZWQtdG9wLCAuZml4ZWQtYm90dG9tLCAuaXMtZml4ZWQsIC5zdGlja3ktdG9wJ1xuY29uc3QgU0VMRUNUT1JfU1RJQ0tZX0NPTlRFTlQgPSAnLnN0aWNreS10b3AnXG5jb25zdCBQUk9QRVJUWV9QQURESU5HID0gJ3BhZGRpbmctcmlnaHQnXG5jb25zdCBQUk9QRVJUWV9NQVJHSU4gPSAnbWFyZ2luLXJpZ2h0J1xuXG4vKipcbiAqIENsYXNzIGRlZmluaXRpb25cbiAqL1xuXG5jbGFzcyBTY3JvbGxCYXJIZWxwZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQuYm9keVxuICB9XG5cbiAgLy8gUHVibGljXG4gIGdldFdpZHRoKCkge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3cvaW5uZXJXaWR0aCN1c2FnZV9ub3Rlc1xuICAgIGNvbnN0IGRvY3VtZW50V2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcbiAgICByZXR1cm4gTWF0aC5hYnMod2luZG93LmlubmVyV2lkdGggLSBkb2N1bWVudFdpZHRoKVxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuZ2V0V2lkdGgoKVxuICAgIHRoaXMuX2Rpc2FibGVPdmVyRmxvdygpXG4gICAgLy8gZ2l2ZSBwYWRkaW5nIHRvIGVsZW1lbnQgdG8gYmFsYW5jZSB0aGUgaGlkZGVuIHNjcm9sbGJhciB3aWR0aFxuICAgIHRoaXMuX3NldEVsZW1lbnRBdHRyaWJ1dGVzKHRoaXMuX2VsZW1lbnQsIFBST1BFUlRZX1BBRERJTkcsIGNhbGN1bGF0ZWRWYWx1ZSA9PiBjYWxjdWxhdGVkVmFsdWUgKyB3aWR0aClcbiAgICAvLyB0cmljazogV2UgYWRqdXN0IHBvc2l0aXZlIHBhZGRpbmdSaWdodCBhbmQgbmVnYXRpdmUgbWFyZ2luUmlnaHQgdG8gc3RpY2t5LXRvcCBlbGVtZW50cyB0byBrZWVwIHNob3dpbmcgZnVsbHdpZHRoXG4gICAgdGhpcy5fc2V0RWxlbWVudEF0dHJpYnV0ZXMoU0VMRUNUT1JfRklYRURfQ09OVEVOVCwgUFJPUEVSVFlfUEFERElORywgY2FsY3VsYXRlZFZhbHVlID0+IGNhbGN1bGF0ZWRWYWx1ZSArIHdpZHRoKVxuICAgIHRoaXMuX3NldEVsZW1lbnRBdHRyaWJ1dGVzKFNFTEVDVE9SX1NUSUNLWV9DT05URU5ULCBQUk9QRVJUWV9NQVJHSU4sIGNhbGN1bGF0ZWRWYWx1ZSA9PiBjYWxjdWxhdGVkVmFsdWUgLSB3aWR0aClcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuX3Jlc2V0RWxlbWVudEF0dHJpYnV0ZXModGhpcy5fZWxlbWVudCwgJ292ZXJmbG93JylcbiAgICB0aGlzLl9yZXNldEVsZW1lbnRBdHRyaWJ1dGVzKHRoaXMuX2VsZW1lbnQsIFBST1BFUlRZX1BBRERJTkcpXG4gICAgdGhpcy5fcmVzZXRFbGVtZW50QXR0cmlidXRlcyhTRUxFQ1RPUl9GSVhFRF9DT05URU5ULCBQUk9QRVJUWV9QQURESU5HKVxuICAgIHRoaXMuX3Jlc2V0RWxlbWVudEF0dHJpYnV0ZXMoU0VMRUNUT1JfU1RJQ0tZX0NPTlRFTlQsIFBST1BFUlRZX01BUkdJTilcbiAgfVxuXG4gIGlzT3ZlcmZsb3dpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0V2lkdGgoKSA+IDBcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX2Rpc2FibGVPdmVyRmxvdygpIHtcbiAgICB0aGlzLl9zYXZlSW5pdGlhbEF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50LCAnb3ZlcmZsb3cnKVxuICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuICB9XG5cbiAgX3NldEVsZW1lbnRBdHRyaWJ1dGVzKHNlbGVjdG9yLCBzdHlsZVByb3BlcnR5LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHNjcm9sbGJhcldpZHRoID0gdGhpcy5nZXRXaWR0aCgpXG4gICAgY29uc3QgbWFuaXB1bGF0aW9uQ2FsbEJhY2sgPSBlbGVtZW50ID0+IHtcbiAgICAgIGlmIChlbGVtZW50ICE9PSB0aGlzLl9lbGVtZW50ICYmIHdpbmRvdy5pbm5lcldpZHRoID4gZWxlbWVudC5jbGllbnRXaWR0aCArIHNjcm9sbGJhcldpZHRoKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLl9zYXZlSW5pdGlhbEF0dHJpYnV0ZShlbGVtZW50LCBzdHlsZVByb3BlcnR5KVxuICAgICAgY29uc3QgY2FsY3VsYXRlZFZhbHVlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZVByb3BlcnR5KVxuICAgICAgZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShzdHlsZVByb3BlcnR5LCBgJHtjYWxsYmFjayhOdW1iZXIucGFyc2VGbG9hdChjYWxjdWxhdGVkVmFsdWUpKX1weGApXG4gICAgfVxuXG4gICAgdGhpcy5fYXBwbHlNYW5pcHVsYXRpb25DYWxsYmFjayhzZWxlY3RvciwgbWFuaXB1bGF0aW9uQ2FsbEJhY2spXG4gIH1cblxuICBfc2F2ZUluaXRpYWxBdHRyaWJ1dGUoZWxlbWVudCwgc3R5bGVQcm9wZXJ0eSkge1xuICAgIGNvbnN0IGFjdHVhbFZhbHVlID0gZWxlbWVudC5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlUHJvcGVydHkpXG4gICAgaWYgKGFjdHVhbFZhbHVlKSB7XG4gICAgICBNYW5pcHVsYXRvci5zZXREYXRhQXR0cmlidXRlKGVsZW1lbnQsIHN0eWxlUHJvcGVydHksIGFjdHVhbFZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIF9yZXNldEVsZW1lbnRBdHRyaWJ1dGVzKHNlbGVjdG9yLCBzdHlsZVByb3BlcnR5KSB7XG4gICAgY29uc3QgbWFuaXB1bGF0aW9uQ2FsbEJhY2sgPSBlbGVtZW50ID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gTWFuaXB1bGF0b3IuZ2V0RGF0YUF0dHJpYnV0ZShlbGVtZW50LCBzdHlsZVByb3BlcnR5KVxuICAgICAgLy8gV2Ugb25seSB3YW50IHRvIHJlbW92ZSB0aGUgcHJvcGVydHkgaWYgdGhlIHZhbHVlIGlzIGBudWxsYDsgdGhlIHZhbHVlIGNhbiBhbHNvIGJlIHplcm9cbiAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KHN0eWxlUHJvcGVydHkpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBNYW5pcHVsYXRvci5yZW1vdmVEYXRhQXR0cmlidXRlKGVsZW1lbnQsIHN0eWxlUHJvcGVydHkpXG4gICAgICBlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KHN0eWxlUHJvcGVydHksIHZhbHVlKVxuICAgIH1cblxuICAgIHRoaXMuX2FwcGx5TWFuaXB1bGF0aW9uQ2FsbGJhY2soc2VsZWN0b3IsIG1hbmlwdWxhdGlvbkNhbGxCYWNrKVxuICB9XG5cbiAgX2FwcGx5TWFuaXB1bGF0aW9uQ2FsbGJhY2soc2VsZWN0b3IsIGNhbGxCYWNrKSB7XG4gICAgaWYgKGlzRWxlbWVudChzZWxlY3RvcikpIHtcbiAgICAgIGNhbGxCYWNrKHNlbGVjdG9yKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBzZWwgb2YgU2VsZWN0b3JFbmdpbmUuZmluZChzZWxlY3RvciwgdGhpcy5fZWxlbWVudCkpIHtcbiAgICAgIGNhbGxCYWNrKHNlbClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2Nyb2xsQmFySGVscGVyXG4iLCAiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIG1vZGFsLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuaW1wb3J0IEJhc2VDb21wb25lbnQgZnJvbSAnLi9iYXNlLWNvbXBvbmVudC5qcydcbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSAnLi9kb20vZXZlbnQtaGFuZGxlci5qcydcbmltcG9ydCBTZWxlY3RvckVuZ2luZSBmcm9tICcuL2RvbS9zZWxlY3Rvci1lbmdpbmUuanMnXG5pbXBvcnQgQmFja2Ryb3AgZnJvbSAnLi91dGlsL2JhY2tkcm9wLmpzJ1xuaW1wb3J0IHsgZW5hYmxlRGlzbWlzc1RyaWdnZXIgfSBmcm9tICcuL3V0aWwvY29tcG9uZW50LWZ1bmN0aW9ucy5qcydcbmltcG9ydCBGb2N1c1RyYXAgZnJvbSAnLi91dGlsL2ZvY3VzdHJhcC5qcydcbmltcG9ydCB7XG4gIGRlZmluZUpRdWVyeVBsdWdpbiwgaXNSVEwsIGlzVmlzaWJsZSwgcmVmbG93XG59IGZyb20gJy4vdXRpbC9pbmRleC5qcydcbmltcG9ydCBTY3JvbGxCYXJIZWxwZXIgZnJvbSAnLi91dGlsL3Njcm9sbGJhci5qcydcblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCBOQU1FID0gJ21vZGFsJ1xuY29uc3QgREFUQV9LRVkgPSAnYnMubW9kYWwnXG5jb25zdCBFVkVOVF9LRVkgPSBgLiR7REFUQV9LRVl9YFxuY29uc3QgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSdcbmNvbnN0IEVTQ0FQRV9LRVkgPSAnRXNjYXBlJ1xuXG5jb25zdCBFVkVOVF9ISURFID0gYGhpZGUke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9ISURFX1BSRVZFTlRFRCA9IGBoaWRlUHJldmVudGVkJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfSElEREVOID0gYGhpZGRlbiR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX1NIT1cgPSBgc2hvdyR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX1NIT1dOID0gYHNob3duJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfUkVTSVpFID0gYHJlc2l6ZSR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX0NMSUNLX0RJU01JU1MgPSBgY2xpY2suZGlzbWlzcyR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX01PVVNFRE9XTl9ESVNNSVNTID0gYG1vdXNlZG93bi5kaXNtaXNzJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfS0VZRE9XTl9ESVNNSVNTID0gYGtleWRvd24uZGlzbWlzcyR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX0NMSUNLX0RBVEFfQVBJID0gYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxuXG5jb25zdCBDTEFTU19OQU1FX09QRU4gPSAnbW9kYWwtb3BlbidcbmNvbnN0IENMQVNTX05BTUVfRkFERSA9ICdmYWRlJ1xuY29uc3QgQ0xBU1NfTkFNRV9TSE9XID0gJ3Nob3cnXG5jb25zdCBDTEFTU19OQU1FX1NUQVRJQyA9ICdtb2RhbC1zdGF0aWMnXG5cbmNvbnN0IE9QRU5fU0VMRUNUT1IgPSAnLm1vZGFsLnNob3cnXG5jb25zdCBTRUxFQ1RPUl9ESUFMT0cgPSAnLm1vZGFsLWRpYWxvZydcbmNvbnN0IFNFTEVDVE9SX01PREFMX0JPRFkgPSAnLm1vZGFsLWJvZHknXG5jb25zdCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSA9ICdbZGF0YS1icy10b2dnbGU9XCJtb2RhbFwiXSdcblxuY29uc3QgRGVmYXVsdCA9IHtcbiAgYmFja2Ryb3A6IHRydWUsXG4gIGZvY3VzOiB0cnVlLFxuICBrZXlib2FyZDogdHJ1ZVxufVxuXG5jb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgYmFja2Ryb3A6ICcoYm9vbGVhbnxzdHJpbmcpJyxcbiAgZm9jdXM6ICdib29sZWFuJyxcbiAga2V5Ym9hcmQ6ICdib29sZWFuJ1xufVxuXG4vKipcbiAqIENsYXNzIGRlZmluaXRpb25cbiAqL1xuXG5jbGFzcyBNb2RhbCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICBzdXBlcihlbGVtZW50LCBjb25maWcpXG5cbiAgICB0aGlzLl9kaWFsb2cgPSBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX0RJQUxPRywgdGhpcy5fZWxlbWVudClcbiAgICB0aGlzLl9iYWNrZHJvcCA9IHRoaXMuX2luaXRpYWxpemVCYWNrRHJvcCgpXG4gICAgdGhpcy5fZm9jdXN0cmFwID0gdGhpcy5faW5pdGlhbGl6ZUZvY3VzVHJhcCgpXG4gICAgdGhpcy5faXNTaG93biA9IGZhbHNlXG4gICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcbiAgICB0aGlzLl9zY3JvbGxCYXIgPSBuZXcgU2Nyb2xsQmFySGVscGVyKClcblxuICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKClcbiAgfVxuXG4gIC8vIEdldHRlcnNcbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiBEZWZhdWx0XG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgIHJldHVybiBEZWZhdWx0VHlwZVxuICB9XG5cbiAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiBOQU1FXG4gIH1cblxuICAvLyBQdWJsaWNcbiAgdG9nZ2xlKHJlbGF0ZWRUYXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTaG93biA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KHJlbGF0ZWRUYXJnZXQpXG4gIH1cblxuICBzaG93KHJlbGF0ZWRUYXJnZXQpIHtcbiAgICBpZiAodGhpcy5faXNTaG93biB8fCB0aGlzLl9pc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHNob3dFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1NIT1csIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXRcbiAgICB9KVxuXG4gICAgaWYgKHNob3dFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLl9pc1Nob3duID0gdHJ1ZVxuICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWVcblxuICAgIHRoaXMuX3Njcm9sbEJhci5oaWRlKClcblxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX09QRU4pXG5cbiAgICB0aGlzLl9hZGp1c3REaWFsb2coKVxuXG4gICAgdGhpcy5fYmFja2Ryb3Auc2hvdygoKSA9PiB0aGlzLl9zaG93RWxlbWVudChyZWxhdGVkVGFyZ2V0KSlcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1Nob3duIHx8IHRoaXMuX2lzVHJhbnNpdGlvbmluZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgaGlkZUV2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElERSlcblxuICAgIGlmIChoaWRlRXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5faXNTaG93biA9IGZhbHNlXG4gICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gdHJ1ZVxuICAgIHRoaXMuX2ZvY3VzdHJhcC5kZWFjdGl2YXRlKClcblxuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX1NIT1cpXG5cbiAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKCgpID0+IHRoaXMuX2hpZGVNb2RhbCgpLCB0aGlzLl9lbGVtZW50LCB0aGlzLl9pc0FuaW1hdGVkKCkpXG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgIEV2ZW50SGFuZGxlci5vZmYod2luZG93LCBFVkVOVF9LRVkpXG4gICAgRXZlbnRIYW5kbGVyLm9mZih0aGlzLl9kaWFsb2csIEVWRU5UX0tFWSlcblxuICAgIHRoaXMuX2JhY2tkcm9wLmRpc3Bvc2UoKVxuICAgIHRoaXMuX2ZvY3VzdHJhcC5kZWFjdGl2YXRlKClcblxuICAgIHN1cGVyLmRpc3Bvc2UoKVxuICB9XG5cbiAgaGFuZGxlVXBkYXRlKCkge1xuICAgIHRoaXMuX2FkanVzdERpYWxvZygpXG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF9pbml0aWFsaXplQmFja0Ryb3AoKSB7XG4gICAgcmV0dXJuIG5ldyBCYWNrZHJvcCh7XG4gICAgICBpc1Zpc2libGU6IEJvb2xlYW4odGhpcy5fY29uZmlnLmJhY2tkcm9wKSwgLy8gJ3N0YXRpYycgb3B0aW9uIHdpbGwgYmUgdHJhbnNsYXRlZCB0byB0cnVlLCBhbmQgYm9vbGVhbnMgd2lsbCBrZWVwIHRoZWlyIHZhbHVlLFxuICAgICAgaXNBbmltYXRlZDogdGhpcy5faXNBbmltYXRlZCgpXG4gICAgfSlcbiAgfVxuXG4gIF9pbml0aWFsaXplRm9jdXNUcmFwKCkge1xuICAgIHJldHVybiBuZXcgRm9jdXNUcmFwKHtcbiAgICAgIHRyYXBFbGVtZW50OiB0aGlzLl9lbGVtZW50XG4gICAgfSlcbiAgfVxuXG4gIF9zaG93RWxlbWVudChyZWxhdGVkVGFyZ2V0KSB7XG4gICAgLy8gdHJ5IHRvIGFwcGVuZCBkeW5hbWljIG1vZGFsXG4gICAgaWYgKCFkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHRoaXMuX2VsZW1lbnQpKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh0aGlzLl9lbGVtZW50KVxuICAgIH1cblxuICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICB0aGlzLl9lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKVxuICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLW1vZGFsJywgdHJ1ZSlcbiAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKVxuICAgIHRoaXMuX2VsZW1lbnQuc2Nyb2xsVG9wID0gMFxuXG4gICAgY29uc3QgbW9kYWxCb2R5ID0gU2VsZWN0b3JFbmdpbmUuZmluZE9uZShTRUxFQ1RPUl9NT0RBTF9CT0RZLCB0aGlzLl9kaWFsb2cpXG4gICAgaWYgKG1vZGFsQm9keSkge1xuICAgICAgbW9kYWxCb2R5LnNjcm9sbFRvcCA9IDBcbiAgICB9XG5cbiAgICByZWZsb3codGhpcy5fZWxlbWVudClcblxuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX1NIT1cpXG5cbiAgICBjb25zdCB0cmFuc2l0aW9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fY29uZmlnLmZvY3VzKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzdHJhcC5hY3RpdmF0ZSgpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlXG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9TSE9XTiwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0XG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2sodHJhbnNpdGlvbkNvbXBsZXRlLCB0aGlzLl9kaWFsb2csIHRoaXMuX2lzQW5pbWF0ZWQoKSlcbiAgfVxuXG4gIF9hZGRFdmVudExpc3RlbmVycygpIHtcbiAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgRVZFTlRfS0VZRE9XTl9ESVNNSVNTLCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBFU0NBUEVfS0VZKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLl90cmlnZ2VyQmFja2Ryb3BUcmFuc2l0aW9uKClcbiAgICB9KVxuXG4gICAgRXZlbnRIYW5kbGVyLm9uKHdpbmRvdywgRVZFTlRfUkVTSVpFLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5faXNTaG93biAmJiAhdGhpcy5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgIHRoaXMuX2FkanVzdERpYWxvZygpXG4gICAgICB9XG4gICAgfSlcblxuICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9NT1VTRURPV05fRElTTUlTUywgZXZlbnQgPT4ge1xuICAgICAgLy8gYSBiYWQgdHJpY2sgdG8gc2VncmVnYXRlIGNsaWNrcyB0aGF0IG1heSBzdGFydCBpbnNpZGUgZGlhbG9nIGJ1dCBlbmQgb3V0c2lkZSwgYW5kIGF2b2lkIGxpc3RlbiB0byBzY3JvbGxiYXIgY2xpY2tzXG4gICAgICBFdmVudEhhbmRsZXIub25lKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0NMSUNLX0RJU01JU1MsIGV2ZW50MiA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9lbGVtZW50ICE9PSBldmVudC50YXJnZXQgfHwgdGhpcy5fZWxlbWVudCAhPT0gZXZlbnQyLnRhcmdldCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5iYWNrZHJvcCA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICB0aGlzLl90cmlnZ2VyQmFja2Ryb3BUcmFuc2l0aW9uKClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcuYmFja2Ryb3ApIHtcbiAgICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBfaGlkZU1vZGFsKCkge1xuICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpXG4gICAgdGhpcy5fZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnKVxuICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdyb2xlJylcbiAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZVxuXG4gICAgdGhpcy5fYmFja2Ryb3AuaGlkZSgoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9PUEVOKVxuICAgICAgdGhpcy5fcmVzZXRBZGp1c3RtZW50cygpXG4gICAgICB0aGlzLl9zY3JvbGxCYXIucmVzZXQoKVxuICAgICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElEREVOKVxuICAgIH0pXG4gIH1cblxuICBfaXNBbmltYXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9GQURFKVxuICB9XG5cbiAgX3RyaWdnZXJCYWNrZHJvcFRyYW5zaXRpb24oKSB7XG4gICAgY29uc3QgaGlkZUV2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElERV9QUkVWRU5URUQpXG4gICAgaWYgKGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBpc01vZGFsT3ZlcmZsb3dpbmcgPSB0aGlzLl9lbGVtZW50LnNjcm9sbEhlaWdodCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICBjb25zdCBpbml0aWFsT3ZlcmZsb3dZID0gdGhpcy5fZWxlbWVudC5zdHlsZS5vdmVyZmxvd1lcbiAgICAvLyByZXR1cm4gaWYgdGhlIGZvbGxvd2luZyBiYWNrZ3JvdW5kIHRyYW5zaXRpb24gaGFzbid0IHlldCBjb21wbGV0ZWRcbiAgICBpZiAoaW5pdGlhbE92ZXJmbG93WSA9PT0gJ2hpZGRlbicgfHwgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9TVEFUSUMpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoIWlzTW9kYWxPdmVyZmxvd2luZykge1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJ1xuICAgIH1cblxuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX1NUQVRJQylcbiAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX1NUQVRJQylcbiAgICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLm92ZXJmbG93WSA9IGluaXRpYWxPdmVyZmxvd1lcbiAgICAgIH0sIHRoaXMuX2RpYWxvZylcbiAgICB9LCB0aGlzLl9kaWFsb2cpXG5cbiAgICB0aGlzLl9lbGVtZW50LmZvY3VzKClcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZm9sbG93aW5nIG1ldGhvZHMgYXJlIHVzZWQgdG8gaGFuZGxlIG92ZXJmbG93aW5nIG1vZGFsc1xuICAgKi9cblxuICBfYWRqdXN0RGlhbG9nKCkge1xuICAgIGNvbnN0IGlzTW9kYWxPdmVyZmxvd2luZyA9IHRoaXMuX2VsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICAgIGNvbnN0IHNjcm9sbGJhcldpZHRoID0gdGhpcy5fc2Nyb2xsQmFyLmdldFdpZHRoKClcbiAgICBjb25zdCBpc0JvZHlPdmVyZmxvd2luZyA9IHNjcm9sbGJhcldpZHRoID4gMFxuXG4gICAgaWYgKGlzQm9keU92ZXJmbG93aW5nICYmICFpc01vZGFsT3ZlcmZsb3dpbmcpIHtcbiAgICAgIGNvbnN0IHByb3BlcnR5ID0gaXNSVEwoKSA/ICdwYWRkaW5nTGVmdCcgOiAncGFkZGluZ1JpZ2h0J1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtwcm9wZXJ0eV0gPSBgJHtzY3JvbGxiYXJXaWR0aH1weGBcbiAgICB9XG5cbiAgICBpZiAoIWlzQm9keU92ZXJmbG93aW5nICYmIGlzTW9kYWxPdmVyZmxvd2luZykge1xuICAgICAgY29uc3QgcHJvcGVydHkgPSBpc1JUTCgpID8gJ3BhZGRpbmdSaWdodCcgOiAncGFkZGluZ0xlZnQnXG4gICAgICB0aGlzLl9lbGVtZW50LnN0eWxlW3Byb3BlcnR5XSA9IGAke3Njcm9sbGJhcldpZHRofXB4YFxuICAgIH1cbiAgfVxuXG4gIF9yZXNldEFkanVzdG1lbnRzKCkge1xuICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucGFkZGluZ0xlZnQgPSAnJ1xuICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJydcbiAgfVxuXG4gIC8vIFN0YXRpY1xuICBzdGF0aWMgalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZywgcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZGF0YSA9IE1vZGFsLmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcywgY29uZmlnKVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICB9XG5cbiAgICAgIGRhdGFbY29uZmlnXShyZWxhdGVkVGFyZ2V0KVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBEYXRhIEFQSSBpbXBsZW1lbnRhdGlvblxuICovXG5cbkV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfQ0xJQ0tfREFUQV9BUEksIFNFTEVDVE9SX0RBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgY29uc3QgdGFyZ2V0ID0gU2VsZWN0b3JFbmdpbmUuZ2V0RWxlbWVudEZyb21TZWxlY3Rvcih0aGlzKVxuXG4gIGlmIChbJ0EnLCAnQVJFQSddLmluY2x1ZGVzKHRoaXMudGFnTmFtZSkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICBFdmVudEhhbmRsZXIub25lKHRhcmdldCwgRVZFTlRfU0hPVywgc2hvd0V2ZW50ID0+IHtcbiAgICBpZiAoc2hvd0V2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIC8vIG9ubHkgcmVnaXN0ZXIgZm9jdXMgcmVzdG9yZXIgaWYgbW9kYWwgd2lsbCBhY3R1YWxseSBnZXQgc2hvd25cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIEV2ZW50SGFuZGxlci5vbmUodGFyZ2V0LCBFVkVOVF9ISURERU4sICgpID0+IHtcbiAgICAgIGlmIChpc1Zpc2libGUodGhpcykpIHtcbiAgICAgICAgdGhpcy5mb2N1cygpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICAvLyBhdm9pZCBjb25mbGljdCB3aGVuIGNsaWNraW5nIG1vZGFsIHRvZ2dsZXIgd2hpbGUgYW5vdGhlciBvbmUgaXMgb3BlblxuICBjb25zdCBhbHJlYWR5T3BlbiA9IFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoT1BFTl9TRUxFQ1RPUilcbiAgaWYgKGFscmVhZHlPcGVuKSB7XG4gICAgTW9kYWwuZ2V0SW5zdGFuY2UoYWxyZWFkeU9wZW4pLmhpZGUoKVxuICB9XG5cbiAgY29uc3QgZGF0YSA9IE1vZGFsLmdldE9yQ3JlYXRlSW5zdGFuY2UodGFyZ2V0KVxuXG4gIGRhdGEudG9nZ2xlKHRoaXMpXG59KVxuXG5lbmFibGVEaXNtaXNzVHJpZ2dlcihNb2RhbClcblxuLyoqXG4gKiBqUXVlcnlcbiAqL1xuXG5kZWZpbmVKUXVlcnlQbHVnaW4oTW9kYWwpXG5cbmV4cG9ydCBkZWZhdWx0IE1vZGFsXG4iLCAiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIG9mZmNhbnZhcy5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmltcG9ydCBCYXNlQ29tcG9uZW50IGZyb20gJy4vYmFzZS1jb21wb25lbnQuanMnXG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gJy4vZG9tL2V2ZW50LWhhbmRsZXIuanMnXG5pbXBvcnQgU2VsZWN0b3JFbmdpbmUgZnJvbSAnLi9kb20vc2VsZWN0b3ItZW5naW5lLmpzJ1xuaW1wb3J0IEJhY2tkcm9wIGZyb20gJy4vdXRpbC9iYWNrZHJvcC5qcydcbmltcG9ydCB7IGVuYWJsZURpc21pc3NUcmlnZ2VyIH0gZnJvbSAnLi91dGlsL2NvbXBvbmVudC1mdW5jdGlvbnMuanMnXG5pbXBvcnQgRm9jdXNUcmFwIGZyb20gJy4vdXRpbC9mb2N1c3RyYXAuanMnXG5pbXBvcnQge1xuICBkZWZpbmVKUXVlcnlQbHVnaW4sXG4gIGlzRGlzYWJsZWQsXG4gIGlzVmlzaWJsZVxufSBmcm9tICcuL3V0aWwvaW5kZXguanMnXG5pbXBvcnQgU2Nyb2xsQmFySGVscGVyIGZyb20gJy4vdXRpbC9zY3JvbGxiYXIuanMnXG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3QgTkFNRSA9ICdvZmZjYW52YXMnXG5jb25zdCBEQVRBX0tFWSA9ICdicy5vZmZjYW52YXMnXG5jb25zdCBFVkVOVF9LRVkgPSBgLiR7REFUQV9LRVl9YFxuY29uc3QgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSdcbmNvbnN0IEVWRU5UX0xPQURfREFUQV9BUEkgPSBgbG9hZCR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbmNvbnN0IEVTQ0FQRV9LRVkgPSAnRXNjYXBlJ1xuXG5jb25zdCBDTEFTU19OQU1FX1NIT1cgPSAnc2hvdydcbmNvbnN0IENMQVNTX05BTUVfU0hPV0lORyA9ICdzaG93aW5nJ1xuY29uc3QgQ0xBU1NfTkFNRV9ISURJTkcgPSAnaGlkaW5nJ1xuY29uc3QgQ0xBU1NfTkFNRV9CQUNLRFJPUCA9ICdvZmZjYW52YXMtYmFja2Ryb3AnXG5jb25zdCBPUEVOX1NFTEVDVE9SID0gJy5vZmZjYW52YXMuc2hvdydcblxuY29uc3QgRVZFTlRfU0hPVyA9IGBzaG93JHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfU0hPV04gPSBgc2hvd24ke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9ISURFID0gYGhpZGUke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9ISURFX1BSRVZFTlRFRCA9IGBoaWRlUHJldmVudGVkJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfSElEREVOID0gYGhpZGRlbiR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX1JFU0laRSA9IGByZXNpemUke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9DTElDS19EQVRBX0FQSSA9IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbmNvbnN0IEVWRU5UX0tFWURPV05fRElTTUlTUyA9IGBrZXlkb3duLmRpc21pc3Mke0VWRU5UX0tFWX1gXG5cbmNvbnN0IFNFTEVDVE9SX0RBVEFfVE9HR0xFID0gJ1tkYXRhLWJzLXRvZ2dsZT1cIm9mZmNhbnZhc1wiXSdcblxuY29uc3QgRGVmYXVsdCA9IHtcbiAgYmFja2Ryb3A6IHRydWUsXG4gIGtleWJvYXJkOiB0cnVlLFxuICBzY3JvbGw6IGZhbHNlXG59XG5cbmNvbnN0IERlZmF1bHRUeXBlID0ge1xuICBiYWNrZHJvcDogJyhib29sZWFufHN0cmluZyknLFxuICBrZXlib2FyZDogJ2Jvb2xlYW4nLFxuICBzY3JvbGw6ICdib29sZWFuJ1xufVxuXG4vKipcbiAqIENsYXNzIGRlZmluaXRpb25cbiAqL1xuXG5jbGFzcyBPZmZjYW52YXMgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgY29uZmlnKVxuXG4gICAgdGhpcy5faXNTaG93biA9IGZhbHNlXG4gICAgdGhpcy5fYmFja2Ryb3AgPSB0aGlzLl9pbml0aWFsaXplQmFja0Ryb3AoKVxuICAgIHRoaXMuX2ZvY3VzdHJhcCA9IHRoaXMuX2luaXRpYWxpemVGb2N1c1RyYXAoKVxuICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKClcbiAgfVxuXG4gIC8vIEdldHRlcnNcbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiBEZWZhdWx0XG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgIHJldHVybiBEZWZhdWx0VHlwZVxuICB9XG5cbiAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiBOQU1FXG4gIH1cblxuICAvLyBQdWJsaWNcbiAgdG9nZ2xlKHJlbGF0ZWRUYXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTaG93biA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KHJlbGF0ZWRUYXJnZXQpXG4gIH1cblxuICBzaG93KHJlbGF0ZWRUYXJnZXQpIHtcbiAgICBpZiAodGhpcy5faXNTaG93bikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgc2hvd0V2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfU0hPVywgeyByZWxhdGVkVGFyZ2V0IH0pXG5cbiAgICBpZiAoc2hvd0V2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX2lzU2hvd24gPSB0cnVlXG4gICAgdGhpcy5fYmFja2Ryb3Auc2hvdygpXG5cbiAgICBpZiAoIXRoaXMuX2NvbmZpZy5zY3JvbGwpIHtcbiAgICAgIG5ldyBTY3JvbGxCYXJIZWxwZXIoKS5oaWRlKClcbiAgICB9XG5cbiAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1tb2RhbCcsIHRydWUpXG4gICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnZGlhbG9nJylcbiAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9TSE9XSU5HKVxuXG4gICAgY29uc3QgY29tcGxldGVDYWxsQmFjayA9ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5fY29uZmlnLnNjcm9sbCB8fCB0aGlzLl9jb25maWcuYmFja2Ryb3ApIHtcbiAgICAgICAgdGhpcy5fZm9jdXN0cmFwLmFjdGl2YXRlKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVylcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX1NIT1dJTkcpXG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9TSE9XTiwgeyByZWxhdGVkVGFyZ2V0IH0pXG4gICAgfVxuXG4gICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZUNhbGxCYWNrLCB0aGlzLl9lbGVtZW50LCB0cnVlKVxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICBpZiAoIXRoaXMuX2lzU2hvd24pIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGhpZGVFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJREUpXG5cbiAgICBpZiAoaGlkZUV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX2ZvY3VzdHJhcC5kZWFjdGl2YXRlKClcbiAgICB0aGlzLl9lbGVtZW50LmJsdXIoKVxuICAgIHRoaXMuX2lzU2hvd24gPSBmYWxzZVxuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0hJRElORylcbiAgICB0aGlzLl9iYWNrZHJvcC5oaWRlKClcblxuICAgIGNvbnN0IGNvbXBsZXRlQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XLCBDTEFTU19OQU1FX0hJRElORylcbiAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLW1vZGFsJylcbiAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdyb2xlJylcblxuICAgICAgaWYgKCF0aGlzLl9jb25maWcuc2Nyb2xsKSB7XG4gICAgICAgIG5ldyBTY3JvbGxCYXJIZWxwZXIoKS5yZXNldCgpXG4gICAgICB9XG5cbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJRERFTilcbiAgICB9XG5cbiAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKGNvbXBsZXRlQ2FsbGJhY2ssIHRoaXMuX2VsZW1lbnQsIHRydWUpXG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgIHRoaXMuX2JhY2tkcm9wLmRpc3Bvc2UoKVxuICAgIHRoaXMuX2ZvY3VzdHJhcC5kZWFjdGl2YXRlKClcbiAgICBzdXBlci5kaXNwb3NlKClcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX2luaXRpYWxpemVCYWNrRHJvcCgpIHtcbiAgICBjb25zdCBjbGlja0NhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5iYWNrZHJvcCA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElERV9QUkVWRU5URUQpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLmhpZGUoKVxuICAgIH1cblxuICAgIC8vICdzdGF0aWMnIG9wdGlvbiB3aWxsIGJlIHRyYW5zbGF0ZWQgdG8gdHJ1ZSwgYW5kIGJvb2xlYW5zIHdpbGwga2VlcCB0aGVpciB2YWx1ZVxuICAgIGNvbnN0IGlzVmlzaWJsZSA9IEJvb2xlYW4odGhpcy5fY29uZmlnLmJhY2tkcm9wKVxuXG4gICAgcmV0dXJuIG5ldyBCYWNrZHJvcCh7XG4gICAgICBjbGFzc05hbWU6IENMQVNTX05BTUVfQkFDS0RST1AsXG4gICAgICBpc1Zpc2libGUsXG4gICAgICBpc0FuaW1hdGVkOiB0cnVlLFxuICAgICAgcm9vdEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZSxcbiAgICAgIGNsaWNrQ2FsbGJhY2s6IGlzVmlzaWJsZSA/IGNsaWNrQ2FsbGJhY2sgOiBudWxsXG4gICAgfSlcbiAgfVxuXG4gIF9pbml0aWFsaXplRm9jdXNUcmFwKCkge1xuICAgIHJldHVybiBuZXcgRm9jdXNUcmFwKHtcbiAgICAgIHRyYXBFbGVtZW50OiB0aGlzLl9lbGVtZW50XG4gICAgfSlcbiAgfVxuXG4gIF9hZGRFdmVudExpc3RlbmVycygpIHtcbiAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgRVZFTlRfS0VZRE9XTl9ESVNNSVNTLCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBFU0NBUEVfS0VZKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9ISURFX1BSRVZFTlRFRClcbiAgICB9KVxuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gT2ZmY2FudmFzLmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcywgY29uZmlnKVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCB8fCBjb25maWcuc3RhcnRzV2l0aCgnXycpIHx8IGNvbmZpZyA9PT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICB9XG5cbiAgICAgIGRhdGFbY29uZmlnXSh0aGlzKVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBEYXRhIEFQSSBpbXBsZW1lbnRhdGlvblxuICovXG5cbkV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfQ0xJQ0tfREFUQV9BUEksIFNFTEVDVE9SX0RBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgY29uc3QgdGFyZ2V0ID0gU2VsZWN0b3JFbmdpbmUuZ2V0RWxlbWVudEZyb21TZWxlY3Rvcih0aGlzKVxuXG4gIGlmIChbJ0EnLCAnQVJFQSddLmluY2x1ZGVzKHRoaXMudGFnTmFtZSkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICBpZiAoaXNEaXNhYmxlZCh0aGlzKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgRXZlbnRIYW5kbGVyLm9uZSh0YXJnZXQsIEVWRU5UX0hJRERFTiwgKCkgPT4ge1xuICAgIC8vIGZvY3VzIG9uIHRyaWdnZXIgd2hlbiBpdCBpcyBjbG9zZWRcbiAgICBpZiAoaXNWaXNpYmxlKHRoaXMpKSB7XG4gICAgICB0aGlzLmZvY3VzKClcbiAgICB9XG4gIH0pXG5cbiAgLy8gYXZvaWQgY29uZmxpY3Qgd2hlbiBjbGlja2luZyBhIHRvZ2dsZXIgb2YgYW4gb2ZmY2FudmFzLCB3aGlsZSBhbm90aGVyIGlzIG9wZW5cbiAgY29uc3QgYWxyZWFkeU9wZW4gPSBTZWxlY3RvckVuZ2luZS5maW5kT25lKE9QRU5fU0VMRUNUT1IpXG4gIGlmIChhbHJlYWR5T3BlbiAmJiBhbHJlYWR5T3BlbiAhPT0gdGFyZ2V0KSB7XG4gICAgT2ZmY2FudmFzLmdldEluc3RhbmNlKGFscmVhZHlPcGVuKS5oaWRlKClcbiAgfVxuXG4gIGNvbnN0IGRhdGEgPSBPZmZjYW52YXMuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0YXJnZXQpXG4gIGRhdGEudG9nZ2xlKHRoaXMpXG59KVxuXG5FdmVudEhhbmRsZXIub24od2luZG93LCBFVkVOVF9MT0FEX0RBVEFfQVBJLCAoKSA9PiB7XG4gIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgU2VsZWN0b3JFbmdpbmUuZmluZChPUEVOX1NFTEVDVE9SKSkge1xuICAgIE9mZmNhbnZhcy5nZXRPckNyZWF0ZUluc3RhbmNlKHNlbGVjdG9yKS5zaG93KClcbiAgfVxufSlcblxuRXZlbnRIYW5kbGVyLm9uKHdpbmRvdywgRVZFTlRfUkVTSVpFLCAoKSA9PiB7XG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiBTZWxlY3RvckVuZ2luZS5maW5kKCdbYXJpYS1tb2RhbF1bY2xhc3MqPXNob3ddW2NsYXNzKj1vZmZjYW52YXMtXScpKSB7XG4gICAgaWYgKGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24gIT09ICdmaXhlZCcpIHtcbiAgICAgIE9mZmNhbnZhcy5nZXRPckNyZWF0ZUluc3RhbmNlKGVsZW1lbnQpLmhpZGUoKVxuICAgIH1cbiAgfVxufSlcblxuZW5hYmxlRGlzbWlzc1RyaWdnZXIoT2ZmY2FudmFzKVxuXG4vKipcbiAqIGpRdWVyeVxuICovXG5cbmRlZmluZUpRdWVyeVBsdWdpbihPZmZjYW52YXMpXG5cbmV4cG9ydCBkZWZhdWx0IE9mZmNhbnZhc1xuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB1dGlsL3Nhbml0aXplci5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbi8vIGpzLWRvY3Mtc3RhcnQgYWxsb3ctbGlzdFxuY29uc3QgQVJJQV9BVFRSSUJVVEVfUEFUVEVSTiA9IC9eYXJpYS1bXFx3LV0qJC9pXG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0QWxsb3dsaXN0ID0ge1xuICAvLyBHbG9iYWwgYXR0cmlidXRlcyBhbGxvd2VkIG9uIGFueSBzdXBwbGllZCBlbGVtZW50IGJlbG93LlxuICAnKic6IFsnY2xhc3MnLCAnZGlyJywgJ2lkJywgJ2xhbmcnLCAncm9sZScsIEFSSUFfQVRUUklCVVRFX1BBVFRFUk5dLFxuICBhOiBbJ3RhcmdldCcsICdocmVmJywgJ3RpdGxlJywgJ3JlbCddLFxuICBhcmVhOiBbXSxcbiAgYjogW10sXG4gIGJyOiBbXSxcbiAgY29sOiBbXSxcbiAgY29kZTogW10sXG4gIGRkOiBbXSxcbiAgZGl2OiBbXSxcbiAgZGw6IFtdLFxuICBkdDogW10sXG4gIGVtOiBbXSxcbiAgaHI6IFtdLFxuICBoMTogW10sXG4gIGgyOiBbXSxcbiAgaDM6IFtdLFxuICBoNDogW10sXG4gIGg1OiBbXSxcbiAgaDY6IFtdLFxuICBpOiBbXSxcbiAgaW1nOiBbJ3NyYycsICdzcmNzZXQnLCAnYWx0JywgJ3RpdGxlJywgJ3dpZHRoJywgJ2hlaWdodCddLFxuICBsaTogW10sXG4gIG9sOiBbXSxcbiAgcDogW10sXG4gIHByZTogW10sXG4gIHM6IFtdLFxuICBzbWFsbDogW10sXG4gIHNwYW46IFtdLFxuICBzdWI6IFtdLFxuICBzdXA6IFtdLFxuICBzdHJvbmc6IFtdLFxuICB1OiBbXSxcbiAgdWw6IFtdXG59XG4vLyBqcy1kb2NzLWVuZCBhbGxvdy1saXN0XG5cbmNvbnN0IHVyaUF0dHJpYnV0ZXMgPSBuZXcgU2V0KFtcbiAgJ2JhY2tncm91bmQnLFxuICAnY2l0ZScsXG4gICdocmVmJyxcbiAgJ2l0ZW10eXBlJyxcbiAgJ2xvbmdkZXNjJyxcbiAgJ3Bvc3RlcicsXG4gICdzcmMnLFxuICAneGxpbms6aHJlZidcbl0pXG5cbi8qKlxuICogQSBwYXR0ZXJuIHRoYXQgcmVjb2duaXplcyBVUkxzIHRoYXQgYXJlIHNhZmUgd3J0LiBYU1MgaW4gVVJMIG5hdmlnYXRpb25cbiAqIGNvbnRleHRzLlxuICpcbiAqIFNob3V0LW91dCB0byBBbmd1bGFyIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi8xNS4yLjgvcGFja2FnZXMvY29yZS9zcmMvc2FuaXRpemF0aW9uL3VybF9zYW5pdGl6ZXIudHMjTDM4XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL2JldHRlci1yZWdleFxuY29uc3QgU0FGRV9VUkxfUEFUVEVSTiA9IC9eKD8hamF2YXNjcmlwdDopKD86W2EtejAtOSsuLV0rOnxbXiY6Lz8jXSooPzpbLz8jXXwkKSkvaVxuXG5jb25zdCBhbGxvd2VkQXR0cmlidXRlID0gKGF0dHJpYnV0ZSwgYWxsb3dlZEF0dHJpYnV0ZUxpc3QpID0+IHtcbiAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpXG5cbiAgaWYgKGFsbG93ZWRBdHRyaWJ1dGVMaXN0LmluY2x1ZGVzKGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgaWYgKHVyaUF0dHJpYnV0ZXMuaGFzKGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbihTQUZFX1VSTF9QQVRURVJOLnRlc3QoYXR0cmlidXRlLm5vZGVWYWx1ZSkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGEgcmVndWxhciBleHByZXNzaW9uIHZhbGlkYXRlcyB0aGUgYXR0cmlidXRlLlxuICByZXR1cm4gYWxsb3dlZEF0dHJpYnV0ZUxpc3QuZmlsdGVyKGF0dHJpYnV0ZVJlZ2V4ID0+IGF0dHJpYnV0ZVJlZ2V4IGluc3RhbmNlb2YgUmVnRXhwKVxuICAgIC5zb21lKHJlZ2V4ID0+IHJlZ2V4LnRlc3QoYXR0cmlidXRlTmFtZSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZUh0bWwodW5zYWZlSHRtbCwgYWxsb3dMaXN0LCBzYW5pdGl6ZUZ1bmN0aW9uKSB7XG4gIGlmICghdW5zYWZlSHRtbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gdW5zYWZlSHRtbFxuICB9XG5cbiAgaWYgKHNhbml0aXplRnVuY3Rpb24gJiYgdHlwZW9mIHNhbml0aXplRnVuY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gc2FuaXRpemVGdW5jdGlvbih1bnNhZmVIdG1sKVxuICB9XG5cbiAgY29uc3QgZG9tUGFyc2VyID0gbmV3IHdpbmRvdy5ET01QYXJzZXIoKVxuICBjb25zdCBjcmVhdGVkRG9jdW1lbnQgPSBkb21QYXJzZXIucGFyc2VGcm9tU3RyaW5nKHVuc2FmZUh0bWwsICd0ZXh0L2h0bWwnKVxuICBjb25zdCBlbGVtZW50cyA9IFtdLmNvbmNhdCguLi5jcmVhdGVkRG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKCcqJykpXG5cbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgY29uc3QgZWxlbWVudE5hbWUgPSBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKClcblxuICAgIGlmICghT2JqZWN0LmtleXMoYWxsb3dMaXN0KS5pbmNsdWRlcyhlbGVtZW50TmFtZSkpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlKClcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgY29uc3QgYXR0cmlidXRlTGlzdCA9IFtdLmNvbmNhdCguLi5lbGVtZW50LmF0dHJpYnV0ZXMpXG4gICAgY29uc3QgYWxsb3dlZEF0dHJpYnV0ZXMgPSBbXS5jb25jYXQoYWxsb3dMaXN0WycqJ10gfHwgW10sIGFsbG93TGlzdFtlbGVtZW50TmFtZV0gfHwgW10pXG5cbiAgICBmb3IgKGNvbnN0IGF0dHJpYnV0ZSBvZiBhdHRyaWJ1dGVMaXN0KSB7XG4gICAgICBpZiAoIWFsbG93ZWRBdHRyaWJ1dGUoYXR0cmlidXRlLCBhbGxvd2VkQXR0cmlidXRlcykpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlLm5vZGVOYW1lKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjcmVhdGVkRG9jdW1lbnQuYm9keS5pbm5lckhUTUxcbn1cbiIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgdXRpbC90ZW1wbGF0ZS1mYWN0b3J5LmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuaW1wb3J0IFNlbGVjdG9yRW5naW5lIGZyb20gJy4uL2RvbS9zZWxlY3Rvci1lbmdpbmUuanMnXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uZmlnLmpzJ1xuaW1wb3J0IHsgRGVmYXVsdEFsbG93bGlzdCwgc2FuaXRpemVIdG1sIH0gZnJvbSAnLi9zYW5pdGl6ZXIuanMnXG5pbXBvcnQgeyBleGVjdXRlLCBnZXRFbGVtZW50LCBpc0VsZW1lbnQgfSBmcm9tICcuL2luZGV4LmpzJ1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUgPSAnVGVtcGxhdGVGYWN0b3J5J1xuXG5jb25zdCBEZWZhdWx0ID0ge1xuICBhbGxvd0xpc3Q6IERlZmF1bHRBbGxvd2xpc3QsXG4gIGNvbnRlbnQ6IHt9LCAvLyB7IHNlbGVjdG9yIDogdGV4dCAsICBzZWxlY3RvcjIgOiB0ZXh0MiAsIH1cbiAgZXh0cmFDbGFzczogJycsXG4gIGh0bWw6IGZhbHNlLFxuICBzYW5pdGl6ZTogdHJ1ZSxcbiAgc2FuaXRpemVGbjogbnVsbCxcbiAgdGVtcGxhdGU6ICc8ZGl2PjwvZGl2Pidcbn1cblxuY29uc3QgRGVmYXVsdFR5cGUgPSB7XG4gIGFsbG93TGlzdDogJ29iamVjdCcsXG4gIGNvbnRlbnQ6ICdvYmplY3QnLFxuICBleHRyYUNsYXNzOiAnKHN0cmluZ3xmdW5jdGlvbiknLFxuICBodG1sOiAnYm9vbGVhbicsXG4gIHNhbml0aXplOiAnYm9vbGVhbicsXG4gIHNhbml0aXplRm46ICcobnVsbHxmdW5jdGlvbiknLFxuICB0ZW1wbGF0ZTogJ3N0cmluZydcbn1cblxuY29uc3QgRGVmYXVsdENvbnRlbnRUeXBlID0ge1xuICBlbnRyeTogJyhzdHJpbmd8ZWxlbWVudHxmdW5jdGlvbnxudWxsKScsXG4gIHNlbGVjdG9yOiAnKHN0cmluZ3xlbGVtZW50KSdcbn1cblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgVGVtcGxhdGVGYWN0b3J5IGV4dGVuZHMgQ29uZmlnIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuX2NvbmZpZyA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpXG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFR5cGVcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgLy8gUHVibGljXG4gIGdldENvbnRlbnQoKSB7XG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy5fY29uZmlnLmNvbnRlbnQpXG4gICAgICAubWFwKGNvbmZpZyA9PiB0aGlzLl9yZXNvbHZlUG9zc2libGVGdW5jdGlvbihjb25maWcpKVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICB9XG5cbiAgaGFzQ29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb250ZW50KCkubGVuZ3RoID4gMFxuICB9XG5cbiAgY2hhbmdlQ29udGVudChjb250ZW50KSB7XG4gICAgdGhpcy5fY2hlY2tDb250ZW50KGNvbnRlbnQpXG4gICAgdGhpcy5fY29uZmlnLmNvbnRlbnQgPSB7IC4uLnRoaXMuX2NvbmZpZy5jb250ZW50LCAuLi5jb250ZW50IH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdG9IdG1sKCkge1xuICAgIGNvbnN0IHRlbXBsYXRlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGVtcGxhdGVXcmFwcGVyLmlubmVySFRNTCA9IHRoaXMuX21heWJlU2FuaXRpemUodGhpcy5fY29uZmlnLnRlbXBsYXRlKVxuXG4gICAgZm9yIChjb25zdCBbc2VsZWN0b3IsIHRleHRdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuX2NvbmZpZy5jb250ZW50KSkge1xuICAgICAgdGhpcy5fc2V0Q29udGVudCh0ZW1wbGF0ZVdyYXBwZXIsIHRleHQsIHNlbGVjdG9yKVxuICAgIH1cblxuICAgIGNvbnN0IHRlbXBsYXRlID0gdGVtcGxhdGVXcmFwcGVyLmNoaWxkcmVuWzBdXG4gICAgY29uc3QgZXh0cmFDbGFzcyA9IHRoaXMuX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKHRoaXMuX2NvbmZpZy5leHRyYUNsYXNzKVxuXG4gICAgaWYgKGV4dHJhQ2xhc3MpIHtcbiAgICAgIHRlbXBsYXRlLmNsYXNzTGlzdC5hZGQoLi4uZXh0cmFDbGFzcy5zcGxpdCgnICcpKVxuICAgIH1cblxuICAgIHJldHVybiB0ZW1wbGF0ZVxuICB9XG5cbiAgLy8gUHJpdmF0ZVxuICBfdHlwZUNoZWNrQ29uZmlnKGNvbmZpZykge1xuICAgIHN1cGVyLl90eXBlQ2hlY2tDb25maWcoY29uZmlnKVxuICAgIHRoaXMuX2NoZWNrQ29udGVudChjb25maWcuY29udGVudClcbiAgfVxuXG4gIF9jaGVja0NvbnRlbnQoYXJnKSB7XG4gICAgZm9yIChjb25zdCBbc2VsZWN0b3IsIGNvbnRlbnRdIG9mIE9iamVjdC5lbnRyaWVzKGFyZykpIHtcbiAgICAgIHN1cGVyLl90eXBlQ2hlY2tDb25maWcoeyBzZWxlY3RvciwgZW50cnk6IGNvbnRlbnQgfSwgRGVmYXVsdENvbnRlbnRUeXBlKVxuICAgIH1cbiAgfVxuXG4gIF9zZXRDb250ZW50KHRlbXBsYXRlLCBjb250ZW50LCBzZWxlY3Rvcikge1xuICAgIGNvbnN0IHRlbXBsYXRlRWxlbWVudCA9IFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoc2VsZWN0b3IsIHRlbXBsYXRlKVxuXG4gICAgaWYgKCF0ZW1wbGF0ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnRlbnQgPSB0aGlzLl9yZXNvbHZlUG9zc2libGVGdW5jdGlvbihjb250ZW50KVxuXG4gICAgaWYgKCFjb250ZW50KSB7XG4gICAgICB0ZW1wbGF0ZUVsZW1lbnQucmVtb3ZlKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChpc0VsZW1lbnQoY29udGVudCkpIHtcbiAgICAgIHRoaXMuX3B1dEVsZW1lbnRJblRlbXBsYXRlKGdldEVsZW1lbnQoY29udGVudCksIHRlbXBsYXRlRWxlbWVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICh0aGlzLl9jb25maWcuaHRtbCkge1xuICAgICAgdGVtcGxhdGVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX21heWJlU2FuaXRpemUoY29udGVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRlbXBsYXRlRWxlbWVudC50ZXh0Q29udGVudCA9IGNvbnRlbnRcbiAgfVxuXG4gIF9tYXliZVNhbml0aXplKGFyZykge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcuc2FuaXRpemUgPyBzYW5pdGl6ZUh0bWwoYXJnLCB0aGlzLl9jb25maWcuYWxsb3dMaXN0LCB0aGlzLl9jb25maWcuc2FuaXRpemVGbikgOiBhcmdcbiAgfVxuXG4gIF9yZXNvbHZlUG9zc2libGVGdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZXhlY3V0ZShhcmcsIFt1bmRlZmluZWQsIHRoaXNdKVxuICB9XG5cbiAgX3B1dEVsZW1lbnRJblRlbXBsYXRlKGVsZW1lbnQsIHRlbXBsYXRlRWxlbWVudCkge1xuICAgIGlmICh0aGlzLl9jb25maWcuaHRtbCkge1xuICAgICAgdGVtcGxhdGVFbGVtZW50LmlubmVySFRNTCA9ICcnXG4gICAgICB0ZW1wbGF0ZUVsZW1lbnQuYXBwZW5kKGVsZW1lbnQpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0ZW1wbGF0ZUVsZW1lbnQudGV4dENvbnRlbnQgPSBlbGVtZW50LnRleHRDb250ZW50XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVtcGxhdGVGYWN0b3J5XG4iLCAiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIHRvb2x0aXAuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgKiBhcyBQb3BwZXIgZnJvbSAnQHBvcHBlcmpzL2NvcmUnXG5pbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL2Jhc2UtY29tcG9uZW50LmpzJ1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tICcuL2RvbS9ldmVudC1oYW5kbGVyLmpzJ1xuaW1wb3J0IE1hbmlwdWxhdG9yIGZyb20gJy4vZG9tL21hbmlwdWxhdG9yLmpzJ1xuaW1wb3J0IHtcbiAgZGVmaW5lSlF1ZXJ5UGx1Z2luLCBleGVjdXRlLCBmaW5kU2hhZG93Um9vdCwgZ2V0RWxlbWVudCwgZ2V0VUlELCBpc1JUTCwgbm9vcFxufSBmcm9tICcuL3V0aWwvaW5kZXguanMnXG5pbXBvcnQgeyBEZWZhdWx0QWxsb3dsaXN0IH0gZnJvbSAnLi91dGlsL3Nhbml0aXplci5qcydcbmltcG9ydCBUZW1wbGF0ZUZhY3RvcnkgZnJvbSAnLi91dGlsL3RlbXBsYXRlLWZhY3RvcnkuanMnXG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3QgTkFNRSA9ICd0b29sdGlwJ1xuY29uc3QgRElTQUxMT1dFRF9BVFRSSUJVVEVTID0gbmV3IFNldChbJ3Nhbml0aXplJywgJ2FsbG93TGlzdCcsICdzYW5pdGl6ZUZuJ10pXG5cbmNvbnN0IENMQVNTX05BTUVfRkFERSA9ICdmYWRlJ1xuY29uc3QgQ0xBU1NfTkFNRV9NT0RBTCA9ICdtb2RhbCdcbmNvbnN0IENMQVNTX05BTUVfU0hPVyA9ICdzaG93J1xuXG5jb25zdCBTRUxFQ1RPUl9UT09MVElQX0lOTkVSID0gJy50b29sdGlwLWlubmVyJ1xuY29uc3QgU0VMRUNUT1JfTU9EQUwgPSBgLiR7Q0xBU1NfTkFNRV9NT0RBTH1gXG5cbmNvbnN0IEVWRU5UX01PREFMX0hJREUgPSAnaGlkZS5icy5tb2RhbCdcblxuY29uc3QgVFJJR0dFUl9IT1ZFUiA9ICdob3ZlcidcbmNvbnN0IFRSSUdHRVJfRk9DVVMgPSAnZm9jdXMnXG5jb25zdCBUUklHR0VSX0NMSUNLID0gJ2NsaWNrJ1xuY29uc3QgVFJJR0dFUl9NQU5VQUwgPSAnbWFudWFsJ1xuXG5jb25zdCBFVkVOVF9ISURFID0gJ2hpZGUnXG5jb25zdCBFVkVOVF9ISURERU4gPSAnaGlkZGVuJ1xuY29uc3QgRVZFTlRfU0hPVyA9ICdzaG93J1xuY29uc3QgRVZFTlRfU0hPV04gPSAnc2hvd24nXG5jb25zdCBFVkVOVF9JTlNFUlRFRCA9ICdpbnNlcnRlZCdcbmNvbnN0IEVWRU5UX0NMSUNLID0gJ2NsaWNrJ1xuY29uc3QgRVZFTlRfRk9DVVNJTiA9ICdmb2N1c2luJ1xuY29uc3QgRVZFTlRfRk9DVVNPVVQgPSAnZm9jdXNvdXQnXG5jb25zdCBFVkVOVF9NT1VTRUVOVEVSID0gJ21vdXNlZW50ZXInXG5jb25zdCBFVkVOVF9NT1VTRUxFQVZFID0gJ21vdXNlbGVhdmUnXG5cbmNvbnN0IEF0dGFjaG1lbnRNYXAgPSB7XG4gIEFVVE86ICdhdXRvJyxcbiAgVE9QOiAndG9wJyxcbiAgUklHSFQ6IGlzUlRMKCkgPyAnbGVmdCcgOiAncmlnaHQnLFxuICBCT1RUT006ICdib3R0b20nLFxuICBMRUZUOiBpc1JUTCgpID8gJ3JpZ2h0JyA6ICdsZWZ0J1xufVxuXG5jb25zdCBEZWZhdWx0ID0ge1xuICBhbGxvd0xpc3Q6IERlZmF1bHRBbGxvd2xpc3QsXG4gIGFuaW1hdGlvbjogdHJ1ZSxcbiAgYm91bmRhcnk6ICdjbGlwcGluZ1BhcmVudHMnLFxuICBjb250YWluZXI6IGZhbHNlLFxuICBjdXN0b21DbGFzczogJycsXG4gIGRlbGF5OiAwLFxuICBmYWxsYmFja1BsYWNlbWVudHM6IFsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J10sXG4gIGh0bWw6IGZhbHNlLFxuICBvZmZzZXQ6IFswLCA2XSxcbiAgcGxhY2VtZW50OiAndG9wJyxcbiAgcG9wcGVyQ29uZmlnOiBudWxsLFxuICBzYW5pdGl6ZTogdHJ1ZSxcbiAgc2FuaXRpemVGbjogbnVsbCxcbiAgc2VsZWN0b3I6IGZhbHNlLFxuICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJ0b29sdGlwXCIgcm9sZT1cInRvb2x0aXBcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidG9vbHRpcC1hcnJvd1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyxcbiAgdGl0bGU6ICcnLFxuICB0cmlnZ2VyOiAnaG92ZXIgZm9jdXMnXG59XG5cbmNvbnN0IERlZmF1bHRUeXBlID0ge1xuICBhbGxvd0xpc3Q6ICdvYmplY3QnLFxuICBhbmltYXRpb246ICdib29sZWFuJyxcbiAgYm91bmRhcnk6ICcoc3RyaW5nfGVsZW1lbnQpJyxcbiAgY29udGFpbmVyOiAnKHN0cmluZ3xlbGVtZW50fGJvb2xlYW4pJyxcbiAgY3VzdG9tQ2xhc3M6ICcoc3RyaW5nfGZ1bmN0aW9uKScsXG4gIGRlbGF5OiAnKG51bWJlcnxvYmplY3QpJyxcbiAgZmFsbGJhY2tQbGFjZW1lbnRzOiAnYXJyYXknLFxuICBodG1sOiAnYm9vbGVhbicsXG4gIG9mZnNldDogJyhhcnJheXxzdHJpbmd8ZnVuY3Rpb24pJyxcbiAgcGxhY2VtZW50OiAnKHN0cmluZ3xmdW5jdGlvbiknLFxuICBwb3BwZXJDb25maWc6ICcobnVsbHxvYmplY3R8ZnVuY3Rpb24pJyxcbiAgc2FuaXRpemU6ICdib29sZWFuJyxcbiAgc2FuaXRpemVGbjogJyhudWxsfGZ1bmN0aW9uKScsXG4gIHNlbGVjdG9yOiAnKHN0cmluZ3xib29sZWFuKScsXG4gIHRlbXBsYXRlOiAnc3RyaW5nJyxcbiAgdGl0bGU6ICcoc3RyaW5nfGVsZW1lbnR8ZnVuY3Rpb24pJyxcbiAgdHJpZ2dlcjogJ3N0cmluZydcbn1cblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgVG9vbHRpcCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICBpZiAodHlwZW9mIFBvcHBlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgdG9vbHRpcHMgcmVxdWlyZSBQb3BwZXIgKGh0dHBzOi8vcG9wcGVyLmpzLm9yZy9kb2NzL3YyLyknKVxuICAgIH1cblxuICAgIHN1cGVyKGVsZW1lbnQsIGNvbmZpZylcblxuICAgIC8vIFByaXZhdGVcbiAgICB0aGlzLl9pc0VuYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5fdGltZW91dCA9IDBcbiAgICB0aGlzLl9pc0hvdmVyZWQgPSBudWxsXG4gICAgdGhpcy5fYWN0aXZlVHJpZ2dlciA9IHt9XG4gICAgdGhpcy5fcG9wcGVyID0gbnVsbFxuICAgIHRoaXMuX3RlbXBsYXRlRmFjdG9yeSA9IG51bGxcbiAgICB0aGlzLl9uZXdDb250ZW50ID0gbnVsbFxuXG4gICAgLy8gUHJvdGVjdGVkXG4gICAgdGhpcy50aXAgPSBudWxsXG5cbiAgICB0aGlzLl9zZXRMaXN0ZW5lcnMoKVxuXG4gICAgaWYgKCF0aGlzLl9jb25maWcuc2VsZWN0b3IpIHtcbiAgICAgIHRoaXMuX2ZpeFRpdGxlKClcbiAgICB9XG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFR5cGVcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgLy8gUHVibGljXG4gIGVuYWJsZSgpIHtcbiAgICB0aGlzLl9pc0VuYWJsZWQgPSB0cnVlXG4gIH1cblxuICBkaXNhYmxlKCkge1xuICAgIHRoaXMuX2lzRW5hYmxlZCA9IGZhbHNlXG4gIH1cblxuICB0b2dnbGVFbmFibGVkKCkge1xuICAgIHRoaXMuX2lzRW5hYmxlZCA9ICF0aGlzLl9pc0VuYWJsZWRcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICBpZiAoIXRoaXMuX2lzRW5hYmxlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2lzU2hvd24oKSkge1xuICAgICAgdGhpcy5fbGVhdmUoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5fZW50ZXIoKVxuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dClcblxuICAgIEV2ZW50SGFuZGxlci5vZmYodGhpcy5fZWxlbWVudC5jbG9zZXN0KFNFTEVDVE9SX01PREFMKSwgRVZFTlRfTU9EQUxfSElERSwgdGhpcy5faGlkZU1vZGFsSGFuZGxlcilcblxuICAgIGlmICh0aGlzLl9lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1icy1vcmlnaW5hbC10aXRsZScpKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLl9lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1icy1vcmlnaW5hbC10aXRsZScpKVxuICAgIH1cblxuICAgIHRoaXMuX2Rpc3Bvc2VQb3BwZXIoKVxuICAgIHN1cGVyLmRpc3Bvc2UoKVxuICB9XG5cbiAgc2hvdygpIHtcbiAgICBpZiAodGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHVzZSBzaG93IG9uIHZpc2libGUgZWxlbWVudHMnKVxuICAgIH1cblxuICAgIGlmICghKHRoaXMuX2lzV2l0aENvbnRlbnQoKSAmJiB0aGlzLl9pc0VuYWJsZWQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBzaG93RXZlbnQgPSBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9TSE9XKSlcbiAgICBjb25zdCBzaGFkb3dSb290ID0gZmluZFNoYWRvd1Jvb3QodGhpcy5fZWxlbWVudClcbiAgICBjb25zdCBpc0luVGhlRG9tID0gKHNoYWRvd1Jvb3QgfHwgdGhpcy5fZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuY29udGFpbnModGhpcy5fZWxlbWVudClcblxuICAgIGlmIChzaG93RXZlbnQuZGVmYXVsdFByZXZlbnRlZCB8fCAhaXNJblRoZURvbSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gVE9ETzogdjYgcmVtb3ZlIHRoaXMgb3IgbWFrZSBpdCBvcHRpb25hbFxuICAgIHRoaXMuX2Rpc3Bvc2VQb3BwZXIoKVxuXG4gICAgY29uc3QgdGlwID0gdGhpcy5fZ2V0VGlwRWxlbWVudCgpXG5cbiAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScsIHRpcC5nZXRBdHRyaWJ1dGUoJ2lkJykpXG5cbiAgICBjb25zdCB7IGNvbnRhaW5lciB9ID0gdGhpcy5fY29uZmlnXG5cbiAgICBpZiAoIXRoaXMuX2VsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnModGhpcy50aXApKSB7XG4gICAgICBjb250YWluZXIuYXBwZW5kKHRpcClcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX0lOU0VSVEVEKSlcbiAgICB9XG5cbiAgICB0aGlzLl9wb3BwZXIgPSB0aGlzLl9jcmVhdGVQb3BwZXIodGlwKVxuXG4gICAgdGlwLmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9TSE9XKVxuXG4gICAgLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIGFkZCBleHRyYVxuICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgdG8gdGhlIGJvZHkncyBpbW1lZGlhdGUgY2hpbGRyZW47XG4gICAgLy8gb25seSBuZWVkZWQgYmVjYXVzZSBvZiBicm9rZW4gZXZlbnQgZGVsZWdhdGlvbiBvbiBpT1NcbiAgICAvLyBodHRwczovL3d3dy5xdWlya3Ntb2RlLm9yZy9ibG9nL2FyY2hpdmVzLzIwMTQvMDIvbW91c2VfZXZlbnRfYnViLmh0bWxcbiAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgW10uY29uY2F0KC4uLmRvY3VtZW50LmJvZHkuY2hpbGRyZW4pKSB7XG4gICAgICAgIEV2ZW50SGFuZGxlci5vbihlbGVtZW50LCAnbW91c2VvdmVyJywgbm9vcClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX1NIT1dOKSlcblxuICAgICAgaWYgKHRoaXMuX2lzSG92ZXJlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fbGVhdmUoKVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9pc0hvdmVyZWQgPSBmYWxzZVxuICAgIH1cblxuICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soY29tcGxldGUsIHRoaXMudGlwLCB0aGlzLl9pc0FuaW1hdGVkKCkpXG4gIH1cblxuICBoaWRlKCkge1xuICAgIGlmICghdGhpcy5faXNTaG93bigpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBoaWRlRXZlbnQgPSBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9ISURFKSlcbiAgICBpZiAoaGlkZUV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHRpcCA9IHRoaXMuX2dldFRpcEVsZW1lbnQoKVxuICAgIHRpcC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfU0hPVylcblxuICAgIC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSByZW1vdmUgdGhlIGV4dHJhXG4gICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB3ZSBhZGRlZCBmb3IgaU9TIHN1cHBvcnRcbiAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgW10uY29uY2F0KC4uLmRvY3VtZW50LmJvZHkuY2hpbGRyZW4pKSB7XG4gICAgICAgIEV2ZW50SGFuZGxlci5vZmYoZWxlbWVudCwgJ21vdXNlb3ZlcicsIG5vb3ApXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUUklHR0VSX0NMSUNLXSA9IGZhbHNlXG4gICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUUklHR0VSX0ZPQ1VTXSA9IGZhbHNlXG4gICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUUklHR0VSX0hPVkVSXSA9IGZhbHNlXG4gICAgdGhpcy5faXNIb3ZlcmVkID0gbnVsbCAvLyBpdCBpcyBhIHRyaWNrIHRvIHN1cHBvcnQgbWFudWFsIHRyaWdnZXJpbmdcblxuICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2lzV2l0aEFjdGl2ZVRyaWdnZXIoKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLl9pc0hvdmVyZWQpIHtcbiAgICAgICAgdGhpcy5fZGlzcG9zZVBvcHBlcigpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5JylcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX0hJRERFTikpXG4gICAgfVxuXG4gICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZSwgdGhpcy50aXAsIHRoaXMuX2lzQW5pbWF0ZWQoKSlcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5fcG9wcGVyKSB7XG4gICAgICB0aGlzLl9wb3BwZXIudXBkYXRlKClcbiAgICB9XG4gIH1cblxuICAvLyBQcm90ZWN0ZWRcbiAgX2lzV2l0aENvbnRlbnQoKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5fZ2V0VGl0bGUoKSlcbiAgfVxuXG4gIF9nZXRUaXBFbGVtZW50KCkge1xuICAgIGlmICghdGhpcy50aXApIHtcbiAgICAgIHRoaXMudGlwID0gdGhpcy5fY3JlYXRlVGlwRWxlbWVudCh0aGlzLl9uZXdDb250ZW50IHx8IHRoaXMuX2dldENvbnRlbnRGb3JUZW1wbGF0ZSgpKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnRpcFxuICB9XG5cbiAgX2NyZWF0ZVRpcEVsZW1lbnQoY29udGVudCkge1xuICAgIGNvbnN0IHRpcCA9IHRoaXMuX2dldFRlbXBsYXRlRmFjdG9yeShjb250ZW50KS50b0h0bWwoKVxuXG4gICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgY2hlY2sgaW4gdjZcbiAgICBpZiAoIXRpcCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICB0aXAuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX0ZBREUsIENMQVNTX05BTUVfU0hPVylcbiAgICAvLyBUT0RPOiB2NiB0aGUgZm9sbG93aW5nIGNhbiBiZSBhY2hpZXZlZCB3aXRoIENTUyBvbmx5XG4gICAgdGlwLmNsYXNzTGlzdC5hZGQoYGJzLSR7dGhpcy5jb25zdHJ1Y3Rvci5OQU1FfS1hdXRvYClcblxuICAgIGNvbnN0IHRpcElkID0gZ2V0VUlEKHRoaXMuY29uc3RydWN0b3IuTkFNRSkudG9TdHJpbmcoKVxuXG4gICAgdGlwLnNldEF0dHJpYnV0ZSgnaWQnLCB0aXBJZClcblxuICAgIGlmICh0aGlzLl9pc0FuaW1hdGVkKCkpIHtcbiAgICAgIHRpcC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfRkFERSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGlwXG4gIH1cblxuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcbiAgICB0aGlzLl9uZXdDb250ZW50ID0gY29udGVudFxuICAgIGlmICh0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgIHRoaXMuX2Rpc3Bvc2VQb3BwZXIoKVxuICAgICAgdGhpcy5zaG93KClcbiAgICB9XG4gIH1cblxuICBfZ2V0VGVtcGxhdGVGYWN0b3J5KGNvbnRlbnQpIHtcbiAgICBpZiAodGhpcy5fdGVtcGxhdGVGYWN0b3J5KSB7XG4gICAgICB0aGlzLl90ZW1wbGF0ZUZhY3RvcnkuY2hhbmdlQ29udGVudChjb250ZW50KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90ZW1wbGF0ZUZhY3RvcnkgPSBuZXcgVGVtcGxhdGVGYWN0b3J5KHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICAvLyB0aGUgYGNvbnRlbnRgIHZhciBoYXMgdG8gYmUgYWZ0ZXIgYHRoaXMuX2NvbmZpZ2BcbiAgICAgICAgLy8gdG8gb3ZlcnJpZGUgY29uZmlnLmNvbnRlbnQgaW4gY2FzZSBvZiBwb3BvdmVyXG4gICAgICAgIGNvbnRlbnQsXG4gICAgICAgIGV4dHJhQ2xhc3M6IHRoaXMuX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKHRoaXMuX2NvbmZpZy5jdXN0b21DbGFzcylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlRmFjdG9yeVxuICB9XG5cbiAgX2dldENvbnRlbnRGb3JUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgW1NFTEVDVE9SX1RPT0xUSVBfSU5ORVJdOiB0aGlzLl9nZXRUaXRsZSgpXG4gICAgfVxuICB9XG5cbiAgX2dldFRpdGxlKCkge1xuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlUG9zc2libGVGdW5jdGlvbih0aGlzLl9jb25maWcudGl0bGUpIHx8IHRoaXMuX2VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJzLW9yaWdpbmFsLXRpdGxlJylcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX2luaXRpYWxpemVPbkRlbGVnYXRlZFRhcmdldChldmVudCkge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmdldE9yQ3JlYXRlSW5zdGFuY2UoZXZlbnQuZGVsZWdhdGVUYXJnZXQsIHRoaXMuX2dldERlbGVnYXRlQ29uZmlnKCkpXG4gIH1cblxuICBfaXNBbmltYXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLmFuaW1hdGlvbiB8fCAodGhpcy50aXAgJiYgdGhpcy50aXAuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfRkFERSkpXG4gIH1cblxuICBfaXNTaG93bigpIHtcbiAgICByZXR1cm4gdGhpcy50aXAgJiYgdGhpcy50aXAuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfU0hPVylcbiAgfVxuXG4gIF9jcmVhdGVQb3BwZXIodGlwKSB7XG4gICAgY29uc3QgcGxhY2VtZW50ID0gZXhlY3V0ZSh0aGlzLl9jb25maWcucGxhY2VtZW50LCBbdGhpcywgdGlwLCB0aGlzLl9lbGVtZW50XSlcbiAgICBjb25zdCBhdHRhY2htZW50ID0gQXR0YWNobWVudE1hcFtwbGFjZW1lbnQudG9VcHBlckNhc2UoKV1cbiAgICByZXR1cm4gUG9wcGVyLmNyZWF0ZVBvcHBlcih0aGlzLl9lbGVtZW50LCB0aXAsIHRoaXMuX2dldFBvcHBlckNvbmZpZyhhdHRhY2htZW50KSlcbiAgfVxuXG4gIF9nZXRPZmZzZXQoKSB7XG4gICAgY29uc3QgeyBvZmZzZXQgfSA9IHRoaXMuX2NvbmZpZ1xuXG4gICAgaWYgKHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0LnNwbGl0KCcsJykubWFwKHZhbHVlID0+IE51bWJlci5wYXJzZUludCh2YWx1ZSwgMTApKVxuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2Zmc2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gcG9wcGVyRGF0YSA9PiBvZmZzZXQocG9wcGVyRGF0YSwgdGhpcy5fZWxlbWVudClcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0XG4gIH1cblxuICBfcmVzb2x2ZVBvc3NpYmxlRnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGV4ZWN1dGUoYXJnLCBbdGhpcy5fZWxlbWVudCwgdGhpcy5fZWxlbWVudF0pXG4gIH1cblxuICBfZ2V0UG9wcGVyQ29uZmlnKGF0dGFjaG1lbnQpIHtcbiAgICBjb25zdCBkZWZhdWx0QnNQb3BwZXJDb25maWcgPSB7XG4gICAgICBwbGFjZW1lbnQ6IGF0dGFjaG1lbnQsXG4gICAgICBtb2RpZmllcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdmbGlwJyxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBmYWxsYmFja1BsYWNlbWVudHM6IHRoaXMuX2NvbmZpZy5mYWxsYmFja1BsYWNlbWVudHNcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnb2Zmc2V0JyxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBvZmZzZXQ6IHRoaXMuX2dldE9mZnNldCgpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ3ByZXZlbnRPdmVyZmxvdycsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgYm91bmRhcnk6IHRoaXMuX2NvbmZpZy5ib3VuZGFyeVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdhcnJvdycsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgZWxlbWVudDogYC4ke3RoaXMuY29uc3RydWN0b3IuTkFNRX0tYXJyb3dgXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ3ByZVNldFBsYWNlbWVudCcsXG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICBwaGFzZTogJ2JlZm9yZU1haW4nLFxuICAgICAgICAgIGZuOiBkYXRhID0+IHtcbiAgICAgICAgICAgIC8vIFByZS1zZXQgUG9wcGVyJ3MgcGxhY2VtZW50IGF0dHJpYnV0ZSBpbiBvcmRlciB0byByZWFkIHRoZSBhcnJvdyBzaXplcyBwcm9wZXJseS5cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgUG9wcGVyIG1peGVzIHVwIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IGRpbWVuc2lvbnMgc2luY2UgdGhlIGluaXRpYWwgYXJyb3cgc3R5bGUgaXMgZm9yIHRvcCBwbGFjZW1lbnRcbiAgICAgICAgICAgIHRoaXMuX2dldFRpcEVsZW1lbnQoKS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcG9wcGVyLXBsYWNlbWVudCcsIGRhdGEuc3RhdGUucGxhY2VtZW50KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5kZWZhdWx0QnNQb3BwZXJDb25maWcsXG4gICAgICAuLi5leGVjdXRlKHRoaXMuX2NvbmZpZy5wb3BwZXJDb25maWcsIFt1bmRlZmluZWQsIGRlZmF1bHRCc1BvcHBlckNvbmZpZ10pXG4gICAgfVxuICB9XG5cbiAgX3NldExpc3RlbmVycygpIHtcbiAgICBjb25zdCB0cmlnZ2VycyA9IHRoaXMuX2NvbmZpZy50cmlnZ2VyLnNwbGl0KCcgJylcblxuICAgIGZvciAoY29uc3QgdHJpZ2dlciBvZiB0cmlnZ2Vycykge1xuICAgICAgaWYgKHRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX0NMSUNLKSwgdGhpcy5fY29uZmlnLnNlbGVjdG9yLCBldmVudCA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuX2luaXRpYWxpemVPbkRlbGVnYXRlZFRhcmdldChldmVudClcbiAgICAgICAgICBjb250ZXh0LnRvZ2dsZSgpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKHRyaWdnZXIgIT09IFRSSUdHRVJfTUFOVUFMKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50SW4gPSB0cmlnZ2VyID09PSBUUklHR0VSX0hPVkVSID9cbiAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9NT1VTRUVOVEVSKSA6XG4gICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5ldmVudE5hbWUoRVZFTlRfRk9DVVNJTilcbiAgICAgICAgY29uc3QgZXZlbnRPdXQgPSB0cmlnZ2VyID09PSBUUklHR0VSX0hPVkVSID9cbiAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9NT1VTRUxFQVZFKSA6XG4gICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5ldmVudE5hbWUoRVZFTlRfRk9DVVNPVVQpXG5cbiAgICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIGV2ZW50SW4sIHRoaXMuX2NvbmZpZy5zZWxlY3RvciwgZXZlbnQgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLl9pbml0aWFsaXplT25EZWxlZ2F0ZWRUYXJnZXQoZXZlbnQpXG4gICAgICAgICAgY29udGV4dC5fYWN0aXZlVHJpZ2dlcltldmVudC50eXBlID09PSAnZm9jdXNpbicgPyBUUklHR0VSX0ZPQ1VTIDogVFJJR0dFUl9IT1ZFUl0gPSB0cnVlXG4gICAgICAgICAgY29udGV4dC5fZW50ZXIoKVxuICAgICAgICB9KVxuICAgICAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgZXZlbnRPdXQsIHRoaXMuX2NvbmZpZy5zZWxlY3RvciwgZXZlbnQgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLl9pbml0aWFsaXplT25EZWxlZ2F0ZWRUYXJnZXQoZXZlbnQpXG4gICAgICAgICAgY29udGV4dC5fYWN0aXZlVHJpZ2dlcltldmVudC50eXBlID09PSAnZm9jdXNvdXQnID8gVFJJR0dFUl9GT0NVUyA6IFRSSUdHRVJfSE9WRVJdID1cbiAgICAgICAgICAgIGNvbnRleHQuX2VsZW1lbnQuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldClcblxuICAgICAgICAgIGNvbnRleHQuX2xlYXZlKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9oaWRlTW9kYWxIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2VsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5oaWRlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudC5jbG9zZXN0KFNFTEVDVE9SX01PREFMKSwgRVZFTlRfTU9EQUxfSElERSwgdGhpcy5faGlkZU1vZGFsSGFuZGxlcilcbiAgfVxuXG4gIF9maXhUaXRsZSgpIHtcbiAgICBjb25zdCB0aXRsZSA9IHRoaXMuX2VsZW1lbnQuZ2V0QXR0cmlidXRlKCd0aXRsZScpXG5cbiAgICBpZiAoIXRpdGxlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2VsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykgJiYgIXRoaXMuX2VsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHRpdGxlKVxuICAgIH1cblxuICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWJzLW9yaWdpbmFsLXRpdGxlJywgdGl0bGUpIC8vIERPIE5PVCBVU0UgSVQuIElzIG9ubHkgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gICAgdGhpcy5fZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3RpdGxlJylcbiAgfVxuXG4gIF9lbnRlcigpIHtcbiAgICBpZiAodGhpcy5faXNTaG93bigpIHx8IHRoaXMuX2lzSG92ZXJlZCkge1xuICAgICAgdGhpcy5faXNIb3ZlcmVkID0gdHJ1ZVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5faXNIb3ZlcmVkID0gdHJ1ZVxuXG4gICAgdGhpcy5fc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5faXNIb3ZlcmVkKSB7XG4gICAgICAgIHRoaXMuc2hvdygpXG4gICAgICB9XG4gICAgfSwgdGhpcy5fY29uZmlnLmRlbGF5LnNob3cpXG4gIH1cblxuICBfbGVhdmUoKSB7XG4gICAgaWYgKHRoaXMuX2lzV2l0aEFjdGl2ZVRyaWdnZXIoKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5faXNIb3ZlcmVkID0gZmFsc2VcblxuICAgIHRoaXMuX3NldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9pc0hvdmVyZWQpIHtcbiAgICAgICAgdGhpcy5oaWRlKClcbiAgICAgIH1cbiAgICB9LCB0aGlzLl9jb25maWcuZGVsYXkuaGlkZSlcbiAgfVxuXG4gIF9zZXRUaW1lb3V0KGhhbmRsZXIsIHRpbWVvdXQpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dClcbiAgICB0aGlzLl90aW1lb3V0ID0gc2V0VGltZW91dChoYW5kbGVyLCB0aW1lb3V0KVxuICB9XG5cbiAgX2lzV2l0aEFjdGl2ZVRyaWdnZXIoKSB7XG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy5fYWN0aXZlVHJpZ2dlcikuaW5jbHVkZXModHJ1ZSlcbiAgfVxuXG4gIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgY29uc3QgZGF0YUF0dHJpYnV0ZXMgPSBNYW5pcHVsYXRvci5nZXREYXRhQXR0cmlidXRlcyh0aGlzLl9lbGVtZW50KVxuXG4gICAgZm9yIChjb25zdCBkYXRhQXR0cmlidXRlIG9mIE9iamVjdC5rZXlzKGRhdGFBdHRyaWJ1dGVzKSkge1xuICAgICAgaWYgKERJU0FMTE9XRURfQVRUUklCVVRFUy5oYXMoZGF0YUF0dHJpYnV0ZSkpIHtcbiAgICAgICAgZGVsZXRlIGRhdGFBdHRyaWJ1dGVzW2RhdGFBdHRyaWJ1dGVdXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uZmlnID0ge1xuICAgICAgLi4uZGF0YUF0dHJpYnV0ZXMsXG4gICAgICAuLi4odHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnID8gY29uZmlnIDoge30pXG4gICAgfVxuICAgIGNvbmZpZyA9IHRoaXMuX21lcmdlQ29uZmlnT2JqKGNvbmZpZylcbiAgICBjb25maWcgPSB0aGlzLl9jb25maWdBZnRlck1lcmdlKGNvbmZpZylcbiAgICB0aGlzLl90eXBlQ2hlY2tDb25maWcoY29uZmlnKVxuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9jb25maWdBZnRlck1lcmdlKGNvbmZpZykge1xuICAgIGNvbmZpZy5jb250YWluZXIgPSBjb25maWcuY29udGFpbmVyID09PSBmYWxzZSA/IGRvY3VtZW50LmJvZHkgOiBnZXRFbGVtZW50KGNvbmZpZy5jb250YWluZXIpXG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy5kZWxheSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGNvbmZpZy5kZWxheSA9IHtcbiAgICAgICAgc2hvdzogY29uZmlnLmRlbGF5LFxuICAgICAgICBoaWRlOiBjb25maWcuZGVsYXlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy50aXRsZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGNvbmZpZy50aXRsZSA9IGNvbmZpZy50aXRsZS50b1N0cmluZygpXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjb25maWcuY29udGVudCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGNvbmZpZy5jb250ZW50ID0gY29uZmlnLmNvbnRlbnQudG9TdHJpbmcoKVxuICAgIH1cblxuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9nZXREZWxlZ2F0ZUNvbmZpZygpIHtcbiAgICBjb25zdCBjb25maWcgPSB7fVxuXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5fY29uZmlnKSkge1xuICAgICAgaWYgKHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFtrZXldICE9PSB2YWx1ZSkge1xuICAgICAgICBjb25maWdba2V5XSA9IHZhbHVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uZmlnLnNlbGVjdG9yID0gZmFsc2VcbiAgICBjb25maWcudHJpZ2dlciA9ICdtYW51YWwnXG5cbiAgICAvLyBJbiB0aGUgZnV0dXJlIGNhbiBiZSByZXBsYWNlZCB3aXRoOlxuICAgIC8vIGNvbnN0IGtleXNXaXRoRGlmZmVyZW50VmFsdWVzID0gT2JqZWN0LmVudHJpZXModGhpcy5fY29uZmlnKS5maWx0ZXIoZW50cnkgPT4gdGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0W2VudHJ5WzBdXSAhPT0gdGhpcy5fY29uZmlnW2VudHJ5WzBdXSlcbiAgICAvLyBgT2JqZWN0LmZyb21FbnRyaWVzKGtleXNXaXRoRGlmZmVyZW50VmFsdWVzKWBcbiAgICByZXR1cm4gY29uZmlnXG4gIH1cblxuICBfZGlzcG9zZVBvcHBlcigpIHtcbiAgICBpZiAodGhpcy5fcG9wcGVyKSB7XG4gICAgICB0aGlzLl9wb3BwZXIuZGVzdHJveSgpXG4gICAgICB0aGlzLl9wb3BwZXIgPSBudWxsXG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGlwKSB7XG4gICAgICB0aGlzLnRpcC5yZW1vdmUoKVxuICAgICAgdGhpcy50aXAgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gVG9vbHRpcC5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMsIGNvbmZpZylcblxuICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgfVxuXG4gICAgICBkYXRhW2NvbmZpZ10oKVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBqUXVlcnlcbiAqL1xuXG5kZWZpbmVKUXVlcnlQbHVnaW4oVG9vbHRpcClcblxuZXhwb3J0IGRlZmF1bHQgVG9vbHRpcFxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCBwb3BvdmVyLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuaW1wb3J0IFRvb2x0aXAgZnJvbSAnLi90b29sdGlwLmpzJ1xuaW1wb3J0IHsgZGVmaW5lSlF1ZXJ5UGx1Z2luIH0gZnJvbSAnLi91dGlsL2luZGV4LmpzJ1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUgPSAncG9wb3ZlcidcblxuY29uc3QgU0VMRUNUT1JfVElUTEUgPSAnLnBvcG92ZXItaGVhZGVyJ1xuY29uc3QgU0VMRUNUT1JfQ09OVEVOVCA9ICcucG9wb3Zlci1ib2R5J1xuXG5jb25zdCBEZWZhdWx0ID0ge1xuICAuLi5Ub29sdGlwLkRlZmF1bHQsXG4gIGNvbnRlbnQ6ICcnLFxuICBvZmZzZXQ6IFswLCA4XSxcbiAgcGxhY2VtZW50OiAncmlnaHQnLFxuICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJwb3BvdmVyXCIgcm9sZT1cInRvb2x0aXBcIj4nICtcbiAgICAnPGRpdiBjbGFzcz1cInBvcG92ZXItYXJyb3dcIj48L2Rpdj4nICtcbiAgICAnPGgzIGNsYXNzPVwicG9wb3Zlci1oZWFkZXJcIj48L2gzPicgK1xuICAgICc8ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCI+PC9kaXY+JyArXG4gICAgJzwvZGl2PicsXG4gIHRyaWdnZXI6ICdjbGljaydcbn1cblxuY29uc3QgRGVmYXVsdFR5cGUgPSB7XG4gIC4uLlRvb2x0aXAuRGVmYXVsdFR5cGUsXG4gIGNvbnRlbnQ6ICcobnVsbHxzdHJpbmd8ZWxlbWVudHxmdW5jdGlvbiknXG59XG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIFBvcG92ZXIgZXh0ZW5kcyBUb29sdGlwIHtcbiAgLy8gR2V0dGVyc1xuICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRcbiAgfVxuXG4gIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRUeXBlXG4gIH1cblxuICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIE5BTUVcbiAgfVxuXG4gIC8vIE92ZXJyaWRlc1xuICBfaXNXaXRoQ29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0VGl0bGUoKSB8fCB0aGlzLl9nZXRDb250ZW50KClcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX2dldENvbnRlbnRGb3JUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgW1NFTEVDVE9SX1RJVExFXTogdGhpcy5fZ2V0VGl0bGUoKSxcbiAgICAgIFtTRUxFQ1RPUl9DT05URU5UXTogdGhpcy5fZ2V0Q29udGVudCgpXG4gICAgfVxuICB9XG5cbiAgX2dldENvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKHRoaXMuX2NvbmZpZy5jb250ZW50KVxuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gUG9wb3Zlci5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMsIGNvbmZpZylcblxuICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgfVxuXG4gICAgICBkYXRhW2NvbmZpZ10oKVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBqUXVlcnlcbiAqL1xuXG5kZWZpbmVKUXVlcnlQbHVnaW4oUG9wb3ZlcilcblxuZXhwb3J0IGRlZmF1bHQgUG9wb3ZlclxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCBzY3JvbGxzcHkuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL2Jhc2UtY29tcG9uZW50LmpzJ1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tICcuL2RvbS9ldmVudC1oYW5kbGVyLmpzJ1xuaW1wb3J0IFNlbGVjdG9yRW5naW5lIGZyb20gJy4vZG9tL3NlbGVjdG9yLWVuZ2luZS5qcydcbmltcG9ydCB7XG4gIGRlZmluZUpRdWVyeVBsdWdpbiwgZ2V0RWxlbWVudCwgaXNEaXNhYmxlZCwgaXNWaXNpYmxlXG59IGZyb20gJy4vdXRpbC9pbmRleC5qcydcblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCBOQU1FID0gJ3Njcm9sbHNweSdcbmNvbnN0IERBVEFfS0VZID0gJ2JzLnNjcm9sbHNweSdcbmNvbnN0IEVWRU5UX0tFWSA9IGAuJHtEQVRBX0tFWX1gXG5jb25zdCBEQVRBX0FQSV9LRVkgPSAnLmRhdGEtYXBpJ1xuXG5jb25zdCBFVkVOVF9BQ1RJVkFURSA9IGBhY3RpdmF0ZSR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX0NMSUNLID0gYGNsaWNrJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfTE9BRF9EQVRBX0FQSSA9IGBsb2FkJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxuXG5jb25zdCBDTEFTU19OQU1FX0RST1BET1dOX0lURU0gPSAnZHJvcGRvd24taXRlbSdcbmNvbnN0IENMQVNTX05BTUVfQUNUSVZFID0gJ2FjdGl2ZSdcblxuY29uc3QgU0VMRUNUT1JfREFUQV9TUFkgPSAnW2RhdGEtYnMtc3B5PVwic2Nyb2xsXCJdJ1xuY29uc3QgU0VMRUNUT1JfVEFSR0VUX0xJTktTID0gJ1tocmVmXSdcbmNvbnN0IFNFTEVDVE9SX05BVl9MSVNUX0dST1VQID0gJy5uYXYsIC5saXN0LWdyb3VwJ1xuY29uc3QgU0VMRUNUT1JfTkFWX0xJTktTID0gJy5uYXYtbGluaydcbmNvbnN0IFNFTEVDVE9SX05BVl9JVEVNUyA9ICcubmF2LWl0ZW0nXG5jb25zdCBTRUxFQ1RPUl9MSVNUX0lURU1TID0gJy5saXN0LWdyb3VwLWl0ZW0nXG5jb25zdCBTRUxFQ1RPUl9MSU5LX0lURU1TID0gYCR7U0VMRUNUT1JfTkFWX0xJTktTfSwgJHtTRUxFQ1RPUl9OQVZfSVRFTVN9ID4gJHtTRUxFQ1RPUl9OQVZfTElOS1N9LCAke1NFTEVDVE9SX0xJU1RfSVRFTVN9YFxuY29uc3QgU0VMRUNUT1JfRFJPUERPV04gPSAnLmRyb3Bkb3duJ1xuY29uc3QgU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFID0gJy5kcm9wZG93bi10b2dnbGUnXG5cbmNvbnN0IERlZmF1bHQgPSB7XG4gIG9mZnNldDogbnVsbCwgLy8gVE9ETzogdjYgQGRlcHJlY2F0ZWQsIGtlZXAgaXQgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHJlYXNvbnNcbiAgcm9vdE1hcmdpbjogJzBweCAwcHggLTI1JScsXG4gIHNtb290aFNjcm9sbDogZmFsc2UsXG4gIHRhcmdldDogbnVsbCxcbiAgdGhyZXNob2xkOiBbMC4xLCAwLjUsIDFdXG59XG5cbmNvbnN0IERlZmF1bHRUeXBlID0ge1xuICBvZmZzZXQ6ICcobnVtYmVyfG51bGwpJywgLy8gVE9ETyB2NiBAZGVwcmVjYXRlZCwga2VlcCBpdCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgcmVhc29uc1xuICByb290TWFyZ2luOiAnc3RyaW5nJyxcbiAgc21vb3RoU2Nyb2xsOiAnYm9vbGVhbicsXG4gIHRhcmdldDogJ2VsZW1lbnQnLFxuICB0aHJlc2hvbGQ6ICdhcnJheSdcbn1cblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgU2Nyb2xsU3B5IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgIHN1cGVyKGVsZW1lbnQsIGNvbmZpZylcblxuICAgIC8vIHRoaXMuX2VsZW1lbnQgaXMgdGhlIG9ic2VydmFibGVzQ29udGFpbmVyIGFuZCBjb25maWcudGFyZ2V0IHRoZSBtZW51IGxpbmtzIHdyYXBwZXJcbiAgICB0aGlzLl90YXJnZXRMaW5rcyA9IG5ldyBNYXAoKVxuICAgIHRoaXMuX29ic2VydmFibGVTZWN0aW9ucyA9IG5ldyBNYXAoKVxuICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9lbGVtZW50KS5vdmVyZmxvd1kgPT09ICd2aXNpYmxlJyA/IG51bGwgOiB0aGlzLl9lbGVtZW50XG4gICAgdGhpcy5fYWN0aXZlVGFyZ2V0ID0gbnVsbFxuICAgIHRoaXMuX29ic2VydmVyID0gbnVsbFxuICAgIHRoaXMuX3ByZXZpb3VzU2Nyb2xsRGF0YSA9IHtcbiAgICAgIHZpc2libGVFbnRyeVRvcDogMCxcbiAgICAgIHBhcmVudFNjcm9sbFRvcDogMFxuICAgIH1cbiAgICB0aGlzLnJlZnJlc2goKSAvLyBpbml0aWFsaXplXG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFR5cGVcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgLy8gUHVibGljXG4gIHJlZnJlc2goKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZVRhcmdldHNBbmRPYnNlcnZhYmxlcygpXG4gICAgdGhpcy5fbWF5YmVFbmFibGVTbW9vdGhTY3JvbGwoKVxuXG4gICAgaWYgKHRoaXMuX29ic2VydmVyKSB7XG4gICAgICB0aGlzLl9vYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fb2JzZXJ2ZXIgPSB0aGlzLl9nZXROZXdPYnNlcnZlcigpXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIHRoaXMuX29ic2VydmFibGVTZWN0aW9ucy52YWx1ZXMoKSkge1xuICAgICAgdGhpcy5fb2JzZXJ2ZXIub2JzZXJ2ZShzZWN0aW9uKVxuICAgIH1cbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5fb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgc3VwZXIuZGlzcG9zZSgpXG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF9jb25maWdBZnRlck1lcmdlKGNvbmZpZykge1xuICAgIC8vIFRPRE86IG9uIHY2IHRhcmdldCBzaG91bGQgYmUgZ2l2ZW4gZXhwbGljaXRseSAmIHJlbW92ZSB0aGUge3RhcmdldDogJ3NzLXRhcmdldCd9IGNhc2VcbiAgICBjb25maWcudGFyZ2V0ID0gZ2V0RWxlbWVudChjb25maWcudGFyZ2V0KSB8fCBkb2N1bWVudC5ib2R5XG5cbiAgICAvLyBUT0RPOiB2NiBPbmx5IGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSByZWFzb25zLiBVc2Ugcm9vdE1hcmdpbiBvbmx5XG4gICAgY29uZmlnLnJvb3RNYXJnaW4gPSBjb25maWcub2Zmc2V0ID8gYCR7Y29uZmlnLm9mZnNldH1weCAwcHggLTMwJWAgOiBjb25maWcucm9vdE1hcmdpblxuXG4gICAgaWYgKHR5cGVvZiBjb25maWcudGhyZXNob2xkID09PSAnc3RyaW5nJykge1xuICAgICAgY29uZmlnLnRocmVzaG9sZCA9IGNvbmZpZy50aHJlc2hvbGQuc3BsaXQoJywnKS5tYXAodmFsdWUgPT4gTnVtYmVyLnBhcnNlRmxvYXQodmFsdWUpKVxuICAgIH1cblxuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9tYXliZUVuYWJsZVNtb290aFNjcm9sbCgpIHtcbiAgICBpZiAoIXRoaXMuX2NvbmZpZy5zbW9vdGhTY3JvbGwpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIHVucmVnaXN0ZXIgYW55IHByZXZpb3VzIGxpc3RlbmVyc1xuICAgIEV2ZW50SGFuZGxlci5vZmYodGhpcy5fY29uZmlnLnRhcmdldCwgRVZFTlRfQ0xJQ0spXG5cbiAgICBFdmVudEhhbmRsZXIub24odGhpcy5fY29uZmlnLnRhcmdldCwgRVZFTlRfQ0xJQ0ssIFNFTEVDVE9SX1RBUkdFVF9MSU5LUywgZXZlbnQgPT4ge1xuICAgICAgY29uc3Qgb2JzZXJ2YWJsZVNlY3Rpb24gPSB0aGlzLl9vYnNlcnZhYmxlU2VjdGlvbnMuZ2V0KGV2ZW50LnRhcmdldC5oYXNoKVxuICAgICAgaWYgKG9ic2VydmFibGVTZWN0aW9uKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY29uc3Qgcm9vdCA9IHRoaXMuX3Jvb3RFbGVtZW50IHx8IHdpbmRvd1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBvYnNlcnZhYmxlU2VjdGlvbi5vZmZzZXRUb3AgLSB0aGlzLl9lbGVtZW50Lm9mZnNldFRvcFxuICAgICAgICBpZiAocm9vdC5zY3JvbGxUbykge1xuICAgICAgICAgIHJvb3Quc2Nyb2xsVG8oeyB0b3A6IGhlaWdodCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaHJvbWUgNjAgZG9lc24ndCBzdXBwb3J0IGBzY3JvbGxUb2BcbiAgICAgICAgcm9vdC5zY3JvbGxUb3AgPSBoZWlnaHRcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgX2dldE5ld09ic2VydmVyKCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICByb290OiB0aGlzLl9yb290RWxlbWVudCxcbiAgICAgIHRocmVzaG9sZDogdGhpcy5fY29uZmlnLnRocmVzaG9sZCxcbiAgICAgIHJvb3RNYXJnaW46IHRoaXMuX2NvbmZpZy5yb290TWFyZ2luXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihlbnRyaWVzID0+IHRoaXMuX29ic2VydmVyQ2FsbGJhY2soZW50cmllcyksIG9wdGlvbnMpXG4gIH1cblxuICAvLyBUaGUgbG9naWMgb2Ygc2VsZWN0aW9uXG4gIF9vYnNlcnZlckNhbGxiYWNrKGVudHJpZXMpIHtcbiAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZW50cnkgPT4gdGhpcy5fdGFyZ2V0TGlua3MuZ2V0KGAjJHtlbnRyeS50YXJnZXQuaWR9YClcbiAgICBjb25zdCBhY3RpdmF0ZSA9IGVudHJ5ID0+IHtcbiAgICAgIHRoaXMuX3ByZXZpb3VzU2Nyb2xsRGF0YS52aXNpYmxlRW50cnlUb3AgPSBlbnRyeS50YXJnZXQub2Zmc2V0VG9wXG4gICAgICB0aGlzLl9wcm9jZXNzKHRhcmdldEVsZW1lbnQoZW50cnkpKVxuICAgIH1cblxuICAgIGNvbnN0IHBhcmVudFNjcm9sbFRvcCA9ICh0aGlzLl9yb290RWxlbWVudCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLnNjcm9sbFRvcFxuICAgIGNvbnN0IHVzZXJTY3JvbGxzRG93biA9IHBhcmVudFNjcm9sbFRvcCA+PSB0aGlzLl9wcmV2aW91c1Njcm9sbERhdGEucGFyZW50U2Nyb2xsVG9wXG4gICAgdGhpcy5fcHJldmlvdXNTY3JvbGxEYXRhLnBhcmVudFNjcm9sbFRvcCA9IHBhcmVudFNjcm9sbFRvcFxuXG4gICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICBpZiAoIWVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCA9IG51bGxcbiAgICAgICAgdGhpcy5fY2xlYXJBY3RpdmVDbGFzcyh0YXJnZXRFbGVtZW50KGVudHJ5KSlcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBlbnRyeUlzTG93ZXJUaGFuUHJldmlvdXMgPSBlbnRyeS50YXJnZXQub2Zmc2V0VG9wID49IHRoaXMuX3ByZXZpb3VzU2Nyb2xsRGF0YS52aXNpYmxlRW50cnlUb3BcbiAgICAgIC8vIGlmIHdlIGFyZSBzY3JvbGxpbmcgZG93biwgcGljayB0aGUgYmlnZ2VyIG9mZnNldFRvcFxuICAgICAgaWYgKHVzZXJTY3JvbGxzRG93biAmJiBlbnRyeUlzTG93ZXJUaGFuUHJldmlvdXMpIHtcbiAgICAgICAgYWN0aXZhdGUoZW50cnkpXG4gICAgICAgIC8vIGlmIHBhcmVudCBpc24ndCBzY3JvbGxlZCwgbGV0J3Mga2VlcCB0aGUgZmlyc3QgdmlzaWJsZSBpdGVtLCBicmVha2luZyB0aGUgaXRlcmF0aW9uXG4gICAgICAgIGlmICghcGFyZW50U2Nyb2xsVG9wKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyBpZiB3ZSBhcmUgc2Nyb2xsaW5nIHVwLCBwaWNrIHRoZSBzbWFsbGVzdCBvZmZzZXRUb3BcbiAgICAgIGlmICghdXNlclNjcm9sbHNEb3duICYmICFlbnRyeUlzTG93ZXJUaGFuUHJldmlvdXMpIHtcbiAgICAgICAgYWN0aXZhdGUoZW50cnkpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2luaXRpYWxpemVUYXJnZXRzQW5kT2JzZXJ2YWJsZXMoKSB7XG4gICAgdGhpcy5fdGFyZ2V0TGlua3MgPSBuZXcgTWFwKClcbiAgICB0aGlzLl9vYnNlcnZhYmxlU2VjdGlvbnMgPSBuZXcgTWFwKClcblxuICAgIGNvbnN0IHRhcmdldExpbmtzID0gU2VsZWN0b3JFbmdpbmUuZmluZChTRUxFQ1RPUl9UQVJHRVRfTElOS1MsIHRoaXMuX2NvbmZpZy50YXJnZXQpXG5cbiAgICBmb3IgKGNvbnN0IGFuY2hvciBvZiB0YXJnZXRMaW5rcykge1xuICAgICAgLy8gZW5zdXJlIHRoYXQgdGhlIGFuY2hvciBoYXMgYW4gaWQgYW5kIGlzIG5vdCBkaXNhYmxlZFxuICAgICAgaWYgKCFhbmNob3IuaGFzaCB8fCBpc0Rpc2FibGVkKGFuY2hvcikpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb2JzZXJ2YWJsZVNlY3Rpb24gPSBTZWxlY3RvckVuZ2luZS5maW5kT25lKGRlY29kZVVSSShhbmNob3IuaGFzaCksIHRoaXMuX2VsZW1lbnQpXG5cbiAgICAgIC8vIGVuc3VyZSB0aGF0IHRoZSBvYnNlcnZhYmxlU2VjdGlvbiBleGlzdHMgJiBpcyB2aXNpYmxlXG4gICAgICBpZiAoaXNWaXNpYmxlKG9ic2VydmFibGVTZWN0aW9uKSkge1xuICAgICAgICB0aGlzLl90YXJnZXRMaW5rcy5zZXQoZGVjb2RlVVJJKGFuY2hvci5oYXNoKSwgYW5jaG9yKVxuICAgICAgICB0aGlzLl9vYnNlcnZhYmxlU2VjdGlvbnMuc2V0KGFuY2hvci5oYXNoLCBvYnNlcnZhYmxlU2VjdGlvbilcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfcHJvY2Vzcyh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5fYWN0aXZlVGFyZ2V0ID09PSB0YXJnZXQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX2NsZWFyQWN0aXZlQ2xhc3ModGhpcy5fY29uZmlnLnRhcmdldClcbiAgICB0aGlzLl9hY3RpdmVUYXJnZXQgPSB0YXJnZXRcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0FDVElWRSlcbiAgICB0aGlzLl9hY3RpdmF0ZVBhcmVudHModGFyZ2V0KVxuXG4gICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfQUNUSVZBVEUsIHsgcmVsYXRlZFRhcmdldDogdGFyZ2V0IH0pXG4gIH1cblxuICBfYWN0aXZhdGVQYXJlbnRzKHRhcmdldCkge1xuICAgIC8vIEFjdGl2YXRlIGRyb3Bkb3duIHBhcmVudHNcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0RST1BET1dOX0lURU0pKSB7XG4gICAgICBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX0RST1BET1dOX1RPR0dMRSwgdGFyZ2V0LmNsb3Nlc3QoU0VMRUNUT1JfRFJPUERPV04pKVxuICAgICAgICAuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0FDVElWRSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGZvciAoY29uc3QgbGlzdEdyb3VwIG9mIFNlbGVjdG9yRW5naW5lLnBhcmVudHModGFyZ2V0LCBTRUxFQ1RPUl9OQVZfTElTVF9HUk9VUCkpIHtcbiAgICAgIC8vIFNldCB0cmlnZ2VyZWQgbGlua3MgcGFyZW50cyBhcyBhY3RpdmVcbiAgICAgIC8vIFdpdGggYm90aCA8dWw+IGFuZCA8bmF2PiBtYXJrdXAgYSBwYXJlbnQgaXMgdGhlIHByZXZpb3VzIHNpYmxpbmcgb2YgYW55IG5hdiBhbmNlc3RvclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIFNlbGVjdG9yRW5naW5lLnByZXYobGlzdEdyb3VwLCBTRUxFQ1RPUl9MSU5LX0lURU1TKSkge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9BQ1RJVkUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2NsZWFyQWN0aXZlQ2xhc3MocGFyZW50KSB7XG4gICAgcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9BQ1RJVkUpXG5cbiAgICBjb25zdCBhY3RpdmVOb2RlcyA9IFNlbGVjdG9yRW5naW5lLmZpbmQoYCR7U0VMRUNUT1JfVEFSR0VUX0xJTktTfS4ke0NMQVNTX05BTUVfQUNUSVZFfWAsIHBhcmVudClcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgYWN0aXZlTm9kZXMpIHtcbiAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX0FDVElWRSlcbiAgICB9XG4gIH1cblxuICAvLyBTdGF0aWNcbiAgc3RhdGljIGpRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBTY3JvbGxTcHkuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzLCBjb25maWcpXG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGFbY29uZmlnXSA9PT0gdW5kZWZpbmVkIHx8IGNvbmZpZy5zdGFydHNXaXRoKCdfJykgfHwgY29uZmlnID09PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYClcbiAgICAgIH1cblxuICAgICAgZGF0YVtjb25maWddKClcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogRGF0YSBBUEkgaW1wbGVtZW50YXRpb25cbiAqL1xuXG5FdmVudEhhbmRsZXIub24od2luZG93LCBFVkVOVF9MT0FEX0RBVEFfQVBJLCAoKSA9PiB7XG4gIGZvciAoY29uc3Qgc3B5IG9mIFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfREFUQV9TUFkpKSB7XG4gICAgU2Nyb2xsU3B5LmdldE9yQ3JlYXRlSW5zdGFuY2Uoc3B5KVxuICB9XG59KVxuXG4vKipcbiAqIGpRdWVyeVxuICovXG5cbmRlZmluZUpRdWVyeVBsdWdpbihTY3JvbGxTcHkpXG5cbmV4cG9ydCBkZWZhdWx0IFNjcm9sbFNweVxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB0YWIuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL2Jhc2UtY29tcG9uZW50LmpzJ1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tICcuL2RvbS9ldmVudC1oYW5kbGVyLmpzJ1xuaW1wb3J0IFNlbGVjdG9yRW5naW5lIGZyb20gJy4vZG9tL3NlbGVjdG9yLWVuZ2luZS5qcydcbmltcG9ydCB7IGRlZmluZUpRdWVyeVBsdWdpbiwgZ2V0TmV4dEFjdGl2ZUVsZW1lbnQsIGlzRGlzYWJsZWQgfSBmcm9tICcuL3V0aWwvaW5kZXguanMnXG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3QgTkFNRSA9ICd0YWInXG5jb25zdCBEQVRBX0tFWSA9ICdicy50YWInXG5jb25zdCBFVkVOVF9LRVkgPSBgLiR7REFUQV9LRVl9YFxuXG5jb25zdCBFVkVOVF9ISURFID0gYGhpZGUke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9ISURERU4gPSBgaGlkZGVuJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfU0hPVyA9IGBzaG93JHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfU0hPV04gPSBgc2hvd24ke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9DTElDS19EQVRBX0FQSSA9IGBjbGljayR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX0tFWURPV04gPSBga2V5ZG93biR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX0xPQURfREFUQV9BUEkgPSBgbG9hZCR7RVZFTlRfS0VZfWBcblxuY29uc3QgQVJST1dfTEVGVF9LRVkgPSAnQXJyb3dMZWZ0J1xuY29uc3QgQVJST1dfUklHSFRfS0VZID0gJ0Fycm93UmlnaHQnXG5jb25zdCBBUlJPV19VUF9LRVkgPSAnQXJyb3dVcCdcbmNvbnN0IEFSUk9XX0RPV05fS0VZID0gJ0Fycm93RG93bidcbmNvbnN0IEhPTUVfS0VZID0gJ0hvbWUnXG5jb25zdCBFTkRfS0VZID0gJ0VuZCdcblxuY29uc3QgQ0xBU1NfTkFNRV9BQ1RJVkUgPSAnYWN0aXZlJ1xuY29uc3QgQ0xBU1NfTkFNRV9GQURFID0gJ2ZhZGUnXG5jb25zdCBDTEFTU19OQU1FX1NIT1cgPSAnc2hvdydcbmNvbnN0IENMQVNTX0RST1BET1dOID0gJ2Ryb3Bkb3duJ1xuXG5jb25zdCBTRUxFQ1RPUl9EUk9QRE9XTl9UT0dHTEUgPSAnLmRyb3Bkb3duLXRvZ2dsZSdcbmNvbnN0IFNFTEVDVE9SX0RST1BET1dOX01FTlUgPSAnLmRyb3Bkb3duLW1lbnUnXG5jb25zdCBOT1RfU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFID0gYDpub3QoJHtTRUxFQ1RPUl9EUk9QRE9XTl9UT0dHTEV9KWBcblxuY29uc3QgU0VMRUNUT1JfVEFCX1BBTkVMID0gJy5saXN0LWdyb3VwLCAubmF2LCBbcm9sZT1cInRhYmxpc3RcIl0nXG5jb25zdCBTRUxFQ1RPUl9PVVRFUiA9ICcubmF2LWl0ZW0sIC5saXN0LWdyb3VwLWl0ZW0nXG5jb25zdCBTRUxFQ1RPUl9JTk5FUiA9IGAubmF2LWxpbmske05PVF9TRUxFQ1RPUl9EUk9QRE9XTl9UT0dHTEV9LCAubGlzdC1ncm91cC1pdGVtJHtOT1RfU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFfSwgW3JvbGU9XCJ0YWJcIl0ke05PVF9TRUxFQ1RPUl9EUk9QRE9XTl9UT0dHTEV9YFxuY29uc3QgU0VMRUNUT1JfREFUQV9UT0dHTEUgPSAnW2RhdGEtYnMtdG9nZ2xlPVwidGFiXCJdLCBbZGF0YS1icy10b2dnbGU9XCJwaWxsXCJdLCBbZGF0YS1icy10b2dnbGU9XCJsaXN0XCJdJyAvLyBUT0RPOiBjb3VsZCBvbmx5IGJlIGB0YWJgIGluIHY2XG5jb25zdCBTRUxFQ1RPUl9JTk5FUl9FTEVNID0gYCR7U0VMRUNUT1JfSU5ORVJ9LCAke1NFTEVDVE9SX0RBVEFfVE9HR0xFfWBcblxuY29uc3QgU0VMRUNUT1JfREFUQV9UT0dHTEVfQUNUSVZFID0gYC4ke0NMQVNTX05BTUVfQUNUSVZFfVtkYXRhLWJzLXRvZ2dsZT1cInRhYlwiXSwgLiR7Q0xBU1NfTkFNRV9BQ1RJVkV9W2RhdGEtYnMtdG9nZ2xlPVwicGlsbFwiXSwgLiR7Q0xBU1NfTkFNRV9BQ1RJVkV9W2RhdGEtYnMtdG9nZ2xlPVwibGlzdFwiXWBcblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgVGFiIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KVxuICAgIHRoaXMuX3BhcmVudCA9IHRoaXMuX2VsZW1lbnQuY2xvc2VzdChTRUxFQ1RPUl9UQUJfUEFORUwpXG5cbiAgICBpZiAoIXRoaXMuX3BhcmVudCkge1xuICAgICAgcmV0dXJuXG4gICAgICAvLyBUT0RPOiBzaG91bGQgdGhyb3cgZXhjZXB0aW9uIGluIHY2XG4gICAgICAvLyB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2VsZW1lbnQub3V0ZXJIVE1MfSBoYXMgbm90IGEgdmFsaWQgcGFyZW50ICR7U0VMRUNUT1JfSU5ORVJfRUxFTX1gKVxuICAgIH1cblxuICAgIC8vIFNldCB1cCBpbml0aWFsIGFyaWEgYXR0cmlidXRlc1xuICAgIHRoaXMuX3NldEluaXRpYWxBdHRyaWJ1dGVzKHRoaXMuX3BhcmVudCwgdGhpcy5fZ2V0Q2hpbGRyZW4oKSlcblxuICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9LRVlET1dOLCBldmVudCA9PiB0aGlzLl9rZXlkb3duKGV2ZW50KSlcbiAgfVxuXG4gIC8vIEdldHRlcnNcbiAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiBOQU1FXG4gIH1cblxuICAvLyBQdWJsaWNcbiAgc2hvdygpIHsgLy8gU2hvd3MgdGhpcyBlbGVtIGFuZCBkZWFjdGl2YXRlIHRoZSBhY3RpdmUgc2libGluZyBpZiBleGlzdHNcbiAgICBjb25zdCBpbm5lckVsZW0gPSB0aGlzLl9lbGVtZW50XG4gICAgaWYgKHRoaXMuX2VsZW1Jc0FjdGl2ZShpbm5lckVsZW0pKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBTZWFyY2ggZm9yIGFjdGl2ZSB0YWIgb24gc2FtZSBwYXJlbnQgdG8gZGVhY3RpdmF0ZSBpdFxuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuX2dldEFjdGl2ZUVsZW0oKVxuXG4gICAgY29uc3QgaGlkZUV2ZW50ID0gYWN0aXZlID9cbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKGFjdGl2ZSwgRVZFTlRfSElERSwgeyByZWxhdGVkVGFyZ2V0OiBpbm5lckVsZW0gfSkgOlxuICAgICAgbnVsbFxuXG4gICAgY29uc3Qgc2hvd0V2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIoaW5uZXJFbGVtLCBFVkVOVF9TSE9XLCB7IHJlbGF0ZWRUYXJnZXQ6IGFjdGl2ZSB9KVxuXG4gICAgaWYgKHNob3dFdmVudC5kZWZhdWx0UHJldmVudGVkIHx8IChoaWRlRXZlbnQgJiYgaGlkZUV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLl9kZWFjdGl2YXRlKGFjdGl2ZSwgaW5uZXJFbGVtKVxuICAgIHRoaXMuX2FjdGl2YXRlKGlubmVyRWxlbSwgYWN0aXZlKVxuICB9XG5cbiAgLy8gUHJpdmF0ZVxuICBfYWN0aXZhdGUoZWxlbWVudCwgcmVsYXRlZEVsZW0pIHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0FDVElWRSlcblxuICAgIHRoaXMuX2FjdGl2YXRlKFNlbGVjdG9yRW5naW5lLmdldEVsZW1lbnRGcm9tU2VsZWN0b3IoZWxlbWVudCkpIC8vIFNlYXJjaCBhbmQgYWN0aXZhdGUvc2hvdyB0aGUgcHJvcGVyIHNlY3Rpb25cblxuICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyb2xlJykgIT09ICd0YWInKSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX1NIT1cpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKVxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCB0cnVlKVxuICAgICAgdGhpcy5fdG9nZ2xlRHJvcERvd24oZWxlbWVudCwgdHJ1ZSlcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKGVsZW1lbnQsIEVWRU5UX1NIT1dOLCB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRFbGVtXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soY29tcGxldGUsIGVsZW1lbnQsIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfRkFERSkpXG4gIH1cblxuICBfZGVhY3RpdmF0ZShlbGVtZW50LCByZWxhdGVkRWxlbSkge1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQUNUSVZFKVxuICAgIGVsZW1lbnQuYmx1cigpXG5cbiAgICB0aGlzLl9kZWFjdGl2YXRlKFNlbGVjdG9yRW5naW5lLmdldEVsZW1lbnRGcm9tU2VsZWN0b3IoZWxlbWVudCkpIC8vIFNlYXJjaCBhbmQgZGVhY3RpdmF0ZSB0aGUgc2hvd24gc2VjdGlvbiB0b29cblxuICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyb2xlJykgIT09ICd0YWInKSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX1NIT1cpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIGZhbHNlKVxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJylcbiAgICAgIHRoaXMuX3RvZ2dsZURyb3BEb3duKGVsZW1lbnQsIGZhbHNlKVxuICAgICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIoZWxlbWVudCwgRVZFTlRfSElEREVOLCB7IHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRFbGVtIH0pXG4gICAgfVxuXG4gICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZSwgZWxlbWVudCwgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9GQURFKSlcbiAgfVxuXG4gIF9rZXlkb3duKGV2ZW50KSB7XG4gICAgaWYgKCEoW0FSUk9XX0xFRlRfS0VZLCBBUlJPV19SSUdIVF9LRVksIEFSUk9XX1VQX0tFWSwgQVJST1dfRE9XTl9LRVksIEhPTUVfS0VZLCBFTkRfS0VZXS5pbmNsdWRlcyhldmVudC5rZXkpKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCkvLyBzdG9wUHJvcGFnYXRpb24vcHJldmVudERlZmF1bHQgYm90aCBhZGRlZCB0byBzdXBwb3J0IHVwL2Rvd24ga2V5cyB3aXRob3V0IHNjcm9sbGluZyB0aGUgcGFnZVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5fZ2V0Q2hpbGRyZW4oKS5maWx0ZXIoZWxlbWVudCA9PiAhaXNEaXNhYmxlZChlbGVtZW50KSlcbiAgICBsZXQgbmV4dEFjdGl2ZUVsZW1lbnRcblxuICAgIGlmIChbSE9NRV9LRVksIEVORF9LRVldLmluY2x1ZGVzKGV2ZW50LmtleSkpIHtcbiAgICAgIG5leHRBY3RpdmVFbGVtZW50ID0gY2hpbGRyZW5bZXZlbnQua2V5ID09PSBIT01FX0tFWSA/IDAgOiBjaGlsZHJlbi5sZW5ndGggLSAxXVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpc05leHQgPSBbQVJST1dfUklHSFRfS0VZLCBBUlJPV19ET1dOX0tFWV0uaW5jbHVkZXMoZXZlbnQua2V5KVxuICAgICAgbmV4dEFjdGl2ZUVsZW1lbnQgPSBnZXROZXh0QWN0aXZlRWxlbWVudChjaGlsZHJlbiwgZXZlbnQudGFyZ2V0LCBpc05leHQsIHRydWUpXG4gICAgfVxuXG4gICAgaWYgKG5leHRBY3RpdmVFbGVtZW50KSB7XG4gICAgICBuZXh0QWN0aXZlRWxlbWVudC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgIFRhYi5nZXRPckNyZWF0ZUluc3RhbmNlKG5leHRBY3RpdmVFbGVtZW50KS5zaG93KClcbiAgICB9XG4gIH1cblxuICBfZ2V0Q2hpbGRyZW4oKSB7IC8vIGNvbGxlY3Rpb24gb2YgaW5uZXIgZWxlbWVudHNcbiAgICByZXR1cm4gU2VsZWN0b3JFbmdpbmUuZmluZChTRUxFQ1RPUl9JTk5FUl9FTEVNLCB0aGlzLl9wYXJlbnQpXG4gIH1cblxuICBfZ2V0QWN0aXZlRWxlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Q2hpbGRyZW4oKS5maW5kKGNoaWxkID0+IHRoaXMuX2VsZW1Jc0FjdGl2ZShjaGlsZCkpIHx8IG51bGxcbiAgfVxuXG4gIF9zZXRJbml0aWFsQXR0cmlidXRlcyhwYXJlbnQsIGNoaWxkcmVuKSB7XG4gICAgdGhpcy5fc2V0QXR0cmlidXRlSWZOb3RFeGlzdHMocGFyZW50LCAncm9sZScsICd0YWJsaXN0JylcblxuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgIHRoaXMuX3NldEluaXRpYWxBdHRyaWJ1dGVzT25DaGlsZChjaGlsZClcbiAgICB9XG4gIH1cblxuICBfc2V0SW5pdGlhbEF0dHJpYnV0ZXNPbkNoaWxkKGNoaWxkKSB7XG4gICAgY2hpbGQgPSB0aGlzLl9nZXRJbm5lckVsZW1lbnQoY2hpbGQpXG4gICAgY29uc3QgaXNBY3RpdmUgPSB0aGlzLl9lbGVtSXNBY3RpdmUoY2hpbGQpXG4gICAgY29uc3Qgb3V0ZXJFbGVtID0gdGhpcy5fZ2V0T3V0ZXJFbGVtZW50KGNoaWxkKVxuICAgIGNoaWxkLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIGlzQWN0aXZlKVxuXG4gICAgaWYgKG91dGVyRWxlbSAhPT0gY2hpbGQpIHtcbiAgICAgIHRoaXMuX3NldEF0dHJpYnV0ZUlmTm90RXhpc3RzKG91dGVyRWxlbSwgJ3JvbGUnLCAncHJlc2VudGF0aW9uJylcbiAgICB9XG5cbiAgICBpZiAoIWlzQWN0aXZlKSB7XG4gICAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJylcbiAgICB9XG5cbiAgICB0aGlzLl9zZXRBdHRyaWJ1dGVJZk5vdEV4aXN0cyhjaGlsZCwgJ3JvbGUnLCAndGFiJylcblxuICAgIC8vIHNldCBhdHRyaWJ1dGVzIHRvIHRoZSByZWxhdGVkIHBhbmVsIHRvb1xuICAgIHRoaXMuX3NldEluaXRpYWxBdHRyaWJ1dGVzT25UYXJnZXRQYW5lbChjaGlsZClcbiAgfVxuXG4gIF9zZXRJbml0aWFsQXR0cmlidXRlc09uVGFyZ2V0UGFuZWwoY2hpbGQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBTZWxlY3RvckVuZ2luZS5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKGNoaWxkKVxuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX3NldEF0dHJpYnV0ZUlmTm90RXhpc3RzKHRhcmdldCwgJ3JvbGUnLCAndGFicGFuZWwnKVxuXG4gICAgaWYgKGNoaWxkLmlkKSB7XG4gICAgICB0aGlzLl9zZXRBdHRyaWJ1dGVJZk5vdEV4aXN0cyh0YXJnZXQsICdhcmlhLWxhYmVsbGVkYnknLCBgJHtjaGlsZC5pZH1gKVxuICAgIH1cbiAgfVxuXG4gIF90b2dnbGVEcm9wRG93bihlbGVtZW50LCBvcGVuKSB7XG4gICAgY29uc3Qgb3V0ZXJFbGVtID0gdGhpcy5fZ2V0T3V0ZXJFbGVtZW50KGVsZW1lbnQpXG4gICAgaWYgKCFvdXRlckVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX0RST1BET1dOKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgdG9nZ2xlID0gKHNlbGVjdG9yLCBjbGFzc05hbWUpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBTZWxlY3RvckVuZ2luZS5maW5kT25lKHNlbGVjdG9yLCBvdXRlckVsZW0pXG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lLCBvcGVuKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZShTRUxFQ1RPUl9EUk9QRE9XTl9UT0dHTEUsIENMQVNTX05BTUVfQUNUSVZFKVxuICAgIHRvZ2dsZShTRUxFQ1RPUl9EUk9QRE9XTl9NRU5VLCBDTEFTU19OQU1FX1NIT1cpXG4gICAgb3V0ZXJFbGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIG9wZW4pXG4gIH1cblxuICBfc2V0QXR0cmlidXRlSWZOb3RFeGlzdHMoZWxlbWVudCwgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgIGlmICghZWxlbWVudC5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlKSkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSlcbiAgICB9XG4gIH1cblxuICBfZWxlbUlzQWN0aXZlKGVsZW0pIHtcbiAgICByZXR1cm4gZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9BQ1RJVkUpXG4gIH1cblxuICAvLyBUcnkgdG8gZ2V0IHRoZSBpbm5lciBlbGVtZW50ICh1c3VhbGx5IHRoZSAubmF2LWxpbmspXG4gIF9nZXRJbm5lckVsZW1lbnQoZWxlbSkge1xuICAgIHJldHVybiBlbGVtLm1hdGNoZXMoU0VMRUNUT1JfSU5ORVJfRUxFTSkgPyBlbGVtIDogU2VsZWN0b3JFbmdpbmUuZmluZE9uZShTRUxFQ1RPUl9JTk5FUl9FTEVNLCBlbGVtKVxuICB9XG5cbiAgLy8gVHJ5IHRvIGdldCB0aGUgb3V0ZXIgZWxlbWVudCAodXN1YWxseSB0aGUgLm5hdi1pdGVtKVxuICBfZ2V0T3V0ZXJFbGVtZW50KGVsZW0pIHtcbiAgICByZXR1cm4gZWxlbS5jbG9zZXN0KFNFTEVDVE9SX09VVEVSKSB8fCBlbGVtXG4gIH1cblxuICAvLyBTdGF0aWNcbiAgc3RhdGljIGpRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBUYWIuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzKVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCB8fCBjb25maWcuc3RhcnRzV2l0aCgnXycpIHx8IGNvbmZpZyA9PT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICB9XG5cbiAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIERhdGEgQVBJIGltcGxlbWVudGF0aW9uXG4gKi9cblxuRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9DTElDS19EQVRBX0FQSSwgU0VMRUNUT1JfREFUQV9UT0dHTEUsIGZ1bmN0aW9uIChldmVudCkge1xuICBpZiAoWydBJywgJ0FSRUEnXS5pbmNsdWRlcyh0aGlzLnRhZ05hbWUpKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICB9XG5cbiAgaWYgKGlzRGlzYWJsZWQodGhpcykpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIFRhYi5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMpLnNob3coKVxufSlcblxuLyoqXG4gKiBJbml0aWFsaXplIG9uIGZvY3VzXG4gKi9cbkV2ZW50SGFuZGxlci5vbih3aW5kb3csIEVWRU5UX0xPQURfREFUQV9BUEksICgpID0+IHtcbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfREFUQV9UT0dHTEVfQUNUSVZFKSkge1xuICAgIFRhYi5nZXRPckNyZWF0ZUluc3RhbmNlKGVsZW1lbnQpXG4gIH1cbn0pXG4vKipcbiAqIGpRdWVyeVxuICovXG5cbmRlZmluZUpRdWVyeVBsdWdpbihUYWIpXG5cbmV4cG9ydCBkZWZhdWx0IFRhYlxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB0b2FzdC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmltcG9ydCBCYXNlQ29tcG9uZW50IGZyb20gJy4vYmFzZS1jb21wb25lbnQuanMnXG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gJy4vZG9tL2V2ZW50LWhhbmRsZXIuanMnXG5pbXBvcnQgeyBlbmFibGVEaXNtaXNzVHJpZ2dlciB9IGZyb20gJy4vdXRpbC9jb21wb25lbnQtZnVuY3Rpb25zLmpzJ1xuaW1wb3J0IHsgZGVmaW5lSlF1ZXJ5UGx1Z2luLCByZWZsb3cgfSBmcm9tICcuL3V0aWwvaW5kZXguanMnXG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3QgTkFNRSA9ICd0b2FzdCdcbmNvbnN0IERBVEFfS0VZID0gJ2JzLnRvYXN0J1xuY29uc3QgRVZFTlRfS0VZID0gYC4ke0RBVEFfS0VZfWBcblxuY29uc3QgRVZFTlRfTU9VU0VPVkVSID0gYG1vdXNlb3ZlciR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX01PVVNFT1VUID0gYG1vdXNlb3V0JHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfRk9DVVNJTiA9IGBmb2N1c2luJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfRk9DVVNPVVQgPSBgZm9jdXNvdXQke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9ISURFID0gYGhpZGUke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9ISURERU4gPSBgaGlkZGVuJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfU0hPVyA9IGBzaG93JHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfU0hPV04gPSBgc2hvd24ke0VWRU5UX0tFWX1gXG5cbmNvbnN0IENMQVNTX05BTUVfRkFERSA9ICdmYWRlJ1xuY29uc3QgQ0xBU1NfTkFNRV9ISURFID0gJ2hpZGUnIC8vIEBkZXByZWNhdGVkIC0ga2VwdCBoZXJlIG9ubHkgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5jb25zdCBDTEFTU19OQU1FX1NIT1cgPSAnc2hvdydcbmNvbnN0IENMQVNTX05BTUVfU0hPV0lORyA9ICdzaG93aW5nJ1xuXG5jb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgYW5pbWF0aW9uOiAnYm9vbGVhbicsXG4gIGF1dG9oaWRlOiAnYm9vbGVhbicsXG4gIGRlbGF5OiAnbnVtYmVyJ1xufVxuXG5jb25zdCBEZWZhdWx0ID0ge1xuICBhbmltYXRpb246IHRydWUsXG4gIGF1dG9oaWRlOiB0cnVlLFxuICBkZWxheTogNTAwMFxufVxuXG4vKipcbiAqIENsYXNzIGRlZmluaXRpb25cbiAqL1xuXG5jbGFzcyBUb2FzdCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICBzdXBlcihlbGVtZW50LCBjb25maWcpXG5cbiAgICB0aGlzLl90aW1lb3V0ID0gbnVsbFxuICAgIHRoaXMuX2hhc01vdXNlSW50ZXJhY3Rpb24gPSBmYWxzZVxuICAgIHRoaXMuX2hhc0tleWJvYXJkSW50ZXJhY3Rpb24gPSBmYWxzZVxuICAgIHRoaXMuX3NldExpc3RlbmVycygpXG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFR5cGVcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgLy8gUHVibGljXG4gIHNob3coKSB7XG4gICAgY29uc3Qgc2hvd0V2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfU0hPVylcblxuICAgIGlmIChzaG93RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5fY2xlYXJUaW1lb3V0KClcblxuICAgIGlmICh0aGlzLl9jb25maWcuYW5pbWF0aW9uKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9GQURFKVxuICAgIH1cblxuICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfU0hPV0lORylcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1NIT1dOKVxuXG4gICAgICB0aGlzLl9tYXliZVNjaGVkdWxlSGlkZSgpXG4gICAgfVxuXG4gICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfSElERSkgLy8gQGRlcHJlY2F0ZWRcbiAgICByZWZsb3codGhpcy5fZWxlbWVudClcbiAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9TSE9XLCBDTEFTU19OQU1FX1NIT1dJTkcpXG5cbiAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKGNvbXBsZXRlLCB0aGlzLl9lbGVtZW50LCB0aGlzLl9jb25maWcuYW5pbWF0aW9uKVxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNTaG93bigpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBoaWRlRXZlbnQgPSBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9ISURFKVxuXG4gICAgaWYgKGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0hJREUpIC8vIEBkZXByZWNhdGVkXG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XSU5HLCBDTEFTU19OQU1FX1NIT1cpXG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9ISURERU4pXG4gICAgfVxuXG4gICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPV0lORylcbiAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKGNvbXBsZXRlLCB0aGlzLl9lbGVtZW50LCB0aGlzLl9jb25maWcuYW5pbWF0aW9uKVxuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICB0aGlzLl9jbGVhclRpbWVvdXQoKVxuXG4gICAgaWYgKHRoaXMuaXNTaG93bigpKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XKVxuICAgIH1cblxuICAgIHN1cGVyLmRpc3Bvc2UoKVxuICB9XG5cbiAgaXNTaG93bigpIHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9TSE9XKVxuICB9XG5cbiAgLy8gUHJpdmF0ZVxuXG4gIF9tYXliZVNjaGVkdWxlSGlkZSgpIHtcbiAgICBpZiAoIXRoaXMuX2NvbmZpZy5hdXRvaGlkZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2hhc01vdXNlSW50ZXJhY3Rpb24gfHwgdGhpcy5faGFzS2V5Ym9hcmRJbnRlcmFjdGlvbikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5fdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5oaWRlKClcbiAgICB9LCB0aGlzLl9jb25maWcuZGVsYXkpXG4gIH1cblxuICBfb25JbnRlcmFjdGlvbihldmVudCwgaXNJbnRlcmFjdGluZykge1xuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgY2FzZSAnbW91c2VvdmVyJzpcbiAgICAgIGNhc2UgJ21vdXNlb3V0Jzoge1xuICAgICAgICB0aGlzLl9oYXNNb3VzZUludGVyYWN0aW9uID0gaXNJbnRlcmFjdGluZ1xuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlICdmb2N1c2luJzpcbiAgICAgIGNhc2UgJ2ZvY3Vzb3V0Jzoge1xuICAgICAgICB0aGlzLl9oYXNLZXlib2FyZEludGVyYWN0aW9uID0gaXNJbnRlcmFjdGluZ1xuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzSW50ZXJhY3RpbmcpIHtcbiAgICAgIHRoaXMuX2NsZWFyVGltZW91dCgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBuZXh0RWxlbWVudCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXRcbiAgICBpZiAodGhpcy5fZWxlbWVudCA9PT0gbmV4dEVsZW1lbnQgfHwgdGhpcy5fZWxlbWVudC5jb250YWlucyhuZXh0RWxlbWVudCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX21heWJlU2NoZWR1bGVIaWRlKClcbiAgfVxuXG4gIF9zZXRMaXN0ZW5lcnMoKSB7XG4gICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX01PVVNFT1ZFUiwgZXZlbnQgPT4gdGhpcy5fb25JbnRlcmFjdGlvbihldmVudCwgdHJ1ZSkpXG4gICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX01PVVNFT1VULCBldmVudCA9PiB0aGlzLl9vbkludGVyYWN0aW9uKGV2ZW50LCBmYWxzZSkpXG4gICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0ZPQ1VTSU4sIGV2ZW50ID0+IHRoaXMuX29uSW50ZXJhY3Rpb24oZXZlbnQsIHRydWUpKVxuICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9GT0NVU09VVCwgZXZlbnQgPT4gdGhpcy5fb25JbnRlcmFjdGlvbihldmVudCwgZmFsc2UpKVxuICB9XG5cbiAgX2NsZWFyVGltZW91dCgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dClcbiAgICB0aGlzLl90aW1lb3V0ID0gbnVsbFxuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gVG9hc3QuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzLCBjb25maWcpXG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhW2NvbmZpZ10odGhpcylcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogRGF0YSBBUEkgaW1wbGVtZW50YXRpb25cbiAqL1xuXG5lbmFibGVEaXNtaXNzVHJpZ2dlcihUb2FzdClcblxuLyoqXG4gKiBqUXVlcnlcbiAqL1xuXG5kZWZpbmVKUXVlcnlQbHVnaW4oVG9hc3QpXG5cbmV4cG9ydCBkZWZhdWx0IFRvYXN0XG4iLCAiLyohXHJcbiAqIFNlYXJjaCBtb2RhbCBmb3IgQm9vdHN0cmFwIGJhc2VkIFRodWxpdGUgc2l0ZXNcclxuICogQ29weXJpZ2h0IDIwMjEtMjAyNCBUaHVsaXRlXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnYm9vdHN0cmFwJztcclxuXHJcbigoKSA9PiB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgLy8gRGVjbGFyZSBzZWFyY2ggZWxlbWVudHNcclxuICAgIGNvbnN0IHNlYXJjaFRvZ2dsZU1vYmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2hUb2dnbGVNb2JpbGUnKTtcclxuICAgIGNvbnN0IHNlYXJjaFRvZ2dsZURlc2t0b3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoVG9nZ2xlRGVza3RvcCcpO1xyXG4gICAgY29uc3Qgc2VhcmNoTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoTW9kYWwnKTtcclxuICAgIGNvbnN0IHNlYXJjaEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWZvcm0nKTtcclxuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F1ZXJ5Jyk7XHJcbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaFJlc3VsdHMnKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgc2VhcmNoIG1vZGFsXHJcbiAgICBjb25zdCBmbGV4U2VhcmNoTW9kYWwgPSBuZXcgTW9kYWwoc2VhcmNoTW9kYWwsIHtcclxuICAgICAgICBmb2N1czogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU2hvdyBzZWFyY2ggbW9kYWwgd2hlbiBzZWFyY2ggYnV0dG9uIGlzIGNsaWNrZWRcclxuICAgIHNlYXJjaFRvZ2dsZU1vYmlsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dNb2RhbE9uQ2xpY2spO1xyXG4gICAgc2VhcmNoVG9nZ2xlRGVza3RvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dNb2RhbE9uQ2xpY2spO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dNb2RhbE9uQ2xpY2soKSB7XHJcbiAgICAgICAgZmxleFNlYXJjaE1vZGFsLnRvZ2dsZSgpO1xyXG4gICAgICAgIC8vIFNob3cgbWVzc2FnZSBcIk5vIHJlY2VudCBzZWFyY2hlc1wiXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1uby1yZWNlbnQnKS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIYW5kbGUga2V5Ym9hcmQgc2hvcnRjdXRzXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duSGFuZGxlcik7XHJcblxyXG4gICAgZnVuY3Rpb24gb25LZXlEb3duSGFuZGxlcihldmVudCkge1xyXG4gICAgICAgIC8vIFNob3cgc2VhcmNoIG1vZGFsIHdoZW4gXCJDdHJsICsga1wiIGlzIHByZXNzZWRcclxuICAgICAgICBpZiAoZXZlbnQuY3RybEtleSAmJiBldmVudC5rZXkgPT09ICdrJykge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBmbGV4U2VhcmNoTW9kYWwuc2hvdygpO1xyXG4gICAgICAgICAgICAvLyBDbGVhciBpbnB1dCBmaWVsZCBhbmQgc2VhcmNoIHJlc3VsdHNcclxuICAgICAgICAgICAgc2VhcmNoRm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgICAgICAgIC8vIFNob3cgbWVzc2FnZSBcIk5vIHJlY2VudCBzZWFyY2hlc1wiXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtbm8tcmVjZW50JykuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENsZWFyIGlucHV0IGZpZWxkIGFuZCBzZWFyY2ggcmVzdWx0cyB3aGVuIFwiRXNjXCIgaXMgcHJlc3NlZFxyXG4gICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgICAgIHNlYXJjaEZvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICAgICAgICAvLyBSZW1vdmUgY2xhc3MgXCJzZWxlY3RlZFwiIG9uIHNlYXJjaCByZXN1bHQgYW5kIHJlc2V0IGluZGV4IHNlYXJjaCByZXN1bHRzXHJcbiAgICAgICAgICAgIGlmIChzZWFyY2hSZXN1bHRTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3Moc2VhcmNoUmVzdWx0U2VsZWN0ZWQsICdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBIaWRlIG1lc3NhZ2UgXCJObyBzZWFyY2ggcmVzdWx0c1wiXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtbm8tcmVzdWx0cycpLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBIYW5kbGUgY2xpY2tpbmcgb24gbW9kYWwgYmFja2Ryb3BcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgLy8gQ2xlYXIgaW5wdXQgZmllbGQgYW5kIHNlYXJjaCByZXN1bHRzIHdoZW4gY2xpY2tpbmcgb24gbW9kYWwgYmFja2Ryb3BcclxuICAgICAgICB2YXIgbW9kYWxFbGVtZW50ID0gc2VhcmNoTW9kYWwuY29udGFpbnMoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICBpZiAoIW1vZGFsRWxlbWVudCkge1xyXG4gICAgICAgICAgICBzZWFyY2hGb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgICAgICAgLy8gSGlkZSBtZXNzYWdlIFwiTm8gc2VhcmNoIHJlc3VsdHNcIlxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLW5vLXJlc3VsdHMnKS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVtb3ZlIGNsYXNzIFwic2VsZWN0ZWRcIiBvbiBzZWFyY2ggcmVzdWx0IGFuZCByZXNldCBpbmRleCBzZWFyY2ggcmVzdWx0c1xyXG4gICAgICAgIGlmIChzZWFyY2hSZXN1bHRTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICByZW1vdmVDbGFzcyhzZWFyY2hSZXN1bHRTZWxlY3RlZCwgJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIGluZGV4ID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRm9jdXMgdGhlIHNlYXJjaCBpbnB1dCBlbGVtZW50IHdoZW4gdGhlIHNlYXJjaCBtb2RhbCBpcyBzaG93blxyXG4gICAgc2VhcmNoTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgICAgc2VhcmNoSW5wdXQuZm9jdXMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhbmRsZSBrZXlib2FyZCBuYXZpZ2F0aW9uIHNlYXJjaCByZXN1bHRzXHJcbiAgICAvLyBCYXNlZCBvbiBodHRwczovL2NvZGVwZW4uaW8vbWVodWxkZXNpZ24vcGVuL2VZcGJYTWdcclxuICAgIHZhciBzZWFyY2hSZXN1bHRTZWxlY3RlZDtcclxuICAgIHZhciBpbmRleCA9IC0xO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgJ2tleWRvd24nLFxyXG4gICAgICAgIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gc2VhcmNoUmVzdWx0cy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYXJ0aWNsZScpLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdBcnJvd0Rvd24nKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlYXJjaFJlc3VsdFNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3Moc2VhcmNoUmVzdWx0U2VsZWN0ZWQsICdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHQgPSBzZWFyY2hSZXN1bHRzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhcnRpY2xlJylbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgaW5kZXggPD0gbGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFNlbGVjdGVkID0gbmV4dDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFNlbGVjdGVkID0gc2VhcmNoUmVzdWx0cy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYXJ0aWNsZScpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyhzZWFyY2hSZXN1bHRTZWxlY3RlZCwgJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0U2VsZWN0ZWQgPSBzZWFyY2hSZXN1bHRzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhcnRpY2xlJylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3Moc2VhcmNoUmVzdWx0U2VsZWN0ZWQsICdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0Fycm93VXAnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VhcmNoUmVzdWx0U2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhzZWFyY2hSZXN1bHRTZWxlY3RlZCwgJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgtLTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dCA9IHNlYXJjaFJlc3VsdHMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2FydGljbGUnKVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXh0ICE9PSAndW5kZWZpbmVkJyAmJiBpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdFNlbGVjdGVkID0gbmV4dDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGxlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0U2VsZWN0ZWQgPSBzZWFyY2hSZXN1bHRzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhcnRpY2xlJylbbGVuXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3Moc2VhcmNoUmVzdWx0U2VsZWN0ZWQsICdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0U2VsZWN0ZWQgPSBzZWFyY2hSZXN1bHRzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhcnRpY2xlJylbbGVuXTtcclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyhzZWFyY2hSZXN1bHRTZWxlY3RlZCwgJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhbHNlXHJcbiAgICApO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpIHtcclxuICAgICAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgZm9jdXMgb24gc2VsZWN0ZWQgc2VhcmNoIHJlc3VsdFxyXG4gICAgICAgIHNlYXJjaFJlc3VsdFNlbGVjdGVkLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5ibHVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSkge1xyXG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNldCBmb2N1cyBvbiBzZWxlY3RlZCBzZWFyY2ggcmVzdWx0XHJcbiAgICAgICAgc2VhcmNoUmVzdWx0U2VsZWN0ZWQucXVlcnlTZWxlY3RvcignYScpLmZvY3VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIG1vdXNlIG5hdmlnYXRpb24gc2VhcmNoIHJlc3VsdHNcclxuICAgIHNlYXJjaFJlc3VsdHMuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAnbW91c2VvdmVyJyxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2hSZXN1bHRTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3Moc2VhcmNoUmVzdWx0U2VsZWN0ZWQsICdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWxzZVxyXG4gICAgKTtcclxufSkoKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3QkFBQUE7QUFBQSxJQUFBO0FBQUEsNEJBQUFBO0FBQUEsSUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBTyxNQUFJLE1BQU07QUFDVixNQUFJLFNBQVM7QUFDYixNQUFJLFFBQVE7QUFDWixNQUFJLE9BQU87QUFDWCxNQUFJLE9BQU87QUFDWCxNQUFJLGlCQUFpQixDQUFDLEtBQUssUUFBUSxPQUFPLElBQUk7QUFDOUMsTUFBSSxRQUFRO0FBQ1osTUFBSSxNQUFNO0FBQ1YsTUFBSSxrQkFBa0I7QUFDdEIsTUFBSSxXQUFXO0FBQ2YsTUFBSSxTQUFTO0FBQ2IsTUFBSSxZQUFZO0FBQ2hCLE1BQUksc0JBQW1DLCtCQUFlLE9BQU8sU0FBVSxLQUFLLFdBQVc7QUFDNUYsV0FBTyxJQUFJLE9BQU8sQ0FBQyxZQUFZLE1BQU0sT0FBTyxZQUFZLE1BQU0sR0FBRyxDQUFDO0FBQUEsRUFDcEUsR0FBRyxDQUFDLENBQUM7QUFDRSxNQUFJLGFBQTBCLGlCQUFDLEVBQUUsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLFNBQVUsS0FBSyxXQUFXO0FBQ3RHLFdBQU8sSUFBSSxPQUFPLENBQUMsV0FBVyxZQUFZLE1BQU0sT0FBTyxZQUFZLE1BQU0sR0FBRyxDQUFDO0FBQUEsRUFDL0UsR0FBRyxDQUFDLENBQUM7QUFFRSxNQUFJLGFBQWE7QUFDakIsTUFBSSxP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QkFBcUIsY0FBYyxHQUFHLEVBQUUsTUFBTTtBQUFBLElBQ2xEO0FBR0Esa0JBQWM7QUFBQSxNQUNWO0FBQUEsTUFDQSxNQUFNO0FBQ0YsWUFBSSxzQkFBc0I7QUFDdEIsc0JBQVksc0JBQXNCLFVBQVU7QUFBQSxRQUNoRDtBQUFBLE1BQ0o7QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUFBLEVBQ0osR0FBRzsiLAogICJuYW1lcyI6IFsiY3JlYXRlUG9wcGVyIiwgIm5hbWUiLCAic3R5bGUiLCAiZ2V0Q29tcHV0ZWRTdHlsZSIsICJnZXRDb21wdXRlZFN0eWxlIiwgIndpbmRvdyIsICJtaW4iLCAibWF4IiwgInRvUGFkZGluZ09iamVjdCIsICJwb3BwZXJPZmZzZXRzIiwgIm1pbiIsICJtYXgiLCAib2Zmc2V0IiwgImVmZmVjdCIsICJwb3BwZXIiLCAiZ2V0Q29tcHV0ZWRTdHlsZSIsICJlZmZlY3QiLCAid2luZG93IiwgImhhc2giLCAiZ2V0Q29tcHV0ZWRTdHlsZSIsICJnZXRDb21wdXRlZFN0eWxlIiwgImNsaXBwaW5nUGFyZW50cyIsICJnZXRDb21wdXRlZFN0eWxlIiwgInJlZmVyZW5jZSIsICJwb3BwZXJPZmZzZXRzIiwgIm9mZnNldCIsICJwbGFjZW1lbnRzIiwgInBsYWNlbWVudCIsICJwbGFjZW1lbnRzIiwgInBsYWNlbWVudCIsICJfbG9vcCIsICJfaSIsICJjaGVja3MiLCAib2Zmc2V0IiwgInBvcHBlck9mZnNldHMiLCAib2Zmc2V0IiwgIm1pbiIsICJtYXgiLCAiZm4iLCAibWVyZ2VkIiwgImRlZmF1bHRNb2RpZmllcnMiLCAiY3JlYXRlUG9wcGVyIiwgInJlZmVyZW5jZSIsICJwb3BwZXIiLCAib3B0aW9ucyIsICJmbiIsICJzdGF0ZSIsICJlZmZlY3QiLCAibm9vcEZuIiwgImNyZWF0ZVBvcHBlciIsICJkZWZhdWx0TW9kaWZpZXJzIiwgImNyZWF0ZVBvcHBlciIsICJlbGVtZW50TWFwIiwgIk1hcCIsICJzZXQiLCAiZWxlbWVudCIsICJrZXkiLCAiaW5zdGFuY2UiLCAiaGFzIiwgImluc3RhbmNlTWFwIiwgImdldCIsICJzaXplIiwgImNvbnNvbGUiLCAiZXJyb3IiLCAiQXJyYXkiLCAiZnJvbSIsICJrZXlzIiwgInJlbW92ZSIsICJkZWxldGUiLCAiTUFYX1VJRCIsICJNSUxMSVNFQ09ORFNfTVVMVElQTElFUiIsICJUUkFOU0lUSU9OX0VORCIsICJwYXJzZVNlbGVjdG9yIiwgInNlbGVjdG9yIiwgIndpbmRvdyIsICJDU1MiLCAiZXNjYXBlIiwgInJlcGxhY2UiLCAibWF0Y2giLCAiaWQiLCAidG9UeXBlIiwgIm9iamVjdCIsICJ1bmRlZmluZWQiLCAiT2JqZWN0IiwgInByb3RvdHlwZSIsICJ0b1N0cmluZyIsICJjYWxsIiwgInRvTG93ZXJDYXNlIiwgImdldFVJRCIsICJwcmVmaXgiLCAiTWF0aCIsICJmbG9vciIsICJyYW5kb20iLCAiZG9jdW1lbnQiLCAiZ2V0RWxlbWVudEJ5SWQiLCAiZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQiLCAidHJhbnNpdGlvbkR1cmF0aW9uIiwgInRyYW5zaXRpb25EZWxheSIsICJnZXRDb21wdXRlZFN0eWxlIiwgImZsb2F0VHJhbnNpdGlvbkR1cmF0aW9uIiwgIk51bWJlciIsICJwYXJzZUZsb2F0IiwgImZsb2F0VHJhbnNpdGlvbkRlbGF5IiwgInNwbGl0IiwgInRyaWdnZXJUcmFuc2l0aW9uRW5kIiwgImRpc3BhdGNoRXZlbnQiLCAiRXZlbnQiLCAiaXNFbGVtZW50IiwgImpxdWVyeSIsICJub2RlVHlwZSIsICJnZXRFbGVtZW50IiwgImxlbmd0aCIsICJxdWVyeVNlbGVjdG9yIiwgImlzVmlzaWJsZSIsICJnZXRDbGllbnRSZWN0cyIsICJlbGVtZW50SXNWaXNpYmxlIiwgImdldFByb3BlcnR5VmFsdWUiLCAiY2xvc2VkRGV0YWlscyIsICJjbG9zZXN0IiwgInN1bW1hcnkiLCAicGFyZW50Tm9kZSIsICJpc0Rpc2FibGVkIiwgIk5vZGUiLCAiRUxFTUVOVF9OT0RFIiwgImNsYXNzTGlzdCIsICJjb250YWlucyIsICJkaXNhYmxlZCIsICJoYXNBdHRyaWJ1dGUiLCAiZ2V0QXR0cmlidXRlIiwgImZpbmRTaGFkb3dSb290IiwgImRvY3VtZW50RWxlbWVudCIsICJhdHRhY2hTaGFkb3ciLCAiZ2V0Um9vdE5vZGUiLCAicm9vdCIsICJTaGFkb3dSb290IiwgIm5vb3AiLCAicmVmbG93IiwgIm9mZnNldEhlaWdodCIsICJnZXRqUXVlcnkiLCAialF1ZXJ5IiwgImJvZHkiLCAiRE9NQ29udGVudExvYWRlZENhbGxiYWNrcyIsICJvbkRPTUNvbnRlbnRMb2FkZWQiLCAiY2FsbGJhY2siLCAicmVhZHlTdGF0ZSIsICJhZGRFdmVudExpc3RlbmVyIiwgInB1c2giLCAiaXNSVEwiLCAiZGlyIiwgImRlZmluZUpRdWVyeVBsdWdpbiIsICJwbHVnaW4iLCAiJCIsICJuYW1lIiwgIk5BTUUiLCAiSlFVRVJZX05PX0NPTkZMSUNUIiwgImZuIiwgImpRdWVyeUludGVyZmFjZSIsICJDb25zdHJ1Y3RvciIsICJub0NvbmZsaWN0IiwgImV4ZWN1dGUiLCAicG9zc2libGVDYWxsYmFjayIsICJhcmdzIiwgImRlZmF1bHRWYWx1ZSIsICJleGVjdXRlQWZ0ZXJUcmFuc2l0aW9uIiwgInRyYW5zaXRpb25FbGVtZW50IiwgIndhaXRGb3JUcmFuc2l0aW9uIiwgImR1cmF0aW9uUGFkZGluZyIsICJlbXVsYXRlZER1cmF0aW9uIiwgImNhbGxlZCIsICJoYW5kbGVyIiwgInRhcmdldCIsICJyZW1vdmVFdmVudExpc3RlbmVyIiwgInNldFRpbWVvdXQiLCAiZ2V0TmV4dEFjdGl2ZUVsZW1lbnQiLCAibGlzdCIsICJhY3RpdmVFbGVtZW50IiwgInNob3VsZEdldE5leHQiLCAiaXNDeWNsZUFsbG93ZWQiLCAibGlzdExlbmd0aCIsICJpbmRleCIsICJpbmRleE9mIiwgIm1heCIsICJtaW4iLCAibmFtZXNwYWNlUmVnZXgiLCAic3RyaXBOYW1lUmVnZXgiLCAic3RyaXBVaWRSZWdleCIsICJldmVudFJlZ2lzdHJ5IiwgInVpZEV2ZW50IiwgImN1c3RvbUV2ZW50cyIsICJtb3VzZWVudGVyIiwgIm1vdXNlbGVhdmUiLCAibmF0aXZlRXZlbnRzIiwgIlNldCIsICJtYWtlRXZlbnRVaWQiLCAidWlkIiwgImdldEVsZW1lbnRFdmVudHMiLCAiYm9vdHN0cmFwSGFuZGxlciIsICJldmVudCIsICJoeWRyYXRlT2JqIiwgImRlbGVnYXRlVGFyZ2V0IiwgIm9uZU9mZiIsICJFdmVudEhhbmRsZXIiLCAib2ZmIiwgInR5cGUiLCAiYXBwbHkiLCAiYm9vdHN0cmFwRGVsZWdhdGlvbkhhbmRsZXIiLCAiZG9tRWxlbWVudHMiLCAicXVlcnlTZWxlY3RvckFsbCIsICJkb21FbGVtZW50IiwgImZpbmRIYW5kbGVyIiwgImV2ZW50cyIsICJjYWxsYWJsZSIsICJkZWxlZ2F0aW9uU2VsZWN0b3IiLCAidmFsdWVzIiwgImZpbmQiLCAibm9ybWFsaXplUGFyYW1ldGVycyIsICJvcmlnaW5hbFR5cGVFdmVudCIsICJkZWxlZ2F0aW9uRnVuY3Rpb24iLCAiaXNEZWxlZ2F0ZWQiLCAidHlwZUV2ZW50IiwgImdldFR5cGVFdmVudCIsICJhZGRIYW5kbGVyIiwgIndyYXBGdW5jdGlvbiIsICJyZWxhdGVkVGFyZ2V0IiwgImhhbmRsZXJzIiwgInByZXZpb3VzRnVuY3Rpb24iLCAicmVtb3ZlSGFuZGxlciIsICJCb29sZWFuIiwgInJlbW92ZU5hbWVzcGFjZWRIYW5kbGVycyIsICJuYW1lc3BhY2UiLCAic3RvcmVFbGVtZW50RXZlbnQiLCAiaGFuZGxlcktleSIsICJlbnRyaWVzIiwgImluY2x1ZGVzIiwgIm9uIiwgIm9uZSIsICJpbk5hbWVzcGFjZSIsICJpc05hbWVzcGFjZSIsICJzdGFydHNXaXRoIiwgImVsZW1lbnRFdmVudCIsICJzbGljZSIsICJrZXlIYW5kbGVycyIsICJ0cmlnZ2VyIiwgImpRdWVyeUV2ZW50IiwgImJ1YmJsZXMiLCAibmF0aXZlRGlzcGF0Y2giLCAiZGVmYXVsdFByZXZlbnRlZCIsICJpc1Byb3BhZ2F0aW9uU3RvcHBlZCIsICJpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCIsICJpc0RlZmF1bHRQcmV2ZW50ZWQiLCAiZXZ0IiwgImNhbmNlbGFibGUiLCAicHJldmVudERlZmF1bHQiLCAib2JqIiwgIm1ldGEiLCAidmFsdWUiLCAiX3VudXNlZCIsICJkZWZpbmVQcm9wZXJ0eSIsICJjb25maWd1cmFibGUiLCAibm9ybWFsaXplRGF0YSIsICJKU09OIiwgInBhcnNlIiwgImRlY29kZVVSSUNvbXBvbmVudCIsICJub3JtYWxpemVEYXRhS2V5IiwgImNociIsICJNYW5pcHVsYXRvciIsICJzZXREYXRhQXR0cmlidXRlIiwgInNldEF0dHJpYnV0ZSIsICJyZW1vdmVEYXRhQXR0cmlidXRlIiwgInJlbW92ZUF0dHJpYnV0ZSIsICJnZXREYXRhQXR0cmlidXRlcyIsICJhdHRyaWJ1dGVzIiwgImJzS2V5cyIsICJkYXRhc2V0IiwgImZpbHRlciIsICJwdXJlS2V5IiwgImNoYXJBdCIsICJnZXREYXRhQXR0cmlidXRlIiwgIkNvbmZpZyIsICJEZWZhdWx0IiwgIkRlZmF1bHRUeXBlIiwgIkVycm9yIiwgIl9nZXRDb25maWciLCAiY29uZmlnIiwgIl9tZXJnZUNvbmZpZ09iaiIsICJfY29uZmlnQWZ0ZXJNZXJnZSIsICJfdHlwZUNoZWNrQ29uZmlnIiwgImpzb25Db25maWciLCAiY29uc3RydWN0b3IiLCAiY29uZmlnVHlwZXMiLCAicHJvcGVydHkiLCAiZXhwZWN0ZWRUeXBlcyIsICJ2YWx1ZVR5cGUiLCAiUmVnRXhwIiwgInRlc3QiLCAiVHlwZUVycm9yIiwgInRvVXBwZXJDYXNlIiwgIlZFUlNJT04iLCAiQmFzZUNvbXBvbmVudCIsICJfZWxlbWVudCIsICJfY29uZmlnIiwgIkRhdGEiLCAiREFUQV9LRVkiLCAiZGlzcG9zZSIsICJFVkVOVF9LRVkiLCAicHJvcGVydHlOYW1lIiwgImdldE93blByb3BlcnR5TmFtZXMiLCAiX3F1ZXVlQ2FsbGJhY2siLCAiaXNBbmltYXRlZCIsICJnZXRJbnN0YW5jZSIsICJnZXRPckNyZWF0ZUluc3RhbmNlIiwgImV2ZW50TmFtZSIsICJnZXRTZWxlY3RvciIsICJocmVmQXR0cmlidXRlIiwgInRyaW0iLCAibWFwIiwgInNlbCIsICJqb2luIiwgIlNlbGVjdG9yRW5naW5lIiwgImNvbmNhdCIsICJFbGVtZW50IiwgImZpbmRPbmUiLCAiY2hpbGRyZW4iLCAiY2hpbGQiLCAibWF0Y2hlcyIsICJwYXJlbnRzIiwgImFuY2VzdG9yIiwgInByZXYiLCAicHJldmlvdXMiLCAicHJldmlvdXNFbGVtZW50U2libGluZyIsICJuZXh0IiwgIm5leHRFbGVtZW50U2libGluZyIsICJmb2N1c2FibGVDaGlsZHJlbiIsICJmb2N1c2FibGVzIiwgImVsIiwgImdldFNlbGVjdG9yRnJvbUVsZW1lbnQiLCAiZ2V0RWxlbWVudEZyb21TZWxlY3RvciIsICJnZXRNdWx0aXBsZUVsZW1lbnRzRnJvbVNlbGVjdG9yIiwgImVuYWJsZURpc21pc3NUcmlnZ2VyIiwgImNvbXBvbmVudCIsICJtZXRob2QiLCAiY2xpY2tFdmVudCIsICJ0YWdOYW1lIiwgIkVWRU5UX0NMT1NFIiwgIkVWRU5UX0NMT1NFRCIsICJDTEFTU19OQU1FX0ZBREUiLCAiQ0xBU1NfTkFNRV9TSE9XIiwgIkFsZXJ0IiwgImNsb3NlIiwgImNsb3NlRXZlbnQiLCAiX2Rlc3Ryb3lFbGVtZW50IiwgImVhY2giLCAiZGF0YSIsICJEQVRBX0FQSV9LRVkiLCAiQ0xBU1NfTkFNRV9BQ1RJVkUiLCAiU0VMRUNUT1JfREFUQV9UT0dHTEUiLCAiRVZFTlRfQ0xJQ0tfREFUQV9BUEkiLCAiQnV0dG9uIiwgInRvZ2dsZSIsICJidXR0b24iLCAiRVZFTlRfVE9VQ0hTVEFSVCIsICJFVkVOVF9UT1VDSE1PVkUiLCAiRVZFTlRfVE9VQ0hFTkQiLCAiRVZFTlRfUE9JTlRFUkRPV04iLCAiRVZFTlRfUE9JTlRFUlVQIiwgIlBPSU5URVJfVFlQRV9UT1VDSCIsICJQT0lOVEVSX1RZUEVfUEVOIiwgIkNMQVNTX05BTUVfUE9JTlRFUl9FVkVOVCIsICJTV0lQRV9USFJFU0hPTEQiLCAiZW5kQ2FsbGJhY2siLCAibGVmdENhbGxiYWNrIiwgInJpZ2h0Q2FsbGJhY2siLCAiU3dpcGUiLCAiaXNTdXBwb3J0ZWQiLCAiX2RlbHRhWCIsICJfc3VwcG9ydFBvaW50ZXJFdmVudHMiLCAiUG9pbnRlckV2ZW50IiwgIl9pbml0RXZlbnRzIiwgIl9zdGFydCIsICJ0b3VjaGVzIiwgImNsaWVudFgiLCAiX2V2ZW50SXNQb2ludGVyUGVuVG91Y2giLCAiX2VuZCIsICJfaGFuZGxlU3dpcGUiLCAiX21vdmUiLCAiYWJzRGVsdGFYIiwgImFicyIsICJkaXJlY3Rpb24iLCAiYWRkIiwgInBvaW50ZXJUeXBlIiwgIm5hdmlnYXRvciIsICJtYXhUb3VjaFBvaW50cyIsICJBUlJPV19MRUZUX0tFWSIsICJBUlJPV19SSUdIVF9LRVkiLCAiVE9VQ0hFVkVOVF9DT01QQVRfV0FJVCIsICJPUkRFUl9ORVhUIiwgIk9SREVSX1BSRVYiLCAiRElSRUNUSU9OX0xFRlQiLCAiRElSRUNUSU9OX1JJR0hUIiwgIkVWRU5UX1NMSURFIiwgIkVWRU5UX1NMSUQiLCAiRVZFTlRfS0VZRE9XTiIsICJFVkVOVF9NT1VTRUVOVEVSIiwgIkVWRU5UX01PVVNFTEVBVkUiLCAiRVZFTlRfRFJBR19TVEFSVCIsICJFVkVOVF9MT0FEX0RBVEFfQVBJIiwgIkNMQVNTX05BTUVfQ0FST1VTRUwiLCAiQ0xBU1NfTkFNRV9TTElERSIsICJDTEFTU19OQU1FX0VORCIsICJDTEFTU19OQU1FX1NUQVJUIiwgIkNMQVNTX05BTUVfTkVYVCIsICJDTEFTU19OQU1FX1BSRVYiLCAiU0VMRUNUT1JfQUNUSVZFIiwgIlNFTEVDVE9SX0lURU0iLCAiU0VMRUNUT1JfQUNUSVZFX0lURU0iLCAiU0VMRUNUT1JfSVRFTV9JTUciLCAiU0VMRUNUT1JfSU5ESUNBVE9SUyIsICJTRUxFQ1RPUl9EQVRBX1NMSURFIiwgIlNFTEVDVE9SX0RBVEFfUklERSIsICJLRVlfVE9fRElSRUNUSU9OIiwgImludGVydmFsIiwgImtleWJvYXJkIiwgInBhdXNlIiwgInJpZGUiLCAidG91Y2giLCAid3JhcCIsICJDYXJvdXNlbCIsICJfaW50ZXJ2YWwiLCAiX2FjdGl2ZUVsZW1lbnQiLCAiX2lzU2xpZGluZyIsICJ0b3VjaFRpbWVvdXQiLCAiX3N3aXBlSGVscGVyIiwgIl9pbmRpY2F0b3JzRWxlbWVudCIsICJfYWRkRXZlbnRMaXN0ZW5lcnMiLCAiY3ljbGUiLCAiX3NsaWRlIiwgIm5leHRXaGVuVmlzaWJsZSIsICJoaWRkZW4iLCAiX2NsZWFySW50ZXJ2YWwiLCAiX3VwZGF0ZUludGVydmFsIiwgInNldEludGVydmFsIiwgIl9tYXliZUVuYWJsZUN5Y2xlIiwgInRvIiwgIml0ZW1zIiwgIl9nZXRJdGVtcyIsICJhY3RpdmVJbmRleCIsICJfZ2V0SXRlbUluZGV4IiwgIl9nZXRBY3RpdmUiLCAib3JkZXIiLCAiZGVmYXVsdEludGVydmFsIiwgIl9rZXlkb3duIiwgIl9hZGRUb3VjaEV2ZW50TGlzdGVuZXJzIiwgImltZyIsICJlbmRDYWxsQmFjayIsICJjbGVhclRpbWVvdXQiLCAic3dpcGVDb25maWciLCAiX2RpcmVjdGlvblRvT3JkZXIiLCAiX3NldEFjdGl2ZUluZGljYXRvckVsZW1lbnQiLCAiYWN0aXZlSW5kaWNhdG9yIiwgIm5ld0FjdGl2ZUluZGljYXRvciIsICJlbGVtZW50SW50ZXJ2YWwiLCAicGFyc2VJbnQiLCAiaXNOZXh0IiwgIm5leHRFbGVtZW50IiwgIm5leHRFbGVtZW50SW5kZXgiLCAidHJpZ2dlckV2ZW50IiwgIl9vcmRlclRvRGlyZWN0aW9uIiwgInNsaWRlRXZlbnQiLCAiaXNDeWNsaW5nIiwgImRpcmVjdGlvbmFsQ2xhc3NOYW1lIiwgIm9yZGVyQ2xhc3NOYW1lIiwgImNvbXBsZXRlQ2FsbEJhY2siLCAiX2lzQW5pbWF0ZWQiLCAiY2xlYXJJbnRlcnZhbCIsICJjYXJvdXNlbCIsICJzbGlkZUluZGV4IiwgImNhcm91c2VscyIsICJFVkVOVF9TSE9XIiwgIkVWRU5UX1NIT1dOIiwgIkVWRU5UX0hJREUiLCAiRVZFTlRfSElEREVOIiwgIkNMQVNTX05BTUVfQ09MTEFQU0UiLCAiQ0xBU1NfTkFNRV9DT0xMQVBTSU5HIiwgIkNMQVNTX05BTUVfQ09MTEFQU0VEIiwgIkNMQVNTX05BTUVfREVFUEVSX0NISUxEUkVOIiwgIkNMQVNTX05BTUVfSE9SSVpPTlRBTCIsICJXSURUSCIsICJIRUlHSFQiLCAiU0VMRUNUT1JfQUNUSVZFUyIsICJwYXJlbnQiLCAiQ29sbGFwc2UiLCAiX2lzVHJhbnNpdGlvbmluZyIsICJfdHJpZ2dlckFycmF5IiwgInRvZ2dsZUxpc3QiLCAiZWxlbSIsICJmaWx0ZXJFbGVtZW50IiwgImZvdW5kRWxlbWVudCIsICJfaW5pdGlhbGl6ZUNoaWxkcmVuIiwgIl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MiLCAiX2lzU2hvd24iLCAiaGlkZSIsICJzaG93IiwgImFjdGl2ZUNoaWxkcmVuIiwgIl9nZXRGaXJzdExldmVsQ2hpbGRyZW4iLCAic3RhcnRFdmVudCIsICJhY3RpdmVJbnN0YW5jZSIsICJkaW1lbnNpb24iLCAiX2dldERpbWVuc2lvbiIsICJzdHlsZSIsICJjb21wbGV0ZSIsICJjYXBpdGFsaXplZERpbWVuc2lvbiIsICJzY3JvbGxTaXplIiwgImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsICJzZWxlY3RlZCIsICJ0cmlnZ2VyQXJyYXkiLCAiaXNPcGVuIiwgIkVTQ0FQRV9LRVkiLCAiVEFCX0tFWSIsICJBUlJPV19VUF9LRVkiLCAiQVJST1dfRE9XTl9LRVkiLCAiUklHSFRfTU9VU0VfQlVUVE9OIiwgIkVWRU5UX0tFWURPV05fREFUQV9BUEkiLCAiRVZFTlRfS0VZVVBfREFUQV9BUEkiLCAiQ0xBU1NfTkFNRV9EUk9QVVAiLCAiQ0xBU1NfTkFNRV9EUk9QRU5EIiwgIkNMQVNTX05BTUVfRFJPUFNUQVJUIiwgIkNMQVNTX05BTUVfRFJPUFVQX0NFTlRFUiIsICJDTEFTU19OQU1FX0RST1BET1dOX0NFTlRFUiIsICJTRUxFQ1RPUl9EQVRBX1RPR0dMRV9TSE9XTiIsICJTRUxFQ1RPUl9NRU5VIiwgIlNFTEVDVE9SX05BVkJBUiIsICJTRUxFQ1RPUl9OQVZCQVJfTkFWIiwgIlNFTEVDVE9SX1ZJU0lCTEVfSVRFTVMiLCAiUExBQ0VNRU5UX1RPUCIsICJQTEFDRU1FTlRfVE9QRU5EIiwgIlBMQUNFTUVOVF9CT1RUT00iLCAiUExBQ0VNRU5UX0JPVFRPTUVORCIsICJQTEFDRU1FTlRfUklHSFQiLCAiUExBQ0VNRU5UX0xFRlQiLCAiUExBQ0VNRU5UX1RPUENFTlRFUiIsICJQTEFDRU1FTlRfQk9UVE9NQ0VOVEVSIiwgImF1dG9DbG9zZSIsICJib3VuZGFyeSIsICJkaXNwbGF5IiwgIm9mZnNldCIsICJwb3BwZXJDb25maWciLCAicmVmZXJlbmNlIiwgIkRyb3Bkb3duIiwgIl9wb3BwZXIiLCAiX3BhcmVudCIsICJfbWVudSIsICJfaW5OYXZiYXIiLCAiX2RldGVjdE5hdmJhciIsICJzaG93RXZlbnQiLCAiX2NyZWF0ZVBvcHBlciIsICJmb2N1cyIsICJfY29tcGxldGVIaWRlIiwgImRlc3Ryb3kiLCAidXBkYXRlIiwgImhpZGVFdmVudCIsICJQb3BwZXIiLCAicmVmZXJlbmNlRWxlbWVudCIsICJfZ2V0UG9wcGVyQ29uZmlnIiwgImNyZWF0ZVBvcHBlciIsICJfZ2V0UGxhY2VtZW50IiwgInBhcmVudERyb3Bkb3duIiwgImlzRW5kIiwgIl9nZXRPZmZzZXQiLCAicG9wcGVyRGF0YSIsICJkZWZhdWx0QnNQb3BwZXJDb25maWciLCAicGxhY2VtZW50IiwgIm1vZGlmaWVycyIsICJvcHRpb25zIiwgImVuYWJsZWQiLCAiX3NlbGVjdE1lbnVJdGVtIiwgImNsZWFyTWVudXMiLCAib3BlblRvZ2dsZXMiLCAiY29udGV4dCIsICJjb21wb3NlZFBhdGgiLCAiaXNNZW51VGFyZ2V0IiwgImRhdGFBcGlLZXlkb3duSGFuZGxlciIsICJpc0lucHV0IiwgImlzRXNjYXBlRXZlbnQiLCAiaXNVcE9yRG93bkV2ZW50IiwgImdldFRvZ2dsZUJ1dHRvbiIsICJzdG9wUHJvcGFnYXRpb24iLCAiRVZFTlRfTU9VU0VET1dOIiwgImNsYXNzTmFtZSIsICJjbGlja0NhbGxiYWNrIiwgInJvb3RFbGVtZW50IiwgIkJhY2tkcm9wIiwgIl9pc0FwcGVuZGVkIiwgIl9hcHBlbmQiLCAiX2dldEVsZW1lbnQiLCAiX2VtdWxhdGVBbmltYXRpb24iLCAiYmFja2Ryb3AiLCAiY3JlYXRlRWxlbWVudCIsICJhcHBlbmQiLCAiRVZFTlRfRk9DVVNJTiIsICJFVkVOVF9LRVlET1dOX1RBQiIsICJUQUJfTkFWX0ZPUldBUkQiLCAiVEFCX05BVl9CQUNLV0FSRCIsICJhdXRvZm9jdXMiLCAidHJhcEVsZW1lbnQiLCAiRm9jdXNUcmFwIiwgIl9pc0FjdGl2ZSIsICJfbGFzdFRhYk5hdkRpcmVjdGlvbiIsICJhY3RpdmF0ZSIsICJfaGFuZGxlRm9jdXNpbiIsICJfaGFuZGxlS2V5ZG93biIsICJkZWFjdGl2YXRlIiwgImVsZW1lbnRzIiwgInNoaWZ0S2V5IiwgIlNFTEVDVE9SX0ZJWEVEX0NPTlRFTlQiLCAiU0VMRUNUT1JfU1RJQ0tZX0NPTlRFTlQiLCAiUFJPUEVSVFlfUEFERElORyIsICJQUk9QRVJUWV9NQVJHSU4iLCAiU2Nyb2xsQmFySGVscGVyIiwgImdldFdpZHRoIiwgImRvY3VtZW50V2lkdGgiLCAiY2xpZW50V2lkdGgiLCAiaW5uZXJXaWR0aCIsICJ3aWR0aCIsICJfZGlzYWJsZU92ZXJGbG93IiwgIl9zZXRFbGVtZW50QXR0cmlidXRlcyIsICJjYWxjdWxhdGVkVmFsdWUiLCAicmVzZXQiLCAiX3Jlc2V0RWxlbWVudEF0dHJpYnV0ZXMiLCAiaXNPdmVyZmxvd2luZyIsICJfc2F2ZUluaXRpYWxBdHRyaWJ1dGUiLCAib3ZlcmZsb3ciLCAic3R5bGVQcm9wZXJ0eSIsICJzY3JvbGxiYXJXaWR0aCIsICJtYW5pcHVsYXRpb25DYWxsQmFjayIsICJzZXRQcm9wZXJ0eSIsICJfYXBwbHlNYW5pcHVsYXRpb25DYWxsYmFjayIsICJhY3R1YWxWYWx1ZSIsICJyZW1vdmVQcm9wZXJ0eSIsICJjYWxsQmFjayIsICJFVkVOVF9ISURFX1BSRVZFTlRFRCIsICJFVkVOVF9SRVNJWkUiLCAiRVZFTlRfQ0xJQ0tfRElTTUlTUyIsICJFVkVOVF9NT1VTRURPV05fRElTTUlTUyIsICJFVkVOVF9LRVlET1dOX0RJU01JU1MiLCAiQ0xBU1NfTkFNRV9PUEVOIiwgIkNMQVNTX05BTUVfU1RBVElDIiwgIk9QRU5fU0VMRUNUT1IiLCAiU0VMRUNUT1JfRElBTE9HIiwgIlNFTEVDVE9SX01PREFMX0JPRFkiLCAiTW9kYWwiLCAiX2RpYWxvZyIsICJfYmFja2Ryb3AiLCAiX2luaXRpYWxpemVCYWNrRHJvcCIsICJfZm9jdXN0cmFwIiwgIl9pbml0aWFsaXplRm9jdXNUcmFwIiwgIl9zY3JvbGxCYXIiLCAiX2FkanVzdERpYWxvZyIsICJfc2hvd0VsZW1lbnQiLCAiX2hpZGVNb2RhbCIsICJoYW5kbGVVcGRhdGUiLCAic2Nyb2xsVG9wIiwgIm1vZGFsQm9keSIsICJ0cmFuc2l0aW9uQ29tcGxldGUiLCAiX3RyaWdnZXJCYWNrZHJvcFRyYW5zaXRpb24iLCAiZXZlbnQyIiwgIl9yZXNldEFkanVzdG1lbnRzIiwgImlzTW9kYWxPdmVyZmxvd2luZyIsICJzY3JvbGxIZWlnaHQiLCAiY2xpZW50SGVpZ2h0IiwgImluaXRpYWxPdmVyZmxvd1kiLCAib3ZlcmZsb3dZIiwgImlzQm9keU92ZXJmbG93aW5nIiwgInBhZGRpbmdMZWZ0IiwgInBhZGRpbmdSaWdodCIsICJhbHJlYWR5T3BlbiIsICJDTEFTU19OQU1FX1NIT1dJTkciLCAiQ0xBU1NfTkFNRV9ISURJTkciLCAiQ0xBU1NfTkFNRV9CQUNLRFJPUCIsICJzY3JvbGwiLCAiT2ZmY2FudmFzIiwgImJsdXIiLCAiY29tcGxldGVDYWxsYmFjayIsICJwb3NpdGlvbiIsICJBUklBX0FUVFJJQlVURV9QQVRURVJOIiwgIkRlZmF1bHRBbGxvd2xpc3QiLCAiYSIsICJhcmVhIiwgImIiLCAiYnIiLCAiY29sIiwgImNvZGUiLCAiZGQiLCAiZGl2IiwgImRsIiwgImR0IiwgImVtIiwgImhyIiwgImgxIiwgImgyIiwgImgzIiwgImg0IiwgImg1IiwgImg2IiwgImkiLCAibGkiLCAib2wiLCAicCIsICJwcmUiLCAicyIsICJzbWFsbCIsICJzcGFuIiwgInN1YiIsICJzdXAiLCAic3Ryb25nIiwgInUiLCAidWwiLCAidXJpQXR0cmlidXRlcyIsICJTQUZFX1VSTF9QQVRURVJOIiwgImFsbG93ZWRBdHRyaWJ1dGUiLCAiYXR0cmlidXRlIiwgImFsbG93ZWRBdHRyaWJ1dGVMaXN0IiwgImF0dHJpYnV0ZU5hbWUiLCAibm9kZU5hbWUiLCAibm9kZVZhbHVlIiwgImF0dHJpYnV0ZVJlZ2V4IiwgInNvbWUiLCAicmVnZXgiLCAic2FuaXRpemVIdG1sIiwgInVuc2FmZUh0bWwiLCAiYWxsb3dMaXN0IiwgInNhbml0aXplRnVuY3Rpb24iLCAiZG9tUGFyc2VyIiwgIkRPTVBhcnNlciIsICJjcmVhdGVkRG9jdW1lbnQiLCAicGFyc2VGcm9tU3RyaW5nIiwgImVsZW1lbnROYW1lIiwgImF0dHJpYnV0ZUxpc3QiLCAiYWxsb3dlZEF0dHJpYnV0ZXMiLCAiaW5uZXJIVE1MIiwgImNvbnRlbnQiLCAiZXh0cmFDbGFzcyIsICJodG1sIiwgInNhbml0aXplIiwgInNhbml0aXplRm4iLCAidGVtcGxhdGUiLCAiRGVmYXVsdENvbnRlbnRUeXBlIiwgImVudHJ5IiwgIlRlbXBsYXRlRmFjdG9yeSIsICJnZXRDb250ZW50IiwgIl9yZXNvbHZlUG9zc2libGVGdW5jdGlvbiIsICJoYXNDb250ZW50IiwgImNoYW5nZUNvbnRlbnQiLCAiX2NoZWNrQ29udGVudCIsICJ0b0h0bWwiLCAidGVtcGxhdGVXcmFwcGVyIiwgIl9tYXliZVNhbml0aXplIiwgInRleHQiLCAiX3NldENvbnRlbnQiLCAiYXJnIiwgInRlbXBsYXRlRWxlbWVudCIsICJfcHV0RWxlbWVudEluVGVtcGxhdGUiLCAidGV4dENvbnRlbnQiLCAiRElTQUxMT1dFRF9BVFRSSUJVVEVTIiwgIkNMQVNTX05BTUVfTU9EQUwiLCAiU0VMRUNUT1JfVE9PTFRJUF9JTk5FUiIsICJTRUxFQ1RPUl9NT0RBTCIsICJFVkVOVF9NT0RBTF9ISURFIiwgIlRSSUdHRVJfSE9WRVIiLCAiVFJJR0dFUl9GT0NVUyIsICJUUklHR0VSX0NMSUNLIiwgIlRSSUdHRVJfTUFOVUFMIiwgIkVWRU5UX0lOU0VSVEVEIiwgIkVWRU5UX0NMSUNLIiwgIkVWRU5UX0ZPQ1VTT1VUIiwgIkF0dGFjaG1lbnRNYXAiLCAiQVVUTyIsICJUT1AiLCAiUklHSFQiLCAiQk9UVE9NIiwgIkxFRlQiLCAiYW5pbWF0aW9uIiwgImNvbnRhaW5lciIsICJjdXN0b21DbGFzcyIsICJkZWxheSIsICJmYWxsYmFja1BsYWNlbWVudHMiLCAidGl0bGUiLCAiVG9vbHRpcCIsICJfaXNFbmFibGVkIiwgIl90aW1lb3V0IiwgIl9pc0hvdmVyZWQiLCAiX2FjdGl2ZVRyaWdnZXIiLCAiX3RlbXBsYXRlRmFjdG9yeSIsICJfbmV3Q29udGVudCIsICJ0aXAiLCAiX3NldExpc3RlbmVycyIsICJfZml4VGl0bGUiLCAiZW5hYmxlIiwgImRpc2FibGUiLCAidG9nZ2xlRW5hYmxlZCIsICJfbGVhdmUiLCAiX2VudGVyIiwgIl9oaWRlTW9kYWxIYW5kbGVyIiwgIl9kaXNwb3NlUG9wcGVyIiwgIl9pc1dpdGhDb250ZW50IiwgInNoYWRvd1Jvb3QiLCAiaXNJblRoZURvbSIsICJvd25lckRvY3VtZW50IiwgIl9nZXRUaXBFbGVtZW50IiwgIl9pc1dpdGhBY3RpdmVUcmlnZ2VyIiwgIl9nZXRUaXRsZSIsICJfY3JlYXRlVGlwRWxlbWVudCIsICJfZ2V0Q29udGVudEZvclRlbXBsYXRlIiwgIl9nZXRUZW1wbGF0ZUZhY3RvcnkiLCAidGlwSWQiLCAic2V0Q29udGVudCIsICJfaW5pdGlhbGl6ZU9uRGVsZWdhdGVkVGFyZ2V0IiwgIl9nZXREZWxlZ2F0ZUNvbmZpZyIsICJhdHRhY2htZW50IiwgInBoYXNlIiwgInN0YXRlIiwgInRyaWdnZXJzIiwgImV2ZW50SW4iLCAiZXZlbnRPdXQiLCAiX3NldFRpbWVvdXQiLCAidGltZW91dCIsICJkYXRhQXR0cmlidXRlcyIsICJkYXRhQXR0cmlidXRlIiwgIlNFTEVDVE9SX1RJVExFIiwgIlNFTEVDVE9SX0NPTlRFTlQiLCAiUG9wb3ZlciIsICJfZ2V0Q29udGVudCIsICJFVkVOVF9BQ1RJVkFURSIsICJDTEFTU19OQU1FX0RST1BET1dOX0lURU0iLCAiU0VMRUNUT1JfREFUQV9TUFkiLCAiU0VMRUNUT1JfVEFSR0VUX0xJTktTIiwgIlNFTEVDVE9SX05BVl9MSVNUX0dST1VQIiwgIlNFTEVDVE9SX05BVl9MSU5LUyIsICJTRUxFQ1RPUl9OQVZfSVRFTVMiLCAiU0VMRUNUT1JfTElTVF9JVEVNUyIsICJTRUxFQ1RPUl9MSU5LX0lURU1TIiwgIlNFTEVDVE9SX0RST1BET1dOIiwgIlNFTEVDVE9SX0RST1BET1dOX1RPR0dMRSIsICJyb290TWFyZ2luIiwgInNtb290aFNjcm9sbCIsICJ0aHJlc2hvbGQiLCAiU2Nyb2xsU3B5IiwgIl90YXJnZXRMaW5rcyIsICJfb2JzZXJ2YWJsZVNlY3Rpb25zIiwgIl9yb290RWxlbWVudCIsICJfYWN0aXZlVGFyZ2V0IiwgIl9vYnNlcnZlciIsICJfcHJldmlvdXNTY3JvbGxEYXRhIiwgInZpc2libGVFbnRyeVRvcCIsICJwYXJlbnRTY3JvbGxUb3AiLCAicmVmcmVzaCIsICJfaW5pdGlhbGl6ZVRhcmdldHNBbmRPYnNlcnZhYmxlcyIsICJfbWF5YmVFbmFibGVTbW9vdGhTY3JvbGwiLCAiZGlzY29ubmVjdCIsICJfZ2V0TmV3T2JzZXJ2ZXIiLCAic2VjdGlvbiIsICJvYnNlcnZlIiwgIm9ic2VydmFibGVTZWN0aW9uIiwgImhhc2giLCAiaGVpZ2h0IiwgIm9mZnNldFRvcCIsICJzY3JvbGxUbyIsICJ0b3AiLCAiYmVoYXZpb3IiLCAiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCAiX29ic2VydmVyQ2FsbGJhY2siLCAidGFyZ2V0RWxlbWVudCIsICJfcHJvY2VzcyIsICJ1c2VyU2Nyb2xsc0Rvd24iLCAiaXNJbnRlcnNlY3RpbmciLCAiX2NsZWFyQWN0aXZlQ2xhc3MiLCAiZW50cnlJc0xvd2VyVGhhblByZXZpb3VzIiwgInRhcmdldExpbmtzIiwgImFuY2hvciIsICJkZWNvZGVVUkkiLCAiX2FjdGl2YXRlUGFyZW50cyIsICJsaXN0R3JvdXAiLCAiaXRlbSIsICJhY3RpdmVOb2RlcyIsICJub2RlIiwgInNweSIsICJIT01FX0tFWSIsICJFTkRfS0VZIiwgIkNMQVNTX0RST1BET1dOIiwgIlNFTEVDVE9SX0RST1BET1dOX01FTlUiLCAiTk9UX1NFTEVDVE9SX0RST1BET1dOX1RPR0dMRSIsICJTRUxFQ1RPUl9UQUJfUEFORUwiLCAiU0VMRUNUT1JfT1VURVIiLCAiU0VMRUNUT1JfSU5ORVIiLCAiU0VMRUNUT1JfSU5ORVJfRUxFTSIsICJTRUxFQ1RPUl9EQVRBX1RPR0dMRV9BQ1RJVkUiLCAiVGFiIiwgIl9zZXRJbml0aWFsQXR0cmlidXRlcyIsICJfZ2V0Q2hpbGRyZW4iLCAiaW5uZXJFbGVtIiwgIl9lbGVtSXNBY3RpdmUiLCAiYWN0aXZlIiwgIl9nZXRBY3RpdmVFbGVtIiwgIl9kZWFjdGl2YXRlIiwgIl9hY3RpdmF0ZSIsICJyZWxhdGVkRWxlbSIsICJfdG9nZ2xlRHJvcERvd24iLCAibmV4dEFjdGl2ZUVsZW1lbnQiLCAicHJldmVudFNjcm9sbCIsICJfc2V0QXR0cmlidXRlSWZOb3RFeGlzdHMiLCAiX3NldEluaXRpYWxBdHRyaWJ1dGVzT25DaGlsZCIsICJfZ2V0SW5uZXJFbGVtZW50IiwgImlzQWN0aXZlIiwgIm91dGVyRWxlbSIsICJfZ2V0T3V0ZXJFbGVtZW50IiwgIl9zZXRJbml0aWFsQXR0cmlidXRlc09uVGFyZ2V0UGFuZWwiLCAib3BlbiIsICJFVkVOVF9NT1VTRU9WRVIiLCAiRVZFTlRfTU9VU0VPVVQiLCAiQ0xBU1NfTkFNRV9ISURFIiwgImF1dG9oaWRlIiwgIlRvYXN0IiwgIl9oYXNNb3VzZUludGVyYWN0aW9uIiwgIl9oYXNLZXlib2FyZEludGVyYWN0aW9uIiwgIl9jbGVhclRpbWVvdXQiLCAiX21heWJlU2NoZWR1bGVIaWRlIiwgImlzU2hvd24iLCAiX29uSW50ZXJhY3Rpb24iLCAiaXNJbnRlcmFjdGluZyJdCn0K
