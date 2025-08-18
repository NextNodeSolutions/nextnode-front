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
		sending: 'Envoi en cours...',
		sent: 'Envoyé !',
		successMessage:
			'Votre demande de projet a été envoyée avec succès ! Nous vous recontacterons sous 24h.',
		errorMessage:
			"Échec de l'envoi de votre demande. Veuillez réessayer ou nous contacter directement.",
	},
	professionalModal: {
		title: 'Projet Professionnel - Demande de Devis',
		description:
			'Nous comprenons les besoins spécifiques des entreprises. Partagez-nous vos exigences pour recevoir une proposition personnalisée.',
		selectedPlan: 'Plan sélectionné :',
		form: {
			companyName: "Nom de l'entreprise",
			companyNamePlaceholder: 'Nom de votre entreprise',
			sector: "Secteur d'activité",
			sectorPlaceholder: 'Ex: E-commerce, Santé, Finance...',
			employees: "Nombre d'employés",
			employeesPlaceholder: 'Sélectionnez la taille de votre entreprise',
			employeeOptions: {
				'1-10': '1-10 employés',
				'11-50': '11-50 employés',
				'51-200': '51-200 employés',
				'200+': '200+ employés',
			},
			currentWebsite: 'Site web actuel',
			currentWebsitePlaceholder:
				'https://votre-site-actuel.com (optionnel)',
			budget: 'Budget prévu',
			budgetPlaceholder: 'Sélectionnez votre fourchette budgétaire',
			timeline: 'Délai souhaité',
			timelinePlaceholder: 'Quand souhaitez-vous démarrer ?',
			timelineOptions: {
				urgent: 'Urgent (< 1 mois)',
				'1-3months': '1-3 mois',
				'3-6months': '3-6 mois',
				'6months+': '6+ mois',
			},
			expectedTraffic: 'Trafic attendu',
			expectedTrafficPlaceholder: 'Nombre de visiteurs/mois estimé',
			trafficOptions: {
				low: '< 1 000 visiteurs/mois',
				medium: '1 000 - 10 000 visiteurs/mois',
				high: '10 000 - 100 000 visiteurs/mois',
				'very-high': '100 000+ visiteurs/mois',
			},
			hasTechnicalContact: 'Équipe technique interne',
			technicalOptions: {
				non: 'Non',
				oui: 'Oui, nous avons une équipe technique',
				externe: 'Oui, via un prestataire externe',
			},
			needsIntegrations: 'Intégrations nécessaires',
			integrationOptions: {
				non: 'Non',
				'oui-simple': 'Oui, intégrations simples (CRM, Email)',
				'oui-complexe':
					'Oui, intégrations complexes (ERP, APIs custom)',
			},
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
