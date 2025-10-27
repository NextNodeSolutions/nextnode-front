import { STEP_COLORS, STEP_KEYS } from './workflow-constants'

import type { StepKey } from '@/types/i18n'
import type { WorkflowStepData } from '@/types/workflow'

/**
 * Rich workflow step data for expanded modal views
 * Complete redesign with full descriptions, benefits, deliverables, and timelines
 */
export const WORKFLOW_STEP_DATA: Record<StepKey, WorkflowStepData> = {
	discovery: {
		id: 'discovery',
		title: 'Discovery & Analysis',
		shortDescription:
			'Deep dive into your business needs and technical requirements',
		icon: '🔍',
		fullDescription:
			'We begin every project with comprehensive discovery to truly understand your business goals, target audience, and technical requirements. This phase sets the foundation for a successful digital solution that aligns perfectly with your vision and delivers measurable results. Through stakeholder interviews, competitive analysis, and technical audits, we create a detailed roadmap that guides the entire development process.',
		benefits: [
			{
				id: 'discovery-roadmap',
				title: 'Clear Project Roadmap',
				description:
					'Detailed plan with milestones, timelines, and deliverables',
				icon: '🗺️',
			},
			{
				id: 'discovery-risk',
				title: 'Risk Mitigation',
				description:
					'Identify potential challenges before development begins',
				icon: '🛡️',
			},
			{
				id: 'discovery-alignment',
				title: 'Aligned Expectations',
				description:
					'Ensure all stakeholders share the same vision and goals',
				icon: '🤝',
			},
			{
				id: 'discovery-cost',
				title: 'Cost Optimization',
				description:
					'Accurate estimates prevent budget overruns and scope creep',
				icon: '💰',
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
				description: 'Market positioning and differentiation strategy',
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
		gradient: 'bg-step-1',
		accentColor: STEP_COLORS[0],
		ctaText: 'Start Discovery',
		ctaLink: '/contact',
	},

	design: {
		id: 'design',
		title: 'Design & Prototyping',
		shortDescription:
			'Beautiful, user-centered interfaces that drive engagement',
		icon: '🎨',
		fullDescription:
			'Our design process combines aesthetics with functionality, creating intuitive interfaces that delight users while achieving business objectives. From wireframes to high-fidelity prototypes, we iterate based on user feedback and best practices. Every design decision is intentional, backed by UX research and aligned with your brand identity.',
		benefits: [
			{
				id: 'design-ux',
				title: 'User-Centric Approach',
				description:
					'Designs validated through user testing and feedback loops',
				icon: '👥',
			},
			{
				id: 'design-speed',
				title: 'Faster Development',
				description:
					'Detailed prototypes reduce back-and-forth during coding phase',
				icon: '⚡',
			},
			{
				id: 'design-brand',
				title: 'Brand Consistency',
				description: 'Cohesive design system ensures visual harmony',
				icon: '🎯',
			},
			{
				id: 'design-a11y',
				title: 'Accessibility First',
				description: 'WCAG compliant designs inclusive for all users',
				icon: '♿',
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
				description: 'Component library, typography, colors, spacing',
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
		gradient: 'bg-step-2',
		accentColor: STEP_COLORS[1],
		ctaText: 'View Our Designs',
		ctaLink: '/portfolio',
	},

	development: {
		id: 'development',
		title: 'Development & Integration',
		shortDescription:
			'Robust, scalable code built with modern technologies',
		icon: '⚡',
		fullDescription:
			'We transform designs into high-performance web applications using cutting-edge technologies and industry best practices. Our development process emphasizes clean code, scalability, and maintainability. From frontend frameworks to backend APIs, we build solutions that are fast, secure, and ready to scale with your business growth.',
		benefits: [
			{
				id: 'dev-tech',
				title: 'Modern Tech Stack',
				description:
					'React, Next.js, TypeScript, Tailwind CSS, Node.js',
				icon: '🚀',
			},
			{
				id: 'dev-perf',
				title: 'Performance Optimized',
				description:
					'Fast load times, SEO-friendly, Core Web Vitals optimized',
				icon: '⚡',
			},
			{
				id: 'dev-scale',
				title: 'Scalable Architecture',
				description: 'Built to handle growth without major refactoring',
				icon: '📈',
			},
			{
				id: 'dev-clean',
				title: 'Clean Code',
				description:
					'Well-documented, maintainable, and testable codebase',
				icon: '✨',
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
		gradient: 'bg-step-3',
		accentColor: STEP_COLORS[2],
		ctaText: 'Explore Tech Stack',
		ctaLink: '/how-we-work',
	},

	testing: {
		id: 'testing',
		title: 'Testing & Quality Assurance',
		shortDescription: 'Rigorous testing ensures flawless user experiences',
		icon: '🧪',
		fullDescription:
			'Quality is non-negotiable. Our comprehensive testing process catches bugs before users do, ensuring your application works perfectly across all devices and browsers. From automated unit tests to manual QA, we validate functionality, performance, security, and user experience. Every feature is tested, every edge case covered.',
		benefits: [
			{
				id: 'test-bugs',
				title: 'Bug-Free Launch',
				description:
					'Catch and fix issues before they reach production',
				icon: '🐛',
			},
			{
				id: 'test-browser',
				title: 'Cross-Browser Compatible',
				description:
					'Works seamlessly on Chrome, Firefox, Safari, Edge',
				icon: '🌐',
			},
			{
				id: 'test-mobile',
				title: 'Mobile Responsive',
				description:
					'Perfect experience on phones, tablets, and desktops',
				icon: '📱',
			},
			{
				id: 'test-perf',
				title: 'Performance Validated',
				description:
					'Load time, memory usage, and Core Web Vitals optimized',
				icon: '📊',
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
		gradient: 'bg-step-4',
		accentColor: STEP_COLORS[3],
		ctaText: 'Learn About QA',
		ctaLink: '/how-we-work',
	},

	deployment: {
		id: 'deployment',
		title: 'Deployment & Launch',
		shortDescription:
			'Seamless deployment with zero downtime and monitoring',
		icon: '🚀',
		fullDescription:
			'Launch day should be exciting, not stressful. Our deployment process is battle-tested, ensuring smooth migrations with zero downtime. We handle DNS configuration, SSL certificates, CDN setup, and performance monitoring. Post-launch, we provide comprehensive training and documentation so your team can confidently manage the platform.',
		benefits: [
			{
				id: 'deploy-uptime',
				title: 'Zero Downtime',
				description:
					'Blue-green deployments ensure continuous availability',
				icon: '✅',
			},
			{
				id: 'deploy-scale',
				title: 'Automatic Scaling',
				description:
					'Handle traffic spikes without manual intervention',
				icon: '📈',
			},
			{
				id: 'deploy-monitor',
				title: 'Monitoring & Alerts',
				description:
					'Real-time error tracking and performance monitoring',
				icon: '📡',
			},
			{
				id: 'deploy-rollback',
				title: 'Easy Rollbacks',
				description: 'Instant rollback to previous version if needed',
				icon: '⏪',
			},
		],
		deliverables: [
			{
				name: 'Production Environment',
				description: 'Fully configured hosting with CDN and security',
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
		gradient: 'bg-step-5',
		accentColor: STEP_COLORS[4],
		ctaText: 'Deployment Checklist',
		ctaLink: '/how-we-work',
	},

	support: {
		id: 'support',
		title: 'Support & Maintenance',
		shortDescription:
			'Ongoing support to keep your app secure and up-to-date',
		icon: '🛠️',
		fullDescription:
			"Your success is our success. Post-launch support ensures your application stays secure, fast, and aligned with evolving business needs. We provide proactive monitoring, regular updates, performance optimization, and rapid bug fixes. Whether it's a critical hotfix or a new feature request, we're your long-term technology partner.",
		benefits: [
			{
				id: 'support-monitor',
				title: 'Proactive Monitoring',
				description: 'We catch issues before they impact users',
				icon: '👀',
			},
			{
				id: 'support-security',
				title: 'Security Updates',
				description:
					'Regular patches to protect against vulnerabilities',
				icon: '🔒',
			},
			{
				id: 'support-priority',
				title: 'Priority Support',
				description:
					'Fast response times for critical issues (SLA guaranteed)',
				icon: '⚡',
			},
			{
				id: 'support-improvement',
				title: 'Continuous Improvement',
				description: 'Regular performance audits and optimization',
				icon: '📊',
			},
		],
		deliverables: [
			{
				name: 'Monthly Reports',
				description: 'Performance metrics, uptime, and usage analytics',
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
		gradient: 'bg-step-6',
		accentColor: STEP_COLORS[5],
		ctaText: 'Support Plans',
		ctaLink: '/contact',
	},
}

/**
 * Get workflow step data by key
 */
export const getWorkflowStepData = (stepKey: StepKey): WorkflowStepData => {
	return WORKFLOW_STEP_DATA[stepKey]
}

/**
 * Get all workflow step data in order
 */
export const getAllWorkflowStepData = (): WorkflowStepData[] => {
	return STEP_KEYS.map(key => WORKFLOW_STEP_DATA[key])
}
