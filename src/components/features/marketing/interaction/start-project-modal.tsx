import React, { useState } from 'react'

import { cn } from '@/lib/core/utils'
import { useI18n } from '@/lib/i18n/i18n-client'
import { GLASSMORPHISM_PRESETS } from '@/lib/ui/ui-constants'
import { Button } from '@/components/ui/forms/button'
import { BaseModal, ModalHeader } from '@/components/ui/modals/BaseModal'
import { FormField, FormGrid } from '@/components/ui/forms/FormField'

interface StartProjectModalProps {
	className?: string
	locale?: string
}

export const StartProjectModal = ({
	className,
	locale,
}: StartProjectModalProps): React.ReactElement => {
	const { t } = useI18n(locale)
	const [isOpen, setIsOpen] = useState(false)

	const handleClose = (): void => {
		setIsOpen(false)
	}

	const handleOpen = (): void => {
		setIsOpen(true)
	}

	return (
		<div className={className}>
			<Button
				variant="default"
				onClick={handleOpen}
				className={cn(
					'btn-gradient-primary group w-full cursor-pointer px-4 py-6',
					'hover-lift shadow-lg transition-shadow hover:shadow-2xl',
					'text-base font-bold tracking-wide text-white',
					'sm:px-6 sm:py-6 sm:text-lg',
					'md:px-8 md:py-6 md:text-lg',
					'flex-center gap-2',
					'hover:animate-pulse-dark',
				)}
			>
				<span
					className={cn(
						'transition-transform',
						'uppercase group-hover:-translate-x-2',
					)}
				>
					{t('home.hero.startProjectButton')}
				</span>
				<span
					className={cn(
						'opacity-0 transition-all duration-300',
						'group-hover:translate-x-2 group-hover:opacity-100',
					)}
				>
					→
				</span>
			</Button>

			<BaseModal
				isOpen={isOpen}
				onClose={handleClose}
				color="#3B82F6"
				title={t('modal.title')}
				width="600px"
				maxWidth="95vw"
				className="sm:max-w-[600px]"
				glassmorphismOptions={GLASSMORPHISM_PRESETS.modal}
			>
				{/* Header */}
				<div className="mb-6 text-center">
					<ModalHeader
						title={t('modal.title')}
						description={t('modal.description')}
					/>
				</div>

				{/* Form */}
				<form className="space-y-4 sm:space-y-6">
					<FormGrid columns={2}>
						<FormField
							id="name"
							label={t('modal.form.name')}
							placeholder={t('modal.form.namePlaceholder')}
							required
						/>
						<FormField
							id="email"
							label={t('modal.form.email')}
							type="email"
							placeholder={t('modal.form.emailPlaceholder')}
							required
						/>
					</FormGrid>

					<FormField
						id="project"
						label={t('modal.form.projectType')}
						placeholder={t('modal.form.projectTypePlaceholder')}
						required
					/>

					<FormField
						id="budget"
						label={t('modal.form.budget')}
						placeholder={t('modal.form.budgetPlaceholder')}
					/>

					<FormField
						id="message"
						label={t('modal.form.details')}
						type="textarea"
						placeholder={t('modal.form.detailsPlaceholder')}
						inputClassName="min-h-[100px] sm:min-h-[120px]"
					/>

					<Button
						type="submit"
						className="btn-gradient-primary w-full font-semibold text-white hover:shadow-lg"
					>
						{t('modal.form.submit')}
					</Button>
				</form>
			</BaseModal>
		</div>
	)
}
