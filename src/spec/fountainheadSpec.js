import App from '../App.vue';
import Vue from 'vue';

describe('the fountainhead', () => {

  let vm, googleCommandSpy;

  Vue.config.devtools = false;
  Vue.config.productionTip = false;

  beforeEach(() => {

    const spec = document.createElement('div');
    spec.id = 'spec';
    document.querySelector('body').appendChild(spec);

    googleCommandSpy = jasmine.createSpyObj('googleCommand', {getFountainhead: new Promise(() => 'hello')});

    vm = new Vue({
      el: '#spec',
      provide: {googleCommand: googleCommandSpy},
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
      expect(googleCommandSpy.getFountainhead).toHaveBeenCalled();
    })
  });

  afterEach(() => {
    vm.$destroy();
    vm.$el.remove();
  });

  const page = () => document.querySelector('body').innerText
});
