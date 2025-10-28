export const workflow = {
	steps: {
		discovery: {
			title: 'Découverte & Stratégie',
			number: '01',
			description:
				'Transformez votre vision en stratégie concrète et actionnable.',
			fullDescription:
				'Votre succès digital commence ici. Nous plongeons dans votre vision, analysons vos défis business et cartographions votre audience cible. À travers des ateliers collaboratifs et un audit technique approfondi, nous transformons vos idées en une stratégie actionnable qui aligne technologie et objectifs business. Le résultat : une feuille de route claire où chaque décision technique sert votre croissance, avec des priorités définies et un budget optimisé.',
			benefits: [
				{
					title: 'Vision Claire',
					description:
						'Transformez des idées vagues en plans actionnables avec des objectifs mesurables et des indicateurs de succès.',
					icon: '🎯',
				},
				{
					title: 'Réduction des Risques',
					description:
						"Identifiez les défis potentiels en amont et construisez des stratégies pour les surmonter avant qu'ils ne deviennent problématiques.",
					icon: '🛡️',
				},
				{
					title: 'Investissement Intelligent',
					description:
						'Priorisez les fonctionnalités qui apportent le plus de valeur, garantissant que votre budget est dépensé là où ça compte vraiment.',
					icon: '💡',
				},
				{
					title: "Alignement d'Équipe",
					description:
						'Fédérez toutes les parties prenantes avec une compréhension partagée des objectifs, du périmètre et des critères de succès.',
					icon: '🤝',
				},
			],
			deliverables: [
				{
					name: 'Charte de Projet',
					description:
						'Périmètre complet du projet, objectifs et critères de succès',
					type: 'document',
				},
				{
					name: 'Spécifications Techniques',
					description:
						"Exigences techniques détaillées et recommandations d'architecture",
					type: 'document',
				},
				{
					name: 'Personas Utilisateurs',
					description:
						"Profils d'audience cible basés sur la recherche",
					type: 'document',
				},
				{
					name: 'Analyse Concurrentielle',
					description:
						'Positionnement marché et stratégie de différenciation',
					type: 'document',
				},
			],
			timeline: {
				duration: '1-2 semaines',
				milestones: [
					'Entretiens avec les parties prenantes terminés',
					'Recueil des exigences finalisé',
					"Rapport d'audit technique livré",
					'Feuille de route du projet approuvée',
				],
			},
			ctaText: 'Démarrer la Découverte',
		},
		design: {
			title: 'Design & UX/UI',
			number: '02',
			description:
				'Interfaces qui captivent vos visiteurs et boostent vos conversions.',
			fullDescription:
				"Le design qui vend ne se limite pas à l'esthétique. Nous créons des expériences utilisateur qui guident naturellement vos visiteurs vers la conversion. Chaque interface est pensée pour refléter votre identité de marque tout en maximisant l'engagement et les résultats business. De la recherche UX aux maquettes haute-fidélité, nous concevons des parcours fluides et intuitifs. Vos utilisateurs bénéficient d'une expérience mémorable qui inspire confiance et génère des conversions mesurables.",
			benefits: [
				{
					title: 'Conversions Maximales',
					description:
						"Des interfaces intuitives qui guident les utilisateurs sans effort vers l'action, transformant les visiteurs en clients.",
					icon: '📈',
				},
				{
					title: 'Différenciation Unique',
					description:
						"Démarquez-vous de la concurrence avec des designs uniques qui capturent l'essence et les valeurs de votre marque.",
					icon: '✨',
				},
				{
					title: 'Confiance Utilisateur',
					description:
						'Des designs professionnels et soignés qui instaurent instantanément confiance et crédibilité auprès de votre audience.',
					icon: '💎',
				},
				{
					title: 'Excellence Mobile',
					description:
						"Des expériences impeccables sur tous les appareils, garantissant qu'aucune opportunité n'est perdue à cause d'un mauvais design mobile.",
					icon: '📱',
				},
			],
			deliverables: [
				{
					name: 'Wireframes',
					description:
						'Maquettes basse-fidélité pour itération rapide',
					type: 'document',
				},
				{
					name: 'Maquettes Haute-Fidélité',
					description:
						'Designs au pixel près prêts pour le développement',
					type: 'asset',
				},
				{
					name: 'Prototype Interactif',
					description:
						'Prototype Figma cliquable pour tests utilisateurs',
					type: 'asset',
				},
				{
					name: 'Design System',
					description:
						'Bibliothèque de composants, typographie, couleurs, espacement',
					type: 'document',
				},
			],
			timeline: {
				duration: '2-4 semaines',
				milestones: [
					'Wireframes revus et approuvés',
					'Design system établi',
					'Maquettes haute-fidélité terminées',
					'Tests utilisateurs effectués',
					'Designs finaux transmis au développement',
				],
			},
			ctaText: 'Voir Nos Designs',
		},
		development: {
			title: 'Développement Full-Stack',
			number: '03',
			description:
				'Code propre et performant pour une application rapide et scalable.',
			fullDescription:
				"C'est ici que votre vision prend vie. Nous construisons votre application avec des technologies modernes et des pratiques éprouvées. Notre code est propre, documenté et architecturé pour évoluer avec votre business. De l'infrastructure backend aux interfaces frontend, nous créons des fondations techniques solides qui garantissent performance, sécurité et maintenabilité. Vous obtenez une application robuste, rapide et scalable, prête à supporter votre croissance sans dette technique.",
			benefits: [
				{
					title: 'Vitesse Fulgurante',
					description:
						'Des performances optimisées signifient des temps de chargement plus rapides, un meilleur SEO et des utilisateurs plus satisfaits.',
					icon: '⚡',
				},
				{
					title: 'Sécurité Béton',
					description:
						"Des pratiques de sécurité aux standards de l'industrie qui protègent vos données et inspirent confiance à vos utilisateurs.",
					icon: '🔒',
				},
				{
					title: 'Pérennité Garantie',
					description:
						'Une architecture scalable qui grandit avec votre business sans réécritures coûteuses ni dette technique.',
					icon: '🚀',
				},
				{
					title: 'Maintenabilité',
					description:
						'Un code propre et documenté qui rend les futures mises à jour et ajouts de fonctionnalités fluides et rentables.',
					icon: '🛠️',
				},
			],
			deliverables: [
				{
					name: 'Application Frontend',
					description:
						'Application web responsive avec implémentation pixel-perfect',
					type: 'code',
				},
				{
					name: 'APIs Backend',
					description: 'APIs RESTful ou GraphQL avec documentation',
					type: 'code',
				},
				{
					name: 'Schéma Base de Données',
					description: 'Modèles de données optimisés et migrations',
					type: 'code',
				},
				{
					name: 'Intégrations Tierces',
					description:
						'Paiement, analytics, CRM et autres intégrations de services',
					type: 'code',
				},
			],
			timeline: {
				duration: '4-12 semaines',
				milestones: [
					'Environnement de développement configuré',
					'Fonctionnalités principales implémentées',
					'Intégrations API terminées',
					'Intégration frontend-backend',
					'Revue de code et optimisation',
				],
			},
			ctaText: 'Explorer Notre Stack',
		},
		testing: {
			title: 'Tests & Optimisation',
			number: '04',
			description:
				'Performance maximale et zéro bug pour un lancement serein.',
			fullDescription:
				'La qualité ne se négocie pas. Nous soumettons chaque fonctionnalité à des tests rigoureux : automatisés, manuels et en conditions réelles. Au-delà de la simple détection de bugs, nous optimisons les performances, validons la compatibilité multi-navigateurs et garantissons une expérience fluide sur tous les appareils. Vous lancez en toute confiance avec une application testée de A à Z, performante et sans mauvaise surprise pour vos utilisateurs.',
			benefits: [
				{
					title: 'Zéro Surprise',
					description:
						'Détectez et corrigez les problèmes avant le lancement, garantissant un déploiement fluide et professionnel de votre produit.',
					icon: '🎯',
				},
				{
					title: 'Performance Maximale',
					description:
						'Une optimisation fine qui délivre des expériences ultra-rapides maintenant vos utilisateurs engagés et satisfaits.',
					icon: '⚡',
				},
				{
					title: 'Compatibilité Universelle',
					description:
						"Un fonctionnement parfait sur tous les navigateurs, appareils et tailles d'écran—aucun utilisateur laissé de côté.",
					icon: '🌐',
				},
				{
					title: 'Sérénité',
					description:
						'Lancez en toute confiance sachant que votre application a été rigoureusement validée et optimisée.',
					icon: '✅',
				},
			],
			deliverables: [
				{
					name: 'Suite de Tests',
					description:
						"Tests automatisés unitaires, d'intégration et E2E",
					type: 'code',
				},
				{
					name: 'Rapport QA',
					description:
						'Résultats de tests détaillés et suivi des bugs',
					type: 'document',
				},
				{
					name: 'Audit de Performance',
					description:
						"Scores Lighthouse, temps de chargement, recommandations d'optimisation",
					type: 'document',
				},
				{
					name: 'Matrice de Compatibilité Navigateurs',
					description:
						"Navigateurs et appareils testés avec captures d'écran",
					type: 'document',
				},
			],
			timeline: {
				duration: '1-2 semaines',
				milestones: [
					'Suite de tests automatisés terminée',
					'QA manuelle sur appareils/navigateurs',
					'Optimisation des performances',
					'Audit de sécurité validé',
					"UAT (Tests d'Acceptation Utilisateur) terminés",
				],
			},
			ctaText: 'En Savoir Plus sur QA',
		},
		deployment: {
			title: 'Déploiement & Infrastructure',
			number: '05',
			description:
				'Infrastructure sécurisée, scalable et monitoring 24/7 pour votre lancement.',
			fullDescription:
				"Le jour du lancement devrait être excitant, pas stressant. Nous gérons chaque aspect technique de votre mise en production : configuration d'une infrastructure cloud scalable, sécurisation SSL, mise en place du monitoring temps réel et automatisation des déploiements. Votre application est hébergée sur des serveurs performants avec sauvegardes automatiques et protection DDoS. Vous lancez sereinement avec une infrastructure professionnelle qui assure disponibilité 24/7 et peut gérer vos pics de trafic.",
			benefits: [
				{
					title: 'Performance Mondiale',
					description:
						'Distribution CDN garantissant des temps de chargement rapides pour vos utilisateurs du monde entier, améliorant engagement et SEO.',
					icon: '🌍',
				},
				{
					title: 'Scaling Automatique',
					description:
						"Une infrastructure qui grandit avec votre trafic, gérant les pics d'affluence sans effort et sans interruption.",
					icon: '📊',
				},
				{
					title: 'Sécurité Permanente',
					description:
						'Sécurité de niveau entreprise avec certificats SSL, protection DDoS et mises à jour de sécurité régulières.',
					icon: '🔐',
				},
				{
					title: "Tranquillité d'Esprit",
					description:
						'Monitoring 24/7, sauvegardes automatiques et alertes instantanées pour maintenir votre site opérationnel en permanence.',
					icon: '🛡️',
				},
			],
			deliverables: [
				{
					name: 'Environnement de Production',
					description:
						'Hébergement entièrement configuré avec CDN et sécurité',
					type: 'service',
				},
				{
					name: 'Pipeline CI/CD',
					description:
						'Workflow de déploiement automatisé avec GitHub Actions',
					type: 'code',
				},
				{
					name: 'Tableau de Bord Monitoring',
					description:
						'Analytics temps réel, erreurs et métriques de performance',
					type: 'service',
				},
				{
					name: 'Documentation',
					description:
						'Guides de déploiement, manuel admin et conseils de dépannage',
					type: 'document',
				},
			],
			timeline: {
				duration: '3-5 jours',
				milestones: [
					'Environnement de production provisionné',
					'Base de données migrée et vérifiée',
					'DNS et SSL configurés',
					'Pipeline de déploiement testé',
					'Mise en ligne exécutée',
					'Monitoring post-lancement',
				],
			},
			ctaText: 'Checklist de Déploiement',
		},
		support: {
			title: 'Support & Maintenance',
			number: '06',
			description:
				'Accompagnement continu pour faire évoluer votre application sans limite.',
			fullDescription:
				"Votre lancement n'est que le début de l'aventure. Au fil de votre croissance, nous maintenons votre application à jour, sécurisée et performante. Corrections rapides, ajout de nouvelles fonctionnalités, optimisations continues : nous sommes votre partenaire technologique long terme. Des rapports mensuels aux plans de roadmap trimestriels, nous anticipons vos besoins. Vous évoluez sans contrainte technique avec un accompagnement expert qui s'adapte à la croissance de votre business.",
			benefits: [
				{
					title: 'Toujours à Jour',
					description:
						'Des mises à jour régulières maintiennent votre application sécurisée, rapide et compatible avec les dernières technologies.',
					icon: '🔄',
				},
				{
					title: 'Réactivité Totale',
					description:
						'Corrections rapides et support quand vous en avez besoin, minimisant toute perturbation de vos opérations business.',
					icon: '⚡',
				},
				{
					title: 'Croissance Continue',
					description:
						'Ajoutez de nouvelles fonctionnalités et capacités au fur et à mesure de la croissance de votre business, sans repartir de zéro.',
					icon: '📈',
				},
				{
					title: 'Partenariat Expert',
					description:
						'Guidance stratégique et expertise technique pour vous aider à prendre des décisions éclairées au fil de votre croissance.',
					icon: '🤝',
				},
			],
			deliverables: [
				{
					name: 'Rapports Mensuels',
					description:
						"Métriques de performance, uptime et analytics d'usage",
					type: 'document',
				},
				{
					name: 'Correctifs de Sécurité',
					description:
						'Mises à jour régulières des dépendances et corrections de vulnérabilités',
					type: 'code',
				},
				{
					name: 'Améliorations Fonctionnelles',
					description:
						'Roadmap priorisée pour nouvelles fonctionnalités et améliorations',
					type: 'code',
				},
				{
					name: 'Sauvegarde & Récupération',
					description:
						'Sauvegardes quotidiennes automatisées avec plan de reprise après sinistre',
					type: 'service',
				},
			],
			timeline: {
				duration: 'Continu',
				milestones: [
					'Monitoring 24/7 actif',
					'Revue mensuelle des performances',
					'Planification trimestrielle des fonctionnalités',
					'Audit de sécurité annuel',
				],
			},
			ctaText: 'Plans de Support',
		},
	},
	labels: {
		mainTasks: 'Tâches principales',
		deliverables: 'Livrables',
		estimatedDuration: 'Durée estimée',
	},
	modal: {
		overview: "Vue d'ensemble",
		keyBenefits: 'Bénéfices clés',
		whatYouGet: 'Ce que vous obtenez',
		timeline: 'Calendrier',
		duration: 'Durée',
		closeModal: 'Fermer le modal',
	},
} as const
