import log from './logger';
import Lottery from './core/Lottery';
import config from './interfaces/IConfig';
import env from 'dotenv';
import Mailer from './services/Mailer';

try {
  env.config();
  //TODO: Make the user conform to a certain standard for lottery.json
  const configs: config = require('../lottery.json');
  const lottery: Lottery = new Lottery(configs, new Mailer());
  lottery.run();
} catch (e) {
  log.error('There was an error running lottery.', e);
  process.exit(1);
}
