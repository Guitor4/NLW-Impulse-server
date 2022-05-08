import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5f1b297e1ea61e",
      pass: "f1ce1798b85f17"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {


    
    async sendMail({subject,body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Guilherme Torquato <guilhermetor10@gmail.com>',
            subject: subject,
            html: body,
        });
    };
}