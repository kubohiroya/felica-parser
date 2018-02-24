class Util {
  public static stringHex2Byte(str: string): number[] {
    const data = [];
    for (let i = 0; i < str.length; i += 2) {
      data.push(parseInt(str.substr(i, 2), 16));
    }
    return data;
  }
  public static byteToHexString(byteArray: number[]): string {
    let data = "";
    for (const value of byteArray) {
      /* tslint:disable: no-bitwise */
      const hex = (value & 0xff).toString(16);
      data +=  ("00" + hex).slice(-2) + " ";
    }
    return data.toUpperCase();
  }
}

export default Util;
