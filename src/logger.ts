import winston from 'winston';
import { format } from 'logform';
import moment from 'moment-timezone';

const logger = winston.createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((info) => {
      info.timestamp = moment()
        .tz(process.env.TZ as string)
        .format();
      return `${info.timestamp} [${info.level}]: ${info.message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
