import log from './logger';
import Lottery from './core/Lottery';
import config from './config';

try {
  const configs: config = require('../lottery.json');
  const lottery: Lottery = new Lottery(configs);
  lottery.run();
} catch (e) {
  log.error('There was an error resolving lottery.json.', e);
  process.exit(1);
}
