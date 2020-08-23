"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var logform_1 = require("logform");
var logger = winston_1.default.createLogger({
    level: 'debug',
    format: logform_1.format.combine(logform_1.format.colorize(), logform_1.format.timestamp(), logform_1.format.printf(function (info) { return info.timestamp + " [" + info.level + "]: " + info.message; })),
    transports: [new winston_1.default.transports.Console()],
});
exports.default = logger;
