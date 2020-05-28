import QdmDialog from './src/component';

/* istanbul ignore next */
QdmDialog.install = function(Vue) {
  Vue.component(QdmDialog.name, QdmDialog);
};

export default QdmDialog;
