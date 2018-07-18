import Utility from "./utility";

describe('the board', () => {

  let vm;

  beforeEach(() => {
    vm = Utility.setup({googleCommand: undefined});
  });

  it('has eight rows', () => {
    expect(document.querySelectorAll('tr').length).toBe(8);
  });

  it('has eight columns', () => {
    expect(document.querySelectorAll('tr')[0].querySelectorAll('th').length).toBe(8);
  });

  afterEach(() => Utility.tearDown(vm));
});
