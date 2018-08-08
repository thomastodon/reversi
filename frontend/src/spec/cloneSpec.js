import {deepClone} from './deepClone'

fdescribe('javascript', () => {

  let house;

  const increaseSquareFootage = (house) => Object.values(house.rooms).forEach(room => room.squareFootage += 5);
  const updateStyle = (house) => house.style = "THREE_DECKER";

  beforeEach(() => {
    house = {style: "RANCH", rooms: {1: {squareFootage: 10}, 2: {squareFootage: 20}}};
  });

  it('objects are mutated', () => {

    increaseSquareFootage(house);
    updateStyle(house);

    expect(house.rooms["1"].squareFootage).toBe(15);
    expect(house.style).toBe("THREE_DECKER");

  });

  describe('the result of Object.assign()', () => {

    let houseResult;

    beforeEach(() => {
      houseResult = Object.assign({}, house);
    });

    it('is a shallow clone, only copies property values, copies over any value that is a reference to an object', () => {

      increaseSquareFootage(houseResult);
      updateStyle(houseResult);

      expect(house.rooms["1"].squareFootage).toBe(15);
      expect(house.style).toBe("RANCH");

    });
  });

  describe('the result of the spread operator', () => {

    let houseResult;

    beforeEach(() => {
      houseResult = {...house};
    });

    it('is a shallow clone, only copies property values, copies over any value that is a reference to an object', () => {

      increaseSquareFootage(houseResult);
      updateStyle(houseResult);

      expect(house.rooms["1"].squareFootage).toBe(15);
      expect(house.style).toBe("RANCH");

    });
  });

  describe('the result of a hand-rolled deep clone', () => {

    let houseResult;

    beforeEach(() => {
      houseResult = deepClone(house);
    });

    it('is a deep clone, no references are copied', () => {

      increaseSquareFootage(houseResult);
      updateStyle(houseResult);

      expect(house.rooms["1"].squareFootage).toBe(10);
      expect(house.style).toBe("RANCH");
    });
  });
});
