import { cva, type VariantProps } from 'class-variance-authority'

export const cardVariants = cva(
	// Base classes
	[
		'relative overflow-hidden rounded-xl transition-all duration-300',
		'border border-gray-200 dark:border-gray-700',
		'bg-white dark:bg-gray-800',
		'group',
	],
	{
		variants: {
			// Size variants
			variant: {
				mini: 'p-2',
				compact: 'p-3',
				standard: 'p-6',
				large: 'p-8',
			},
			// Layout variants
			layout: {
				simple: 'flex flex-col',
				'with-header': 'overflow-hidden',
				'with-icon': 'flex items-start gap-4',
				split: 'grid grid-cols-1 md:grid-cols-2 gap-4',
			},
			// Hover effects
			hover: {
				none: '',
				'lift-sm': 'hover:scale-[1.02] hover:shadow-md',
				lift: 'hover:scale-[1.03] hover:shadow-lg hover:-translate-y-1',
				'lift-lg':
					'hover:scale-[1.05] hover:shadow-xl hover:-translate-y-2',
			},
			// Glassmorphic effect
			glassmorphic: {
				false: '',
				true: [
					'backdrop-blur-md bg-white/70 dark:bg-gray-800/70',
					'border-white/20 dark:border-gray-700/30',
					'shadow-xl',
				],
			},
			// Clickable state
			clickable: {
				false: '',
				true: 'cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none',
			},
			// Disabled state
			disabled: {
				false: '',
				true: 'opacity-50 cursor-not-allowed pointer-events-none',
			},
		},
		defaultVariants: {
			variant: 'standard',
			layout: 'simple',
			hover: 'lift',
			glassmorphic: false,
			clickable: false,
			disabled: false,
		},
	},
)

export const titleVariants = cva(
	'font-semibold text-gray-900 dark:text-white',
	{
		variants: {
			variant: {
				mini: 'text-sm',
				compact: 'text-base',
				standard: 'text-xl',
				large: 'text-2xl',
			},
		},
		defaultVariants: {
			variant: 'standard',
		},
	},
)

export const descriptionVariants = cva('text-gray-600 dark:text-gray-300', {
	variants: {
		variant: {
			mini: 'text-xs',
			compact: 'text-sm',
			standard: 'text-base',
			large: 'text-lg',
		},
	},
	defaultVariants: {
		variant: 'standard',
	},
})

export const iconVariants = cva('flex-shrink-0', {
	variants: {
		variant: {
			mini: 'h-6 w-6 text-base',
			compact: 'h-8 w-8 text-lg',
			standard: 'h-12 w-12 text-2xl',
			large: 'h-16 w-16 text-3xl',
		},
	},
	defaultVariants: {
		variant: 'standard',
	},
})

export const spacingVariants = cva('', {
	variants: {
		variant: {
			mini: 'space-y-1',
			compact: 'space-y-2',
			standard: 'space-y-4',
			large: 'space-y-6',
		},
	},
	defaultVariants: {
		variant: 'standard',
	},
})

export type CardVariantsProps = VariantProps<typeof cardVariants>
export type TitleVariantsProps = VariantProps<typeof titleVariants>
export type DescriptionVariantsProps = VariantProps<typeof descriptionVariants>
export type IconVariantsProps = VariantProps<typeof iconVariants>
export type SpacingVariantsProps = VariantProps<typeof spacingVariants>
