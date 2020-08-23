"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDate = void 0;
exports.toDate = function (date) {
    var dateSplit = date.split('-');
    return new Date(parseInt(dateSplit[2]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[0]));
};
