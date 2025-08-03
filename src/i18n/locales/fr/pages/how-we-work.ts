export const howWeWork = {
	hero: {
		title: 'Voici comment nous travaillons :',
		titleHighlight: 'Notre processus éprouvé',
		description:
			'Six étapes méthodiques pour transformer votre vision en succès digital. Si vous nous choisissez, voici exactement comment nous procédons pour garantir des résultats exceptionnels.',
		cta: 'Démarrer votre parcours projet',
	},
	journey: {
		title: 'Notre parcours de développement',
		subtitle: "Six étapes éprouvées vers l'excellence digitale",
	},
	steps: {
		discovery: {
			title: 'Découverte & Stratégie',
			number: '01',
			description:
				'Nous plongeons au cœur de vos objectifs business, audience cible et exigences techniques. Cette fondation façonne tout ce que nous construisons.',
			details: [
				'Analyse des besoins métier',
				"Planification de l'architecture technique",
				"Recherche d'expérience utilisateur",
				'Timeline & roadmap projet',
			],
			deliverables:
				'Document de stratégie, wireframes, spécifications techniques',
			duration: '1-2 semaines',
		},
		design: {
			title: 'Design & UX/UI',
			number: '02',
			description:
				"Des interfaces magnifiques qui convertissent. Nous créons des designs pixel-perfect optimisés pour l'expérience utilisateur et les objectifs business.",
			details: [
				'Design UI/UX sur-mesure',
				'Prototypes interactifs',
				'Approche mobile-first',
				'Intégration de marque',
			],
			deliverables:
				'Design system, prototypes interactifs, guide de style',
			duration: '2-3 semaines',
		},
		development: {
			title: 'Développement Full-Stack',
			number: '03',
			description:
				'Code propre et scalable utilisant les technologies de pointe. Nous construisons des applications rapides, sécurisées et maintenables.',
			details: [
				'Développement frontend (React, Next.js, Astro)',
				'APIs backend (Node.js, TypeScript)',
				'Conception & optimisation base de données',
				'Optimisation des performances',
			],
			deliverables:
				'Application prête pour production, documentation code',
			duration: '4-8 semaines',
		},
		testing: {
			title: 'Tests & Optimisation',
			number: '04',
			description:
				"Tests rigoureux pour s'assurer que tout fonctionne parfaitement. Nous optimisons pour la vitesse, la sécurité et l'expérience utilisateur.",
			details: [
				'Suites de tests automatisés',
				'Optimisation des performances',
				'Audits de sécurité',
				'Compatibilité cross-browser',
			],
			deliverables:
				'Rapports de tests, métriques performance, évaluation sécurité',
			duration: '1-2 semaines',
		},
		deployment: {
			title: 'Déploiement & Infrastructure',
			number: '05',
			description:
				'Déploiement fluide en production avec infrastructure scalable. Votre site est en ligne avec systèmes de monitoring et backup.',
			details: [
				'Déploiement cloud (AWS, Vercel, Netlify)',
				'Configuration CDN',
				'Certificats SSL & sécurité',
				'Setup monitoring & analytics',
			],
			deliverables:
				'Site web en ligne, dashboard monitoring, guide déploiement',
			duration: '3-5 jours',
		},
		support: {
			title: 'Support & Maintenance',
			number: '06',
			description:
				'Support continu pour maintenir votre site opérationnel. Mises à jour, optimisations et nouvelles fonctionnalités au fur et à mesure de votre croissance.',
			details: [
				'Mises à jour & correctifs réguliers',
				'Monitoring des performances',
				'Améliorations fonctionnelles',
				'Support technique',
			],
			deliverables:
				'Rapports mensuels, logs des mises à jour, tickets support',
			duration: 'En continu',
		},
	},
	techStack: {
		title: 'Technologies que nous maîtrisons',
		subtitle: 'Le bon outil pour chaque mission',
		description:
			'Nous ne suivons pas seulement les tendances — nous choisissons les technologies qui délivrent les meilleurs résultats pour vos besoins spécifiques.',
		categories: {
			frontend: {
				title: 'Excellence Frontend',
				description:
					'Frameworks modernes pour des expériences utilisateur ultra-rapides',
				technologies: [
					{
						name: 'React & Next.js',
						description:
							'Pour les applications complexes et interactives',
					},
					{
						name: 'Astro',
						description:
							'Pour les sites riches en contenu et optimisés SEO',
					},
					{
						name: 'TypeScript',
						description:
							'Développement type-safe pour un code maintenable',
					},
					{
						name: 'Tailwind CSS',
						description:
							'Styling utility-first pour un design cohérent',
					},
				],
			},
			backend: {
				title: 'Puissance Backend',
				description: 'Architecture serveur robuste qui scale',
				technologies: [
					{
						name: 'Node.js',
						description: 'Runtime JavaScript haute performance',
					},
					{
						name: 'PostgreSQL & MongoDB',
						description: 'Solutions de stockage de données fiables',
					},
					{
						name: 'GraphQL & REST APIs',
						description: 'Communication de données flexible',
					},
					{
						name: 'Redis',
						description: 'Cache rapide et gestion de sessions',
					},
				],
			},
			deployment: {
				title: 'Déploiement & DevOps',
				description: 'Infrastructure scalable et déploiement fluide',
				technologies: [
					{
						name: 'AWS & Vercel',
						description: 'Hébergement cloud niveau entreprise',
					},
					{
						name: 'Docker',
						description: 'Cohérence de déploiement containerisé',
					},
					{
						name: 'GitHub Actions',
						description: 'Pipelines CI/CD automatisés',
					},
					{
						name: 'Outils de Monitoring',
						description: 'Suivi des performances 24/7',
					},
				],
			},
		},
	},
	faq: {
		title: 'FAQ Technique',
		subtitle: "Réponses d'expert à vos questions de développement",
		questions: [
			{
				question:
					'Comment assurez-vous les performances et Core Web Vitals ?',
				answer: "Nous optimisons pour les Core Web Vitals dès le premier jour avec des techniques comme le code splitting, l'optimisation d'images, le lazy loading et l'implémentation CDN. Nous utilisons les audits Lighthouse et le monitoring utilisateur réel pour maintenir des scores 90+.",
			},
			{
				question:
					'Quelle est votre approche pour la scalabilité et croissance future ?',
				answer: "Nous architecturons en pensant croissance avec microservices, fonctions serverless et database sharding si nécessaire. Notre code est modulaire et documenté, facilitant l'ajout de fonctionnalités et la montée en charge infrastructure.",
			},
			{
				question:
					'Comment gérez-vous la sécurité et protection des données ?',
				answer: 'La sécurité est intégrée à chaque couche : chiffrement HTTPS/SSL, validation des entrées, protection injection SQL, prévention XSS, conformité OWASP, audits sécurité réguliers et pratiques RGPD conformes.',
			},
			{
				question:
					'Pouvez-vous intégrer avec des systèmes et APIs existants ?',
				answer: 'Absolument. Nous sommes spécialisés dans les intégrations fluides avec CRMs, processeurs de paiement, outils analytics, plateformes marketing et APIs personnalisées. Nous assurons cohérence des données et fiabilité lors des migrations.',
			},
			{
				question: 'Quel est votre processus qualité code et tests ?',
				answer: "Nous suivons des standards qualité stricts avec ESLint, Prettier et TypeScript. Nos tests incluent tests unitaires, d'intégration, end-to-end avec Playwright/Cypress, et pipelines CI/CD automatisés pour des déploiements cohérents.",
			},
			{
				question:
					"Comment gérez-vous le SEO et l'optimisation technique ?",
				answer: 'Nous implémentons les meilleures pratiques SEO technique : HTML sémantique, données structurées, meta tags, génération sitemap, optimisation robots.txt, optimisation vitesse et conformité mobile-first indexing.',
			},
		],
	},
	cta: {
		title: 'Prêt à transformer votre présence digitale ?',
		description:
			"Discutons de votre projet et créons quelque chose d'extraordinaire ensemble.",
		primaryButton: 'Démarrer votre projet',
		secondaryButton: 'Programmer un appel',
		features: [
			'✅ Consultation technique gratuite',
			'✅ Proposition de développement sur-mesure',
			'✅ Devis sans engagement',
		],
	},
	workflow: {
		mainTasks: 'Tâches principales',
		deliverables: 'Livrables',
		estimatedDuration: 'Durée estimée',
	},
	faqCategories: {
		all: 'Toutes',
		performance: 'Performance',
		architecture: 'Architecture',
		security: 'Sécurité',
		integration: 'Intégration',
		quality: 'Qualité',
		seo: 'SEO',
	},
	techStats: {
		mastery: 'maîtrise',
		expertiseLevel: "Niveau d'expertise",
		masteriedTechnologies: 'Technologies maîtrisées',
		averageLevel: 'Niveau moyen',
		expertTechnologies: 'Technologies expertes (90%+)',
	},
} as const
