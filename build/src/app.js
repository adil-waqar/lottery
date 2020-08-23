"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_schedule_1 = __importDefault(require("node-schedule"));
var date = new Date(2020, 7, 22, 23, 32);
node_schedule_1.default.scheduleJob(date, function () {
    console.log('Executed!');
});
