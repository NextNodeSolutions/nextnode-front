export const pricing = {
	hero: {
		title: 'TRANSPARENT',
		titleHighlight: 'PRICING',
		titleEnd: 'FOR YOUR SUCCESS',
		subtitle:
			'Custom development of real coded websites - Maximum freedom, unlimited functionality',
		description:
			'Unlike limiting no-code solutions, we develop real coded websites that you fully own. Complete freedom of functionality, guaranteed scalability, optimal performance. Transparent pricing with no hidden fees.',
		badge: '💡 Free consultation included',
		cta: {
			button: 'Free Consultation to Define Your Project',
			subtitle:
				"Let's discuss your needs to determine the ideal solution and provide you with an accurate quote",
		},
	},
	plans: {
		starter: {
			name: 'Starter',
			tagline: 'Real coded website, no limitations',
			price: '€500 - €800',
			recurring: '€30/month',
			badge: 'Perfect to start',
			description:
				'Your own website developed in modern code. Unlike no-code platforms, you have complete freedom to evolve and add any desired functionality.',
			features: [
				'Single landing page',
				'Mobile-responsive design',
				'Contact form integration',
				'SEO optimization',
				'SSL certificate',
				'Analytics setup',
				'24/7 infrastructure monitoring',
				'Monthly performance reports',
			],
			cta: 'Start Your Project',
			examples: [
				'Restaurant menu & contact',
				'Service company showcase',
				'Portfolio presentation',
			],
		},
		business: {
			name: 'Business',
			tagline: 'Complete coded web applications',
			price: '€1,500 - €3,500',
			recurring: '€30/month',
			badge: 'Complete & scalable',
			description:
				'Complete websites developed in code with all possible advanced features. Scalable architecture allowing integration of any solution or API.',
			features: [
				'Multi-page website (5-15 pages)',
				'Custom design & branding',
				'CMS integration',
				'E-commerce capabilities',
				'Advanced SEO',
				'Third-party integrations',
				'Performance optimization',
				'Priority support',
				'Monthly optimization reviews',
			],
			cta: 'Get a Quote',
			examples: [
				'Corporate website',
				'E-commerce store',
				'Service booking platform',
			],
		},
		enterprise: {
			name: 'Enterprise',
			tagline: 'Development without technical limits',
			price: 'Custom Quote',
			recurring: '€30+/month',
			badge: 'Advanced custom',
			description:
				'Complex web applications entirely developed in code. No technical limitations, advanced integrations, maximum performance. Your vision becomes reality without compromise.',
			features: [
				'Custom web applications',
				'Complex integrations',
				'Multi-language support',
				'Advanced security',
				'Scalable architecture',
				'Dedicated project manager',
				'SLA guarantees',
				'Custom hosting solutions',
				'24/7 priority support',
			],
			cta: 'Contact Us',
			examples: [
				'SaaS applications',
				'Enterprise portals',
				'Complex web platforms',
			],
		},
	},
	pricing: {
		title: "What's Included",
		development: {
			title: 'Development',
			description: 'One-time fee based on project complexity',
		},
		infrastructure: {
			title: 'Infrastructure & Support',
			description: '€30/month for hosting, monitoring, and maintenance',
			features: [
				'CDN & hosting included',
				'SSL certificates',
				'Daily backups',
				'Security monitoring',
				'Performance optimization',
				'Technical support',
			],
		},
	},
	faq: {
		title: 'Frequently Asked Questions',
		questions: [
			{
				question: 'What does the €30/month include?',
				answer: 'Our monthly fee covers professional hosting, CDN, SSL certificates, daily backups, security monitoring, performance optimization, and technical support. This ensures your website runs smoothly 24/7.',
			},
			{
				question: 'How do you determine the development cost?',
				answer: 'Development costs depend on complexity, features, and design requirements. We provide detailed quotes after understanding your specific needs during our free consultation.',
			},
			{
				question: 'Do you offer payment plans?',
				answer: 'Yes, we offer flexible payment options including milestone-based payments for development and monthly billing for infrastructure and support.',
			},
			{
				question: 'What happens if I want to cancel?',
				answer: "You own your website and can cancel anytime with 30 days notice. We'll help you migrate to your preferred hosting solution.",
			},
			{
				question: 'Do you provide ongoing maintenance?',
				answer: 'Yes, our €30/month package includes regular updates, security patches, and technical maintenance. Additional development work is quoted separately.',
			},
		],
	},
	cta: {
		title: 'Ready to start your project?',
		description:
			'Get a free consultation and detailed quote for your website.',
		button: 'Get Your Free Quote',
	},
} as const
