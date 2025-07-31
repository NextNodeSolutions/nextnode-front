import React from 'react'

import { Dialog, DialogContent } from '@/components/ui/dialog'

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
	step: _step,
	detailedStep: _detailedStep,
	stepIndex: _stepIndex,
	color,
}: StepModalProps): React.ReactElement {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent
				className="max-h-[85vh] overflow-y-auto border-0 p-0"
				style={{
					background: `rgba(255,255,255,0.05)`,
					backdropFilter: 'blur(20px)',
					WebkitBackdropFilter: 'blur(20px)',
					boxShadow:
						'0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)',
					width: '90vw',
					maxWidth: '1200px',
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

				{/* Contenu vide - prêt pour rebuild */}
				<div className="relative p-8">
					<div className="text-center text-2xl font-bold text-red-500">
						MODALE VIDE - PRÊTE POUR REBUILD
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
