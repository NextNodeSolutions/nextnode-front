import { memo, useEffect, useState } from 'react'

import type { LucideIcon } from 'lucide-react'
import {
	Atom,
	Blocks,
	Cloud,
	Code2,
	Container,
	Database,
	GitBranch,
	Layers,
	Package,
	Server,
	Train,
	Workflow,
	Zap,
} from 'lucide-react'

// Orbit radius constants
const ORBIT_INNER = 60
const ORBIT_MIDDLE = 140
const ORBIT_OUTER = 210

type TechName =
	| 'react'
	| 'typescript'
	| 'tailwind'
	| 'astro'
	| 'nextjs'
	| 'nodejs'
	| 'graphql'
	| 'postgresql'
	| 'aws'
	| 'docker'
	| 'railway'
	| 'github'
	| 'redis'
	| 'mongodb'

interface SkillConfig {
	id: string
	orbitRadius: number
	size: number
	speed: number
	techName: TechName
	phaseShift: number
	label: string
	Icon: LucideIcon
	color: string
}

const skillsConfig: SkillConfig[] = [
	// Inner Orbit - Most important, largest
	{
		id: 'react',
		orbitRadius: ORBIT_INNER,
		size: 44,
		speed: 0.5,
		techName: 'react',
		phaseShift: 0,
		label: 'React',
		Icon: Atom,
		color: '#61DAFB',
	},
	{
		id: 'typescript',
		orbitRadius: ORBIT_INNER,
		size: 44,
		speed: 0.5,
		techName: 'typescript',
		phaseShift: Math.PI / 2,
		label: 'TypeScript',
		Icon: Code2,
		color: '#3178C6',
	},
	{
		id: 'tailwind',
		orbitRadius: ORBIT_INNER,
		size: 44,
		speed: 0.5,
		techName: 'tailwind',
		phaseShift: Math.PI,
		label: 'Tailwind',
		Icon: Zap,
		color: '#06B6D4',
	},
	{
		id: 'astro',
		orbitRadius: ORBIT_INNER,
		size: 44,
		speed: 0.5,
		techName: 'astro',
		phaseShift: (3 * Math.PI) / 2,
		label: 'Astro',
		Icon: Layers,
		color: '#FF5D01',
	},
	// Middle Orbit - Medium importance
	{
		id: 'nextjs',
		orbitRadius: ORBIT_MIDDLE,
		size: 40,
		speed: -0.35,
		techName: 'nextjs',
		phaseShift: 0,
		label: 'Next.js',
		Icon: Package,
		color: '#000000',
	},
	{
		id: 'nodejs',
		orbitRadius: ORBIT_MIDDLE,
		size: 40,
		speed: -0.35,
		techName: 'nodejs',
		phaseShift: Math.PI / 2,
		label: 'Node.js',
		Icon: Server,
		color: '#339933',
	},
	{
		id: 'graphql',
		orbitRadius: ORBIT_MIDDLE,
		size: 40,
		speed: -0.35,
		techName: 'graphql',
		phaseShift: Math.PI,
		label: 'GraphQL',
		Icon: Workflow,
		color: '#E10098',
	},
	{
		id: 'postgresql',
		orbitRadius: ORBIT_MIDDLE,
		size: 40,
		speed: -0.35,
		techName: 'postgresql',
		phaseShift: (3 * Math.PI) / 2,
		label: 'PostgreSQL',
		Icon: Database,
		color: '#4169E1',
	},
	// Outer Orbit - Infrastructure, smallest
	{
		id: 'aws',
		orbitRadius: ORBIT_OUTER,
		size: 36,
		speed: 0.25,
		techName: 'aws',
		phaseShift: 0,
		label: 'AWS',
		Icon: Cloud,
		color: '#FF9900',
	},
	{
		id: 'docker',
		orbitRadius: ORBIT_OUTER,
		size: 36,
		speed: 0.25,
		techName: 'docker',
		phaseShift: Math.PI / 3,
		label: 'Docker',
		Icon: Container,
		color: '#2496ED',
	},
	{
		id: 'railway',
		orbitRadius: ORBIT_OUTER,
		size: 36,
		speed: 0.25,
		techName: 'railway',
		phaseShift: (2 * Math.PI) / 3,
		label: 'Railway',
		Icon: Train,
		color: '#0B0D0E',
	},
	{
		id: 'github',
		orbitRadius: ORBIT_OUTER,
		size: 36,
		speed: 0.25,
		techName: 'github',
		phaseShift: Math.PI,
		label: 'GitHub Actions',
		Icon: GitBranch,
		color: '#2088FF',
	},
	{
		id: 'redis',
		orbitRadius: ORBIT_OUTER,
		size: 36,
		speed: 0.25,
		techName: 'redis',
		phaseShift: (4 * Math.PI) / 3,
		label: 'Redis',
		Icon: Blocks,
		color: '#DC382D',
	},
	{
		id: 'mongodb',
		orbitRadius: ORBIT_OUTER,
		size: 36,
		speed: 0.25,
		techName: 'mongodb',
		phaseShift: (5 * Math.PI) / 3,
		label: 'MongoDB',
		Icon: Database,
		color: '#47A248',
	},
]

interface SkillIconProps {
	config: SkillConfig
	angle: number
	isGlobalHovered: boolean
}

const SkillIcon = memo(({ config, angle, isGlobalHovered }: SkillIconProps) => {
	const x = Math.cos(angle) * config.orbitRadius
	const y = Math.sin(angle) * config.orbitRadius
	const { Icon } = config

	// Global hover scale (applied to all icons when hovering container)
	const globalScale = isGlobalHovered ? 1.15 : 1

	return (
		<div
			style={{
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
				width: `${config.size}px`,
				height: `${config.size}px`,
			}}
			className="group relative"
		>
			<div
				style={{
					transform: `scale(${globalScale})`,
				}}
				className="h-full w-full transition-transform duration-300 ease-out"
			>
				<div
					className="relative flex h-full w-full items-center justify-center rounded-2xl border-2 border-gray-200/50 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.18] group-hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/80"
					style={{
						boxShadow: `0 0 20px ${config.color}33`,
					}}
				>
					<Icon
						className="h-3/5 w-3/5"
						style={{ color: config.color }}
					/>
					<div
						className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
						style={{
							background: `radial-gradient(circle, ${config.color}66 0%, transparent 70%)`,
						}}
					/>
					{/* Enhanced glow for global hover */}
					{isGlobalHovered && (
						<div
							className="absolute inset-0 rounded-2xl opacity-80 blur-xl"
							style={{
								background: `radial-gradient(circle, ${config.color}66 0%, transparent 70%)`,
							}}
						/>
					)}
				</div>
			</div>
			{/* Tooltip */}
			<div className="pointer-events-none absolute -bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-gray-900/90 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-xl backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-100/90 dark:text-gray-900">
				{config.label}
			</div>
		</div>
	)
})

SkillIcon.displayName = 'SkillIcon'

export default function OrbitingTech() {
	const [time, setTime] = useState(0)
	const [isPaused, setIsPaused] = useState(false)

	useEffect(() => {
		if (isPaused) return

		let animationFrameId: number
		let lastTime = performance.now()

		const animate = (currentTime: number) => {
			const deltaTime = (currentTime - lastTime) / 1000
			lastTime = currentTime

			setTime(prevTime => prevTime + deltaTime)
			animationFrameId = requestAnimationFrame(animate)
		}

		animationFrameId = requestAnimationFrame(animate)

		return () => {
			cancelAnimationFrame(animationFrameId)
		}
	}, [isPaused])

	return (
		<section
			className="relative flex items-center justify-center"
			style={{ minHeight: '450px' }}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			aria-label="Technology Stack Visualization"
		>
			{/* Center energy effect - multiple animated gradients */}
			<div
				className="animate-spin-slow absolute top-1/2 left-1/2 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-green-500 blur-3xl transition-all duration-500"
				style={{
					transform: isPaused
						? 'translate(-50%, -50%) scale(1.4)'
						: 'translate(-50%, -50%) scale(1)',
					opacity: isPaused ? 0.15 : 0.2,
				}}
			/>
			<div
				className="animation-delay-1000 animate-spin-reverse absolute top-1/2 left-1/2 h-40 w-40 rounded-full bg-gradient-to-tr from-green-400 to-blue-600 blur-2xl transition-all duration-500"
				style={{
					transform: isPaused
						? 'translate(-50%, -50%) scale(1.5)'
						: 'translate(-50%, -50%) scale(1)',
					opacity: isPaused ? 0.12 : 0.15,
				}}
			/>
			<div
				className="animation-delay-500 absolute top-1/2 left-1/2 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 blur-xl transition-all duration-500"
				style={{
					transform: isPaused
						? 'translate(-50%, -50%) scale(1.6)'
						: 'translate(-50%, -50%) scale(1)',
					opacity: isPaused ? 0.18 : 0.25,
				}}
			/>

			{/* Orbit rings */}
			{[ORBIT_INNER, ORBIT_MIDDLE, ORBIT_OUTER].map(radius => (
				<div
					key={radius}
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gray-300/60 dark:border-gray-600/60"
					style={{
						width: `${radius * 2}px`,
						height: `${radius * 2}px`,
					}}
				/>
			))}

			{/* Skills */}
			{skillsConfig.map(config => {
				const angle = time * config.speed + config.phaseShift
				return (
					<SkillIcon
						key={config.id}
						config={config}
						angle={angle}
						isGlobalHovered={isPaused}
					/>
				)
			})}
		</section>
	)
}
