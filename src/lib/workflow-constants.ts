// Types for the workflow
export interface StepConfig {
	icon: string
	color: string
}

export interface Position {
	x: number
	y: number
	cardX: number
	cardY: number
	lineEndX: number
	lineEndY: number
}

export interface GradientStop {
	offset: string
	color: string
	opacity: string
}

export interface Step {
	key: string
	title: string
	number: string
	icon: string
}

// Interface for detailed steps used in workflow-step.astro
export interface DetailedStep {
	id: string
	title: string
	number: string
	description: string
	details: readonly string[]
	deliverables: string
	duration: string
	icon: string
}

// Step keys in order (pre-computed for performance)
export const STEP_KEYS = [
	'discovery',
	'design',
	'development',
	'testing',
	'deployment',
	'support',
] as const

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

// Desktop positions for StepCard (220x120px) with straight lines
// Those positions are perfect, do not move them
export const DESKTOP_WORKFLOW_POSITIONS: Position[] = [
	{ x: 80, y: 60, cardX: 0, cardY: -60, lineEndX: 80, lineEndY: 10 },
	{ x: 350, y: 75, cardX: 320, cardY: -40, lineEndX: 350, lineEndY: 10 },
	{ x: 510, y: 140, cardX: 680, cardY: 180, lineEndX: 560, lineEndY: 140 },
	{ x: 205, y: 220, cardX: -10, cardY: 290, lineEndX: 160, lineEndY: 220 },
	{ x: 480, y: 252, cardX: 480, cardY: 490, lineEndX: 480, lineEndY: 310 },
	{ x: 880, y: 385, cardX: 960, cardY: 335, lineEndX: 880, lineEndY: 325 },
]

// Utility function to generate gradient stops
export const generateGradientStops = (
	colors: readonly string[],
): GradientStop[] =>
	colors.map((color: string, i: number) => ({
		offset: `${i * 20}%`,
		color,
		opacity: '0.8',
	}))
