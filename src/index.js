import QdmButton from '../packages/button/index.js';
import Message from '../packages/message/index.js';
import Notification from '../packages/notification/index.js';
import MessageBox from '../packages/message-box/index.js';
const components = [
  QdmButton,
  MessageBox
];
const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$qdmMessage = Message;
  Vue.prototype.$qdmNotify = Notification;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$qdmAlert = MessageBox.alert;
  Vue.prototype.$qdmConfirm = MessageBox.confirm;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  QdmButton,
  Message,
  Notification,
  MessageBox
}
