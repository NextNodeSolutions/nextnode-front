// Types pour le workflow
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

// Interface pour les étapes détaillées utilisées dans workflow-step.astro
export interface DetailedStep {
	id: string
	title: string
	number: string
	description: string
	details: string[]
	deliverables: string
	duration: string
	icon: string
}

// Configuration des étapes du workflow
export const STEP_CONFIG: Record<string, StepConfig> = {
	discovery: { icon: '🔍', color: '#6366f1' },
	design: { icon: '🎨', color: '#8b5cf6' },
	development: { icon: '⚡', color: '#10b981' },
	testing: { icon: '🧪', color: '#f59e0b' },
	deployment: { icon: '🚀', color: '#ef4444' },
	support: { icon: '🛠️', color: '#6b7280' },
} as const

// Clés des étapes dans l'ordre
export const STEP_KEYS = Object.keys(
	STEP_CONFIG,
) as (keyof typeof STEP_CONFIG)[]

// Couleurs extraites de la configuration
export const STEP_COLORS: string[] = Object.values(STEP_CONFIG).map(
	(config: StepConfig) => config.color,
)

// Positions des cards et lignes pour le workflow journey
export const WORKFLOW_POSITIONS: Position[] = [
	{ x: 80, y: 60, cardX: 50, cardY: -30, lineEndX: 80, lineEndY: 30 },
	{ x: 220, y: 67, cardX: 190, cardY: -23, lineEndX: 220, lineEndY: 37 },
	{ x: 510, y: 140, cardX: 540, cardY: 110, lineEndX: 540, lineEndY: 140 },
	{ x: 205, y: 220, cardX: 105, cardY: 190, lineEndX: 165, lineEndY: 220 },
	{ x: 590, y: 300, cardX: 500, cardY: 270, lineEndX: 560, lineEndY: 300 },
	{ x: 880, y: 385, cardX: 850, cardY: 295, lineEndX: 880, lineEndY: 355 },
]

// Fonction utilitaire pour générer les stops de gradient
export const generateGradientStops = (colors: string[]): GradientStop[] =>
	colors.map((color: string, i: number) => ({
		offset: `${i * 20}%`,
		color,
		opacity: '0.8',
	}))
