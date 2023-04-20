import Queue from 'bull'
import nodemailer from 'nodemailer'
import config from 'helpers/config'
import type { SendMailOptions } from 'nodemailer'

// TODO: Add a queue for sending emails
export const emailQueue = new Queue('email', {
	defaultJobOptions: {
		attempts: 3,
		removeOnComplete: true
	},
	settings: {
		retryProcessDelay: 1000 * 60 * 5 // 10 minutes
	}
})

const transporter = nodemailer.createTransport({
	host: process.env.MAILER_HOST,
	port: 587,
	auth: {
		user: process.env.MAILER_USER,
		pass: process.env.MAILER_PASSWORD
	}
})

interface ISendMailOptions extends SendMailOptions {
	to: Required<SendMailOptions['to']>
	subject: Required<SendMailOptions['subject']>
	text: Required<SendMailOptions['text']>
}

export const sendMail = (props: ISendMailOptions) => {
	// TODO: do not make it async, use email queue
	transporter
		.sendMail({
			from: props.from ?? `"${config.appName}" <${process.env.MAILER_USER}>`,
			...props
		})
		.then()
		.catch(console.log)
}
