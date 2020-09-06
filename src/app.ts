import log from './logger';
import Lottery from './core/Lottery';
import config from './config';
import env from 'dotenv';
import Mailer from './services/Mailer';

try {
  env.config();
  const configs: config = require('../lottery.json');
  const lottery: Lottery = new Lottery(configs, new Mailer());
  lottery.run();
} catch (e) {
  log.error('There was an error running lottery.', e);
  process.exit(1);
}
