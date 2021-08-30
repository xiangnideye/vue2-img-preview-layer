import Vue from 'vue';

let vmInstance = '';

export const createInstance = (Component, props, on) => {
  const vm = new Vue({
    // h 是creatElement方法的别名，作用是返回vNode虚拟dom
    render: h => h(Component, { 
      props: props,
      on: on
     })
    // 不能直接写$mount('body')
    // vue 规定不能直接挂在到body html的跟节点上去
  }).$mount();

  vmInstance = vm;

  return vm
};

export const appendChildBody = (vm) => {
  document.body.appendChild(vm.$el);
}
