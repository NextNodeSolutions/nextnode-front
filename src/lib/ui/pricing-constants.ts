/**
 * Pricing plan constants and styling configurations
 * Centralized configuration for consistent theming across pricing components
 * Uses the global blue/green theme system from global.css
 */

import type { Plan } from '@/types/plans'

export const PLAN_THEMES = {
	starter: {
		name: 'starter',
		gradient: 'from-brand-blue to-brand-blue-light',
		ring: 'ring-brand-blue/20',
		shadow: 'shadow-brand-blue/25',
		button: 'from-brand-blue to-brand-blue-dark hover:from-brand-blue-dark hover:to-brand-blue',
		focus: 'focus:ring-brand-blue',
		colors: {
			primary: 'var(--brand-blue)',
			secondary: 'var(--brand-blue-light)',
		},
	},
	business: {
		name: 'business',
		gradient: 'from-brand-green to-brand-green-light',
		ring: 'ring-brand-green/20',
		shadow: 'shadow-brand-green/25',
		button: 'from-brand-green to-brand-green-dark hover:from-brand-green-dark hover:to-brand-green',
		focus: 'focus:ring-brand-green',
		colors: {
			primary: 'var(--brand-green)',
			secondary: 'var(--brand-green-light)',
		},
	},
	enterprise: {
		name: 'enterprise',
		gradient: 'from-brand-blue-dark to-brand-green-dark',
		ring: 'ring-brand-blue-dark/20',
		shadow: 'shadow-brand-blue-dark/25',
		button: 'from-brand-blue-dark to-brand-green-dark hover:from-brand-blue hover:to-brand-green',
		focus: 'focus:ring-brand-blue-dark',
		colors: {
			primary: 'var(--brand-blue-dark)',
			secondary: 'var(--brand-green-dark)',
		},
	},
} as const

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
