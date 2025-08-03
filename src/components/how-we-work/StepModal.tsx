import React from 'react'

import { STEP_KEYS } from '@/lib/workflow-constants'
import { useI18n } from '@/lib/i18n-client'
import ModalContainer from '@/components/ui/modal-container'

import StepIllustration from './StepIllustrations'

import type { StepModalProps } from '@/types/workflow'

export default function StepModal({
	isOpen,
	onClose,
	step: _step,
	detailedStep,
	stepIndex,
	color,
}: StepModalProps): React.ReactElement {
	const { t } = useI18n()
	const stepKey = STEP_KEYS[stepIndex] || 'discovery'
	return (
		<ModalContainer
			isOpen={isOpen}
			onClose={onClose}
			color={color}
			title={detailedStep.title}
			width="900px"
			maxWidth="95vw"
			className="sm:max-w-[900px]"
			glassmorphismOptions={{
				baseOpacity: 0.05,
				blur: 20,
				colorOpacity: 40,
				readabilityOpacity: 0.75,
			}}
		>
			{/* Layout principal avec aspect ratio optimisé - responsive sm+ */}
			<div className="animate-in fade-in flex h-auto min-h-[450px] flex-col duration-300 sm:h-[520px] sm:min-h-[520px] sm:flex-row">
				{/* Section gauche - Illustration (40% sur sm+, pleine largeur sur mobile) */}
				<div
					className="animate-in slide-in-from-left flex w-full items-center justify-center p-4 duration-500 sm:w-2/5 sm:p-6"
					style={{ backgroundColor: `${color}15` }}
				>
					<StepIllustration
						stepKey={stepKey}
						color={color}
						className="drop-shadow-lg"
					/>
				</div>

				{/* Section droite - Contenu (60% sur sm+, pleine largeur sur mobile) */}
				<div className="animate-in slide-in-from-right flex w-full flex-col justify-between p-6 delay-100 duration-500 sm:w-3/5 sm:p-8">
					{/* Partie supérieure - Description principale */}
					<div className="min-h-0 flex-1">
						{/* Titre avec numéro */}
						<div className="mb-4 sm:mb-6">
							<div className="mb-3 flex items-center gap-3">
								<span
									className="flex-shrink-0 rounded-full px-2 py-1 text-xs font-bold text-white sm:px-3 sm:text-sm"
									style={{ backgroundColor: color }}
								>
									{detailedStep.number}
								</span>
								<h2 className="text-lg leading-tight font-bold text-gray-900 sm:text-2xl">
									{detailedStep.title}
								</h2>
							</div>
							<p className="text-sm leading-relaxed text-gray-600 sm:text-base">
								{detailedStep.description}
							</p>
						</div>

						{/* Liste des détails */}
						<div className="mb-6">
							<h3 className="mb-3 text-sm font-semibold text-gray-900 sm:text-lg">
								{t('modal.stepModal.whatWeDo')}
							</h3>
							<ul className="space-y-2">
								{detailedStep.details.map((detail, index) => (
									<li
										key={index}
										className="flex items-start gap-3"
									>
										<div
											className="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
											style={{ backgroundColor: color }}
										/>
										<span className="text-xs leading-relaxed text-gray-700 sm:text-sm">
											{detail}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Partie inférieure - Cards livrables et durée */}
					<div className="animate-in slide-in-from-bottom flex flex-col gap-3 delay-200 duration-500 sm:flex-row sm:gap-4">
						{/* Card livrables */}
						<div className="flex-1 rounded-xl border border-blue-200 bg-blue-50 p-3 backdrop-blur-sm transition-all duration-200 hover:bg-blue-100 hover:shadow-md sm:p-4 dark:border-blue-800 dark:bg-blue-900/20 dark:hover:bg-blue-900/30">
							<div className="mb-2 flex items-center gap-2">
								<svg
									className="h-4 w-4 text-blue-600 transition-transform duration-200 hover:scale-110 sm:h-5 sm:w-5 dark:text-blue-400"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
									<polyline points="14,2 14,8 20,8" />
								</svg>
								<h4 className="text-xs font-semibold text-blue-900 sm:text-sm dark:text-blue-100">
									{t('modal.stepModal.deliverables')}
								</h4>
							</div>
							<p className="text-xs leading-snug text-blue-800 sm:text-sm dark:text-blue-200">
								{detailedStep.deliverables}
							</p>
						</div>

						{/* Card durée */}
						<div className="flex-1 rounded-xl border border-purple-200 bg-purple-50 p-3 backdrop-blur-sm transition-all duration-200 hover:bg-purple-100 hover:shadow-md sm:p-4 dark:border-purple-800 dark:bg-purple-900/20 dark:hover:bg-purple-900/30">
							<div className="mb-2 flex items-center gap-2">
								<svg
									className="h-4 w-4 text-purple-600 transition-transform duration-200 hover:scale-110 sm:h-5 sm:w-5 dark:text-purple-400"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<circle cx="12" cy="12" r="10" />
									<polyline points="12,6 12,12 16,14" />
								</svg>
								<h4 className="text-xs font-semibold text-purple-900 sm:text-sm dark:text-purple-100">
									{t('modal.stepModal.duration')}
								</h4>
							</div>
							<p className="text-xs leading-snug font-medium text-purple-800 sm:text-sm dark:text-purple-200">
								{detailedStep.duration}
							</p>
						</div>
					</div>
				</div>
			</div>
		</ModalContainer>
	)
}
