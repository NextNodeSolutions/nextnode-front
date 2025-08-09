export const modal = {
	title: 'Démarrez votre projet avec nous',
	description:
		"Créons quelque chose d'exceptionnel ensemble. Remplissez le formulaire ci-dessous et nous vous recontacterons sous 24h.",
	form: {
		name: 'Nom',
		namePlaceholder: 'Votre nom',
		email: 'Email',
		emailPlaceholder: 'votre@email.com',
		projectType: 'Type de projet',
		projectTypePlaceholder: 'Quel type de projet recherchez-vous ?',
		budget: 'Budget',
		budgetPlaceholder: 'Votre budget',
		details: 'Détails du projet',
		detailsPlaceholder: 'Parlez-nous de votre projet...',
		submit: 'Envoyer la demande',
	},
	professionalModal: {
		title: 'Projet Professionnel - Demande de Devis',
		description:
			'Nous comprenons les besoins spécifiques des entreprises. Partagez-nous vos exigences pour recevoir une proposition personnalisée.',
		form: {
			companyName: "Nom de l'entreprise",
			companyNamePlaceholder: 'Nom de votre entreprise',
			sector: "Secteur d'activité",
			sectorPlaceholder: 'Ex: E-commerce, Santé, Finance...',
			employees: "Nombre d'employés",
			employeesPlaceholder: 'Sélectionnez la taille de votre entreprise',
			currentWebsite: 'Site web actuel',
			currentWebsitePlaceholder:
				'https://votre-site-actuel.com (optionnel)',
			budget: 'Budget prévu',
			budgetPlaceholder: 'Sélectionnez votre fourchette budgétaire',
			timeline: 'Délai souhaité',
			timelinePlaceholder: 'Quand souhaitez-vous démarrer ?',
			expectedTraffic: 'Trafic attendu',
			expectedTrafficPlaceholder: 'Nombre de visiteurs/mois estimé',
			hasTechnicalContact: 'Équipe technique interne',
			needsIntegrations: 'Intégrations nécessaires',
			features: 'Fonctionnalités principales',
			featuresPlaceholder:
				'Listez les fonctionnalités clés que vous souhaitez (e-commerce, CRM, API, etc.)',
			projectDetails: 'Description détaillée du projet',
			projectDetailsPlaceholder:
				'Décrivez votre vision, vos objectifs business, contraintes techniques ou réglementaires...',
			submit: 'Demander un devis personnalisé',
		},
	},
	stepModal: {
		whatWeDo: 'Ce que nous faisons :',
		deliverables: 'Livrables',
		duration: 'Durée',
	},
} as const
