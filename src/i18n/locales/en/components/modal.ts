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
	},
	professionalModal: {
		title: 'Professional Project - Quote Request',
		description:
			'We understand the specific needs of businesses. Share your requirements to receive a personalized proposal.',
		form: {
			companyName: 'Company Name',
			companyNamePlaceholder: 'Your company name',
			sector: 'Industry Sector',
			sectorPlaceholder: 'e.g., E-commerce, Healthcare, Finance...',
			employees: 'Number of Employees',
			employeesPlaceholder: 'Select your company size',
			currentWebsite: 'Current Website',
			currentWebsitePlaceholder:
				'https://your-current-site.com (optional)',
			budget: 'Expected Budget',
			budgetPlaceholder: 'Select your budget range',
			timeline: 'Desired Timeline',
			timelinePlaceholder: 'When would you like to start?',
			expectedTraffic: 'Expected Traffic',
			expectedTrafficPlaceholder: 'Estimated visitors/month',
			hasTechnicalContact: 'Internal Technical Team',
			needsIntegrations: 'Required Integrations',
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
