/* tslint:disable: no-bitwise */
import {
  BlockElementAccessMode,
  FELICA_COMMAND,
  IRCPolling, IRCReadWithoutEncryption, IRCRequestResponce,
  IRCRequestService, IRCRequestSystemCode, IRCSearchServiceCode, IRCWriteWithoutEncryption,
  IServiceCode,
} from "./felica-cmd";
import Util from "./util";

export default class FelicaPaser {
  /**
   * Felica Polling Command
   * @param {number} systemCode
   * @param {number} requestCode
   * @param {number} timeSlot
   * @returns {number[]}
   */
  public static polling(systemCode: number, requestCode: number, timeSlot: number): number[] {
    return [
      FELICA_COMMAND.CC_POLLING,
      (systemCode >>> 8) & 0xFF,
      systemCode & 0xFF,
      requestCode,
      timeSlot,
    ];
  }

  /**
   * Felica RequestService Command
   * @param {number[] | string} idm
   * @param {number[]} nodes
   * @returns {number[]}
   */
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

  /**
   * Felica RequestResponse Command
   * @param {number[] | string} idm
   * @returns {number[]}
   */
  public static requestResponse(idm: number[] | string): number[] {
    const byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
    return [
      FELICA_COMMAND.CC_REQUEST_RESPONCE,
      ...byteIdm,
    ];
  }

  /**
   * Felica ReadWithoutEncryption Command
   * @param {number[] | string} idm
   * @param {number[]} services
   * @param {number[]} serviceCodeListOrderList
   * @param {number[]} blockNumberList
   * @returns {number[]}
   */
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

  /**
   * Felica WriteWithoutEncryption Command
   * @param {number[]} idm
   * @param {number[]} services
   * @param {number[]} serviceCodeListOrderList
   * @param {number[]} blockNumberList
   * @param {number[][]} blockData
   * @returns {number[]}
   */
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

  /**
   * Felica SearchServiceCode Command
   * @param {number[] | string} idm
   * @param {number} idx
   * @returns {number[]}
   */
  public static searchServiceCode(idm: number[] | string, idx: number): number[] {
    const byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
    return [
      FELICA_COMMAND.CC_SEARCH_SERVICE_CODE,
      ...byteIdm,
      idx & 0xFF,
      (idx >>> 8) & 0xFF,
    ];
  }

  /**
   * Felica RequestSystemCode Command
   * @param {number[] | string} idm
   * @returns {number[]}
   */
  public static requestSystemCode(idm: number[] | string): number[] {
    const byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
    return [
      FELICA_COMMAND.CC_REQUEST_SYSTEM_CODE,
      ...byteIdm,
    ];
  }

  /**
   * Parse ServiceCode
   * @param {number} data
   * @returns {IServiceCode}
   */
  public static parseServiceCode(data: number): IServiceCode {
    return {
      serviceNumber: data & 0xFFC0 >>> 7,
      serviceAttribute: data & 0x3F,
    };
  }

  /**
   * Parse Felica Response Command
   * @param {number[]} data
   * @returns {IRCPolling | IRCRequestService | IRCRequestResponce | IRCReadWithoutEncryption |
   * IRCWriteWithoutEncryption | IRCSearchServiceCode | IRCRequestSystemCode}
   */
  public static parseResponse(data: number[]): IRCPolling | IRCRequestService | IRCRequestResponce |
    IRCReadWithoutEncryption | IRCWriteWithoutEncryption | IRCSearchServiceCode | IRCRequestSystemCode {
    switch (data[0]) {
      case FELICA_COMMAND.RC_POLLING:
        const polling: IRCPolling = {
          responseCode: data[0],
          idm: data.slice(1, 9),
          pmm: data.slice(9, 17),
          requestData: (data[17] << 8) | data[18],
        };
        return polling;
      case FELICA_COMMAND.RC_REQUEST_SERVICE:
        const requestService: IRCRequestService = {
          responseCode: data[0],
          idm: data.slice(1, 9),
          numberOfNode: data[10],
          nodeKeyVersionList: [],
        };
        for (let i = 0; i < requestService.numberOfNode; i++) {
          requestService.nodeKeyVersionList.push((data[12 + i * 2] << 8) | (data[11 + i * 2]));
        }
        return requestService;
      case FELICA_COMMAND.RC_REQUEST_RESPONCE:
        const requestResponce: IRCRequestResponce = {
          responseCode: data[0],
          idm: data.slice(1, 9),
          mode: data[10],
        };
        return requestResponce;
      case FELICA_COMMAND.RC_READ_WITHOUT_ENCRYPTION:
        const readWithoutEncryption: IRCReadWithoutEncryption = {
          responseCode: data[0],
          idm: data.slice(1, 9),
          statusFlag1: data[9],
          statusFlag2: data[10],
          numberOfBlock: 0,
          blockData: [],
        };
        if (readWithoutEncryption.statusFlag1 === 0x00) {
          readWithoutEncryption.numberOfBlock = data[11];
          for (let i = 0; i < readWithoutEncryption.numberOfBlock; i++) {
            readWithoutEncryption.blockData.push([]);
            for (let j = 0; j < 16; j++) {
              readWithoutEncryption.blockData[i].push(data[12 + 16 * i + j]);
            }
          }
        }
        return readWithoutEncryption;
      case FELICA_COMMAND.RC_WRITE_WITHOUT_ENCRYPTION:
        const writeWithoutEncryption: IRCWriteWithoutEncryption = {
          responseCode: data[0],
          idm: data.slice(1, 9),
          statusFlag1: data[9],
          statusFlag2: data[10],
        };
        return writeWithoutEncryption;
      case FELICA_COMMAND.RC_SEARCH_SERVICE_CODE:
        const searchServiceCode: IRCSearchServiceCode = {
          responseCode: data[0],
          idm: data.slice(1, 9),
        };
        const temp = (data[10] << 8) | data[9];
        if ((temp & 0x3E) === 0) {
          searchServiceCode.areaStart = temp;
          searchServiceCode.areaEnd = (data[12] << 8) | data[11];
        } else {
          searchServiceCode.serviceCode = temp;
        }
        return searchServiceCode;
      case FELICA_COMMAND.RC_REQUEST_SYSTEM_CODE:
        const requestSystemCode: IRCRequestSystemCode = {
          responseCode: data[0],
          idm: data.slice(1, 9),
          numberOfSystemCode: data[9],
          systemCodeList: [],
        };
        for (let i = 0; i < requestSystemCode.numberOfSystemCode; i++) {
          requestSystemCode.systemCodeList.push((data[11 + i * 2] << 8) | data[12 + i * 2]);
        }
        return requestSystemCode;
      default:
        throw new Error("unknown format data");
    }
  }

  /**
   * Convert string IDm to byte array
   * @param {number[] | string} idm
   * @returns {number[]}
   */
  private static argIdm2ByteIdm(idm: number[] | string): number[] {
    let byteIdm: number[] = [];
    if (Array.isArray(idm)) {
      byteIdm = idm;
    } else {
      byteIdm = Util.stringHex2Byte(idm);
    }
    return byteIdm;
  }

  /**
   * Make byte array of Block Element
   * @param {BlockElementAccessMode} accessMode
   * @param {number} serviceCodeIndex
   * @param {number} blockNum
   * @returns {number[]}
   */
  private static makeBlockElement(
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
}
