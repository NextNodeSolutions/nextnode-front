export const home = {
	hero: {
		subtitle:
			'Nous ne construisons pas seulement des sites web. Nous créons des expériences digitales qui vendent.',
		title: 'VOTRE PROCHAIN',
		titleHighlight: 'SUCCÈS',
		titleEnd: 'COMMENCE ICI',
		description:
			'Transformez vos visiteurs en clients avec des sites web qui convertissent. Sur-mesure, ultra-rapides et conçus pour développer votre business.',
		cta: 'Démarrer votre parcours projet',
	},
	services: {
		title: 'Ce Que Nous Faisons de Mieux',
		subtitle: 'Solutions digitales complètes pour entreprises ambitieuses',
		items: [
			{
				title: 'Développement Web',
				description:
					'Sites web et applications sur-mesure avec les technologies de pointe',
			},
			{
				title: 'E-Commerce',
				description:
					'Boutiques en ligne performantes qui génèrent ventes et croissance',
			},
			{
				title: 'Applications Mobiles',
				description:
					'Applications natives et cross-platform pour iOS et Android',
			},
			{
				title: 'Design UX/UI',
				description:
					'Des designs magnifiques et intuitifs qui plaisent et convertissent',
			},
			{
				title: 'SEO & Marketing',
				description:
					'Soyez trouvé en ligne et transformez les visiteurs en clients',
			},
			{
				title: 'Support & Maintenance',
				description:
					'Optimisation continue et support pour garder votre avance',
			},
		],
	},
	workflow: {
		title: 'Notre Processus Éprouvé',
		subtitle: "Six étapes vers l'excellence digitale",
		steps: {
			discovery: {
				title: 'Découverte & Stratégie',
				number: '01',
				description:
					'Nous plongeons au cœur de vos objectifs, audience et exigences techniques.',
			},
			design: {
				title: 'Design & UX/UI',
				number: '02',
				description:
					'Des interfaces magnifiques qui convertissent. Designs pixel-perfect optimisés.',
			},
			development: {
				title: 'Développement',
				number: '03',
				description:
					'Code propre et scalable avec les technologies de pointe.',
			},
			testing: {
				title: 'Tests & QA',
				number: '04',
				description:
					'Tests rigoureux pour garantir un fonctionnement parfait.',
			},
			deployment: {
				title: 'Lancement',
				number: '05',
				description:
					'Déploiement fluide en production avec infrastructure scalable.',
			},
			support: {
				title: 'Croissance',
				number: '06',
				description:
					'Support continu pour maintenir votre site opérationnel.',
			},
		},
	},
	stats: {
		title: 'Des Résultats Qui Parlent',
		items: [
			{ value: '100+', label: 'Projets Livrés' },
			{ value: '98%', label: 'Satisfaction Client' },
			{ value: '50+', label: 'Clients Satisfaits' },
			{ value: '24/7', label: 'Support Disponible' },
		],
	},
	techStack: {
		title: 'Technologies Que Nous Maîtrisons',
		subtitle: 'Le bon outil pour chaque mission',
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
		title: 'Prêt à Transformer Votre Présence Digitale ?',
		description:
			"Discutons de votre projet et créons quelque chose d'extraordinaire ensemble.",
		primaryButton: 'Démarrer Votre Projet',
		features: [
			'✅ Consultation technique gratuite',
			'✅ Proposition de développement sur-mesure',
			'✅ Devis sans engagement',
		],
	},
} as const
