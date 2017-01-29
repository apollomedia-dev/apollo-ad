(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Apollo", [], factory);
	else if(typeof exports === 'object')
		exports["Apollo"] = factory();
	else
		root["Apollo"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.apollo = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Apollo = function () {
    function Apollo() {
      var _this = this;

      _classCallCheck(this, Apollo);

      this.api = 'https://serene-reef-92326.herokuapp.com';

      this.isVisible = false;
      this.el = null;
      this.isDragging = false;
      this.dragStartPosition = null;
      this.currentDragPosition = null;

      if (this.isTouchDevice()) {
        this.createElement();

        this.request(this.api + '/ad?publisher=' + window.ApolloOptions.publisher, function (res) {
          _this.showAd(JSON.parse(res));
        });

        this.attachEvents();
      }
    }

    _createClass(Apollo, [{
      key: 'isTouchDevice',
      value: function isTouchDevice() {
        return 'ontouchstart' in window;
      }
    }, {
      key: 'request',
      value: function request(url, callback) {
        try {
          (function () {
            var x = new (window.XMLHttpRequest || window.ActiveXObject)('MSXML2.XMLHTTP.3.0');
            x.open('GET', url, 1);
            x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            x.onreadystatechange = function () {
              x.readyState > 3 && callback && callback(x.responseText, x);
            };

            x.send();
          })();
        } catch (e) {
          window.console && console.log(e);
        }
      }
    }, {
      key: 'createElement',
      value: function createElement() {
        var bodyStyles = window.getComputedStyle ? getComputedStyle(document.body, null) : document.body.currentStyle;
        var bodyMargin = parseInt(bodyStyles['marginLeft'].replace('px', '')) + parseInt(bodyStyles['marginRight'].replace('px', ''));

        this.el = document.createElement('div');

        this.el.style.width = 'calc(100% - ' + bodyMargin + 'px)';
        this.el.style.position = 'fixed';
        this.el.style.top = '-300px';
        this.el.style.zIndex = '3000000';
        this.el.style.transition = 'top 500ms ease';
        this.el.style.boxSizing = 'content-box';

        document.body.insertAdjacentElement('beforeend', this.el);
      }
    }, {
      key: 'onTouchStart',
      value: function onTouchStart(e) {
        var y = e.touches[0].clientY;

        if (y <= 250 && this.isVisible) {
          this.el.style.transition = '';
          this.isDragging = true;
          this.dragStartPosition = y;
        }
      }
    }, {
      key: 'onTouchMove',
      value: function onTouchMove(e) {
        var y = e.touches[0].clientY;
        var moveTo = this.isDragging ? -1 * (this.dragStartPosition - y) + 10 : null;

        this.currentDragPosition = y;

        if (moveTo) {
          this.el.style.top = moveTo > 10 ? 10 : moveTo;
        }
      }
    }, {
      key: 'onTouchEnd',
      value: function onTouchEnd(e) {
        var distance = this.dragStartPosition - this.currentDragPosition;

        if (this.isVisible) {
          this.el.style.transition = 'top 200ms ease';
          this.isDragging = false;
          this.el.style.top = distance > 50 ? '-300px' : '10px';
          this.isVisible = distance <= 50;
        }
      }
    }, {
      key: 'attachEvents',
      value: function attachEvents() {
        document.body.addEventListener('touchstart', this.onTouchStart.bind(this), false);
        document.body.addEventListener('touchmove', this.onTouchMove.bind(this), false);
        document.body.addEventListener('touchend', this.onTouchEnd.bind(this), false);
      }
    }, {
      key: 'showAd',
      value: function showAd(ad) {
        var html = '<a href="https://serene-reef-92326.herokuapp.com/click?ad=' + ad.id + '&publisher=' + window.ApolloOptions.publisher + '" target="_blank" style="display: block; width: 100%; text-decoration: none; font-family: arial, sans-serif; font-size: 16px;">\n      <div style="width:calc(100% - 20px); background-color:rgba(224, 227, 230, 1); color:rgb(224,227,230); border-top-right-radius: 10px; border-top-left-radius: 10px; padding: 10px;">\n        <div style="width: 20px; float:left; display:inline-block;">\n          <img src="' + ad.logo + '" style="max-width: 100%; max-height: 20px;">\n        </div>\n        <div style="float: right; width: calc(100% - 30px); color:#000; line-height: 20px;">' + ad.headline + '</div>\n        <div style="clear:both;"></div>\n      </div>\n      <div style="color:#000; padding: 10px; background-color:rgba(224, 227, 230, 0.7); border-bottom-right-radius: 10px; border-bottom-left-radius: 10px; fonst-size: 14px;">\n        ' + ad.subline + '\n      </div>\n    </a>';

        this.el.innerHTML = html;

        this.el.style.top = 10;
        this.isVisible = true;
      }
    }]);

    return Apollo;
  }();

  if (typeof window !== 'undefined' && window.document && window.document.createElement) {
    window.Apollo = new Apollo();
  }
});

/***/ })
/******/ ]);
});