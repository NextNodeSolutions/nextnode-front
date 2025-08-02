// Design system pour les step cards
export interface StepDesign {
	gradient: string
	accent: string
	glow: string
	ring: string
	icon: string
	pattern: string
}

// Designs sophistiqués avec couleurs et gradients pour les step cards
export const STEP_DESIGNS: StepDesign[] = [
	{
		gradient: 'from-indigo-600 via-blue-600 to-cyan-500',
		accent: 'bg-indigo-500',
		glow: 'shadow-indigo-500/25',
		ring: 'ring-indigo-500/20',
		icon: '🔍',
		pattern: 'dots',
	},
	{
		gradient: 'from-violet-600 via-purple-600 to-fuchsia-500',
		accent: 'bg-violet-500',
		glow: 'shadow-violet-500/25',
		ring: 'ring-violet-500/20',
		icon: '🎨',
		pattern: 'grid',
	},
	{
		gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
		accent: 'bg-emerald-500',
		glow: 'shadow-emerald-500/25',
		ring: 'ring-emerald-500/20',
		icon: '⚡',
		pattern: 'waves',
	},
	{
		gradient: 'from-amber-500 via-orange-500 to-red-500',
		accent: 'bg-amber-500',
		glow: 'shadow-amber-500/25',
		ring: 'ring-amber-500/20',
		icon: '🧪',
		pattern: 'triangles',
	},
	{
		gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
		accent: 'bg-rose-500',
		glow: 'shadow-rose-500/25',
		ring: 'ring-rose-500/20',
		icon: '🚀',
		pattern: 'circles',
	},
	{
		gradient: 'from-slate-600 via-gray-600 to-zinc-500',
		accent: 'bg-slate-500',
		glow: 'shadow-slate-500/25',
		ring: 'ring-slate-500/20',
		icon: '🛠️',
		pattern: 'hexagons',
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
