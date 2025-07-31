import React from 'react'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

interface StepModalProps {
	isOpen: boolean
	onClose: () => void
	step: {
		icon: string
		title: string
	}
	detailedStep: {
		title: string
		description: string
		details: string[]
		deliverables: string
		duration: string
	}
	stepIndex: number
	color: string
}

export default function StepModal({
	isOpen,
	onClose,
	step,
	detailedStep,
	stepIndex,
	color,
}: StepModalProps): React.ReactElement {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent
				className="max-h-[80vh] max-w-4xl overflow-y-auto border-0 p-0"
				style={{
					background: `rgba(255,255,255,0.05)`,
					backdropFilter: 'blur(20px)',
					WebkitBackdropFilter: 'blur(20px)',
					boxShadow:
						'0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)',
				}}
			>
				{/* Overlay coloré pour l'effet */}
				<div
					className="absolute inset-0 rounded-3xl"
					style={{
						background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, ${color}40 100%)`,
					}}
				/>

				{/* Overlay blanc pour la lisibilité */}
				<div
					className="absolute inset-0 rounded-3xl"
					style={{
						background: `rgba(255,255,255,0.75)`,
					}}
				/>

				{/* Contenu */}
				<div className="relative p-8">
					{/* Header */}
					<DialogHeader className="mb-6">
						<div className="flex items-center">
							<div
								className="mr-4 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl shadow-lg"
								style={{
									background: `linear-gradient(135deg, ${color}, ${color}CC)`,
								}}
							>
								{step.icon}
							</div>
							<div>
								<div className="mb-1 text-sm font-semibold text-gray-500 dark:text-gray-400">
									Step {stepIndex + 1}
								</div>
								<DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
									{detailedStep?.title}
								</DialogTitle>
							</div>
						</div>
					</DialogHeader>

					{/* Description */}
					<p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
						{detailedStep?.description}
					</p>

					{/* Details */}
					<div className="grid gap-6 md:grid-cols-2">
						<div>
							<h4 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
								Main Tasks
							</h4>
							<ul className="space-y-2">
								{detailedStep?.details.map((detail, index) => (
									<li
										key={index}
										className="flex items-start"
									>
										<span
											className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full"
											style={{ backgroundColor: color }}
										></span>
										<span className="text-sm text-gray-600 dark:text-gray-300">
											{detail}
										</span>
									</li>
								))}
							</ul>
						</div>

						<div>
							<div className="mb-4">
								<h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
									Deliverables
								</h4>
								<p className="text-sm text-gray-600 dark:text-gray-300">
									{detailedStep?.deliverables}
								</p>
							</div>

							<div>
								<h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
									Duration
								</h4>
								<div
									className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white"
									style={{ backgroundColor: color }}
								>
									{detailedStep?.duration}
								</div>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
