"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var Mailer = /** @class */ (function () {
    function Mailer() {
        var host = process.env.MAILGUN_SMTP_SERVER;
        var port = process.env.MAILGUN_SMTP_PORT;
        var user = process.env.MAILGUN_SMTP_LOGIN;
        var password = process.env.MAILGUN_SMTP_PASSWORD;
        this.transporter = nodemailer_1.default.createTransport({
            host: host,
            port: port,
            secure: false,
            auth: {
                user: user,
                password: password
            }
        });
    }
    return Mailer;
}());
exports.default = Mailer;
