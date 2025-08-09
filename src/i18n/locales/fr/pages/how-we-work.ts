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
		questions: {
			gettingStarted: [
				{
					question:
						'Combien de temps faut-il pour créer un site web professionnel ?',
					answer: 'Un site vitrine simple peut être livré en 2-4 semaines. Une application web complexe prend généralement 2-3 mois. Nous établissons un calendrier précis après avoir défini vos besoins exacts lors de la phase de découverte.',
				},
				{
					question:
						'Quelles informations dois-je préparer avant de démarrer mon projet ?',
					answer: "Préparez vos objectifs business, votre budget approximatif, des exemples de sites que vous aimez, votre contenu (textes, images, logo), et une liste des fonctionnalités souhaitées. Pas d'inquiétude, nous vous guidons pour le reste !",
				},
				{
					question:
						'Comment choisir entre un site vitrine et une application web ?',
					answer: 'Un site vitrine présente votre entreprise et génère des contacts. Une application web offre des fonctionnalités interactives (espace client, e-commerce, outils en ligne). Nous vous conseillons selon vos objectifs et votre budget.',
				},
				{
					question: "Ai-je besoin d'un CMS ou d'un site sur-mesure ?",
					answer: 'Un CMS (WordPress, Webflow) convient pour du contenu fréquemment mis à jour par vous-même. Le sur-mesure est idéal pour des besoins spécifiques, meilleures performances et évolutivité. Nous recommandons selon votre cas.',
				},
				{
					question:
						'Pourrai-je modifier mon site moi-même après la livraison ?',
					answer: 'Oui ! Nous intégrons un système de gestion de contenu adapté à votre niveau technique. Formation incluse pour vous rendre autonome sur les modifications courantes (textes, images, articles de blog).',
				},
				{
					question:
						'Comment assurer la visibilité de mon site sur Google ?',
					answer: 'Nous optimisons votre site pour le SEO dès la conception : structure technique parfaite, vitesse de chargement, contenu optimisé, balises méta. Nous pouvons aussi vous accompagner sur une stratégie SEO long terme.',
				},
				{
					question:
						"Qu'est-ce qui est inclus dans la maintenance d'un site ?",
					answer: 'La maintenance inclut : mises à jour de sécurité, sauvegardes régulières, monitoring 24/7, corrections de bugs, support technique, et petites modifications. Différents forfaits disponibles selon vos besoins.',
				},
				{
					question: 'Comment protéger mon site contre le piratage ?',
					answer: 'Nous implémentons : certificat SSL, mises à jour sécurité régulières, pare-feu applicatif, protection anti-DDoS, sauvegardes automatiques et monitoring des menaces. Votre site est entre de bonnes mains.',
				},
			],
			business: [
				{
					question: 'Combien coûte un site web professionnel ?',
					answer: 'Nos sites web coûtent généralement entre 3 000€ et 15 000€ selon la complexité. Nous fournissons des devis détaillés après avoir compris vos besoins spécifiques. Cela inclut design, développement, tests et déploiement avec 3 mois de support.',
				},
				{
					question:
						"Quel ROI puis-je attendre d'un nouveau site web ?",
					answer: 'La plupart de nos clients voient un ROI de 200-400% dans les 12 mois grâce à de meilleurs taux de conversion, un meilleur référencement SEO et une expérience utilisateur améliorée. Nous suivons les métriques comme la génération de leads et les conversions.',
				},
				{
					question:
						'Comment se déroule un projet du début à la fin ?',
					answer: 'Notre processus en 6 étapes : Découverte & Stratégie (1-2 semaines), Design & UX (2-3 semaines), Développement (4-8 semaines), Tests & Optimisation (1-2 semaines), Déploiement (3-5 jours), et Support & Maintenance continu.',
				},
				{
					question: 'Que dois-je préparer avant de commencer ?',
					answer: 'Nous avons besoin de vos objectifs business, infos sur votre audience cible, éléments de branding existants, contenu (texte/images), et fonctionnalités spécifiques souhaitées. Nous vous guidons dans tout pendant la phase de découverte.',
				},
				{
					question:
						'Proposez-vous de la maintenance et du support continu ?',
					answer: 'Oui ! Nous offrons des forfaits de maintenance incluant mises à jour sécurité, optimisation performance, mises à jour contenu et support technique. Les forfaits commencent à 200€/mois avec différents niveaux de service.',
				},
				{
					question:
						'Comment gérez-vous les délais et la gestion de projet ?',
					answer: 'Nous utilisons une méthodologie agile avec des points hebdomadaires, tableaux de bord projet partagés et jalons clairs. 95% de nos projets sont livrés à temps. Nous intégrons du temps tampon pour révisions et exigences imprévues.',
				},
			],
			design: [
				{
					question:
						'Comment créez-vous des interfaces qui convertissent ?',
					answer: 'Nous utilisons des principes de design basés sur les données, tests A/B et analytics comportement utilisateur. Nos designs se concentrent sur des propositions de valeur claires, navigation intuitive, call-to-actions stratégiques et flux utilisateur optimisés.',
				},
				{
					question:
						'Créez-vous des designs responsives pour tous les appareils ?',
					answer: "Absolument ! Nous utilisons une approche mobile-first. Chaque site web est entièrement responsive et testé sur téléphones, tablettes, ordinateurs portables et de bureau. Nous garantissons un affichage parfait sur toutes les tailles d'écran.",
				},
				{
					question: 'Comment intégrez-vous notre branding existant ?',
					answer: "Nous travaillons avec vos guidelines de marque, couleurs, polices et identité visuelle. Si vous avez besoin d'un raffinement de marque, nous pouvons aider à faire évoluer votre marque pour le digital tout en maintenant la cohérence.",
				},
				{
					question:
						'Faites-vous des tests utilisateurs et de la recherche ?',
					answer: "Oui ! Nous menons des interviews utilisateurs, tests d'utilisabilité et revues analytics. Nous créons des personas utilisateurs, cartes de parcours et testons les prototypes avec de vrais utilisateurs avant le développement.",
				},
				{
					question: "Comment optimisez-vous l'expérience mobile ?",
					answer: 'Approche mobile-first avec interfaces tactiles, temps de chargement optimisés, navigation simplifiée et fonctionnalités spécifiques mobile. Nous testons sur vrais appareils et optimisons les taux de conversion mobile.',
				},
			],
			performance: [
				{
					question:
						'Comment garantissez-vous des temps de chargement rapides ?',
					answer: "Nous optimisons pour les Core Web Vitals avec techniques comme le code splitting, optimisation d'images, lazy loading, implémentation CDN et frameworks modernes. Nous maintenons des scores Lighthouse 90+.",
				},
				{
					question:
						'Que sont les Core Web Vitals et pourquoi sont-ils importants ?',
					answer: "Les Core Web Vitals sont les métriques clés de Google pour l'expérience utilisateur : vitesse de chargement, interactivité et stabilité visuelle. Ils impactent directement le référencement SEO et la satisfaction utilisateur.",
				},
				{
					question: 'Comment optimisez-vous les performances ?',
					answer: "Via l'optimisation du code, compression d'images, stratégies de cache, optimisation base de données, utilisation CDN et technologies web modernes. Nous surveillons les performances en continu post-lancement.",
				},
				{
					question:
						'Pouvez-vous gérer les pics de trafic et la montée en charge ?',
					answer: 'Oui ! Nous architecturons en pensant croissance avec infrastructure auto-scalable, load balancers et CDNs. Nos sites peuvent gérer les surges de trafic des campagnes marketing ou contenu viral.',
				},
			],
			security: [
				{
					question:
						'Comment protégez-vous les données clients et la vie privée ?',
					answer: 'Nous implémentons chiffrement HTTPS/SSL, stockage de données sécurisé, validation des entrées et suivons les guidelines de sécurité OWASP. Toutes les données clients sont chiffrées et stockées selon les meilleures pratiques.',
				},
				{
					question:
						'Êtes-vous conformes RGPD et réglementations vie privée ?',
					answer: 'Oui ! Nous implémentons consentement cookies conforme RGPD, politiques de confidentialité, accords de traitement des données et outils de gestion des données utilisateur. Nous vous aidons à respecter toutes les réglementations.',
				},
				{
					question:
						'Comment sécurisez-vous le traitement des paiements ?',
					answer: 'Nous intégrons avec des processeurs de paiement conformes PCI comme Stripe et PayPal. Nous ne stockons jamais directement les données de paiement sensibles et utilisons tokenisation et chiffrement pour toutes les transactions.',
				},
				{
					question:
						'Proposez-vous des audits sécurité et monitoring ?',
					answer: 'Oui ! Nous menons des audits sécurité réguliers, surveillons les vulnérabilités, appliquons les correctifs sécurité et fournissons du monitoring sécurité continu. Nous pouvons aussi organiser des évaluations sécurité tierces.',
				},
			],
			integrations: [
				{
					question: 'Pouvez-vous migrer mon site web existant ?',
					answer: 'Absolument ! Nous gérons les migrations depuis WordPress, Shopify, Squarespace et systèmes personnalisés. Nous préservons les classements SEO, redirigeons les anciennes URLs et assurons zéro perte de données pendant la migration.',
				},
				{
					question:
						'Comment intégrez-vous avec nos outils business actuels ?',
					answer: 'Nous intégrons avec CRMs, plateformes email marketing, outils analytics, systèmes de paiement et bases de données personnalisées. Nous assurons un flux de données fluide entre votre site web et systèmes business existants.',
				},
				{
					question:
						'Travaillez-vous avec des APIs et services tiers ?',
					answer: "Oui ! Nous intégrons avec des APIs pour paiements, livraison, inventaire, réseaux sociaux, automatisation marketing et services personnalisés. Nous gérons la documentation API, tests et gestion d'erreurs.",
				},
				{
					question:
						'Proposez-vous de la formation pour gérer le site web ?',
					answer: 'Oui ! Nous fournissons des sessions de formation complètes, tutoriels vidéo et documentation. Nous nous assurons que votre équipe peut gérer avec confiance le contenu, produits et fonctions de base du site.',
				},
			],
			marketing: [
				{
					question:
						'Comment optimisez-vous pour les moteurs de recherche (SEO) ?',
					answer: "Nous implémentons les meilleures pratiques SEO technique : HTML sémantique, données structurées, meta tags, génération sitemap, optimisation vitesse de page, indexation mobile-first et stratégies d'optimisation contenu.",
				},
				{
					question: 'Intégrez-vous Google Analytics et le tracking ?',
					answer: "Oui ! Nous configurons Google Analytics 4, tracking de conversion, heat maps et tracking d'événements personnalisés. Nous fournissons des rapports détaillés et insights pour vous aider à comprendre le comportement utilisateur.",
				},
				{
					question:
						'Aidez-vous avec la stratégie contenu et marketing ?',
					answer: "Nous fournissons des conseils stratégie contenu, optimisation contenu SEO et design d'entonnoir marketing. Bien que nous nous concentrions sur le développement, nous nous associons avec des spécialistes marketing quand nécessaire.",
				},
				{
					question: 'Comment trackez-vous les conversions et ROI ?',
					answer: 'Nous implémentons un tracking complet pour objectifs, conversions, transactions e-commerce et génération de leads. Nous configurons des tableaux de bord pour surveiller ROI, parcours utilisateur et métriques de performance business.',
				},
			],
		},
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
		gettingStarted: 'Démarrer un projet',
		business: 'Business & Stratégie',
		design: 'Design & UX',
		performance: 'Performance & Vitesse',
		security: 'Sécurité & Conformité',
		integrations: 'Intégrations & Systèmes',
		marketing: 'Marketing & SEO',
	},
	faqDifficulty: {
		beginner: 'Débutant',
		intermediate: 'Intermédiaire',
		advanced: 'Avancé',
	},
	faqSearch: {
		placeholder: 'Rechercher des questions...',
		noResults: 'Aucune question trouvée correspondant à votre recherche.',
		showingResults: 'Affichage de {{count}} question(s)',
		questionsCount: '{{count}} question{{plural}}',
		showingTotal: 'Affichage de {{results}} sur {{total}} questions',
		searchTips: '💡 Essayez de rechercher "coût", "SEO", ou "sécurité"',
		helpText:
			'Essayez des mots-clés différents ou parcourez par catégorie.',
	},
	techStats: {
		mastery: 'maîtrise',
		expertiseLevel: "Niveau d'expertise",
		masteriedTechnologies: 'Technologies maîtrisées',
		averageLevel: 'Niveau moyen',
		expertTechnologies: 'Technologies expertes (90%+)',
	},
} as const
