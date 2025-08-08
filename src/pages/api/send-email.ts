/**
 * API endpoint for sending project request emails
 * Validates input data and sends email using the EmailService
 */

import { EmailService } from '../../lib/email'
import { ProjectRequest } from '../../lib/email/templates'
import { validateProjectRequestData } from '../../lib/email/utils/validation'

import type { APIRoute } from 'astro'
import type { ProjectRequestData } from '../../lib/email/types/email'

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

		// Get environment variables
		const resendApiKey = import.meta.env.RESEND_API_KEY
		const fromEmail = import.meta.env.FROM_EMAIL
		const toEmail = import.meta.env.TO_EMAIL

		// Validate environment configuration
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

		if (!fromEmail || !toEmail) {
			console.error(
				'FROM_EMAIL or TO_EMAIL environment variable is not set',
			)
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
			provider: 'resend',
			apiKey: resendApiKey,
			defaultFrom: fromEmail,
		})

		// Create email template
		const emailTemplate = ProjectRequest({
			data: projectData,
			companyName: 'NextNode',
			websiteUrl: 'https://nextnode.dev',
		})

		// Send email
		const result = await emailService.sendEmail(
			{
				to: toEmail,
				from: fromEmail,
				subject: `Nouvelle demande de projet : ${projectData.projectName}`,
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
				details:
					error instanceof Error ? error.message : 'Unknown error',
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
