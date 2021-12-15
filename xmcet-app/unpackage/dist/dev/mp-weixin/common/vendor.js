(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"xmapp","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 2 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"xmapp","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"xmapp","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"xmapp","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"xmapp","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 4 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 5 */
/*!**********************************************************************!*\
  !*** /Users/sophie/Documents/projects/MT-XMCET/xmcet-app/pages.json ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/*!**********************************************************************************!*\
  !*** /Users/sophie/Documents/projects/MT-XMCET/xmcet-app/static/assets/CET4.png ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 19 */
/*!**********************************************************************************!*\
  !*** /Users/sophie/Documents/projects/MT-XMCET/xmcet-app/static/assets/CET6.png ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 20 */
/*!****************************************************************************************!*\
  !*** /Users/sophie/Documents/projects/MT-XMCET/xmcet-app/static/assets/function01.png ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 21 */
/*!****************************************************************************************!*\
  !*** /Users/sophie/Documents/projects/MT-XMCET/xmcet-app/static/assets/function02.png ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/assets/function02.png";

/***/ }),
/* 22 */
/*!****************************************************************************************!*\
  !*** /Users/sophie/Documents/projects/MT-XMCET/xmcet-app/static/assets/function03.png ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/assets/function03.png";

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map