export const home = {
	hero: {
		subtitle:
			"We don't just build websites. We create digital experiences that sell.",
		title: 'YOUR NEXT',
		titleHighlight: 'BREAKTHROUGH',
		titleEnd: 'STARTS HERE',
		description:
			'Turn visitors into customers with websites that convert. Custom-built, lightning-fast, and designed to grow your business.',
		cta: 'Start Your Project Journey',
		badges: {
			rating: '5.0 Rating',
			projects: '100+ Projects',
		},
		features: [
			'Custom-built and lightning-fast development',
			'Optimized for conversion and growth',
			'Ongoing support and maintenance',
		],
		consultation: 'Free 30-min consultation',
		dashboard: {
			conversion: 'Conversion',
			growth: 'Growth',
			satisfaction: 'Satisfaction',
			projects: 'Projects',
		},
	},
	services: {
		title: 'What We Do Best',
		subtitle: 'Comprehensive digital solutions for ambitious businesses',
		items: [
			{
				title: 'Web Development',
				description:
					'Custom websites and web applications built with cutting-edge technologies',
			},
			{
				title: 'E-Commerce',
				description:
					'High-converting online stores that drive sales and growth',
			},
			{
				title: 'Mobile Apps',
				description:
					'Native and cross-platform applications for iOS and Android',
			},
			{
				title: 'UX/UI Design',
				description:
					'Beautiful, intuitive designs that users love and convert',
			},
			{
				title: 'SEO & Marketing',
				description:
					'Get found online and turn visitors into customers',
			},
			{
				title: 'Support & Maintenance',
				description:
					'Ongoing optimization and support to keep you ahead',
			},
		],
	},
	workflow: {
		title: 'Our Proven Process',
		subtitle: 'Six steps to digital excellence',
		steps: {
			discovery: {
				title: 'Discovery & Strategy',
				number: '01',
				description:
					'We dive deep into your business goals, target audience, and technical requirements.',
			},
			design: {
				title: 'Design & UX/UI',
				number: '02',
				description:
					'Beautiful interfaces that convert. Pixel-perfect designs optimized for results.',
			},
			development: {
				title: 'Development',
				number: '03',
				description:
					'Clean, scalable code using cutting-edge technologies.',
			},
			testing: {
				title: 'Testing & QA',
				number: '04',
				description:
					'Rigorous testing ensures everything works perfectly.',
			},
			deployment: {
				title: 'Launch',
				number: '05',
				description:
					'Seamless deployment to production with scalable infrastructure.',
			},
			support: {
				title: 'Growth',
				number: '06',
				description:
					'Ongoing support to keep your site running smoothly.',
			},
		},
	},
	stats: {
		title: 'Results That Speak',
		items: [
			{ value: '100+', label: 'Projects Delivered' },
			{ value: '98%', label: 'Client Satisfaction' },
			{ value: '50+', label: 'Happy Clients' },
			{ value: '24/7', label: 'Support Available' },
		],
	},
	techStack: {
		title: 'Technologies We Master',
		subtitle: 'The right tool for every job',
		categories: {
			frontend: {
				title: 'Frontend',
				items: ['React', 'Next.js', 'Astro', 'TypeScript', 'Tailwind'],
			},
			backend: {
				title: 'Backend',
				items: ['Node.js', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Redis'],
			},
			deployment: {
				title: 'DevOps',
				items: [
					'AWS',
					'Vercel',
					'Docker',
					'GitHub Actions',
					'Monitoring',
				],
			},
		},
	},
	cta: {
		title: 'Ready to Transform Your Digital Presence?',
		description:
			"Let's discuss your project and create something extraordinary together.",
		primaryButton: 'Start Your Project',
		features: [
			'✅ Free technical consultation',
			'✅ Custom development proposal',
			'✅ No obligation quote',
		],
	},
} as const
