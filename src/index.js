import Preview from './view/preview/index'
import PreviewPopup from './view/prveiew-popup/index';
import './static/css/index.css';

const components = [
  Preview,
  PreviewPopup
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Preview,
  PreviewPopup
}