import QdmButton from '../packages/button/index.js';
import Message from '../packages/message/index.js';
import MessageBox from '../packages/message-box/index.js';
import Steps from '../packages/steps/index.js';
import Step from '../packages/step/index.js';
const components = [
  QdmButton,
  Steps,
  Step
];
const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$qdmMessage = Message;
  Vue.prototype.$qdmMsgbox = MessageBox;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  QdmButton,
  Message,
  MessageBox,
  Steps,
  Step
}
