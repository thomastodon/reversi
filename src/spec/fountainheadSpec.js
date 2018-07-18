import Utility from './utility';

describe('the fountainhead', () => {

  let vm, googleCommandSpy;

  beforeEach(() => {
    googleCommandSpy = jasmine.createSpyObj('googleCommand', {getFountainhead: new Promise(() => 'hello')});
    vm = Utility.setup({googleCommand: googleCommandSpy});
  });

  describe('when the button is clicked', () => {

    beforeEach(() => {
      document.querySelector('button').click()
    });

    it('makes a call to google', () => {
      expect(googleCommandSpy.getFountainhead).toHaveBeenCalled();
    })
  });

  afterEach(() => Utility.tearDown(vm));
});
