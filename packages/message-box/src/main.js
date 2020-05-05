import Vue from 'vue';
import Main from './main.vue';
import { PopupManager } from '../../../src/utils/popup';
let MessageConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const MessageBox = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  // let userOnClose = options.onClose;
  let id = 'message_box_' + seed++;

  // options.onClose = function() {
  //   Message.close(id, userOnClose);
  // };
  instance = new MessageConstructor({
    data: options
  });
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  instance.dom.style.zIndex = PopupManager.nextZIndex();
  instances.push(instance);
  return instance.vm;
};

export default MessageBox;
