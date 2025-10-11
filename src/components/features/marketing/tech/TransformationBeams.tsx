'use client'

import { useRef } from 'react'

import { AnimatedBeam } from '@/components/ui/animated-beam'

export const TransformationBeams = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const leftTopRef = useRef<HTMLDivElement>(null)
	const leftMidRef = useRef<HTMLDivElement>(null)
	const leftBottomRef = useRef<HTMLDivElement>(null)
	const rightTopRef = useRef<HTMLDivElement>(null)
	const rightMidRef = useRef<HTMLDivElement>(null)
	const rightBottomRef = useRef<HTMLDivElement>(null)

	return (
		<div
			ref={containerRef}
			className="relative flex h-full w-full items-center justify-between"
		>
			{/* Left anchor points (extend outside left edge) */}
			<div className="-ml-3 flex h-full flex-col justify-around">
				<div ref={leftTopRef} className="h-2 w-2" />
				<div ref={leftMidRef} className="h-2 w-2" />
				<div ref={leftBottomRef} className="h-2 w-2" />
			</div>

			{/* Right anchor points (extend outside right edge) */}
			<div className="-mr-3 flex h-full flex-col justify-around">
				<div ref={rightTopRef} className="h-2 w-2" />
				<div ref={rightMidRef} className="h-2 w-2" />
				<div ref={rightBottomRef} className="h-2 w-2" />
			</div>

			{/* Animated Beams - more visible */}
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={leftTopRef}
				toRef={rightTopRef}
				curvature={-60}
				duration={4}
				delay={0}
				pathColor="rgb(203, 213, 225)"
				pathWidth={2}
				pathOpacity={0.3}
				gradientStartColor="#3b82f6"
				gradientStopColor="#22c55e"
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={leftMidRef}
				toRef={rightMidRef}
				curvature={-5}
				duration={4.5}
				delay={0.5}
				pathColor="rgb(203, 213, 225)"
				pathWidth={2}
				pathOpacity={0.3}
				gradientStartColor="#22c55e"
				gradientStopColor="#3b82f6"
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={leftBottomRef}
				toRef={rightBottomRef}
				curvature={60}
				duration={4}
				delay={1}
				pathColor="rgb(203, 213, 225)"
				pathWidth={2}
				pathOpacity={0.3}
				gradientStartColor="#3b82f6"
				gradientStopColor="#22c55e"
			/>
		</div>
	)
}
