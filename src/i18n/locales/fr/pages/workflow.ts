export const workflow = {
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
	labels: {
		mainTasks: 'Tâches principales',
		deliverables: 'Livrables',
		estimatedDuration: 'Durée estimée',
	},
} as const
