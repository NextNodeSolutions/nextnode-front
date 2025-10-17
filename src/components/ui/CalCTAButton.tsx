import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

import CalEmbed from '@/components/ui/CalEmbed'
import { cn } from '@/lib/core/utils'

import type { Locale } from '@/types/i18n'

/**
 * Button variants using class-variance-authority
 * This is the ONLY allowed usage of Tailwind classes in constants per CLAUDE.md
 */
const buttonVariants = cva(
	// Base classes - common to all variants
	[
		// Structure
		'relative overflow-hidden rounded-xl',
		'font-bold text-white',
		'transition-all duration-300',
		'!bg-transparent',

		// Pseudo-elements base
		'before:absolute before:inset-0 before:-z-10',
		'before:bg-gradient-to-r',
		'before:bg-[length:200%_200%]',

		'after:absolute after:inset-0 after:rounded-xl',
		'after:border-2 after:border-white/20',
		'after:pointer-events-none',

		// Content layout
		'flex items-center justify-center gap-2',

		// Common gradient colors (all variants)
		'before:from-brand-blue before:via-brand-green-muted before:to-brand-green',
		'before:animate-[gradient-shift_3s_ease_infinite]',

		// Hover: switch to static blue gradient (all buttons)
		'hover:before:from-brand-blue',
		'hover:before:via-brand-blue',
		'hover:before:to-brand-blue-muted',
		'hover:before:animate-none',

		// Common size & responsiveness (all variants)
		'px-6 py-3 text-sm',
		'sm:px-8 sm:py-4 sm:text-base',
		'hover:scale-105',
	],
	{
		variants: {
			/**
			 * Visual variants for different contexts
			 * - hero: Standard variant for hero sections with xl shadow
			 * - cta: Larger variant for CTA sections with 2xl shadow
			 */
			variant: {
				hero: [
					'shadow-xl',
					'md:text-lg',
					'hover:shadow-2xl hover:shadow-blue-500/50',
				],
				cta: [
					'shadow-2xl',
					'lg:px-10 lg:py-[1.125rem] lg:text-lg',
					'hover:shadow-[0_0_40px_rgba(59,130,246,0.5),0_20px_25px_-5px_rgb(0_0_0/0.2)]',
				],
			},
		},
		defaultVariants: {
			variant: 'hero',
		},
	},
)

export interface CalCTAButtonProps extends VariantProps<typeof buttonVariants> {
	/** Cal.com username/link (e.g., 'walid-mos') */
	calLink: string
	/** Button text */
	buttonText: string
	/** Locale for i18n */
	locale: Locale
	/** Additional custom classes */
	className?: string
}

/**
 * Unified Cal.com CTA button component
 *
 * Uses class-variance-authority (CVA) for variant management.
 * This is the ONLY exception where Tailwind classes in constants are allowed per CLAUDE.md.
 *
 * Features:
 * - 100% Tailwind classes with organized CVA variants
 * - Animated gradient (3s) that switches to static blue on hover
 * - Two visual variants: hero and cta with responsive breakpoints
 * - Zero custom CSS
 *
 * @example
 * // Hero section usage
 * <CalCTAButton
 *   calLink="walid-mos"
 *   buttonText={t('home.hero.cta')}
 *   locale={locale}
 *   variant="hero"
 * />
 *
 * @example
 * // CTA section usage (large variant)
 * <CalCTAButton
 *   calLink="walid-mos"
 *   buttonText={t('home.cta.primaryButton')}
 *   locale={locale}
 *   variant="cta"
 * />
 */
export const CalCTAButton = ({
	calLink,
	buttonText,
	locale,
	variant,
	className,
}: CalCTAButtonProps) => {
	return (
		<CalEmbed
			calLink={calLink}
			mode="popup"
			buttonText={buttonText}
			locale={locale}
			buttonClassName={cn(buttonVariants({ variant }), className)}
		/>
	)
}

export default CalCTAButton
