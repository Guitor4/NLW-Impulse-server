
import express from 'express';
import nodemailer from 'nodemailer';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { prisma } from './prisma';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
export const routes = express.Router()

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5f1b297e1ea61e",
      pass: "f1ce1798b85f17"
    }
  });

routes.post('/feedbacks' , async (request, response) => {

    const {type, comment, screenshot} = request.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()

    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository, 
        nodemailerMailAdapter,
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    // await transport.sendMail({
    //     from: 'Equipe Feedget <oi@feedget.com>',
    //     to: 'Guilherme Torquato <guilhermetor10@gmail.com>',
    //     subject: 'Novo feedback',
    //     html: [
    //         `<div style = "font-family: sans-serif; font-size:16px; color: #111;">`,
    //         `<p>Tipo do Feedback : ${type}</p>`,
    //         `<p>Comentário : ${comment}</p>`,
    //         `</div>`
    //     ].join('')
    // });
 return response.status(201).send();
})