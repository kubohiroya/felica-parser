import { BlockElementAccessMode, FELICA_COMMAND, IRCPolling, IRCReadWithoutEncryption, IRCRequestResponce, IRCRequestService, IRCRequestSystemCode, IRCSearchServiceCode, IRCWriteWithoutEncryption, IServiceCode } from "./felica-cmd";
export { BlockElementAccessMode, FELICA_COMMAND, IRCPolling, IRCReadWithoutEncryption, IRCRequestResponce, IRCRequestService, IRCRequestSystemCode, IRCSearchServiceCode, IRCWriteWithoutEncryption, IServiceCode };
import Util from "./util";
export { Util };
export default class FelicaPaser {
    /**
     * Felica Polling Command
     * @param {number} systemCode
     * @param {number} requestCode
     * @param {number} timeSlot
     * @returns {number[]}
     */
    static polling(systemCode: number, requestCode: number, timeSlot: number): number[];
    /**
     * Felica RequestService Command
     * @param {number[] | string} idm
     * @param {number[]} nodes
     * @returns {number[]}
     */
    static requestService(idm: number[] | string, nodes: number[]): number[];
    /**
     * Felica RequestResponse Command
     * @param {number[] | string} idm
     * @returns {number[]}
     */
    static requestResponse(idm: number[] | string): number[];
    /**
     * Felica ReadWithoutEncryption Command
     * @param {number[] | string} idm
     * @param {number[]} services
     * @param {number[]} serviceCodeListOrderList
     * @param {number[]} blockNumberList
     * @returns {number[]}
     */
    static readWithoutEncryption(idm: number[] | string, services: number[], serviceCodeListOrderList: number[], blockNumberList: number[]): number[];
    /**
     * Felica WriteWithoutEncryption Command
     * @param {number[]} idm
     * @param {number[]} services
     * @param {number[]} serviceCodeListOrderList
     * @param {number[]} blockNumberList
     * @param {number[][]} blockData
     * @returns {number[]}
     */
    static writeWithoutEncryption(idm: number[], services: number[], serviceCodeListOrderList: number[], blockNumberList: number[], blockData: number[][]): number[];
    /**
     * Felica SearchServiceCode Command
     * @param {number[] | string} idm
     * @param {number} idx
     * @returns {number[]}
     */
    static searchServiceCode(idm: number[] | string, idx: number): number[];
    /**
     * Felica RequestSystemCode Command
     * @param {number[] | string} idm
     * @returns {number[]}
     */
    static requestSystemCode(idm: number[] | string): number[];
    /**
     * Parse ServiceCode
     * @param {number} data
     * @returns {IServiceCode}
     */
    static parseServiceCode(data: number): IServiceCode;
    /**
     * Parse Felica Response Command
     * @param {number[]} data
     * @returns {IRCPolling | IRCRequestService | IRCRequestResponce | IRCReadWithoutEncryption |
     * IRCWriteWithoutEncryption | IRCSearchServiceCode | IRCRequestSystemCode}
     */
    static parseResponse(data: number[]): IRCPolling | IRCRequestService | IRCRequestResponce | IRCReadWithoutEncryption | IRCWriteWithoutEncryption | IRCSearchServiceCode | IRCRequestSystemCode;
    /**
     * Convert string IDm to byte array
     * @param {number[] | string} idm
     * @returns {number[]}
     */
    private static argIdm2ByteIdm(idm);
    /**
     * Make byte array of Block Element
     * @param {BlockElementAccessMode} accessMode
     * @param {number} serviceCodeIndex
     * @param {number} blockNum
     * @returns {number[]}
     */
    private static makeBlockElement(accessMode, serviceCodeIndex, blockNum);
}
