/* eslint-disable @typescript-eslint/no-require-imports */
import type { ReactElement } from 'react'

// Import render function with proper typing
const { render } = require('@react-email/render') as {
	render: (
		component: ReactElement,
		options?: {
			pretty?: boolean
			plainText?: boolean
		},
	) => Promise<string>
}

export async function renderEmailTemplate(
	template: ReactElement,
): Promise<{ html: string; text?: string }> {
	try {
		const html = await render(template, {
			pretty: true,
		})

		// Generate plain text version by stripping HTML tags
		const text = html
			.replace(/<[^>]*>/g, '')
			.replace(/\s+/g, ' ')
			.trim()

		return { html, text }
	} catch (error) {
		throw new Error(
			`Failed to render email template: ${error instanceof Error ? error.message : 'Unknown error'}`,
		)
	}
}

export function validateEmailAddress(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

export function validateEmailAddresses(emails: string | string[]): boolean {
	const emailList = Array.isArray(emails) ? emails : [emails]
	return emailList.every(validateEmailAddress)
}