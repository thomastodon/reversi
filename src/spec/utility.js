import App from '../App.vue';
import Vue from 'vue';

Vue.config.devtools = false;
Vue.config.productionTip = false;

export default {
  setup: function (components) {

    const spec = document.createElement('div');
    spec.id = 'spec';
    document.querySelector('body').appendChild(spec);

    return new Vue({
      el: '#spec',
      provide: components,
      render: (h) => h(App)
    });
  },
  tearDown: function (vm) {
    vm.$destroy();
    vm.$el.remove();
  }
}
