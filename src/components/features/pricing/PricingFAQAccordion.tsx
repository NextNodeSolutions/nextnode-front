import React from 'react'

import { cn } from '@/lib/core/utils'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQItem {
	question: string
	answer: string
}

interface PricingFAQAccordionProps {
	questions: readonly FAQItem[]
	className?: string
}

export const PricingFAQAccordion = ({
	questions,
	className,
}: PricingFAQAccordionProps): React.ReactElement => (
	<div className={cn('space-y-4', className)}>
		<Accordion type="single" collapsible className="w-full">
			{questions.map((faq, index) => (
				<AccordionItem
					key={index}
					value={`item-${index}`}
					className={cn(
						'rounded-2xl border border-gray-200/50',
						'bg-white/80 backdrop-blur-sm',
						'dark:border-gray-700/50 dark:bg-gray-800/80',
						'transition-all duration-300',
						'hover:border-gray-300/60 hover:shadow-lg',
						'dark:hover:border-gray-600/60',
						'animate-fade-in-up opacity-0',
						'mb-4 border-b-0 last:mb-0',
					)}
					style={{ animationDelay: `${(index + 1) * 100}ms` }}
				>
					<AccordionTrigger
						className={cn(
							'px-6 py-6 text-left text-lg font-semibold',
							'text-gray-900 dark:text-white',
							'hover:no-underline',
							'[&[data-state=open]>svg]:rotate-180',
						)}
					>
						{faq.question}
					</AccordionTrigger>
					<AccordionContent className="px-6 pb-6">
						<p className="leading-relaxed text-gray-600 dark:text-gray-300">
							{faq.answer}
						</p>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	</div>
)
