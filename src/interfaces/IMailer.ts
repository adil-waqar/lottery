interface IMailer {
  sendEmail(to: string, body: string): Promise<void>;
}

export default IMailer;
