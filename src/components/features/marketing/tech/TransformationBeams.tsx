'use client'

import { useRef } from 'react'

import { AnimatedBeam } from '@/components/ui/animated-beam'
import {
	ANCHOR_CONFIG,
	BEAM_COLORS,
	BEAM_DEFAULTS,
	BEAMS,
} from '@/lib/config/marketing/transformation-beams-config'

export const TransformationBeams = () => {
	const containerRef = useRef<HTMLDivElement>(null)

	// Create refs directly for each beam (3 beams total)
	const leftTopRef = useRef<HTMLDivElement>(null)
	const leftMidRef = useRef<HTMLDivElement>(null)
	const leftBottomRef = useRef<HTMLDivElement>(null)
	const rightTopRef = useRef<HTMLDivElement>(null)
	const rightMidRef = useRef<HTMLDivElement>(null)
	const rightBottomRef = useRef<HTMLDivElement>(null)

	const leftRefs = [leftTopRef, leftMidRef, leftBottomRef]
	const rightRefs = [rightTopRef, rightMidRef, rightBottomRef]

	return (
		<div
			ref={containerRef}
			className="relative flex h-full w-full items-center justify-between"
		>
			{/* Left anchor points */}
			<div
				className={`${ANCHOR_CONFIG.offset.left} ${ANCHOR_CONFIG.container}`}
			>
				{BEAMS.map((beam, i) => (
					<div
						key={`left-${beam.id}`}
						ref={leftRefs[i]}
						className={ANCHOR_CONFIG.size}
					/>
				))}
			</div>

			{/* Right anchor points */}
			<div
				className={`${ANCHOR_CONFIG.offset.right} ${ANCHOR_CONFIG.container}`}
			>
				{BEAMS.map((beam, i) => (
					<div
						key={`right-${beam.id}`}
						ref={rightRefs[i]}
						className={ANCHOR_CONFIG.size}
					/>
				))}
			</div>

			{/* Animated Beams */}
			{BEAMS.map((beam, index) => {
				const colors = BEAM_COLORS[beam.colorScheme]
				const fromRef = leftRefs[index]
				const toRef = rightRefs[index]

				if (!fromRef || !toRef) return null

				return (
					<AnimatedBeam
						key={beam.id}
						containerRef={containerRef}
						fromRef={fromRef}
						toRef={toRef}
						curvature={beam.curvature}
						duration={beam.duration}
						delay={beam.delay}
						pathColor={BEAM_DEFAULTS.pathColor}
						pathWidth={BEAM_DEFAULTS.pathWidth}
						pathOpacity={BEAM_DEFAULTS.pathOpacity}
						gradientStartColor={colors.start}
						gradientStopColor={colors.end}
					/>
				)
			})}
		</div>
	)
}
