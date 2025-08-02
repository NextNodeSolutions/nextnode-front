export const modal = {
	title: 'Start Your Project With Us',
	description:
		"Let's create something amazing together. Fill out the form below and we'll get back to you within 24 hours.",
	form: {
		name: 'Name',
		namePlaceholder: 'Your name',
		email: 'Email',
		emailPlaceholder: 'your@email.com',
		projectType: 'Project Type',
		projectTypePlaceholder: 'What kind of project are you looking for?',
		budget: 'Budget Range',
		budgetPlaceholder: 'Your budget range',
		details: 'Project Details',
		detailsPlaceholder: 'Tell us more about your project...',
		submit: 'Submit Project Request',
		sending: 'Sending...',
		sent: 'Sent!',
		successMessage:
			"Your project request has been sent successfully! We'll get back to you within 24 hours.",
		errorMessage:
			'Failed to send your request. Please try again or contact us directly.',
	},
	professionalModal: {
		title: 'Professional Project - Quote Request',
		description:
			'We understand the specific needs of businesses. Share your requirements to receive a personalized proposal.',
		selectedPlan: 'Selected plan:',
		form: {
			companyName: 'Company Name',
			companyNamePlaceholder: 'Your company name',
			sector: 'Industry Sector',
			sectorPlaceholder: 'e.g., E-commerce, Healthcare, Finance...',
			employees: 'Number of Employees',
			employeesPlaceholder: 'Select your company size',
			employeeOptions: {
				'1-10': '1-10 employees',
				'11-50': '11-50 employees',
				'51-200': '51-200 employees',
				'200+': '200+ employees',
			},
			currentWebsite: 'Current Website',
			currentWebsitePlaceholder:
				'https://your-current-site.com (optional)',
			budget: 'Expected Budget',
			budgetPlaceholder: 'Select your budget range',
			timeline: 'Desired Timeline',
			timelinePlaceholder: 'When would you like to start?',
			timelineOptions: {
				urgent: 'Urgent (< 1 month)',
				'1-3months': '1-3 months',
				'3-6months': '3-6 months',
				'6months+': '6+ months',
			},
			expectedTraffic: 'Expected Traffic',
			expectedTrafficPlaceholder: 'Estimated visitors/month',
			trafficOptions: {
				low: '< 1,000 visitors/month',
				medium: '1,000 - 10,000 visitors/month',
				high: '10,000 - 100,000 visitors/month',
				'very-high': '100,000+ visitors/month',
			},
			hasTechnicalContact: 'Internal Technical Team',
			technicalOptions: {
				non: 'No',
				oui: 'Yes, we have a technical team',
				externe: 'Yes, via external provider',
			},
			needsIntegrations: 'Required Integrations',
			integrationOptions: {
				non: 'No',
				'oui-simple': 'Yes, simple integrations (CRM, Email)',
				'oui-complexe': 'Yes, complex integrations (ERP, custom APIs)',
			},
			features: 'Main Features',
			featuresPlaceholder:
				'List the key features you need (e-commerce, CRM, API, etc.)',
			projectDetails: 'Detailed Project Description',
			projectDetailsPlaceholder:
				'Describe your vision, business objectives, technical or regulatory constraints...',
			submit: 'Request Custom Quote',
		},
	},
	stepModal: {
		whatWeDo: 'What we do:',
		deliverables: 'Deliverables',
		duration: 'Duration',
	},
} as const
