interface IMailer {
  sendEmail(to: string, body: string): Promise<void>;
}
