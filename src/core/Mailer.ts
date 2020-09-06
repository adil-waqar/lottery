import Axios from 'axios';
import formData from 'form-data';
import log from '../logger';
import { info } from 'winston';

class Mailer {
  private emailURL: string = `https://api:${process.env.MAILGUN_API_KEY}@api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`;

  public async sendEmail(url: string): Promise<void> {
    log.info(`Inside send email: ${process.env.MAILGUN_DOMAIN}`);

    const data = new formData();
    data.append('from', 'BondChecker <adil.waqar@lottery.com>');
    data.append('to', 'adil.waqar78@hotmail.com');
    data.append('subject', 'Bond Alert');
    data.append('text', 'asd');

    const formHeaders = data.getHeaders();

    try {
      const _ = await Axios.post(this.emailURL, data, {
        headers: { ...formHeaders }
      });
      log.info('Sent an email as alert.');
    } catch (e) {
      log.debug(`Logging email URL: ${this.emailURL}`);
      log.error(
        `Something went wrong while sending email. ${JSON.stringify(e)}`
      );
    }
  }
}

export default Mailer;
