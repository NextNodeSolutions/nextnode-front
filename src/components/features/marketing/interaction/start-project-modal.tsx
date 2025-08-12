import React, { useState } from 'react'

import { cn } from '@/lib/core/utils'
import { useI18n } from '@/lib/i18n/react'
import { Button } from '@/components/ui/forms/button'
import { PLAN_THEMES, type PlanType } from '@/lib/ui/pricing-constants'

import { StartProjectModalContent } from './StartProjectModalContent'

import type { Locale } from '@/lib/i18n/types'


interface StartProjectModalProps {
	className?: string
	locale?: Locale
	buttonText?: string
	plan?: PlanType
}

export const StartProjectModal = ({
	className,
	locale,
	buttonText,
	plan,
}: StartProjectModalProps): React.ReactElement => {
	const { t } = useI18n(locale)
	const [isOpen, setIsOpen] = useState(false)
	const planTheme = plan ? PLAN_THEMES[plan] : null

	const handleClick = (): void => {
		setIsOpen(true)
	}

	return (
		<div className={className}>
			{buttonText ? (
				<Button
					variant="default"
					onClick={handleClick}
					className={cn(
						'block w-full rounded-lg px-6 py-3 text-center font-semibold text-white',
						'shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl',
						'focus:ring-2 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-800',
						`bg-gradient-to-r ${planTheme?.button}`,
						`${planTheme?.focus}`,
					)}
				>
					{buttonText}
				</Button>
			) : (
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
			)}

			<StartProjectModalContent
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				locale={locale}
			/>
		</div>
	)
}
