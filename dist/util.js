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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFBQTtJQWlCQSxDQUFDO0lBaEJlLG1CQUFjLEdBQTVCLFVBQTZCLEdBQVc7UUFDdEMsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFDYSxvQkFBZSxHQUE3QixVQUE4QixTQUFtQjtRQUMvQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxHQUFHLENBQUMsQ0FBZ0IsVUFBUyxFQUFULHVCQUFTLEVBQVQsdUJBQVMsRUFBVCxJQUFTO1lBQXhCLElBQU0sS0FBSyxrQkFBQTtZQUNkLGdDQUFnQztZQUNoQyxJQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDeEMsSUFBSSxJQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUN2QztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUNILFdBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDO0FBRUQsa0JBQWUsSUFBSSxDQUFDIn0=