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

	"use strict";
	
	var directive_1 = __webpack_require__(1);
	var statusMsgEff_1 = __webpack_require__(3);
	var install = function install(Vue, _a) {
	    var _b = _a === void 0 ? {} : _a,
	        _c = _b.hotkey,
	        hotkey = _c === void 0 ? '~' : _c,
	        _d = _b.enabled,
	        enabled = _d === void 0 ? false : _d,
	        _e = _b.statusMessage,
	        statusMessage = _e === void 0 ? true : _e;
	    var options = { hotkey: hotkey, enabled: enabled, statusMessage: statusMessage };
	    statusMsgEff_1.default.init(options.hotkey, options.enabled);
	    Vue.directive('geokbd', directive_1.default(options));
	};
	module.exports = { install: install };

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var keypress_1 = __webpack_require__(2);
	var statusMsgEff_1 = __webpack_require__(3);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (options) {
	    return {
	        bind: function bind(el, binding) {
	            // Vue 1.x support
	            if (this && this.el) {
	                el = this.el;
	                binding = this;
	            }
	            binding.keypressEvent = function (evt) {
	                // Don't capture Ctrl/Meta keypress
	                if (evt.metaKey || evt.ctrlKey) {
	                    return;
	                }
	                // Check if hotkey was pressed
	                if (options.hotkey === String.fromCharCode(evt.which)) {
	                    evt.preventDefault();
	                    statusMsgEff_1.default.enabled(options.enabled = !options.enabled);
	                } else {
	                    // Check enabled state
	                    if (options.enabled === true) {
	                        keypress_1.default(evt);
	                    }
	                }
	            };
	            binding.focusEvent = function () {
	                if (options.statusMessage) {
	                    statusMsgEff_1.default.visibility(true);
	                }
	            };
	            binding.blurEvent = function () {
	                if (options.statusMessage) {
	                    statusMsgEff_1.default.visibility(false);
	                }
	            };
	            el.addEventListener('keypress', binding.keypressEvent);
	            el.addEventListener('focus', binding.focusEvent);
	            el.addEventListener('blur', binding.blurEvent);
	        },
	        unbind: function unbind(el, binding) {
	            // Vue 1.x support
	            if (this && this.el) {
	                el = this.el;
	                binding = this;
	            }
	            el.removeEventListener('keypress', binding.keypressEvent);
	            el.removeEventListener('focus', binding.focusEvent);
	            el.removeEventListener('blur', binding.blurEvent);
	        }
	    };
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var ALPHABET = 'abgdevzTiklmnopJrstufqRySCcZwWxjh';
	var BASE_INDEX = 4304;
	function convertChar(charIndex) {
	    var char = String.fromCharCode(charIndex);
	    if (ALPHABET.indexOf(char) >= 0) {
	        return BASE_INDEX + ALPHABET.indexOf(char);
	    }
	    return charIndex;
	}
	function isSelectionSupported($input) {
	    return typeof $input.selectionStart === 'number' && typeof $input.selectionEnd === 'number';
	}
	function getInputSelection($input) {
	    var start = 0;
	    var end = 0;
	    if (isSelectionSupported($input)) {
	        start = $input.selectionStart;
	        end = $input.selectionEnd;
	    }
	    return { start: start, end: end };
	}
	function setInputSelection($input, offset) {
	    if (isSelectionSupported($input)) {
	        $input.selectionStart = offset.start;
	        $input.selectionEnd = offset.end;
	    }
	    // A little 'hack' to keep natural browser behavior while typing
	    $input.blur();
	    $input.focus();
	}
	function handleKeypress(evt) {
	    var $input = evt.target;
	    var which = evt.which;
	    var to = convertChar(which);
	    // Don't take any action if conversion didn't happen
	    if (which === to) {
	        return;
	    }
	    evt.preventDefault();
	    // Insert converted char
	    var sel = getInputSelection($input);
	    var val = $input.value;
	    $input.value = val.slice(0, sel.start) + String.fromCharCode(to) + val.slice(sel.end);
	    // Move caret to correct position
	    setInputSelection($input, { start: sel.start + 1, end: sel.start + 1 });
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = handleKeypress;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var statusMsgElement_1 = __webpack_require__(4);
	var StatusMsgEff = function () {
	    function StatusMsgEff() {}
	    StatusMsgEff.init = function (hotkey, enabled) {
	        statusMsgElement_1.default.create(hotkey);
	        statusMsgElement_1.default.stateText(enabled);
	    };
	    StatusMsgEff.enabled = function (enabled) {
	        statusMsgElement_1.default.stateText(enabled);
	    };
	    StatusMsgEff.visibility = function (visibility) {
	        var _this = this;
	        this.visibilityState = visibility = !!visibility;
	        // Add little delay to keep consistent visibility state
	        setTimeout(function () {
	            if (_this.visibilityState === visibility) {
	                statusMsgElement_1.default.isVisible(visibility);
	            }
	        }, 100);
	    };
	    return StatusMsgEff;
	}();
	StatusMsgEff.visibilityState = false;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = StatusMsgEff;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var TEXT_ENABLED = 'ჩართულია';
	var TEXT_DISABLED = 'გამორთულია';
	var CLASSNAME = 'vue-geokbd--statusMessage';
	var CLASSNAME_STATE = CLASSNAME + '-state';
	var CLASSNAME_HIDDEN = CLASSNAME + ' hidden';
	var CLASSNAME_VISIBLE = CLASSNAME + ' visible';
	var TEMPLATE = ['<div class="vue-geokbd--statusMessage-text">', 'ქართული კლავიატურა: <u class="' + CLASSNAME_STATE + '"></u><br>', 'ჩართვა/გამორთვა კლავიშით (\'{$hotkey}\')', '</div>'].join('');
	var StatusMsgElement = function () {
	    function StatusMsgElement() {}
	    StatusMsgElement.create = function (hotkey) {
	        this.$root = document.createElement('div');
	        this.$root.className = CLASSNAME_HIDDEN;
	        this.$root.innerHTML = TEMPLATE.replace('{$hotkey}', hotkey);
	        this.$state = this.$root.querySelector('.' + CLASSNAME_STATE);
	        document.body.appendChild(this.$root);
	    };
	    StatusMsgElement.stateText = function (isEnabled) {
	        this.$state.innerHTML = isEnabled ? TEXT_ENABLED : TEXT_DISABLED;
	    };
	    StatusMsgElement.isVisible = function (isVisible) {
	        this.$root.className = isVisible ? CLASSNAME_VISIBLE : CLASSNAME_HIDDEN;
	    };
	    return StatusMsgElement;
	}();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = StatusMsgElement;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vue-geokbd.js.map