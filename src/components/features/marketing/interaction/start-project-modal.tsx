import React, { useState } from 'react'

import { cn } from '@/lib/core/utils'
import { useI18n } from '@/lib/i18n/i18n-client'
import { Button } from '@/components/ui/forms/button'

import { StartProjectModalContent } from './StartProjectModalContent'

interface StartProjectModalProps {
	className?: string
	locale?: string
}

export const StartProjectModal = ({
	className,
	locale,
}: StartProjectModalProps): React.ReactElement => {
	const { t } = useI18n(locale)
	const [isOpen, setIsOpen] = useState(false)

	const handleClick = (): void => {
		setIsOpen(true)
	}

	return (
		<div className={className}>
			<Button
				variant="default"
				onClick={handleClick}
				className={cn(
					'btn-gradient-primary group w-full cursor-pointer px-4 py-6',
					'hover-lift shadow-lg transition-shadow hover:shadow-2xl',
					'text-base font-bold tracking-wide text-white',
					'sm:px-6 sm:py-6 sm:text-lg',
					'md:px-8 md:py-6 md:text-lg',
					'flex-center gap-2',
					'hover:animate-pulse-dark',
				)}
			>
				<span
					className={cn(
						'transition-transform',
						'uppercase group-hover:-translate-x-2',
					)}
				>
					{t('home.hero.startProjectButton')}
				</span>
				<span
					className={cn(
						'opacity-0 transition-all duration-300',
						'group-hover:translate-x-2 group-hover:opacity-100',
					)}
				>
					→
				</span>
			</Button>

			<StartProjectModalContent
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				locale={locale}
			/>
		</div>
	)
}
