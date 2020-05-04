import QdmButton from '../packages/button/index.js';
const components = [
  QdmButton
];
const install = function(Vue, opts = {}) {

  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  QdmButton
}
