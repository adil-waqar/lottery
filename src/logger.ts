import winston from 'winston';
import { format } from 'logform';

const logger = winston.createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(
      (info) => `${info.timestamp} [${info.level}]: ${info.message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
