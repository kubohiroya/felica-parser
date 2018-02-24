/* tslint:disable: no-bitwise */
import { BlockElementAccessMode, FELICA_COMMAND, IServiceCode} from "./felica-cmd";
import Util from "./util";

export default class FelicaPaser {
  public static polling(systemCode: number, requestCode: number, timeSlot: number): number[] {
    return [
      FELICA_COMMAND.CC_POLLING,
      (systemCode >>> 8) & 0xFF,
      systemCode & 0xFF,
      requestCode,
      timeSlot,
    ];
  }

  public static requestService(idm: number[] | string, nodes: number[]): number[] {
    const byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
    const data = [
      FELICA_COMMAND.CC_REQUEST_SERVICE,
      ...byteIdm,
    ];
    if (!(1 <= nodes.length && nodes.length <= 32)) {
      throw new Error("The length of nodes is not 1 or more and 32 or less");
    }
    data.push(nodes.length);
    for (const node of nodes) {
      data.push(node & 0xFF);
      data.push((node >>> 8) & 0xFF);
    }
    return data;
  }

  public static requestResponse(idm: number[] | string): number[] {
    const byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
    return [
      FELICA_COMMAND.CC_REQUEST_RESPONCE,
      ...byteIdm,
    ];
  }

  public static makeBlockElement(
    accessMode: BlockElementAccessMode, serviceCodeIndex: number, blockNum: number): number[] {
    const data: number[] = [];
    if (255 < blockNum) {
      data.push(0b10000000 | (accessMode << 4) | serviceCodeIndex);
      data.push(blockNum);
    } else {
      data.push(0b00000000 | (accessMode << 4) | serviceCodeIndex);
      data.push(blockNum & 0xFF);
      data.push((blockNum >>> 8) & 0xFF);
    }
    return data;
  }

  public static readWithoutEncryption(
    idm: number[] | string, services: number[],
    serviceCodeListOrderList: number[], blockNumberList: number[]): number[] {
    const byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
    const data = [
      FELICA_COMMAND.CC_READ_WITHOUT_ENCRYPTION,
      ...byteIdm,
    ];
    data.push(services.length);
    for (const service of services) {
      data.push(service & 0xFF);
      data.push((service >>> 8) & 0xFF);
    }
    if (serviceCodeListOrderList.length !== blockNumberList.length) {
      throw new Error("The number of serviceCodeListOrderList does not match the number of blockNumberList");
    }
    data.push(serviceCodeListOrderList.length);
    for (let i = 0; i < blockNumberList.length; i++) {
      const blockElement = FelicaPaser.makeBlockElement(
        BlockElementAccessMode.NOT_CASHBACK_ACCESS_TO_PURSE_SERVICE,
        serviceCodeListOrderList[i],
        blockNumberList[i]);
      data.push(...blockElement);
    }
    return data;
  }
  public static writeWithoutEncryption(
    idm: number[], services: number[],
    serviceCodeListOrderList: number[], blockNumberList: number[], blockData: number[][]): number[] {
    const byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
    const data = [
      FELICA_COMMAND.CC_READ_WITHOUT_ENCRYPTION,
      ...byteIdm,
    ];
    data.push(services.length);
    for (const service of services) {
      data.push(service & 0xFF);
      data.push((service >>> 8) & 0xFF);
    }
    if (serviceCodeListOrderList.length !== blockNumberList.length) {
      throw new Error("The number of serviceCodeListOrderList does not match the number of blockNumberList");
    }
    if (serviceCodeListOrderList.length !== blockData.length) {
      throw new Error("The number of serviceCodeListOrderList does not match the number of blockData");
    }
    data.push(serviceCodeListOrderList.length);
    for (let i = 0; i < blockNumberList.length; i++) {
      const blockElement = FelicaPaser.makeBlockElement(
        BlockElementAccessMode.NOT_CASHBACK_ACCESS_TO_PURSE_SERVICE,
        serviceCodeListOrderList[i],
        blockNumberList[i]);
      for (const blockValue of blockElement) {
        data.push(blockValue);
      }
    }
    for (const oneLineData of blockData) {
      data.push(...oneLineData);
    }
    return data;
  }

  public static searchService(idm: number[] | string, idx: number): number[] {
    const byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
    return [
      FELICA_COMMAND.CC_SEARCH_SERVICE_CODE,
      ...byteIdm,
      idx & 0xFF,
      (idx >>> 8) & 0xFF,
    ];
  }
  public static requestSystemCode(idm: number[] | string): number[] {
    const byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
    return [
      FELICA_COMMAND.CC_REQUEST_SYSTEM_CODE,
      ...byteIdm,
    ];
  }
  public static parseServiceCode(data: number): IServiceCode {
    return {
      serviceNumber: data & 0xFFC0 >>> 7,
      serviceAttribute: data & 0x3F,
    };
  }

  public static parseRequest(data: number[]) {
    const cmdCode = data[0];
    switch (cmdCode) {
      case FELICA_COMMAND.CC_POLLING:
        break;
      case FELICA_COMMAND.CC_REQUEST_SERVICE:
        break;
      case FELICA_COMMAND.CC_REQUEST_RESPONCE:
        break;
      case FELICA_COMMAND.CC_READ_WITHOUT_ENCRYPTION:
        break;
      case FELICA_COMMAND.CC_WRITE_WITHOUT_ENCRYPTION:
        break;
      case FELICA_COMMAND.CC_SEARCH_SERVICE_CODE:
        break;
      case FELICA_COMMAND.CC_REQUEST_SYSTEM_CODE:
        break;
      case FELICA_COMMAND.CC_AUTHENTICATION1:
        break;
      case FELICA_COMMAND.CC_AUTHENTICATION2:
        break;
      default:
        break;
    }
  }

  public static parseResponse(data: number[]) {
    const cmdCode = data[0];
    switch (cmdCode) {
      case FELICA_COMMAND.RC_POLLING:
        break;
      case FELICA_COMMAND.RC_REQUEST_SERVICE:
        break;
      case FELICA_COMMAND.RC_REQUEST_RESPONCE:
        break;
      case FELICA_COMMAND.RC_READ_WITHOUT_ENCRYPTION:
        break;
      case FELICA_COMMAND.RC_WRITE_WITHOUT_ENCRYPTION:
        break;
      case FELICA_COMMAND.RC_SEARCH_SERVICE_CODE:
        break;
      case FELICA_COMMAND.RC_REQUEST_SYSTEM_CODE:
        break;
      case FELICA_COMMAND.RC_AUTHENTICATION1:
        break;
      case FELICA_COMMAND.RC_AUTHENTICATION2:
        break;
      case FELICA_COMMAND.RC_READ:
        break;
      default:
        break;
    }
  }

  private static argIdm2ByteIdm(idm: number[] | string): number[] {
    let byteIdm: number[] = [];
    if (Array.isArray(idm)) {
      byteIdm = idm;
    } else {
      byteIdm = Util.stringHex2Byte(idm);
    }
    return byteIdm;
  }
}
