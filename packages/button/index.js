import qdmButton from './index.vue';

/* istanbul ignore next */
qdmButton.install = function(Vue) {
  Vue.component(qdmButton.name, qdmButton);
};

export default qdmButton;
