import React, { useState } from 'react'

import { cn } from '@/lib/core/utils'

import { ProfessionalProjectModalContent } from './ProfessionalProjectModalContent'

interface ProfessionalProjectModalProps {
	className?: string
	locale?: string
	plan: 'business' | 'enterprise'
	buttonText: string
	buttonStyle: string
}

export const ProfessionalProjectModal = ({
	className,
	locale,
	plan,
	buttonText,
	buttonStyle,
}: ProfessionalProjectModalProps): React.ReactElement => {
	const [isOpen, setIsOpen] = useState(false)

	const handleClick = (): void => {
		setIsOpen(true)
	}

	return (
		<div className={className}>
			<button
				onClick={handleClick}
				className={cn(
					'block w-full rounded-lg px-6 py-3 text-center font-semibold text-white',
					buttonStyle,
					'cursor-pointer shadow-lg transition-all duration-300',
					'hover:scale-105 hover:shadow-xl',
					'focus:ring-2 focus:ring-offset-2 focus:outline-none',
					'dark:focus:ring-offset-gray-800',
				)}
			>
				{buttonText}
			</button>

			<ProfessionalProjectModalContent
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				locale={locale}
				plan={plan}
			/>
		</div>
	)
}
