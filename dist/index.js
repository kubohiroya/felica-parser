"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable: no-bitwise */
var felica_cmd_1 = require("./felica-cmd");
exports.BlockElementAccessMode = felica_cmd_1.BlockElementAccessMode;
exports.FELICA_COMMAND = felica_cmd_1.FELICA_COMMAND;
var util_1 = __importDefault(require("./util"));
exports.Util = util_1.default;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnQ0FBZ0M7QUFDaEMsMkNBTXNCO0FBRXBCLGlDQVBBLG1DQUFzQixDQU9BO0FBQ3RCLHlCQVBBLDJCQUFjLENBT0E7QUFLaEIsZ0RBQTBCO0FBQ2pCLGVBREYsY0FBSSxDQUNFO0FBQ2I7SUFBQTtJQTRTQSxDQUFDO0lBM1NDOzs7Ozs7T0FNRztJQUNXLG1CQUFPLEdBQXJCLFVBQXNCLFVBQWtCLEVBQUUsV0FBbUIsRUFBRSxRQUFnQjtRQUM3RSxNQUFNLENBQUM7WUFDTCwyQkFBYyxDQUFDLFVBQVU7WUFDekIsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSTtZQUN6QixVQUFVLEdBQUcsSUFBSTtZQUNqQixXQUFXO1lBQ1gsUUFBUTtTQUNULENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVywwQkFBYyxHQUE1QixVQUE2QixHQUFzQixFQUFFLEtBQWU7UUFDbEUsSUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxJQUFNLElBQUk7WUFDUiwyQkFBYyxDQUFDLGtCQUFrQjtpQkFDOUIsT0FBTyxDQUNYLENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixHQUFHLENBQUMsQ0FBZSxVQUFLLEVBQUwsZUFBSyxFQUFMLG1CQUFLLEVBQUwsSUFBSztZQUFuQixJQUFNLElBQUksY0FBQTtZQUNi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