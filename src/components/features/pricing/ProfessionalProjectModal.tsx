import React, { useState } from 'react'

import { cn } from '@/lib/core/utils'
import { Button } from '@/components/ui/forms/button'
import { PLAN_THEMES } from '@/lib/ui/pricing-constants'

import { ProfessionalProjectModalContent } from './ProfessionalProjectModalContent'

interface ProfessionalProjectModalProps {
	className?: string
	plan: 'business' | 'enterprise'
	buttonText: string
}

export const ProfessionalProjectModal = ({
	className,
	plan,
	buttonText,
}: ProfessionalProjectModalProps): React.ReactElement => {
	const [isOpen, setIsOpen] = useState(false)
	const planTheme = PLAN_THEMES[plan]

	const handleClick = (): void => {
		setIsOpen(true)
	}

	return (
		<div className={className}>
			<Button
				variant="default"
				onClick={handleClick}
				className={cn(
					'block w-full rounded-lg px-6 py-3 text-center font-semibold text-white',
					'shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl',
					'focus:ring-2 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-800',
					`bg-gradient-to-r ${planTheme.button}`,
					`${planTheme.focus}`,
				)}
			>
				{buttonText}
			</Button>

			<ProfessionalProjectModalContent
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				plan={plan}
			/>
		</div>
	)
}
