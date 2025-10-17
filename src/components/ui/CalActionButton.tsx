import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

import CalEmbed from '@/components/ui/CalEmbed'
import { cn } from '@/lib/core/utils'

import type { Locale } from '@/types/i18n'

/**
 * Button variants using class-variance-authority
 * This is the ONLY allowed usage of Tailwind classes in constants per CLAUDE.md
 *
 * Clean architecture with separated concerns:
 * - variant: Usage context (hero/cta/pricing) → visual styles only
 * - size: Button sizing (sm/md/lg/xl) → padding, text size, responsive
 * - gradient: Color theme (default/blue/green/dark)
 * - compoundVariants: Apply specific gradients for pricing cards
 */
const buttonVariants = cva(
	// Base: Pseudo-elements, default gradient, transitions, layout
	[
		// Structure
		'group relative overflow-hidden',
		'w-full',
		'text-white',
		'transition-all duration-300',
		'!bg-transparent',

		// Pseudo-elements
		'before:absolute before:inset-0 before:-z-10',
		'before:bg-gradient-to-r',
		'before:bg-[length:200%_200%]',
		'before:animate-[gradient-shift_3s_ease_infinite]',

		'after:absolute after:inset-0',
		'after:pointer-events-none',

		// Layout
		'flex items-center justify-center',

		// Default gradient (blue-green generic)
		'before:from-brand-blue before:via-brand-green-muted before:to-brand-green',

		// Hover
		'hover:before:from-brand-blue',
		'hover:before:via-brand-blue',
		'hover:before:to-brand-blue-muted',
		'hover:before:animate-none',
		'sm:hover:scale-105',
	],
	{
		variants: {
			// Usage context - VISUAL STYLES ONLY
			variant: {
				hero: [
					'rounded-xl',
					'font-bold',
					'gap-2 sm:w-fit',
					'after:rounded-xl after:border-2 after:border-white/20',
					'shadow-xl',
					'hover:shadow-2xl hover:shadow-blue-500/50',
				],
				cta: [
					'rounded-xl',
					'font-bold',
					'gap-2',
					'after:rounded-xl after:border-2 after:border-white/20',
					'shadow-2xl',
					'hover:shadow-[0_0_40px_rgba(59,130,246,0.5),0_20px_25px_-5px_rgb(0_0_0/0.2)]',
				],
				pricing: [
					'rounded-md',
					'font-semibold',
					'gap-1',
					'after:rounded-md after:border after:border-white/20',
					'shadow-sm',
					'hover:shadow-md hover:shadow-blue-500/20',
				],
			},
			// Button sizing - PADDING & TEXT SIZE
			size: {
				sm: ['px-4 py-2 text-sm', 'sm:px-5 sm:py-2.5 sm:text-base'],
				md: ['px-6 py-3 text-base', 'sm:px-8 sm:py-4 sm:text-lg'],
				lg: ['px-8 py-4 text-lg', 'sm:px-10 sm:py-5 sm:text-xl'],
				xl: ['px-10 py-5 text-xl', 'sm:px-12 sm:py-6 sm:text-2xl'],
			},
			// Color theme (optional, for pricing cards)
			gradient: {
				default: '',
				blue: '',
				green: '',
				dark: '',
			},
		},
		compoundVariants: [
			// Blue gradient (Starter plan)
			{
				variant: 'pricing',
				gradient: 'blue',
				class: [
					'before:from-brand-blue before:via-brand-blue-muted before:to-brand-blue-dark',
					'hover:before:from-brand-blue hover:before:via-brand-blue hover:before:to-brand-blue-muted',
				],
			},
			// Green gradient (Business plan)
			{
				variant: 'pricing',
				gradient: 'green',
				class: [
					'before:from-brand-green before:via-brand-green-muted before:to-brand-green-dark',
					'hover:before:from-brand-green hover:before:via-brand-green hover:before:to-brand-green-muted',
				],
			},
			// Dark gradient (Enterprise plan)
			{
				variant: 'pricing',
				gradient: 'dark',
				class: [
					'before:from-brand-blue-dark before:via-brand-green-muted before:to-brand-green-dark',
					'hover:before:from-brand-blue-dark hover:before:via-brand-blue-dark hover:before:to-brand-blue',
				],
			},
		],
		defaultVariants: {
			variant: 'hero',
			size: 'md',
			gradient: 'default',
		},
	},
)

export interface CalActionButtonProps
	extends VariantProps<typeof buttonVariants> {
	/** Cal.com username/link (e.g., 'walid-mos') */
	calLink: string
	/** Button text */
	buttonText: string
	/** Locale for i18n */
	locale: Locale
	/** Show animated arrow on hover */
	showArrow?: boolean
	/** Additional custom classes */
	className?: string
}

/**
 * Cal.com action button with clean CVA architecture
 *
 * Usage contexts:
 * - Hero sections (home, pricing): variant="hero"
 * - CTA section (home): variant="cta"
 * - Pricing cards: variant="pricing" gradient="blue|green|dark"
 *
 * @example
 * // Hero section (home/pricing)
 * <CalActionButton
 *   calLink="walid-mos"
 *   buttonText={t('pricing.hero.cta.button')}
 *   locale={locale}
 *   variant="hero"
 * />
 *
 * @example
 * // CTA section (home)
 * <CalActionButton
 *   calLink="walid-mos"
 *   buttonText={t('home.cta.primaryButton')}
 *   locale={locale}
 *   variant="cta"
 * />
 *
 * @example
 * // Pricing card (compact with specific gradient)
 * <CalActionButton
 *   calLink="walid-mos"
 *   buttonText={planData.cta}
 *   locale={locale}
 *   variant="pricing"
 *   gradient="blue"
 * />
 */
export const CalActionButton = ({
	calLink,
	buttonText,
	locale,
	variant,
	size,
	gradient,
	showArrow = false,
	className,
}: CalActionButtonProps) => {
	const buttonContent = showArrow ? (
		<>
			<span className="transition-transform group-hover:-translate-x-2">
				{buttonText}
			</span>
			<span className="opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">
				→
			</span>
		</>
	) : (
		buttonText
	)

	return (
		<CalEmbed
			calLink={calLink}
			mode="popup"
			locale={locale}
			buttonClassName={cn(
				buttonVariants({ variant, size, gradient }),
				className,
			)}
			ariaLabel={buttonText}
		>
			{buttonContent}
		</CalEmbed>
	)
}

export default CalActionButton
