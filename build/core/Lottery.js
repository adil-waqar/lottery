"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../logger"));
var ToDate_1 = require("../utils/ToDate");
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = __importDefault(require("cheerio"));
var LotteryState;
(function (LotteryState) {
    LotteryState["UP"] = "UP";
    LotteryState["DOWN"] = "DOWN";
})(LotteryState || (LotteryState = {}));
var Lottery = /** @class */ (function () {
    function Lottery(configs) {
        this.draws = configs.draws;
        this.bonds = configs.bonds;
        this.state = LotteryState.UP;
    }
    Lottery.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, bond, currentDate, _c, _d, draw;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        logger_1.default.info("The state of lottery is: " + this.getState());
                        _a = [];
                        for (_b in this.bonds)
                            _a.push(_b);
                        _i = 0;
                        _e.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        bond = _a[_i];
                        currentDate = new Date();
                        currentDate.setHours(0, 0, 0, 0);
                        _c = 0, _d = this.draws[bond];
                        _e.label = 2;
                    case 2:
                        if (!(_c < _d.length)) return [3 /*break*/, 5];
                        draw = _d[_c];
                        if (!(ToDate_1.toDate(draw).getTime() === currentDate.getTime())) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.checkForLottery(bond)];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4:
                        _c++;
                        return [3 /*break*/, 2];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        this.setState(LotteryState.DOWN);
                        logger_1.default.info("The state of lottery is: " + this.getState());
                        return [2 /*return*/];
                }
            });
        });
    };
    Lottery.prototype.checkForLottery = function (bond) {
        return __awaiter(this, void 0, void 0, function () {
            var bonds, data, $, textContent, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.default.info("Checking for lottery against bond: " + bond);
                        bonds = this.bonds[bond].join('%2C');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get("http://sammars.biz/search.asp?xp=psearch&BondType=" + bond + "&From=&To=&List=" + bonds)];
                    case 2:
                        data = (_a.sent()).data;
                        $ = cheerio_1.default.load(data);
                        textContent = $.root().text();
                        if (textContent.indexOf('Congratulations') >= 0)
                            logger_1.default.info("Congratulations! You've won a prize against the bond " + bond + ". For more details, go to sammars.biz.");
                        else if (textContent.indexOf('Sorry') >= 0)
                            logger_1.default.info("I'm sorry. I checked for lottery against the bond " + bond + " and founded no prize. Better luck next time!");
                        else {
                            logger_1.default.error('I think the HTML of sammars.biz changed, go check it out and update the code!');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        logger_1.default.error("Some error occured while requesting for bond results: " + e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Lottery.prototype.setState = function (state) {
        this.state = state;
    };
    Lottery.prototype.getState = function () {
        return this.state;
    };
    return Lottery;
}());
exports.default = Lottery;
