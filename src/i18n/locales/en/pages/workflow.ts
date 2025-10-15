export const workflow = {
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
	labels: {
		mainTasks: 'Main Tasks',
		deliverables: 'Deliverables',
		estimatedDuration: 'Estimated Duration',
	},
} as const
