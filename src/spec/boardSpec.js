import App from '../App.vue';
import Vue from 'vue';

describe('the board', () => {

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

  it('has eight rows', () => {
    expect(document.querySelectorAll('tr').length).toBe(8);
  });

  it('has eight columns', () => {
    expect(document.querySelectorAll('tr')[0].querySelectorAll('th').length).toBe(8);
  });

  afterEach(() => {
    vm.$destroy();
    vm.$el.remove();
  });
});
