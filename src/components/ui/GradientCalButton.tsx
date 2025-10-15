import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

import CalEmbed from '@/components/ui/CalEmbed'
import { cn } from '@/lib/core/utils'

import type { Locale } from '@/types/i18n'

/**
 * Gradient button variants using class-variance-authority
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

		// Common size & responsiveness (all variants)
		'px-6 py-3 text-sm',
		'sm:px-8 sm:py-4 sm:text-base',
		'hover:scale-105',
	],
	{
		variants: {
			/**
			 * Gradient animation variants
			 * - hero: Speeds up animation on hover (3s → 2s)
			 * - cta: Switches to static blue gradient on hover
			 */
			gradient: {
				hero: 'hover:before:animate-[gradient-shift_2s_ease_infinite]',
				cta: [
					'hover:before:from-brand-blue',
					'hover:before:via-brand-blue',
					'hover:before:to-brand-blue-muted',
					'hover:before:animate-none',
				],
			},

			/**
			 * Size variants with responsive breakpoints
			 * - default: Standard size with xl shadow
			 * - large: Larger padding on lg+ screens with 2xl shadow
			 */
			size: {
				default: [
					'shadow-xl',
					'md:text-lg',
					'hover:shadow-2xl hover:shadow-blue-500/50',
				],
				large: [
					'shadow-2xl',
					'lg:px-10 lg:py-[1.125rem] lg:text-lg',
					'hover:shadow-[0_0_40px_rgba(59,130,246,0.5),0_20px_25px_-5px_rgb(0_0_0/0.2)]',
				],
			},
		},
		defaultVariants: {
			gradient: 'hero',
			size: 'default',
		},
	},
)

export interface GradientCalButtonProps
	extends VariantProps<typeof buttonVariants> {
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
 * Unified gradient Cal.com button component
 *
 * Uses class-variance-authority (CVA) for variant management.
 * This is the ONLY exception where Tailwind classes in constants are allowed per CLAUDE.md.
 *
 * Features:
 * - 100% Tailwind classes with organized CVA variants
 * - Two gradient behaviors: hero (speed up animation) and cta (switch to static)
 * - Two size presets: default and large with responsive breakpoints
 * - Zero custom CSS
 *
 * @example
 * // Hero section usage
 * <GradientCalButton
 *   calLink="walid-mos"
 *   buttonText={t('home.hero.cta')}
 *   locale={locale}
 *   variant="hero"
 *   size="default"
 * />
 *
 * @example
 * // CTA section usage
 * <GradientCalButton
 *   calLink="walid-mos"
 *   buttonText={t('home.cta.primaryButton')}
 *   locale={locale}
 *   variant="cta"
 *   size="large"
 * />
 */
export const GradientCalButton = ({
	calLink,
	buttonText,
	locale,
	gradient,
	size,
	className,
}: GradientCalButtonProps) => {
	return (
		<CalEmbed
			calLink={calLink}
			mode="popup"
			buttonText={buttonText}
			locale={locale}
			buttonClassName={cn(buttonVariants({ gradient, size }), className)}
		/>
	)
}

export default GradientCalButton
