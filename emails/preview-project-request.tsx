import React from 'react'

import { ProjectRequest } from '../src/lib/email/templates/ProjectRequest'
import { getConfig } from '../src/lib/config'

import type { ProjectRequestData } from '../src/lib/email/types/email'
import type { EmailConfig } from '../src/lib/config/types'

// Sample data for preview
const sampleData: ProjectRequestData = {
	projectName: 'Application E-commerce Mobile',
	userName: 'Jean Dupont',
	userEmail: 'jean.dupont@example.com',
	companyName: 'Tech Solutions SARL',
	projectDescription:
		'Nous souhaitons développer une application mobile de e-commerce pour notre boutique existante. L\'application devra inclure un catalogue produits, un système de panier, des paiements sécurisés et un espace client.',
	budget: '50 000€ - 80 000€',
	timeline: '4-6 mois',
	contactPreference: 'email',
	phoneNumber: '+33 1 23 45 67 89',
	additionalInfo:
		'Nous avons déjà un site web existant et une base de données clients. Nous recherchons une solution native iOS et Android avec une interface moderne et intuitive.',
}

export default function PreviewProjectRequest(): React.ReactElement {
	// Get email configuration for preview
	const emailConfig = getConfig<EmailConfig>('email')
	const templateConfig = emailConfig?.templates.projectRequest || {
		companyName: 'NextNode',
		websiteUrl: 'https://nextnode.dev',
		subject: 'Test Preview',
		companyLogo: null,
	}

	return (
		<ProjectRequest
			data={sampleData}
			companyName={templateConfig.companyName}
			websiteUrl={templateConfig.websiteUrl}
			companyLogo={templateConfig.companyLogo || undefined}
		/>
	)
}