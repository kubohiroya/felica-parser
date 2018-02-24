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
