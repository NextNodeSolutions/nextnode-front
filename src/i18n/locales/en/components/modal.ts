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
		successMessage: 'Your project request has been sent successfully! We\'ll get back to you within 24 hours.',
		errorMessage: 'Failed to send your request. Please try again or contact us directly.',
	},
	stepModal: {
		whatWeDo: 'What we do:',
		deliverables: 'Deliverables',
		duration: 'Duration',
	},
} as const
