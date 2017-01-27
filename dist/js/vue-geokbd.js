(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vue-geokbd", [], factory);
	else if(typeof exports === 'object')
		exports["vue-geokbd"] = factory();
	else
		root["vue-geokbd"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _directive = __webpack_require__(1);
	
	var _directive2 = _interopRequireDefault(_directive);
	
	var _statusMsg = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var install = function install(Vue) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$enabled = _ref.enabled,
	      enabled = _ref$enabled === undefined ? false : _ref$enabled,
	      _ref$hotkey = _ref.hotkey,
	      hotkey = _ref$hotkey === undefined ? '~' : _ref$hotkey,
	      _ref$statusMessage = _ref.statusMessage,
	      statusMessage = _ref$statusMessage === undefined ? true : _ref$statusMessage;
	
	  var options = { enabled: enabled, hotkey: hotkey, statusMessage: statusMessage };
	
	  (0, _statusMsg.init)(options);
	  Vue.directive('geokbd', (0, _directive2.default)(options));
	};
	
	exports.default = { install: install };
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _keypress = __webpack_require__(2);
	
	var _keypress2 = _interopRequireDefault(_keypress);
	
	var _statusMsg = __webpack_require__(3);
	
	var _statusMsg2 = _interopRequireDefault(_statusMsg);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (options) {
	  return {
	    bind: function bind() {
	      var _this = this;
	
	      this.keypressEvent = function (evt) {
	        // Don't capture Ctrl/Meta keypress
	        if (evt.metaKey || evt.ctrlKey) return;
	
	        // Check if hotkey was pressed
	        if (options.hotkey === String.fromCharCode(evt.which)) {
	          evt.preventDefault();
	
	          _this.toggleGlobalState();
	          return;
	        }
	
	        // Check enabled state
	        if (options.enabled === false) return;
	
	        (0, _keypress2.default)(evt);
	      };
	
	      this.focusEvent = function () {
	        _statusMsg2.default.visibility(true, options.enabled, options.statusMessage);
	      };
	
	      this.blurEvent = function () {
	        _statusMsg2.default.visibility(false, options.enabled, options.statusMessage);
	      };
	
	      this.el.addEventListener('keypress', this.keypressEvent);
	      this.el.addEventListener('focus', this.focusEvent);
	      this.el.addEventListener('blur', this.blurEvent);
	    },
	
	    unbind: function unbind() {
	      this.el.removeEventListener('keypress', this.keypressEvent);
	      this.el.removeEventListener('focus', this.focusEvent);
	      this.el.removeEventListener('blur', this.blurEvent);
	    },
	
	    toggleGlobalState: function toggleGlobalState() {
	      options.enabled = !options.enabled;
	      _statusMsg2.default.syncText(options.enabled);
	    }
	  };
	};
	
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = handleKeypress;
	function convertChar(chIndex) {
	  var alphabet = 'abgdevzTiklmnopJrstufqRySCcZwWxjh';
	  var ch = String.fromCharCode(chIndex);
	
	  if (alphabet.indexOf(ch) >= 0) {
	    return alphabet.indexOf(ch) + 4304;
	  }
	
	  return chIndex;
	}
	
	function getInputSelection(el) {
	  var start = 0,
	      end = 0,
	      normalizedValue,
	      range,
	      textInputRange,
	      len,
	      endRange;
	
	  if (typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number') {
	    start = el.selectionStart;
	    end = el.selectionEnd;
	  } else {
	    range = document.selection.createRange();
	
	    if (range && range.parentElement() === el) {
	      len = el.value.length;
	      normalizedValue = el.value.replace(/\r\n/g, '\n');
	
	      // Create a working TextRange that lives only in the input
	      textInputRange = el.createTextRange();
	      textInputRange.moveToBookmark(range.getBookmark());
	
	      // Check if the start and end of the selection are at the very end
	      // of the input, since moveStart/moveEnd doesn't return what we want
	      // in those cases
	      endRange = el.createTextRange();
	      endRange.collapse(false);
	
	      if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
	        start = end = len;
	      } else {
	        start = -textInputRange.moveStart('character', -len);
	        start += normalizedValue.slice(0, start).split('\n').length - 1;
	
	        if (textInputRange.compareEndPoints('EndToEnd', endRange) > -1) {
	          end = len;
	        } else {
	          end = -textInputRange.moveEnd('character', -len);
	          end += normalizedValue.slice(0, end).split('\n').length - 1;
	        }
	      }
	    }
	  }
	
	  return {
	    start: start,
	    end: end
	  };
	}
	
	function offsetToRangeCharacterMove(el, offset) {
	  return offset - (el.value.slice(0, offset).split('\r\n').length - 1);
	}
	
	function setInputSelection(el, startOffset, endOffset) {
	  if (typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number') {
	    el.selectionStart = startOffset;
	    el.selectionEnd = endOffset;
	  } else {
	    var range = el.createTextRange();
	    var startCharMove = offsetToRangeCharacterMove(el, startOffset);
	
	    range.collapse(true);
	    if (startOffset === endOffset) {
	      range.move('character', startCharMove);
	    } else {
	      range.moveEnd('character', offsetToRangeCharacterMove(el, endOffset));
	      range.moveStart('character', startCharMove);
	    }
	    range.select();
	  }
	
	  // A little 'hack' to keep natural browser behavior while typing
	  el.blur();
	  el.focus();
	}
	
	function handleKeypress(evt) {
	  var el = evt.target;
	  var which = evt.which;
	  var to = convertChar(which);
	
	  // Don't take any actions if conversion didn't happen
	  if (which === to) {
	    return;
	  }
	  evt.preventDefault();
	
	  // Insert converted char
	  var sel = getInputSelection(el);
	  var val = el.value;
	
	  el.value = val.slice(0, sel.start) + String.fromCharCode(to) + val.slice(sel.end);
	
	  // Move caret to correct position
	  setInputSelection(el, sel.start + 1, sel.start + 1);
	}
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var STATUS_MSG_TEXT_ON = 'ჩართულია';
	var STATUS_MSG_TEXT_OFF = 'გამორთულია';
	var STATUS_MSG_CLASS = 'vue-geokbd--statusMessage';
	var STATUS_MSG_CLASS_VISIBLE = STATUS_MSG_CLASS + ' visible';
	var STATUS_MSG_CLASS_HIDDEN = STATUS_MSG_CLASS + ' hidden';
	
	var element,
	    showState = false;
	
	var init = exports.init = function init(options) {
	  element = document.createElement('div');
	  element.className = STATUS_MSG_CLASS;
	  element.innerHTML = '\n  <div class="vue-geokbd--statusMessage-text">\n    \u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8 \u10D9\u10DA\u10D0\u10D5\u10D8\u10D0\u10E2\u10E3\u10E0\u10D0: <u class="vue-geokbd--statusMessage-state"></u><br>\n    \u10E9\u10D0\u10E0\u10D7\u10D5\u10D0/\u10D2\u10D0\u10DB\u10DD\u10E0\u10D7\u10D5\u10D0 \u10D9\u10DA\u10D0\u10D5\u10D8\u10E8\u10D8\u10D7 (\'' + options.hotkey + '\')\n  </div>\n';
	
	  document.body.appendChild(element);
	};
	
	var syncText = function syncText(enabled) {
	  var statusMessageStateElement = element.querySelector('.vue-geokbd--statusMessage-state');
	
	  statusMessageStateElement.innerHTML = enabled ? STATUS_MSG_TEXT_ON : STATUS_MSG_TEXT_OFF;
	};
	
	var visibility = function visibility(_visibility, enabled, statusMessage) {
	  if (statusMessage === false) return;
	  showState = _visibility = !!_visibility;
	
	  // Add little debounce to keep consistent visibility state
	  setTimeout(function () {
	    if (showState === _visibility) {
	      element.className = _visibility ? STATUS_MSG_CLASS_VISIBLE : STATUS_MSG_CLASS_HIDDEN;
	      syncText(enabled);
	    }
	  }, 100);
	};
	
	exports.default = { syncText: syncText, visibility: visibility };

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vue-geokbd.js.map