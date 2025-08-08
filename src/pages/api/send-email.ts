/**
 * API endpoint for sending project request emails
 * Validates input data and sends email using the EmailService
 */

import { EmailService } from '../../lib/email'
import { ProjectRequest } from '../../lib/email/templates'
import { validateProjectRequestData } from '../../lib/email/utils/validation'
import { getConfig } from '../../lib/config'

import type { APIRoute } from 'astro'
import type { ProjectRequestData } from '../../lib/email/types/email'
import type { EmailConfig } from '../../lib/config/types'

export const POST: APIRoute = async ({ request }) => {
	try {
		// Parse request body
		let body: unknown
		try {
			body = await request.json()
		} catch {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Invalid JSON in request body',
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		// Validate body structure
		if (!body || typeof body !== 'object' || Array.isArray(body)) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Request body must be an object',
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		const projectData = body as ProjectRequestData

		// Validate project request data
		const validationErrors = validateProjectRequestData(projectData)
		if (validationErrors.length > 0) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Validation failed',
					details: validationErrors,
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		// Get configuration
		const emailConfig = getConfig<EmailConfig>('email')
		const resendApiKey = import.meta.env.RESEND_API_KEY

		// Validate configuration
		if (!emailConfig) {
			console.error('Email configuration not found')
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Email configuration not found',
				}),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		if (!resendApiKey) {
			console.error('RESEND_API_KEY environment variable is not set')
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Email service not configured',
				}),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		if (!emailConfig.from || !emailConfig.to) {
			console.error('Email addresses not configured in config files')
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Email addresses not configured',
				}),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		// Initialize email service
		const emailService = new EmailService({
			provider: emailConfig.provider,
			apiKey: resendApiKey,
			defaultFrom: emailConfig.from,
		})

		// Create email template with configuration
		const templateConfig = emailConfig.templates.projectRequest
		const emailTemplate = ProjectRequest({
			data: projectData,
			companyName: templateConfig.companyName,
			websiteUrl: templateConfig.websiteUrl,
			companyLogo: templateConfig.companyLogo || undefined,
		})

		// Create subject from template with variable substitution
		const subject = templateConfig.subject.replace('{{projectName}}', projectData.projectName)

		// Send email
		const result = await emailService.sendEmail(
			{
				to: emailConfig.to,
				from: emailConfig.from,
				subject,
				template: 'ProjectRequest',
				data: projectData,
			},
			emailTemplate,
		)

		if (!result.success) {
			console.error('Failed to send email:', result.error)
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Failed to send email',
					details: result.error,
				}),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		// Log successful email send (without sensitive data)
		console.log('Email sent successfully:', {
			messageId: result.messageId,
			projectName: projectData.projectName,
			userEmail: projectData.userEmail,
			timestamp: new Date().toISOString(),
		})

		return new Response(
			JSON.stringify({
				success: true,
				messageId: result.messageId,
				message: 'Email sent successfully',
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			},
		)
	} catch (error) {
		console.error('Unexpected error in send-email API:', error)

		return new Response(
			JSON.stringify({
				success: false,
				error: 'Internal server error',
				details: error instanceof Error ? error.message : 'Unknown error',
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			},
		)
	}
}

// Only allow POST requests
export const GET: APIRoute = () =>
	new Response(
		JSON.stringify({
			success: false,
			error: 'Method not allowed. Use POST to send emails.',
		}),
		{
			status: 405,
			headers: {
				'Content-Type': 'application/json',
				Allow: 'POST',
			},
		},
	)