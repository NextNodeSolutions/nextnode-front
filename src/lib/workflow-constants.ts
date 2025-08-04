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

// Workflow steps configuration
export const STEP_CONFIG: Record<string, StepConfig> = {
	discovery: { icon: '🔍', color: '#6366f1' },
	design: { icon: '🎨', color: '#8b5cf6' },
	development: { icon: '⚡', color: '#10b981' },
	testing: { icon: '🧪', color: '#f59e0b' },
	deployment: { icon: '🚀', color: '#ef4444' },
	support: { icon: '🛠️', color: '#6b7280' },
} as const

// Step keys in order
export const STEP_KEYS = Object.keys(
	STEP_CONFIG,
) as (keyof typeof STEP_CONFIG)[]

// Colors extracted from configuration
export const STEP_COLORS: string[] = Object.values(STEP_CONFIG).map(
	(config: StepConfig) => config.color,
)

// Desktop positions for StepCard (220x120px) with straight lines
// Those positions are perfect, do not move them
export const DESKTOP_WORKFLOW_POSITIONS: Position[] = [
	{ x: 80, y: 60, cardX: 0, cardY: -10, lineEndX: 80, lineEndY: 10 },
	{ x: 350, y: 75, cardX: 320, cardY: 0, lineEndX: 350, lineEndY: 20 },
	{ x: 510, y: 140, cardX: 680, cardY: 210, lineEndX: 560, lineEndY: 140 },
	{ x: 205, y: 220, cardX: -10, cardY: 310, lineEndX: 160, lineEndY: 220 },
	{ x: 480, y: 252, cardX: 480, cardY: 490, lineEndX: 480, lineEndY: 310 },
	{ x: 880, y: 385, cardX: 960, cardY: 365, lineEndX: 880, lineEndY: 325 },
]

// Utility function to generate gradient stops
export const generateGradientStops = (colors: string[]): GradientStop[] =>
	colors.map((color: string, i: number) => ({
		offset: `${i * 20}%`,
		color,
		opacity: '0.8',
	}))
