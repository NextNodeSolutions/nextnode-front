/**
 * Configuration types for the application
 * These are used both by @nextnode/functions-server and our application code
 */

export interface EmailConfig {
	provider: 'resend' | 'nodemailer'
	from: string
	to: string
	replyTo?: string
	templates: {
		projectRequest: {
			subject: string
			companyName: string
			websiteUrl: string
			companyLogo?: string
		}
	}
}

export interface AppConfig {
	name: string
	version: string
	features: string[]
	environment: string
}

export interface RootConfig {
	email: EmailConfig
	app: AppConfig
}
