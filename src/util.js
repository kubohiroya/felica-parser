"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.stringHex2Byte = function (str) {
        var data = [];
        for (var i = 0; i < str.length; i += 2) {
            data.push(parseInt(str.substr(i, 2), 16));
        }
        return data;
    };
    Util.byteToHexString = function (byteArray) {
        var data = "";
        for (var _i = 0, byteArray_1 = byteArray; _i < byteArray_1.length; _i++) {
            var value = byteArray_1[_i];
            /* tslint:disable: no-bitwise */
            var hex = (value & 0xff).toString(16);
            data += ("00" + hex).slice(-2) + " ";
        }
        return data.toUpperCase();
    };
    return Util;
}());
exports.default = Util;
