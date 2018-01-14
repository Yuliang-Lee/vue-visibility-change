(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["visibility"] = factory();
	else
		root["visibility"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _id = Symbol('visibility-change-id');

var _hidden = void 0,
    visibilityChange = void 0,
    lastId = -1;
/* istanbul ignore else */
if (typeof document.hidden !== "undefined") {
  // Opera 12.10 and Firefox 18 and later support
  _hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  _hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  _hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  _hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
}

// 缓存 visibility change 触发时的回调函数
var _callbacks = {};
var _doc = document;
var _init = void 0;

/**
 * Listener for `visibilitychange` event.
 * @param {Event} event event object
 */
function _change(event) {
  for (var i in _callbacks) {
    _callbacks[i].call(_doc, event, _doc[_hidden]);
  }
}

/**
 * Set listener for `visibilitychange` event.
 */
function _listen() {
  /* istanbul ignore if */
  if (_init) {
    return;
  }

  var listener = function listener() {
    _change.apply(visibility, arguments);
  };
  document.addEventListener(visibilityChange, listener);

  _init = true;
}

var visibility = {

  /**
   * 当可见性发生变化时调用回调。
   * 事件监听会在第一个回调绑定时才注册，这是一个延时行为
   * 
   * @param {Function (event, hidden)} callback 回调函数
   *  - {Event} event 原始事件对象
   *  - {Boolean} hidden 表示当前页面可见性，true 表示可见
   */
  change: function change(callback) {
    if (!visibility.isSupported()) {
      return false;
    }
    lastId += 1;
    var number = lastId;
    _callbacks[number] = callback;
    _listen();
    return number;
  },


  /**
   * Remove `change` listener by it ID.
   * 
   * @param {Number} id 回调标识
   * 
   * @example
   * var id = visibility.change(function(e, state) {
   *     firstChangeCallback();
   *     visibility.unbind(id);
   * });
   */
  unbind: function unbind(id) {
    delete _callbacks[id];
  },


  /**
   * Return true if browser support Page Visibility API.
   */
  isSupported: function isSupported() {
    return _hidden !== undefined;
  },


  /**
   * Return true if page now isn’t visible to user.
   */
  hidden: function hidden() {
    return _doc[_hidden];
  }
};

visibility.install = function (Vue) {

  Vue.directive('visibility-change', {
    bind: function bind(el, _ref) {
      var value = _ref.value;

      if (typeof value === 'function') {
        el[_id] = visibility.change(function (evt, hidden) {
          value(evt, hidden);
        });
      } else {
        console.error('You need bind a callback function');
      }
    },
    unbind: function unbind(el) {
      visibility.unbind(el[_id]);
    }
  });
};

exports.default = visibility;

/***/ })
/******/ ]);
});