const _id = Symbol('visibility-change-id');

let hidden, visibilityChange, lastId = -1;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
}

const visibility = {
  // 缓存 visibility change 触发时的回调函数
  _callbacks: {},

  _doc: document,

  /**
   * 当可见性发生变化时调用回调。
   * 事件监听会在第一个回调绑定时才注册，这是一个延时行为
   * 
   * @param {Function (event, hidden)} callback 回调函数
   *  - {Event} event 原始事件对象
   *  - {Boolean} hidden 表示当前页面可见性，true 表示可见
   */
  change(callback) {
    if (!visibility.isSupported()) {
        return false;
    }
    lastId += 1;
    var number = lastId;
    visibility._callbacks[number] = callback;
    visibility._listen();
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
  unbind(id) {
    delete visibility._callbacks[id];
  },

  /**
   * Return true if browser support Page Visibility API.
   */
  isSupported() {
    return hidden !== undefined;
  },

  /**
   * Return true if page now isn’t visible to user.
   */
  hidden() {
    return visibility._doc[hidden];
  },

  /**
   * Listener for `visibilitychange` event.
   * @param {Event} event event object
   */
  _change(event) {
    for ( var i in visibility._callbacks ) {
      visibility._callbacks[i].call(visibility._doc, event, visibility._doc[hidden]);
    }
  },

  /**
   * Set listener for `visibilitychange` event.
   */
  _listen() {
    if (visibility._init) {
      return;
    }

    var listener = function () {
      visibility._change.apply(visibility, arguments);
    };
    document.addEventListener(visibilityChange, listener);

    visibility._init = true;
  }
};

visibility.install = function(Vue) {

  Vue.directive('visibility-change', {
    bind(el, { value }) {
      if (typeof value === 'function') {
        el[_id] = visibility.change((evt, hidden) => {
          value(evt, hidden);
        });
      }
    },
    unbind(el) {
      visibility.unbind(el[_id]);
    }
  });
}

export default visibility;