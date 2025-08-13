/**
 * Pricing plan constants and styling configurations
 * Centralized configuration for consistent theming across pricing components
 */

import type { Plan } from '../types/plans'

export const PLAN_THEMES = {
	starter: {
		name: 'starter',
		gradient: 'from-blue-500 to-cyan-500',
		ring: 'ring-blue-500/20',
		shadow: 'shadow-blue-500/25',
		button: 'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
		focus: 'focus:ring-blue-500',
		colors: {
			primary: '#3b82f6', // blue-500
			secondary: '#06b6d4', // cyan-500
		},
	},
	business: {
		name: 'business',
		gradient: 'from-indigo-500 to-violet-500',
		ring: 'ring-indigo-500/20',
		shadow: 'shadow-indigo-500/25',
		button: 'from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700',
		focus: 'focus:ring-indigo-500',
		colors: {
			primary: '#6366f1', // indigo-500
			secondary: '#8b5cf6', // violet-500
		},
	},
	enterprise: {
		name: 'enterprise',
		gradient: 'from-violet-500 to-fuchsia-500',
		ring: 'ring-violet-500/20',
		shadow: 'shadow-violet-500/25',
		button: 'from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700',
		focus: 'focus:ring-violet-500',
		colors: {
			primary: '#8b5cf6', // violet-500
			secondary: '#d946ef', // fuchsia-500
		},
	},
} as const

export type { Plan as PlanType } from '../types/plans'

/**
 * CSS custom properties for plan themes
 * Can be used in CSS for dynamic theming
 */
export function getPlanCSSVars(plan: Plan): Record<string, string> {
	const theme = PLAN_THEMES[plan]
	return {
		'--plan-primary': theme.colors.primary,
		'--plan-secondary': theme.colors.secondary,
		'--plan-gradient': `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
	}
}

/**
 * Common pricing card classes
 */
export const PRICING_CARD_CLASSES = {
	base: [
		'relative flex flex-col h-full',
		'rounded-2xl border border-gray-200/50',
		'bg-white/80 backdrop-blur-sm',
		'dark:border-gray-700/50 dark:bg-gray-800/80',
		'transition-all duration-500 hover:scale-105',
		'opacity-0 animate-fade-in-up',
	],
	featured: ['scale-105 lg:scale-110', 'shadow-2xl', 'dark:shadow-none'],
	content: {
		padding: 'p-6 lg:p-8',
		spacing: 'space-y-3',
	},
} as const

/**
 * Animation configurations
 */
export const ANIMATION_CONFIG = {
	stagger: {
		base: 150, // ms
		cards: 200, // ms
	},
	duration: {
		fast: 300, // ms
		normal: 500, // ms
		slow: 800, // ms
	},
} as const
