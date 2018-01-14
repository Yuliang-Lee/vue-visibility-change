import Vue from 'vue';

Vue.config.productionTip = false;

let id = 0;

function createElm() {
  const elm = document.createElement('div');

  elm.id = 'app' + ++id;
  document.body.appendChild(elm);

  return elm;
}

/**
 * 回收 vm
 * @param  {Object} vm
 */
function destroyVM(vm) {
  vm.$destroy && vm.$destroy();
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el);
}

/**
 * 创建一个 Vue 的实例对象
 * @param  {Object|String}  Compo   组件配置，可直接传 template
 * @param  {Boolean=false} mounted 是否添加到 DOM 上
 * @return {Object} vm
 */
function createVue(Compo, mounted = false) {
  if (Object.prototype.toString.call(Compo) === '[object String]') {
    Compo = {
      template: Compo
    };
  }
  return new Vue(Compo).$mount(mounted === false ? null : createElm());
}


/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
function triggerEvent(elm, name, ...opts) {
  let eventName;

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents';
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent';
  } else {
    eventName = 'HTMLEvents';
  }
  const evt = document.createEvent(eventName);

  evt.initEvent(name, ...opts);
  elm.dispatchEvent ?
    elm.dispatchEvent(evt) :
    elm.fireEvent('on' + name, evt);

  return elm;
}

/**
 * 触发 “mouseup” 和 “mousedown” 事件
 * @param {Element} elm
 * @param {*} opts
 */
function triggerClick(elm, ...opts) {
  triggerEvent(elm, 'mousedown', ...opts);
  triggerEvent(elm, 'mouseup', ...opts);

  return elm;
}

function visibilitychange() {
  // 模拟触发事件
  const event = new Event('visibilitychange');
  document.dispatchEvent(event);
}

export {
  destroyVM,
  createVue,
  triggerEvent,
  triggerClick,
  visibilitychange
};