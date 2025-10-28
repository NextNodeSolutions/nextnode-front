export const workflow = {
	steps: {
		discovery: {
			title: 'Discovery & Strategy',
			number: '01',
			description:
				'Transform your vision into a concrete and actionable strategy.',
			fullDescription:
				'Your digital success starts here. We dive deep into your vision, analyze your business challenges, and map your target audience. Through collaborative workshops and thorough technical audit, we transform your ideas into an actionable strategy that aligns technology with business objectives. The result: a clear roadmap where every technical decision serves your growth, with defined priorities and optimized budget.',
			benefits: [
				{
					title: 'Clear Vision',
					description:
						'Transform vague ideas into actionable plans with measurable goals and success metrics.',
					icon: '🎯',
				},
				{
					title: 'Risk Mitigation',
					description:
						'Identify potential challenges early and build strategies to overcome them before they become problems.',
					icon: '🛡️',
				},
				{
					title: 'Smart Investment',
					description:
						'Prioritize features that deliver maximum value, ensuring your budget is spent where it matters most.',
					icon: '💡',
				},
				{
					title: 'Team Alignment',
					description:
						'Get everyone on the same page with shared understanding of goals, scope, and success criteria.',
					icon: '🤝',
				},
			],
			deliverables: [
				{
					name: 'Project Charter',
					description:
						'Complete project scope, objectives, and success criteria',
					type: 'document',
				},
				{
					name: 'Technical Specification',
					description:
						'Detailed technical requirements and architecture recommendations',
					type: 'document',
				},
				{
					name: 'User Personas',
					description: 'Research-backed target audience profiles',
					type: 'document',
				},
				{
					name: 'Competitive Analysis',
					description:
						'Market positioning and differentiation strategy',
					type: 'document',
				},
			],
			timeline: {
				duration: '1-2 weeks',
				milestones: [
					'Stakeholder interviews completed',
					'Requirements gathering finalized',
					'Technical audit report delivered',
					'Project roadmap approved',
				],
			},
			ctaText: 'Start Discovery',
		},
		design: {
			title: 'Design & UX/UI',
			number: '02',
			description:
				'Interfaces that captivate visitors and boost your conversions.',
			fullDescription:
				'Design that sells goes beyond aesthetics. We craft user experiences that naturally guide your visitors toward conversion. Every interface is designed to reflect your brand identity while maximizing engagement and business results. From UX research to high-fidelity mockups, we design smooth and intuitive user journeys. Your users enjoy a memorable experience that builds trust and generates measurable conversions.',
			benefits: [
				{
					title: 'Higher Conversions',
					description:
						'Intuitive interfaces that guide users effortlessly toward action, turning visitors into customers.',
					icon: '📈',
				},
				{
					title: 'Brand Differentiation',
					description:
						'Stand out from competitors with unique designs that capture your brand essence and values.',
					icon: '✨',
				},
				{
					title: 'User Confidence',
					description:
						'Professional, polished designs build trust and credibility with your audience instantly.',
					icon: '💎',
				},
				{
					title: 'Mobile Excellence',
					description:
						'Flawless experiences across all devices, ensuring no opportunity is lost to poor mobile design.',
					icon: '📱',
				},
			],
			deliverables: [
				{
					name: 'Wireframes',
					description: 'Low-fidelity layouts for rapid iteration',
					type: 'document',
				},
				{
					name: 'High-Fidelity Mockups',
					description: 'Pixel-perfect designs ready for development',
					type: 'asset',
				},
				{
					name: 'Interactive Prototype',
					description: 'Clickable Figma prototype for user testing',
					type: 'asset',
				},
				{
					name: 'Design System',
					description:
						'Component library, typography, colors, spacing',
					type: 'document',
				},
			],
			timeline: {
				duration: '2-4 weeks',
				milestones: [
					'Wireframes reviewed and approved',
					'Design system established',
					'High-fidelity mockups completed',
					'User testing conducted',
					'Final designs handed off to development',
				],
			},
			ctaText: 'View Our Designs',
		},
		development: {
			title: 'Full-Stack Development',
			number: '03',
			description:
				'Clean, performant code for fast and scalable applications.',
			fullDescription:
				'This is where your vision comes to life. We build your application with modern technologies and proven practices. Our code is clean, documented, and architected to scale with your business. From backend infrastructure to frontend interfaces, we create solid technical foundations that guarantee performance, security, and maintainability. You get a robust, fast, and scalable application ready to support your growth without technical debt.',
			benefits: [
				{
					title: 'Lightning Speed',
					description:
						'Optimized performance means faster load times, better SEO, and happier users who stay engaged.',
					icon: '⚡',
				},
				{
					title: 'Rock-Solid Security',
					description:
						'Industry-standard security practices protect your data and build trust with your users.',
					icon: '🔒',
				},
				{
					title: 'Future-Proof',
					description:
						'Scalable architecture grows with your business without costly rewrites or technical debt.',
					icon: '🚀',
				},
				{
					title: 'Maintainability',
					description:
						'Clean, documented code makes future updates and feature additions smooth and cost-effective.',
					icon: '🛠️',
				},
			],
			deliverables: [
				{
					name: 'Frontend Application',
					description:
						'Responsive web app with pixel-perfect implementation',
					type: 'code',
				},
				{
					name: 'Backend APIs',
					description: 'RESTful or GraphQL APIs with documentation',
					type: 'code',
				},
				{
					name: 'Database Schema',
					description: 'Optimized data models and migrations',
					type: 'code',
				},
				{
					name: 'Third-Party Integrations',
					description:
						'Payment, analytics, CRM, and other service integrations',
					type: 'code',
				},
			],
			timeline: {
				duration: '4-12 weeks',
				milestones: [
					'Development environment setup',
					'Core features implemented',
					'API integrations completed',
					'Frontend-backend integration',
					'Code review and optimization',
				],
			},
			ctaText: 'Explore Tech Stack',
		},
		testing: {
			title: 'Testing & Optimization',
			number: '04',
			description:
				'Maximum performance and zero bugs for a confident launch.',
			fullDescription:
				'Quality is non-negotiable. We subject every feature to rigorous testing: automated, manual, and real-world conditions. Beyond bug detection, we optimize performance, validate cross-browser compatibility, and ensure a smooth experience across all devices. You launch with confidence knowing your application is tested from A to Z, performant, and surprise-free for your users.',
			benefits: [
				{
					title: 'Zero Surprises',
					description:
						'Catch and fix issues before launch, ensuring a smooth, professional debut for your product.',
					icon: '🎯',
				},
				{
					title: 'Peak Performance',
					description:
						'Fine-tuned optimization delivers blazing-fast experiences that keep users engaged and satisfied.',
					icon: '⚡',
				},
				{
					title: 'Universal Compatibility',
					description:
						'Perfect functionality across all browsers, devices, and screen sizes—no user left behind.',
					icon: '🌐',
				},
				{
					title: 'Confidence',
					description:
						'Launch with peace of mind knowing your application has been thoroughly validated and optimized.',
					icon: '✅',
				},
			],
			deliverables: [
				{
					name: 'Test Suite',
					description: 'Automated unit, integration, and E2E tests',
					type: 'code',
				},
				{
					name: 'QA Report',
					description: 'Detailed testing results and bug tracker',
					type: 'document',
				},
				{
					name: 'Performance Audit',
					description:
						'Lighthouse scores, load times, optimization recommendations',
					type: 'document',
				},
				{
					name: 'Browser Compatibility Matrix',
					description: 'Tested browsers and devices with screenshots',
					type: 'document',
				},
			],
			timeline: {
				duration: '1-2 weeks',
				milestones: [
					'Automated test suite completed',
					'Manual QA across devices/browsers',
					'Performance optimization',
					'Security audit passed',
					'UAT (User Acceptance Testing) completed',
				],
			},
			ctaText: 'Learn About QA',
		},
		deployment: {
			title: 'Deployment & Infrastructure',
			number: '05',
			description:
				'Secure, scalable infrastructure with 24/7 monitoring for your launch.',
			fullDescription:
				'Launch day should be exciting, not stressful. We handle every technical aspect of your production deployment: scalable cloud infrastructure configuration, SSL security, real-time monitoring setup, and deployment automation. Your application is hosted on high-performance servers with automatic backups and DDoS protection. You launch confidently with professional infrastructure ensuring 24/7 availability and traffic spike handling.',
			benefits: [
				{
					title: 'Global Performance',
					description:
						'CDN distribution ensures fast load times for users worldwide, improving engagement and SEO.',
					icon: '🌍',
				},
				{
					title: 'Automatic Scaling',
					description:
						'Infrastructure that grows with your traffic, handling spikes effortlessly without downtime.',
					icon: '📊',
				},
				{
					title: 'Always Secure',
					description:
						'Enterprise-grade security with SSL certificates, DDoS protection, and regular security updates.',
					icon: '🔐',
				},
				{
					title: 'Peace of Mind',
					description:
						'24/7 monitoring, automatic backups, and instant alerts keep your site running smoothly.',
					icon: '🛡️',
				},
			],
			deliverables: [
				{
					name: 'Production Environment',
					description:
						'Fully configured hosting with CDN and security',
					type: 'service',
				},
				{
					name: 'CI/CD Pipeline',
					description:
						'Automated deployment workflow with GitHub Actions',
					type: 'code',
				},
				{
					name: 'Monitoring Dashboard',
					description:
						'Real-time analytics, errors, and performance metrics',
					type: 'service',
				},
				{
					name: 'Documentation',
					description:
						'Deployment guides, admin manual, and troubleshooting tips',
					type: 'document',
				},
			],
			timeline: {
				duration: '3-5 days',
				milestones: [
					'Production environment provisioned',
					'Database migrated and verified',
					'DNS and SSL configured',
					'Deployment pipeline tested',
					'Go-live executed',
					'Post-launch monitoring',
				],
			},
			ctaText: 'Deployment Checklist',
		},
		support: {
			title: 'Support & Maintenance',
			number: '06',
			description:
				'Continuous partnership to evolve your application without limits.',
			fullDescription:
				"Your launch is just the beginning of the journey. As you grow, we keep your application updated, secure, and performant. Quick fixes, new feature additions, continuous optimizations: we're your long-term technology partner. From monthly reports to quarterly roadmap planning, we anticipate your needs. You evolve without technical constraints with expert support that adapts to your business growth.",
			benefits: [
				{
					title: 'Stay Current',
					description:
						'Regular updates keep your application secure, fast, and compatible with the latest technologies.',
					icon: '🔄',
				},
				{
					title: 'Rapid Response',
					description:
						'Quick fixes and support when you need it, minimizing any disruption to your business operations.',
					icon: '⚡',
				},
				{
					title: 'Continuous Growth',
					description:
						'Add new features and capabilities as your business scales, without starting from scratch.',
					icon: '📈',
				},
				{
					title: 'Expert Partnership',
					description:
						'Strategic guidance and technical expertise to help you make informed decisions as you grow.',
					icon: '🤝',
				},
			],
			deliverables: [
				{
					name: 'Monthly Reports',
					description:
						'Performance metrics, uptime, and usage analytics',
					type: 'document',
				},
				{
					name: 'Security Patches',
					description:
						'Regular dependency updates and vulnerability fixes',
					type: 'code',
				},
				{
					name: 'Feature Enhancements',
					description:
						'Prioritized roadmap for new features and improvements',
					type: 'code',
				},
				{
					name: 'Backup & Recovery',
					description:
						'Automated daily backups with disaster recovery plan',
					type: 'service',
				},
			],
			timeline: {
				duration: 'Ongoing',
				milestones: [
					'24/7 monitoring active',
					'Monthly performance review',
					'Quarterly feature planning',
					'Annual security audit',
				],
			},
			ctaText: 'Support Plans',
		},
	},
	labels: {
		mainTasks: 'Main Tasks',
		deliverables: 'Deliverables',
		estimatedDuration: 'Estimated Duration',
	},
	modal: {
		overview: 'Overview',
		keyBenefits: 'Key Benefits',
		whatYouGet: 'What You Get',
		timeline: 'Timeline',
		duration: 'Duration',
		closeModal: 'Close modal',
	},
} as const
