import VuePreview from './src/preview';

VuePreview.install = function(Vue) {
  Vue.component(VuePreview.name, VuePreview);
};

export default VuePreview;