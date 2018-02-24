"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable: no-bitwise */
var felica_cmd_1 = require("./felica-cmd");
var util_1 = __importDefault(require("./util"));
var FelicaPaser = /** @class */ (function () {
    function FelicaPaser() {
    }
    /**
     * Felica Polling Command
     * @param {number} systemCode
     * @param {number} requestCode
     * @param {number} timeSlot
     * @returns {number[]}
     */
    FelicaPaser.polling = function (systemCode, requestCode, timeSlot) {
        return [
            felica_cmd_1.FELICA_COMMAND.CC_POLLING,
            (systemCode >>> 8) & 0xFF,
            systemCode & 0xFF,
            requestCode,
            timeSlot,
        ];
    };
    /**
     * Felica RequestService Command
     * @param {number[] | string} idm
     * @param {number[]} nodes
     * @returns {number[]}
     */
    FelicaPaser.requestService = function (idm, nodes) {
        var byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
        var data = [
            felica_cmd_1.FELICA_COMMAND.CC_REQUEST_SERVICE
        ].concat(byteIdm);
        if (!(1 <= nodes.length && nodes.length <= 32)) {
            throw new Error("The length of nodes is not 1 or more and 32 or less");
        }
        data.push(nodes.length);
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            data.push(node & 0xFF);
            data.push((node >>> 8) & 0xFF);
        }
        return data;
    };
    /**
     * Felica RequestResponse Command
     * @param {number[] | string} idm
     * @returns {number[]}
     */
    FelicaPaser.requestResponse = function (idm) {
        var byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
        return [
            felica_cmd_1.FELICA_COMMAND.CC_REQUEST_RESPONCE
        ].concat(byteIdm);
    };
    /**
     * Felica ReadWithoutEncryption Command
     * @param {number[] | string} idm
     * @param {number[]} services
     * @param {number[]} serviceCodeListOrderList
     * @param {number[]} blockNumberList
     * @returns {number[]}
     */
    FelicaPaser.readWithoutEncryption = function (idm, services, serviceCodeListOrderList, blockNumberList) {
        var byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
        var data = [
            felica_cmd_1.FELICA_COMMAND.CC_READ_WITHOUT_ENCRYPTION
        ].concat(byteIdm);
        data.push(services.length);
        for (var _i = 0, services_1 = services; _i < services_1.length; _i++) {
            var service = services_1[_i];
            data.push(service & 0xFF);
            data.push((service >>> 8) & 0xFF);
        }
        if (serviceCodeListOrderList.length !== blockNumberList.length) {
            throw new Error("The number of serviceCodeListOrderList does not match the number of blockNumberList");
        }
        data.push(serviceCodeListOrderList.length);
        for (var i = 0; i < blockNumberList.length; i++) {
            var blockElement = FelicaPaser.makeBlockElement(felica_cmd_1.BlockElementAccessMode.NOT_CASHBACK_ACCESS_TO_PURSE_SERVICE, serviceCodeListOrderList[i], blockNumberList[i]);
            data.push.apply(data, blockElement);
        }
        return data;
    };
    /**
     * Felica WriteWithoutEncryption Command
     * @param {number[]} idm
     * @param {number[]} services
     * @param {number[]} serviceCodeListOrderList
     * @param {number[]} blockNumberList
     * @param {number[][]} blockData
     * @returns {number[]}
     */
    FelicaPaser.writeWithoutEncryption = function (idm, services, serviceCodeListOrderList, blockNumberList, blockData) {
        var byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
        var data = [
            felica_cmd_1.FELICA_COMMAND.CC_READ_WITHOUT_ENCRYPTION
        ].concat(byteIdm);
        data.push(services.length);
        for (var _i = 0, services_2 = services; _i < services_2.length; _i++) {
            var service = services_2[_i];
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
        for (var i = 0; i < blockNumberList.length; i++) {
            var blockElement = FelicaPaser.makeBlockElement(felica_cmd_1.BlockElementAccessMode.NOT_CASHBACK_ACCESS_TO_PURSE_SERVICE, serviceCodeListOrderList[i], blockNumberList[i]);
            for (var _a = 0, blockElement_1 = blockElement; _a < blockElement_1.length; _a++) {
                var blockValue = blockElement_1[_a];
                data.push(blockValue);
            }
        }
        for (var _b = 0, blockData_1 = blockData; _b < blockData_1.length; _b++) {
            var oneLineData = blockData_1[_b];
            data.push.apply(data, oneLineData);
        }
        return data;
    };
    /**
     * Felica SearchServiceCode Command
     * @param {number[] | string} idm
     * @param {number} idx
     * @returns {number[]}
     */
    FelicaPaser.searchServiceCode = function (idm, idx) {
        var byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
        return [
            felica_cmd_1.FELICA_COMMAND.CC_SEARCH_SERVICE_CODE
        ].concat(byteIdm, [
            idx & 0xFF,
            (idx >>> 8) & 0xFF,
        ]);
    };
    /**
     * Felica RequestSystemCode Command
     * @param {number[] | string} idm
     * @returns {number[]}
     */
    FelicaPaser.requestSystemCode = function (idm) {
        var byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
        return [
            felica_cmd_1.FELICA_COMMAND.CC_REQUEST_SYSTEM_CODE
        ].concat(byteIdm);
    };
    /**
     * Parse ServiceCode
     * @param {number} data
     * @returns {IServiceCode}
     */
    FelicaPaser.parseServiceCode = function (data) {
        return {
            serviceNumber: data & 0xFFC0 >>> 7,
            serviceAttribute: data & 0x3F,
        };
    };
    /**
     * Parse Felica Response Command
     * @param {number[]} data
     * @returns {IRCPolling | IRCRequestService | IRCRequestResponce | IRCReadWithoutEncryption |
     * IRCWriteWithoutEncryption | IRCSearchServiceCode | IRCRequestSystemCode}
     */
    FelicaPaser.parseResponse = function (data) {
        switch (data[0]) {
            case felica_cmd_1.FELICA_COMMAND.RC_POLLING:
                var polling = {
                    responseCode: data[0],
                    idm: data.slice(1, 9),
                    pmm: data.slice(9, 17),
                    requestData: (data[17] << 8) | data[18],
                };
                return polling;
            case felica_cmd_1.FELICA_COMMAND.RC_REQUEST_SERVICE:
                var requestService = {
                    responseCode: data[0],
                    idm: data.slice(1, 9),
                    numberOfNode: data[10],
                    nodeKeyVersionList: [],
                };
                for (var i = 0; i < requestService.numberOfNode; i++) {
                    requestService.nodeKeyVersionList.push((data[12 + i * 2] << 8) | (data[11 + i * 2]));
                }
                return requestService;
            case felica_cmd_1.FELICA_COMMAND.RC_REQUEST_RESPONCE:
                var requestResponce = {
                    responseCode: data[0],
                    idm: data.slice(1, 9),
                    mode: data[10],
                };
                return requestResponce;
            case felica_cmd_1.FELICA_COMMAND.RC_READ_WITHOUT_ENCRYPTION:
                var readWithoutEncryption = {
                    responseCode: data[0],
                    idm: data.slice(1, 9),
                    statusFlag1: data[9],
                    statusFlag2: data[10],
                    numberOfBlock: 0,
                    blockData: [],
                };
                if (readWithoutEncryption.statusFlag1 === 0x00) {
                    readWithoutEncryption.numberOfBlock = data[11];
                    for (var i = 0; i < readWithoutEncryption.numberOfBlock; i++) {
                        readWithoutEncryption.blockData.push([]);
                        for (var j = 0; j < 16; j++) {
                            readWithoutEncryption.blockData[i].push(data[12 + 16 * i + j]);
                        }
                    }
                }
                return readWithoutEncryption;
            case felica_cmd_1.FELICA_COMMAND.RC_WRITE_WITHOUT_ENCRYPTION:
                var writeWithoutEncryption = {
                    responseCode: data[0],
                    idm: data.slice(1, 9),
                    statusFlag1: data[9],
                    statusFlag2: data[10],
                };
                return writeWithoutEncryption;
            case felica_cmd_1.FELICA_COMMAND.RC_SEARCH_SERVICE_CODE:
                var searchServiceCode = {
                    responseCode: data[0],
                    idm: data.slice(1, 9),
                };
                var temp = (data[10] << 8) | data[9];
                if ((temp & 0x3E) === 0) {
                    searchServiceCode.areaStart = temp;
                    searchServiceCode.areaEnd = (data[12] << 8) | data[11];
                }
                else {
                    searchServiceCode.serviceCode = temp;
                }
                return searchServiceCode;
            case felica_cmd_1.FELICA_COMMAND.RC_REQUEST_SYSTEM_CODE:
                var requestSystemCode = {
                    responseCode: data[0],
                    idm: data.slice(1, 9),
                    numberOfSystemCode: data[9],
                    systemCodeList: [],
                };
                for (var i = 0; i < requestSystemCode.numberOfSystemCode; i++) {
                    requestSystemCode.systemCodeList.push((data[11 + i * 2] << 8) | data[12 + i * 2]);
                }
                return requestSystemCode;
            default:
                throw new Error("unknown format data");
        }
    };
    /**
     * Convert string IDm to byte array
     * @param {number[] | string} idm
     * @returns {number[]}
     */
    FelicaPaser.argIdm2ByteIdm = function (idm) {
        var byteIdm = [];
        if (Array.isArray(idm)) {
            byteIdm = idm;
        }
        else {
            byteIdm = util_1.default.stringHex2Byte(idm);
        }
        return byteIdm;
    };
    /**
     * Make byte array of Block Element
     * @param {BlockElementAccessMode} accessMode
     * @param {number} serviceCodeIndex
     * @param {number} blockNum
     * @returns {number[]}
     */
    FelicaPaser.makeBlockElement = function (accessMode, serviceCodeIndex, blockNum) {
        var data = [];
        if (255 < blockNum) {
            data.push(128 | (accessMode << 4) | serviceCodeIndex);
            data.push(blockNum);
        }
        else {
            data.push(0 | (accessMode << 4) | serviceCodeIndex);
            data.push(blockNum & 0xFF);
            data.push((blockNum >>> 8) & 0xFF);
        }
        return data;
    };
    return FelicaPaser;
}());
exports.default = FelicaPaser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnQ0FBZ0M7QUFDaEMsMkNBTXNCO0FBQ3RCLGdEQUEwQjtBQUUxQjtJQUFBO0lBNFNBLENBQUM7SUEzU0M7Ozs7OztPQU1HO0lBQ1csbUJBQU8sR0FBckIsVUFBc0IsVUFBa0IsRUFBRSxXQUFtQixFQUFFLFFBQWdCO1FBQzdFLE1BQU0sQ0FBQztZQUNMLDJCQUFjLENBQUMsVUFBVTtZQUN6QixDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJO1lBQ3pCLFVBQVUsR0FBRyxJQUFJO1lBQ2pCLFdBQVc7WUFDWCxRQUFRO1NBQ1QsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLDBCQUFjLEdBQTVCLFVBQTZCLEdBQXNCLEVBQUUsS0FBZTtRQUNsRSxJQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELElBQU0sSUFBSTtZQUNSLDJCQUFjLENBQUMsa0JBQWtCO2lCQUM5QixPQUFPLENBQ1gsQ0FBQztRQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLElBQUksS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7UUFDekUsQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxDQUFlLFVBQUssRUFBTCxlQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLO1lBQW5CLElBQU0sSUFBSSxjQUFBO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLElBQUks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