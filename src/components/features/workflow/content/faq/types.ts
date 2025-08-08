export interface FAQQuestion {
	id: string
	question: string
	answer: string
	icon: string
	category: string
}

export interface FAQCategory {
	id: string
	name: string
	icon: string
}

export type FAQCategoryId =
	| 'all'
	| 'performance'
	| 'architecture'
	| 'security'
	| 'integration'
	| 'quality'
	| 'seo'
