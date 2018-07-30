import {setup, tearDown} from './utility';
import Board from '../components/Board'

describe('the board', () => {

  let vm, googleCommandSpy;

  beforeEach(() => {
    googleCommandSpy = jasmine.createSpyObj('googleCommand', {getFountainhead: new Promise(() => 'hello')});
    vm = setup(Board, {googleCommand: googleCommandSpy});
  });

  it('has eight rows', () => {
    expect(document.querySelectorAll('tr').length).toBe(8);
  });

  it('has eight columns', () => {
    expect(document.querySelectorAll('tr')[0].querySelectorAll('th').length).toBe(8);
  });

  describe('when the fountainhead button is clicked', () => {

    beforeEach(() => {
      document.querySelector('#button').click()
    });

    it('makes a call to google', () => {
      expect(googleCommandSpy.getFountainhead).toHaveBeenCalled();
    })
  });

  afterEach(() => tearDown(vm));
});
