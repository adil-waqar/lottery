import log from '../logger';
import config from '../config';
import { toDate } from '../utils/ToDate';
import Axios from 'axios';
import cheerio from 'cheerio';
import IMailer from '../interfaces/IMailer';

enum LotteryState {
  UP = 'UP',
  DOWN = 'DOWN',
}

class Lottery {
  private draws: { [key: string]: [string] };
  private bonds: { [key: string]: [string] };
  private state: LotteryState;
  private mail: IMailer;

  constructor(configs: config, mail: IMailer) {
    this.draws = configs.draws;
    this.bonds = configs.bonds;
    this.state = LotteryState.UP;
    this.mail = mail;
  }

  async run(): Promise<void> {
    log.info(`The state of lottery is: ${this.getState()}`);

    for (let bond in this.bonds) {
      const currentDate: Date = new Date();
      currentDate.setHours(0, 0, 0, 0);
      for (let draw of this.draws[bond]) {
        if (toDate(draw).getTime() === currentDate.getTime()) {
          await this.checkForLottery(bond);
        }
      }
    }

    this.setState(LotteryState.DOWN);
    log.info(`The state of lottery is: ${this.getState()}`);
  }

  async checkForLottery(bond: string): Promise<void> {
    log.info(`Checking for lottery against bond: ${bond}`);
    const bonds = this.bonds[bond].join('%2C');

    try {
      const { data } = await Axios.get(
        `http://sammars.biz/search.asp?xp=psearch&BondType=${bond}&From=&To=&List=${bonds}`
      );

      const $ = cheerio.load(data);
      const textContent = $.root().text();

      if (textContent.indexOf('Congratulations') >= 0) {
        log.info(
          `Congratulations! You've won a prize against the bond ${bond}. For more details, go to sammars.biz.`
        );

        await this.mail.sendEmail(process.env.EMAIL_TO as string, '');
      } else if (textContent.indexOf('Sorry') >= 0)
        log.info(
          `I'm sorry. I checked for lottery against the bond ${bond} and founded no prize. Better luck next time!`
        );
      else {
        log.error(
          'I think the HTML of sammars.biz changed, go check it out and update the code!'
        );
      }
    } catch (e) {
      log.error(`Some error occured while requesting for bond results: ${e}`);
    }
  }

  setState(state: LotteryState) {
    this.state = state;
  }

  getState(): string {
    return this.state;
  }
}

export default Lottery;
