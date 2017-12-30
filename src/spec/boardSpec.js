import App from '../App.vue';
import Vue from 'vue';

describe('board', () => {

  let vm;

  Vue.config.devtools = false;
  Vue.config.productionTip = false;

  beforeEach(() => {

    const spec = document.createElement('div');
    spec.id = 'spec';
    document.querySelector('body').appendChild(spec);

    vm = new Vue({
      el: '#spec',
      render: (h) => h(App)
    });

  });

  it('has a title', () => {
    expect(page()).toContain('reversi')
  });

  afterEach(() => {
    vm.$destroy();
    vm.$el.remove();
  });

  const page = () => document.querySelector('body').innerText
});
