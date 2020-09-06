import Axios from 'axios';
import formData from 'form-data';
import log from '../logger';
import IMailer from '../interfaces/IMailer';

class Mailer implements IMailer {
  private emailURL: string;
  constructor() {
    this.emailURL = `https://api:${process.env.MAILGUN_API_KEY}@api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`;
  }

  public async sendEmail(to: string, body: string): Promise<void> {
    log.info(`Sending email.`);

    const data = new formData();
    data.append('from', 'BondChecker <adil.waqar@lottery.com>');
    data.append('to', to);
    data.append('subject', 'Bond Alert');
    data.append('text', body);

    const formHeaders = data.getHeaders();
    try {
      const response = await Axios.post(this.emailURL, data, {
        headers: { ...formHeaders },
      });
      log.info(
        `Sent an email as alert. Response payload: ${JSON.stringify(
          response,
          null,
          4
        )}`
      );
    } catch (e) {
      log.error(
        `Something went wrong while sending email. ${JSON.stringify(e)}`
      );
    }
  }
}

export default Mailer;
