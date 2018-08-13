/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by Administrator on 2017/5/2.
 */
var Tool = function (win) {
    var Tool = {};
    /**
     * 操作数据到sessionstorage
     * */
    Tool.dataToSessionStorageOperate = {
        /**存储*/
        save: function save(data_name, data_value) {
            if (typeof data_name != 'undefined' && typeof data_value != 'undefined') sessionStorage.setItem(data_name, JSON.stringify(data_value));
        },
        /**取出*/
        achieve: function achieve(data_name) {
            var data_value = sessionStorage.getItem(data_name);
            data_value && (data_value = JSON.parse(data_value));
            return data_value;
        },
        /**删除*/
        remove: function remove(data_name) {
            if (data_name) sessionStorage.removeItem(data_name);
        },
        /**清空*/
        clear: function clear() {
            sessionStorage.clear();
        }
    };
    /**
     * 操作数据到localstorage
     * */
    Tool.dataToLocalStorageOperate = {
        /**存储*/
        save: function save(data_name, data_value) {
            if (typeof data_name != 'undefined' && typeof data_value != 'undefined') localStorage.setItem(data_name, JSON.stringify(data_value));
        },
        /**取出*/
        achieve: function achieve(data_name) {
            var data_value = localStorage.getItem(data_name);
            data_value && (data_value = JSON.parse(data_value));
            return data_value;
        },
        /**删除*/
        remove: function remove(data_name) {
            if (data_name) localStorage.removeItem(data_name);
        },
        /**清空*/
        clear: function clear() {
            localStorage.clear();
        }
    };

    Tool.findFirstIndexForArr = function () {
        var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        var index = -1;
        arr.forEach(function (item, i) {
            if (typeof filter === 'function' && filter(item)) return index = i;
            if (typeof filter !== 'function' && item === filter) return index = i;
        });
        return index;
    };
    return Tool;
}(window);
exports.default = Tool;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

__webpack_require__(3);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _store = __webpack_require__(0);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {

    var arr = [{
        id: '1',
        title: '1111111111',
        author: '啊哈',
        duration: 200,
        file: 'http://yanshi.sucaihuo.com/jquery/0/76/demo/yangcong.mp3',
        src: 'http://www.owulia.com/static/temp/1.jpg',
        lrc: '../media/1.lrc'
    }, {
        id: '2',
        title: '2222222222',
        author: '啊哈',
        duration: 200,
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
        src: 'http://www.owulia.com/static/temp/2.jpg',
        lrc: '../media/2.lrc'
    }, {
        id: '3',
        title: '33333333',
        author: '啊哈',
        duration: 200,
        file: '../media/880211.mp3',
        src: 'http://www.owulia.com/static/temp/3.jpg',
        lrc: '../media/3.lrc'
    }, {
        id: '4',
        title: '44444444',
        author: '啊哈',
        duration: 200,
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
        src: 'http://www.owulia.com/static/temp/4.jpg',
        lrc: '../media/4.lrc'
    }, {
        id: '5',
        title: '5555555555',
        author: '啊哈',
        duration: 200,
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
        src: 'http://www.owulia.com/static/temp/4.jpg'
    }, {
        id: '6',
        title: '666666666666',
        author: '啊哈',
        duration: 200,
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
        src: 'http://www.owulia.com/static/temp/4.jpg',
        lrc: '../media/1.lrc'
    }, {
        id: '7',
        title: '777777777777',
        author: '啊哈',
        duration: 200,
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
        src: 'http://www.owulia.com/static/temp/4.jpg',
        lrc: '../media/1.lrc'
    }, {
        id: '8',
        title: '8888888888',
        author: '啊哈',
        duration: 200,
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
        src: 'http://www.owulia.com/static/temp/4.jpg',
        lrc: '../media/1.lrc'
    }, {
        id: '9',
        title: '99999999999',
        author: '啊哈',
        duration: 200,
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
        src: 'http://www.owulia.com/static/temp/4.jpg',
        lrc: '../media/1.lrc'
    }, {
        id: '0',
        title: '00000000000',
        author: '啊哈',
        duration: 200,
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
        src: 'http://www.owulia.com/static/temp/4.jpg',
        lrc: '../media/1.lrc'
    }];

    var MusicResourcesController = {
        key: 'MUSIC_LIST',
        $el: $('#list'),
        el: 'li',
        total: [],
        list: [],
        href: '/dist/view/player',
        init: function init(total, list) {
            this.total = total;
            this.getList(list);
            this.addMonitorEvent();
        },

        // 歌曲事件监听
        addMonitorEvent: function addMonitorEvent() {
            var that = this;
            // 选取播放歌曲
            this.$el.on('click', this.el, function (e) {
                var index = $(this).data('index');
                var music = that.total[index];
                music && that.addMusic(music);
            });
            return this;
        },
        getList: function getList(list) {
            this.list = list || _store2.default.dataToLocalStorageOperate.achieve(this.key) || [];
            return this.list;
        },
        addMusic: function addMusic(music) {
            var index = this.findMusic(music);
            if (index !== -1) {
                this.list.splice(index, 1);
            }
            this.list.unshift(music);
            this.saveList();
            if (!_store2.default.dataToLocalStorageOperate.achieve('IS_OPEN')) {
                _store2.default.dataToLocalStorageOperate.save('IS_OPEN', true);
                window.open(window.location.origin + this.href);
            }
            return this;
        },
        saveList: function saveList(list) {
            if (list) this.list = list;
            _store2.default.dataToLocalStorageOperate.save(this.key, this.list);
        },
        findMusic: function findMusic(music) {
            this.getList();
            var cur_index = _store2.default.findFirstIndexForArr(this.list, function (item, index) {
                return item.id === music.id;
            });
            return cur_index;
        },
        removeMusic: function removeMusic(music) {
            var index = this.findMusic(music);
            index !== -1 && this.list.splice(index, 1);
            this.saveList();
            return this;
        }
    };
    MusicResourcesController.init(arr);
}());

/***/ })
/******/ ]);