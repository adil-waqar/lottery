import log from '../logger';
import config from '../interfaces/IConfig';
import { toDate } from '../utils/ToDate';
import Axios from 'axios';
import cheerio from 'cheerio';
import IMailer from '../interfaces/IMailer';

enum LotteryState {
  UP = 'UP',
  DOWN = 'DOWN'
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

    try {
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
    } catch (e) {
      log.error(`Exception occured in run() of Lottery: `, e);
    }

    log.info(`The state of lottery is: ${this.getState()}`);
  }

  async checkForLottery(bond: string): Promise<void> {
    log.info(`Checking for lottery against bond: ${bond}`);
    try {
      const bonds: string = this.bonds[bond].join('%2C');
      const url: string = `http://sammars.biz/search.asp?xp=psearch&BondType=${bond}&From=&To=&List=${bonds}`;
      const { data } = await Axios.get(url);

      const $ = cheerio.load(data);
      const textContent = $.root().text();

      if (textContent.indexOf('Congratulations') >= 0) {
        log.info(
          `Congratulations! You've won a prize against the bond ${bond}. For more details, go to sammars.biz.`
        );
        await this.mail.sendEmail(
          process.env.EMAIL_TO as string,
          `<h4>Hello there!</h4><p>Congratulations on the prize bond. For more details, click <a href=${url}>here!</a></p>`
        );
      } else if (textContent.indexOf('Sorry') >= 0) {
        log.info(
          `I'm sorry. I checked for lottery against the bond ${bond} and founded no prize. Better luck next time!`
        );
        await this.mail.sendEmail(
          process.env.EMAIL_TO as string,
          `<h4>Hello there!</h4><p>I checked for a prize against the bond of Rs.${bond} on ${new Date()} and founded no prize. Better luck next time.</p>`
        );
      } else {
        log.error(
          'I think the HTML of sammars.biz changed, go check it out and update the code!'
        );
        await this.mail.sendEmail(
          'adil.waqar78@hotmail.com',
          `<h4>Hello there, lottery here!</h4><p>I think the HTML of sammars.biz changed, go check it out and update the code!</p>`
        );
      }
    } catch (e) {
      log.error(`Some error occured while requesting for bond results: `, e);
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
