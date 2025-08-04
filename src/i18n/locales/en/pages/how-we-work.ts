export const howWeWork = {
	hero: {
		title: 'From Idea to Production:',
		titleHighlight: 'Your Digital Vision, Delivered',
		description:
			"Every great project starts with understanding your unique needs. Here's how we transform your ideas into high-performance digital solutions that drive real business results.",
		cta: 'Start Your Project Journey',
	},
	journey: {
		title: 'Our Development Journey',
		subtitle: 'Six proven steps to digital excellence',
	},
	steps: {
		discovery: {
			title: 'Discovery & Strategy',
			number: '01',
			description:
				'We dive deep into your business goals, target audience, and technical requirements. This foundation shapes everything we build.',
			details: [
				'Business requirements analysis',
				'Technical architecture planning',
				'User experience research',
				'Project timeline & roadmap',
			],
			deliverables:
				'Strategy document, wireframes, technical specifications',
			duration: '1-2 weeks',
		},
		design: {
			title: 'Design & UX/UI',
			number: '02',
			description:
				'Beautiful interfaces that convert. We create pixel-perfect designs optimized for user experience and business goals.',
			details: [
				'Custom UI/UX design',
				'Interactive prototypes',
				'Mobile-first approach',
				'Brand integration',
			],
			deliverables: 'Design system, interactive prototypes, style guide',
			duration: '2-3 weeks',
		},
		development: {
			title: 'Full-Stack Development',
			number: '03',
			description:
				'Clean, scalable code using cutting-edge technologies. We build fast, secure, and maintainable applications.',
			details: [
				'Frontend development (React, Next.js, Astro)',
				'Backend APIs (Node.js, TypeScript)',
				'Database design & optimization',
				'Performance optimization',
			],
			deliverables: 'Production-ready application, code documentation',
			duration: '4-8 weeks',
		},
		testing: {
			title: 'Testing & Optimization',
			number: '04',
			description:
				'Rigorous testing ensures everything works perfectly. We optimize for speed, security, and user experience.',
			details: [
				'Automated testing suites',
				'Performance optimization',
				'Security audits',
				'Cross-browser compatibility',
			],
			deliverables:
				'Test reports, performance metrics, security assessment',
			duration: '1-2 weeks',
		},
		deployment: {
			title: 'Deployment & Infrastructure',
			number: '05',
			description:
				'Seamless deployment to production with scalable infrastructure. Your site goes live with monitoring and backup systems.',
			details: [
				'Cloud deployment (AWS, Vercel, Netlify)',
				'CDN configuration',
				'SSL certificates & security',
				'Monitoring & analytics setup',
			],
			deliverables:
				'Live website, monitoring dashboard, deployment guide',
			duration: '3-5 days',
		},
		support: {
			title: 'Support & Maintenance',
			number: '06',
			description:
				'Ongoing support to keep your site running smoothly. Updates, optimizations, and feature additions as you grow.',
			details: [
				'Regular updates & patches',
				'Performance monitoring',
				'Feature enhancements',
				'Technical support',
			],
			deliverables: 'Monthly reports, update logs, support tickets',
			duration: 'Ongoing',
		},
	},
	techStack: {
		title: 'Technologies We Master',
		subtitle: 'The right tool for every job',
		description:
			"We don't just follow trends — we choose technologies that deliver the best results for your specific needs.",
		categories: {
			frontend: {
				title: 'Frontend Excellence',
				description:
					'Modern frameworks for blazing-fast user experiences',
				technologies: [
					{
						name: 'React & Next.js',
						description: 'For complex, interactive applications',
					},
					{
						name: 'Astro',
						description: 'For content-heavy, SEO-optimized sites',
					},
					{
						name: 'TypeScript',
						description:
							'Type-safe development for maintainable code',
					},
					{
						name: 'Tailwind CSS',
						description:
							'Utility-first styling for consistent design',
					},
				],
			},
			backend: {
				title: 'Backend Power',
				description: 'Robust server architecture that scales',
				technologies: [
					{
						name: 'Node.js',
						description: 'High-performance JavaScript runtime',
					},
					{
						name: 'PostgreSQL & MongoDB',
						description: 'Reliable data storage solutions',
					},
					{
						name: 'GraphQL & REST APIs',
						description: 'Flexible data communication',
					},
					{
						name: 'Redis',
						description: 'Fast caching and session management',
					},
				],
			},
			deployment: {
				title: 'Deployment & DevOps',
				description: 'Scalable infrastructure and seamless deployment',
				technologies: [
					{
						name: 'AWS & Vercel',
						description: 'Enterprise-grade cloud hosting',
					},
					{
						name: 'Docker',
						description: 'Containerized deployment consistency',
					},
					{
						name: 'GitHub Actions',
						description: 'Automated CI/CD pipelines',
					},
					{
						name: 'Monitoring Tools',
						description: '24/7 performance tracking',
					},
				],
			},
		},
	},
	faq: {
		title: 'Technical FAQ',
		subtitle: 'Expert answers to your development questions',
		questions: [
			{
				question:
					'How do you ensure website performance and Core Web Vitals?',
				answer: 'We optimize for Core Web Vitals from day one using techniques like code splitting, image optimization, lazy loading, and CDN implementation. We use Lighthouse audits and real user monitoring to maintain 90+ performance scores.',
			},
			{
				question:
					"What's your approach to scalability and future growth?",
				answer: 'We architect with growth in mind using microservices, serverless functions, and database sharding when needed. Our code is modular and documented, making it easy to add features and scale infrastructure as your business grows.',
			},
			{
				question: 'How do you handle security and data protection?',
				answer: 'Security is built into every layer: HTTPS/SSL encryption, input validation, SQL injection protection, XSS prevention, OWASP compliance, regular security audits, and GDPR-compliant data handling practices.',
			},
			{
				question: 'Can you integrate with existing systems and APIs?',
				answer: 'Absolutely. We specialize in seamless integrations with CRMs, payment processors, analytics tools, marketing platforms, and custom APIs. We ensure data consistency and maintain system reliability during migrations.',
			},
			{
				question: "What's your code quality and testing process?",
				answer: 'We follow strict code quality standards with ESLint, Prettier, and TypeScript. Our testing includes unit tests, integration tests, end-to-end testing with Playwright/Cypress, and automated CI/CD pipelines for consistent deployments.',
			},
			{
				question: 'How do you handle SEO and technical optimization?',
				answer: 'We implement technical SEO best practices: semantic HTML, structured data, meta tags, sitemap generation, robots.txt optimization, page speed optimization, and mobile-first indexing compliance.',
			},
		],
	},
	cta: {
		title: 'Ready to Transform Your Digital Presence?',
		description:
			"Let's discuss your project and create something extraordinary together.",
		primaryButton: 'Start Your Project',
		secondaryButton: 'Schedule a Call',
		features: [
			'✅ Free technical consultation',
			'✅ Custom development proposal',
			'✅ No obligation quote',
		],
	},
	workflow: {
		mainTasks: 'Main Tasks',
		deliverables: 'Deliverables',
		estimatedDuration: 'Estimated Duration',
	},
	faqCategories: {
		all: 'All',
		performance: 'Performance',
		architecture: 'Architecture',
		security: 'Security',
		integration: 'Integration',
		quality: 'Quality',
		seo: 'SEO',
	},
	techStats: {
		mastery: 'mastery',
		expertiseLevel: 'Expertise Level',
		masteriedTechnologies: 'Mastered Technologies',
		averageLevel: 'Average Level',
		expertTechnologies: 'Expert Technologies (90%+)',
	},
} as const
