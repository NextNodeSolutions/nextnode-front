import { type ReactNode } from 'react'

import { useFAQState, type UseFAQStateReturn } from './hooks'

import type { FAQQuestion, FAQCategory } from './types'

interface FAQInteractionsProps {
	questions: FAQQuestion[]
	categories: FAQCategory[]
	children: (
		props: UseFAQStateReturn & { categories: FAQCategory[] },
	) => ReactNode
}

/**
 * Modern FAQ interactions using React hooks instead of DOM manipulation
 * Provides state management and search functionality
 */
export const FAQInteractions = ({
	questions,
	categories,
	children,
}: FAQInteractionsProps): ReactNode => {
	const faqState = useFAQState(questions)

	return children({
		...faqState,
		categories,
	})
}

export default FAQInteractions
