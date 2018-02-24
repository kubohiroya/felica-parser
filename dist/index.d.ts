import { BlockElementAccessMode, IServiceCode } from "./felica-cmd";
export default class FelicaPaser {
    static polling(systemCode: number, requestCode: number, timeSlot: number): number[];
    static requestService(idm: number[] | string, nodes: number[]): number[];
    static requestResponse(idm: number[] | string): number[];
    static makeBlockElement(accessMode: BlockElementAccessMode, serviceCodeIndex: number, blockNum: number): number[];
    static readWithoutEncryption(idm: number[] | string, services: number[], serviceCodeListOrderList: number[], blockNumberList: number[]): number[];
    static writeWithoutEncryption(idm: number[], services: number[], serviceCodeListOrderList: number[], blockNumberList: number[], blockData: number[][]): number[];
    static searchService(idm: number[] | string, idx: number): number[];
    static requestSystemCode(idm: number[] | string): number[];
    static parseServiceCode(data: number): IServiceCode;
    static parseRequest(data: number[]): void;
    static parseResponse(data: number[]): void;
    private static argIdm2ByteIdm(idm);
}
