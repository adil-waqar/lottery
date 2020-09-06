import log from './logger';
import Lottery from './core/Lottery';
import config from './config';
import env from 'dotenv';

try {
  env.config();
  log.info(`Email Envs: ${process.env.MAILGUN_DOMAIN}`);
  const configs: config = require('../lottery.json');
  const lottery: Lottery = new Lottery(configs);
  lottery.run();
} catch (e) {
  log.error('There was an error resolving lottery.json.', e);
  process.exit(1);
}
