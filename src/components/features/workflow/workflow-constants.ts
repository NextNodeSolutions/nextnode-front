// Import types from centralized location

import type { CardDirection } from './cards/step-card-variants'

import type { StepKey } from '@/types/i18n'
import type {
	GradientStop,
	StepConfig,
	WorkflowPosition,
} from '@/types/workflow'

// Step keys in order (pre-computed for performance)
export const STEP_KEYS = [
	'discovery',
	'design',
	'development',
	'testing',
	'deployment',
	'support',
] as const satisfies readonly StepKey[]

// Colors for each step (pre-computed for performance)
export const STEP_COLORS = [
	'#6366f1', // discovery
	'#8b5cf6', // design
	'#10b981', // development
	'#f59e0b', // testing
	'#ef4444', // deployment
	'#6b7280', // support
] as const

// Icons for each step
const STEP_ICONS = [
	'🔍', // discovery
	'🎨', // design
	'⚡', // development
	'🧪', // testing
	'🚀', // deployment
	'🛠️', // support
] as const

// Workflow steps configuration (built from arrays above - DRY principle)
export const STEP_CONFIG: Record<string, StepConfig> = {
	discovery: { icon: STEP_ICONS[0], color: STEP_COLORS[0] },
	design: { icon: STEP_ICONS[1], color: STEP_COLORS[1] },
	development: { icon: STEP_ICONS[2], color: STEP_COLORS[2] },
	testing: { icon: STEP_ICONS[3], color: STEP_COLORS[3] },
	deployment: { icon: STEP_ICONS[4], color: STEP_COLORS[4] },
	support: { icon: STEP_ICONS[5], color: STEP_COLORS[5] },
} as const

// Desktop positions for StepCard with straight lines
// Cards positioned based on line direction
export const DESKTOP_WORKFLOW_POSITIONS: WorkflowPosition[] = [
	{ x: 80, y: 60, lineEndX: 80, lineEndY: -10 },
	{ x: 350, y: 75, lineEndX: 350, lineEndY: 10 },
	{ x: 510, y: 140, lineEndX: 560, lineEndY: 140 },
	{ x: 205, y: 220, lineEndX: 160, lineEndY: 220 },
	{ x: 480, y: 252, lineEndX: 480, lineEndY: 310 },
	{ x: 880, y: 385, lineEndX: 880, lineEndY: 325 },
]

/**
 * Card direction configuration based on workflow line arrival direction
 * Determines flex alignment within container based on where the workflow line connects
 *
 * Analysis of DESKTOP_WORKFLOW_POSITIONS:
 * - Step 1 (discovery): Line goes up (y: 60 → -10) → 'top' (line arrives from top)
 * - Step 2 (design): Line goes up (y: 75 → 10) → 'top' (line arrives from top)
 * - Step 3 (development): Line goes right (x: 510 → 560) → 'right' (line arrives from right)
 * - Step 4 (testing): Line goes left (x: 205 → 160) → 'left' (line arrives from left)
 * - Step 5 (deployment): Line goes down (y: 252 → 310) → 'bottom' (line arrives from bottom)
 * - Step 6 (support): Line goes up (y: 385 → 325) → 'top' (line arrives from top)
 */
export const STEP_DIRECTIONS: readonly CardDirection[] = [
	'bottom', // Step 1
	'bottom', // Step 2
	'right', // Step 3
	'left', // Step 4
	'top', // Step 5
	'bottom', // Step 6
] as const

// Utility function to generate gradient stops
export const generateGradientStops = (
	colors: readonly string[],
): GradientStop[] =>
	colors.map((color: string, i: number) => ({
		offset: `${i * 20}%`,
		color,
		opacity: '0.8',
	}))
