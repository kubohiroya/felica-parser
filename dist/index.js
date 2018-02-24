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
    FelicaPaser.polling = function (systemCode, requestCode, timeSlot) {
        return [
            felica_cmd_1.FELICA_COMMAND.CC_POLLING,
            (systemCode >>> 8) & 0xFF,
            systemCode & 0xFF,
            requestCode,
            timeSlot,
        ];
    };
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
    FelicaPaser.requestResponse = function (idm) {
        var byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
        return [
            felica_cmd_1.FELICA_COMMAND.CC_REQUEST_RESPONCE
        ].concat(byteIdm);
    };
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
    FelicaPaser.searchService = function (idm, idx) {
        var byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
        return [
            felica_cmd_1.FELICA_COMMAND.CC_SEARCH_SERVICE_CODE
        ].concat(byteIdm, [
            idx & 0xFF,
            (idx >>> 8) & 0xFF,
        ]);
    };
    FelicaPaser.requestSystemCode = function (idm) {
        var byteIdm = FelicaPaser.argIdm2ByteIdm(idm);
        return [
            felica_cmd_1.FELICA_COMMAND.CC_REQUEST_SYSTEM_CODE
        ].concat(byteIdm);
    };
    FelicaPaser.parseServiceCode = function (data) {
        return {
            serviceNumber: data & 0xFFC0 >>> 7,
            serviceAttribute: data & 0x3F,
        };
    };
    FelicaPaser.parseRequest = function (data) {
        var cmdCode = data[0];
        switch (cmdCode) {
            case felica_cmd_1.FELICA_COMMAND.CC_POLLING:
                break;
            case felica_cmd_1.FELICA_COMMAND.CC_REQUEST_SERVICE:
                break;
            case felica_cmd_1.FELICA_COMMAND.CC_REQUEST_RESPONCE:
                break;
            case felica_cmd_1.FELICA_COMMAND.CC_READ_WITHOUT_ENCRYPTION:
                break;
            case felica_cmd_1.FELICA_COMMAND.CC_WRITE_WITHOUT_ENCRYPTION:
                break;
            case felica_cmd_1.FELICA_COMMAND.CC_SEARCH_SERVICE_CODE:
                break;
            case felica_cmd_1.FELICA_COMMAND.CC_REQUEST_SYSTEM_CODE:
                break;
            case felica_cmd_1.FELICA_COMMAND.CC_AUTHENTICATION1:
                break;
            case felica_cmd_1.FELICA_COMMAND.CC_AUTHENTICATION2:
                break;
            default:
                break;
        }
    };
    FelicaPaser.parseResponse = function (data) {
        var cmdCode = data[0];
        switch (cmdCode) {
            case felica_cmd_1.FELICA_COMMAND.RC_POLLING:
                break;
            case felica_cmd_1.FELICA_COMMAND.RC_REQUEST_SERVICE:
                break;
            case felica_cmd_1.FELICA_COMMAND.RC_REQUEST_RESPONCE:
                break;
            case felica_cmd_1.FELICA_COMMAND.RC_READ_WITHOUT_ENCRYPTION:
                break;
            case felica_cmd_1.FELICA_COMMAND.RC_WRITE_WITHOUT_ENCRYPTION:
                break;
            case felica_cmd_1.FELICA_COMMAND.RC_SEARCH_SERVICE_CODE:
                break;
            case felica_cmd_1.FELICA_COMMAND.RC_REQUEST_SYSTEM_CODE:
                break;
            case felica_cmd_1.FELICA_COMMAND.RC_AUTHENTICATION1:
                break;
            case felica_cmd_1.FELICA_COMMAND.RC_AUTHENTICATION2:
                break;
            case felica_cmd_1.FELICA_COMMAND.RC_READ:
                break;
            default:
                break;
        }
    };
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
    return FelicaPaser;
}());
exports.default = FelicaPaser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnQ0FBZ0M7QUFDaEMsMkNBQW1GO0FBQ25GLGdEQUEwQjtBQUUxQjtJQUFBO0lBcU1BLENBQUM7SUFwTWUsbUJBQU8sR0FBckIsVUFBc0IsVUFBa0IsRUFBRSxXQUFtQixFQUFFLFFBQWdCO1FBQzdFLE1BQU0sQ0FBQztZQUNMLDJCQUFjLENBQUMsVUFBVTtZQUN6QixDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJO1lBQ3pCLFVBQVUsR0FBRyxJQUFJO1lBQ2pCLFdBQVc7WUFDWCxRQUFRO1NBQ1QsQ0FBQztJQUNKLENBQUM7SUFFYSwwQkFBYyxHQUE1QixVQUE2QixHQUFzQixFQUFFLEtBQWU7UUFDbEUsSUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxJQUFNLElBQUk7WUFDUiwyQkFBYyxDQUFDLGtCQUFrQjtpQkFDOUIsT0FBTyxDQUNYLENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixHQUFHLENBQUMsQ0FBZSxVQUFLLEVBQUwsZUFBSyxFQUFMLG1CQUFLLEVBQUwsSUFBSztZQUFuQixJQUFNLElBQUksY0FBQTtZQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFD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