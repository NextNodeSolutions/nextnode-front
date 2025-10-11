import { memo, useEffect, useState } from 'react'

import {
	ORBIT_ANIMATION,
	ORBIT_CONFIG,
	ORBIT_EFFECTS,
	TECH_STACK,
} from '@/lib/config/marketing/orbiting-tech-config'

import type { TechConfig } from '@/lib/config/marketing/orbiting-tech-config'

// ============================================================================
// TYPES
// ============================================================================

interface SkillIconProps {
	config: TechConfig
	angle: number
	isGlobalHovered: boolean
}

// ============================================================================
// SKILL ICON COMPONENT
// ============================================================================

const SkillIcon = memo(({ config, angle, isGlobalHovered }: SkillIconProps) => {
	const x = Math.cos(angle) * config.orbitRadius
	const y = Math.sin(angle) * config.orbitRadius
	const { Icon } = config

	const globalScale = isGlobalHovered ? ORBIT_ANIMATION.hover.globalScale : 1

	return (
		<div
			style={{
				transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
				width: `${config.size}px`,
				height: `${config.size}px`,
			}}
			className="group absolute top-1/2 left-1/2"
		>
			{/* Global hover scale wrapper */}
			<div
				style={{
					transform: `scale(${globalScale})`,
				}}
				className={`h-full w-full transition-transform ${ORBIT_ANIMATION.transitions.default}`}
			>
				{/* Icon card */}
				<div
					className={`relative flex h-full w-full items-center justify-center rounded-2xl border-2 bg-white/80 shadow-lg backdrop-blur-sm transition-all ${ORBIT_ANIMATION.transitions.hover} group-hover:-translate-y-2 group-hover:scale-[${ORBIT_ANIMATION.hover.iconScale}] group-hover:shadow-2xl dark:bg-gray-800/80 ${ORBIT_EFFECTS.border.default}`}
					style={{
						boxShadow: `${ORBIT_EFFECTS.shadow.base} ${config.color}33`,
					}}
				>
					<Icon
						className="h-3/5 w-3/5"
						style={{ color: config.color }}
					/>

					{/* Hover glow effect */}
					<div
						className={`absolute inset-0 rounded-2xl opacity-${ORBIT_EFFECTS.glow.opacity.base} ${ORBIT_EFFECTS.glow.blur} transition-opacity ${ORBIT_ANIMATION.transitions.hover} group-hover:opacity-${ORBIT_EFFECTS.glow.opacity.hover}`}
						style={{
							background: `radial-gradient(circle, ${config.color}66 0%, transparent 70%)`,
						}}
					/>

					{/* Enhanced glow for global hover */}
					{isGlobalHovered && (
						<div
							className={`absolute inset-0 rounded-2xl opacity-${ORBIT_EFFECTS.glow.opacity.globalHover} ${ORBIT_EFFECTS.glow.blur}`}
							style={{
								background: `radial-gradient(circle, ${config.color}66 0%, transparent 70%)`,
							}}
						/>
					)}
				</div>
			</div>

			{/* Tooltip */}
			<div className={ORBIT_EFFECTS.tooltip.classes}>{config.label}</div>
		</div>
	)
})

SkillIcon.displayName = 'SkillIcon'

// ============================================================================
// MAIN COMPONENT
// ============================================================================

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

	const { base, hovered, secondary } = ORBIT_ANIMATION.centerEffect

	return (
		<div
			role="img"
			aria-label="Technology Stack Visualization"
			className="relative flex items-center justify-center"
			style={{ minHeight: '450px' }}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			{/* Center energy effect - multiple animated gradients */}
			<div
				className="animate-spin-slow absolute top-1/2 left-1/2 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-green-500 blur-3xl transition-all duration-500"
				style={{
					transform: isPaused
						? `translate(-50%, -50%) scale(${hovered.scale})`
						: `translate(-50%, -50%) scale(${base.scale})`,
					opacity: isPaused ? hovered.opacity : base.opacity,
				}}
			/>
			<div
				className="absolute top-1/2 left-1/2 h-18 w-18 animate-pulse rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 blur-2xl transition-all duration-500"
				style={{
					transform: isPaused
						? `translate(-50%, -50%) scale(${secondary.hovered.scale})`
						: `translate(-50%, -50%) scale(${secondary.base.scale})`,
					opacity: isPaused
						? secondary.hovered.opacity
						: secondary.base.opacity,
				}}
			/>

			{/* Orbit rings */}
			{Object.values(ORBIT_CONFIG.radii).map(radius => (
				<div
					key={radius}
					className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed ${ORBIT_EFFECTS.border.orbit}`}
					style={{
						width: `${radius * 2}px`,
						height: `${radius * 2}px`,
					}}
				/>
			))}

			{/* Skills */}
			{TECH_STACK.map(config => {
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
		</div>
	)
}
