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

    spyOn(App.components.Board.methods, "getSomething");

    vm = new Vue({
      el: '#spec',
      render: (h) => h(App)
    });
  });

  it('has a title', () => {
    expect(page()).toContain('reversi')
  });

  describe('when the button is clicked', () => {

    beforeEach(() => {
      document.querySelector('button').click()
    });

    it('makes a call to google', () => {
      expect(App.components.Board.methods.getSomething).toHaveBeenCalled();
    })
  });

  afterEach(() => {
    vm.$destroy();
    vm.$el.remove();
  });

  const page = () => document.querySelector('body').innerText
});
