declare class Mailer {
    private emailURL;
    sendEmail(url: string): Promise<void>;
}
export default Mailer;
