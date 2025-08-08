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
			const { data, error } = await this.resend.emails.send({
				to: Array.isArray(to) ? to : [to],
				from,
				subject,
				html,
			})

			if (error) {
				return {
					success: false,
					error: error.message,
				}
			}

			return {
				success: true,
				messageId: data?.id,
			}
		} catch (error) {
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
