import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

/**
 * Glass Panel CVA Variants
 *
 * Multi-variant glassmorphic panel component with:
 * - 4 intensity levels (subtle → strong)
 * - 3 elevation levels (flat → floating)
 * - 3 padding sizes (tight → spacious)
 * - Optional border styling
 */
export const glassPanelVariants = cva(
	// Base classes: structure and transitions
	['relative', 'rounded-2xl', 'transition-all duration-300'],
	{
		variants: {
			/**
			 * Glass intensity: blur and background opacity
			 * Follows multi-layer glassmorphic design system
			 */
			intensity: {
				subtle: [
					'backdrop-blur-sm',
					'bg-white/30 dark:bg-brand-charcoal/35',
					'border border-white/20 dark:border-white/15',
				],
				light: [
					'backdrop-blur-md',
					'bg-white/50 dark:bg-brand-charcoal/60',
					'border border-white/30 dark:border-white/20',
				],
				medium: [
					'backdrop-blur-lg',
					'bg-white/60 dark:bg-brand-charcoal/70',
					'border border-white/40 dark:border-white/25',
				],
				strong: [
					'backdrop-blur-xl',
					'bg-white/70 dark:bg-brand-charcoal/80',
					'border border-white/50 dark:border-white/30',
				],
			},

			/**
			 * Elevation: shadow depth for visual hierarchy
			 */
			elevation: {
				flat: ['shadow-sm'],
				lifted: ['shadow-lg'],
				floating: ['shadow-2xl'],
			},

			/**
			 * Padding size: internal spacing
			 */
			padding: {
				none: ['p-0'],
				tight: ['p-4'],
				comfortable: ['p-6'],
				spacious: ['p-8'],
				generous: ['p-12'],
			},

			/**
			 * Border style: visual treatment
			 */
			borderStyle: {
				none: ['border-0'],
				subtle: ['border border-white/10 dark:border-white/5'],
				normal: ['border border-white/20 dark:border-white/15'],
				prominent: ['border-2 border-white/30 dark:border-white/25'],
			},

			/**
			 * Hover behavior: interactive response
			 */
			interactive: {
				none: [],
				lift: [
					'hover:shadow-xl',
					'hover:bg-white/25 dark:hover:bg-brand-charcoal/30',
					'hover:-translate-y-1',
					'cursor-pointer',
				],
				glow: [
					'hover:shadow-2xl',
					'hover:border-white/40 dark:hover:border-white/30',
					'cursor-pointer',
				],
				scale: ['hover:scale-[1.02]', 'cursor-pointer'],
			},
		},

		/**
		 * Compound variants: combinations for specific use cases
		 */
		compoundVariants: [
			{
				intensity: 'strong',
				elevation: 'floating',
				class: 'shadow-[0_32px_64px_rgba(0,0,0,0.2)]',
			},
			{
				interactive: 'lift',
				elevation: 'floating',
				class: 'hover:shadow-[0_40px_80px_rgba(0,0,0,0.25)]',
			},
			{
				padding: 'none',
				borderStyle: 'none',
				class: 'overflow-hidden',
			},
		],

		/**
		 * Default variant values
		 */
		defaultVariants: {
			intensity: 'medium',
			elevation: 'lifted',
			padding: 'comfortable',
			borderStyle: 'normal',
			interactive: 'none',
		},
	},
)

/** TypeScript type for component props */
export type GlassPanelVariants = VariantProps<typeof glassPanelVariants>
