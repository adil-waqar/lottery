"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("./logger"));
var Lottery_1 = __importDefault(require("./core/Lottery"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
try {
    var configs = require('../lottery.json');
    var lottery = new Lottery_1.default(configs);
    lottery.run();
}
catch (e) {
    logger_1.default.error('There was an error resolving lottery.json.', e);
    process.exit(1);
}
