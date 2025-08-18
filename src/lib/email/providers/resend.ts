import { Resend } from 'resend'

import type { EmailResponse } from '../types/email'

export class ResendProvider {
	private resend: Resend

	constructor(apiKey: string) {
		this.resend = new Resend(apiKey)
	}

	async sendEmail({
		to,
		from,
		subject,
		html,
	}: {
		to: string | string[]
		from: string
		subject: string
		html: string
	}): Promise<EmailResponse> {
		try {
			console.log('Attempting to send email:', {
				to: Array.isArray(to) ? to : [to],
				from,
				subject: subject.substring(0, 50) + '...',
			})

			const { data, error } = await this.resend.emails.send({
				to: Array.isArray(to) ? to : [to],
				from,
				subject,
				html,
			})

			if (error) {
				console.error('Resend API error:', {
					message: error.message,
					name: error.name,
					details: error,
				})
				return {
					success: false,
					error: error.message || 'Resend API error',
				}
			}

			console.log('Email sent successfully via Resend:', {
				messageId: data?.id,
			})

			return {
				success: true,
				messageId: data?.id,
			}
		} catch (error) {
			console.error('Exception while sending email:', {
				error,
				message: error instanceof Error ? error.message : 'Unknown',
				stack: error instanceof Error ? error.stack : undefined,
			})
			return {
				success: false,
				error:
					error instanceof Error
						? error.message
						: 'Unknown error occurred',
			}
		}
	}
}
