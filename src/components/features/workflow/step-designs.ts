// Design system for step cards
export interface StepDesign {
	gradient: string
	accent: string
	glow: string
	ring: string
	icon: string
	pattern: 'dots' | 'grid' | 'waves' | 'circuit' | 'hexagon'
}

// Sophisticated designs with CSS variables for step cards
export const STEP_DESIGNS: StepDesign[] = [
	{
		gradient: 'bg-step-1',
		accent: 'bg-indigo-accent',
		glow: 'shadow-indigo',
		ring: 'ring-indigo',
		icon: '🔍',
		pattern: 'dots',
	},
	{
		gradient: 'bg-step-2',
		accent: 'bg-violet-accent',
		glow: 'shadow-violet',
		ring: 'ring-violet',
		icon: '🎨',
		pattern: 'grid',
	},
	{
		gradient: 'bg-step-3',
		accent: 'bg-emerald-accent',
		glow: 'shadow-emerald',
		ring: 'ring-emerald',
		icon: '⚡',
		pattern: 'waves',
	},
	{
		gradient: 'bg-step-4',
		accent: 'bg-amber-accent',
		glow: 'shadow-amber',
		ring: 'ring-amber',
		icon: '🧪',
		pattern: 'circuit',
	},
	{
		gradient: 'bg-step-5',
		accent: 'bg-rose-accent',
		glow: 'shadow-rose',
		ring: 'ring-rose',
		icon: '🚀',
		pattern: 'dots',
	},
	{
		gradient: 'bg-step-6',
		accent: 'bg-slate-accent',
		glow: 'shadow-slate',
		ring: 'ring-slate',
		icon: '🛠️',
		pattern: 'hexagon',
	},
]

// Function to get design by index with fallback
export const getStepDesign = (index: number): StepDesign => {
	const design = STEP_DESIGNS[index] || STEP_DESIGNS[0]
	if (!design) {
		throw new Error(`No design found for index: ${index}`)
	}
	return design
}
