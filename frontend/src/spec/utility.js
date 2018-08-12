import Vue from 'vue';
import router from './../router'
import store from './../store';

Vue.config.devtools = false;
Vue.config.productionTip = false;

export const setup = (component, commands) => {

  const spec = document.createElement('div');
  spec.id = 'spec';
  document.querySelector('body').appendChild(spec);

  return new Vue({
    el: '#spec',
    store: store,
    router: router,
    provide: commands,
    render: h => h(component)
  });
};

export const tearDown = (vm) => {
  vm.$destroy();
  vm.$el.remove();
};

export const wait = (millis) => new Promise(r => setTimeout(r, millis));