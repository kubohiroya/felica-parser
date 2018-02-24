import { default as Felica} from '../dist/index.js';
console.log("AAAA");
console.log(Felica);
describe('Felica', () => {
  it('polling()', () => {
    expect(Felica.polling(0x0102, 0x03, 0x04)).toEqual([0x00, 0x01, 0x02, 0x03, 0x04]);
  });
  it('requestService()', () => {
    expect(Felica.requestService([1, 2, 3, 4, 5, 6, 7, 8], [9, 10]))
      .toEqual([0x02, 1, 2, 3, 4, 5, 6, 7, 8, 2 , 9, 0, 10, 0]);
  });
  it('requestService()', () => {
    expect(Felica.requestService("0102030405060708", [9, 10]))
      .toEqual([0x02, 1, 2, 3, 4, 5, 6, 7, 8, 2 , 9, 0, 10, 0]);
  });
  /*
  it('requestResponse()', () => {
    expect(Felica.requestResponse(0x0102, 0x03, 0x04)).toEqual([0x04, 0x01, 0x02, 0x03, 0x04]);
  });
  it('makeBlockElement()', () => {
    expect(Felica.makeBlockElement(0x0102, 0x03, 0x04)).toEqual([0x00, 0x01, 0x02, 0x03, 0x04]);
  });
  it('readWithoutEncryption()', () => {
    expect(Felica.readWithoutEncryption(0x0102, 0x03, 0x04)).toEqual([0x06, 0x01, 0x02, 0x03, 0x04]);
  });
  it('writeWithoutEncryption()', () => {
    expect(Felica.writeWithoutEncryption(0x0102, 0x03, 0x04)).toEqual([0x08, 0x01, 0x02, 0x03, 0x04]);
  });
  it('requestSystemCode()', () => {
    expect(Felica.requestSystemCode(0x0102, 0x03, 0x04)).toEqual([0x0C, 0x01, 0x02, 0x03, 0x04]);
  });
  it('searchService()', () => {
    expect(Felica.searchService(0x0102, 0x03, 0x04)).toEqual([0x0A, 0x01, 0x02, 0x03, 0x04]);
  });
  */
});
