export const workflow = {
	steps: {
		discovery: {
			title: 'Discovery & Strategy',
			number: '01',
			description:
				'Understanding your vision and goals to create a strategy aligned with your business.',
			fullDescription:
				"Your project deserves a solid foundation. We start by understanding your vision, your challenges, and your audience. Through collaborative workshops and deep-dive sessions, we map out a strategy that aligns technology with your business objectives. This isn't just planning—it's about creating a roadmap that ensures every line of code serves a purpose and every design decision drives results.",
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
				'Beautiful interfaces that convert, optimized for user experience and your goals.',
			fullDescription:
				"Great design isn't just about looking good—it's about making your users feel confident, engaged, and excited to interact with your product. We craft experiences that guide users naturally toward their goals while reflecting your brand's personality. Every color, every button, every animation is intentionally designed to create delight and drive conversions.",
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
				'Fast and secure applications with clean, scalable code.',
			fullDescription:
				"This is where your vision comes to life. Using modern technologies and best practices, we build robust applications that are fast, secure, and built to scale with your business. Our code isn't just functional—it's clean, maintainable, and designed for the long term. We focus on performance, security, and creating a solid foundation that can evolve as your needs grow.",
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
				'Quality guaranteed with rigorous testing and complete optimization.',
			fullDescription:
				"Quality isn't negotiable. We put your application through rigorous testing to catch issues before your users do. From automated tests to real-world user scenarios, we ensure every feature works flawlessly across all devices and browsers. Beyond just finding bugs, we optimize performance, fine-tune user experience, and validate that everything meets the highest standards of quality and security.",
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
				'Seamless deployment to production with scalable infrastructure. Your site goes live with monitoring and backup systems.',
			fullDescription:
				'Launch day should be exciting, not stressful. We handle every technical detail of deploying your application to production, from configuring scalable cloud infrastructure to setting up monitoring and security. Your site goes live on reliable, high-performance infrastructure with automatic backups, SSL certificates, and real-time monitoring—everything you need for a successful launch and smooth operations.',
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
				'Ongoing support to keep your site running smoothly. Updates, optimizations, and feature additions as you grow.',
			fullDescription:
				"Your launch is just the beginning. As your business evolves, your digital presence should too. We provide ongoing support to keep your application secure, fast, and aligned with your growing needs. From regular updates and performance monitoring to adding new features and optimizing existing ones, we're your long-term technology partner committed to your continued success.",
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
