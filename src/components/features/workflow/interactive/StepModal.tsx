import React from 'react'

import { useI18n } from '@/lib/i18n/i18n-client'
import {
	BaseModal,
	ModalHeader,
	ModalInfoCard,
} from '@/components/ui/modals/BaseModal'

import { STEP_KEYS } from '../workflow-constants'
import StepIllustration from '../visual/StepIllustrations'

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
		<BaseModal
			isOpen={isOpen}
			onClose={onClose}
			color={color}
			title={detailedStep.title}
			width="900px"
			maxWidth="95vw"
			className="sm:max-w-[900px]"
			layout="split"
			leftPanel={<StepIllustration stepKey={stepKey} />}
			glassmorphismOptions={{
				baseOpacity: 0.05,
				blur: 20,
				colorOpacity: 40,
				readabilityOpacity: 0.75,
			}}
		>
			<div className="min-h-0 flex-1">
				<ModalHeader
					title={detailedStep.title}
					description={detailedStep.description}
					badge={{
						text: detailedStep.number,
						color: color,
					}}
				/>

				<div className="mb-6">
					<h3 className="mb-3 text-sm font-semibold text-gray-900 sm:text-lg">
						{t('modal.stepModal.whatWeDo')}
					</h3>
					<ul className="space-y-2">
						{detailedStep.details.map((detail, index) => (
							<li key={index} className="flex items-start gap-3">
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

			<div className="animate-in slide-in-from-bottom flex flex-col gap-3 delay-200 duration-500 sm:flex-row sm:gap-4">
				<ModalInfoCard
					icon={
						<svg
							className="h-full w-full transition-transform duration-200 hover:scale-110"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
							<polyline points="14,2 14,8 20,8" />
						</svg>
					}
					title={t('modal.stepModal.deliverables')}
					content={detailedStep.deliverables}
					color="blue"
				/>

				<ModalInfoCard
					icon={
						<svg
							className="h-full w-full transition-transform duration-200 hover:scale-110"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<circle cx="12" cy="12" r="10" />
							<polyline points="12,6 12,12 16,14" />
						</svg>
					}
					title={t('modal.stepModal.duration')}
					content={detailedStep.duration}
					color="purple"
				/>
			</div>
		</BaseModal>
	)
}
