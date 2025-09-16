import { useState } from 'react'
import type React from 'react'

import { Button } from '@/components/ui/forms/button'
import { FormField, FormGrid } from '@/components/ui/forms/FormField'
import { BaseModal, ModalHeader } from '@/components/ui/modals/BaseModal'
import { useI18n } from '@/lib/i18n/react'
import { componentLogger } from '@/lib/logging'
import { GLASSMORPHISM_PRESETS } from '@/lib/ui/ui-constants'

import type { ProjectRequestData } from '@/types/email'

interface StartProjectModalContentProps {
	isOpen: boolean
	onClose: () => void
	locale: 'en' | 'fr'
}

export const StartProjectModalContent = ({
	isOpen,
	onClose,
	locale,
}: StartProjectModalContentProps): React.ReactElement => {
	const { t } = useI18n(locale)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<{
		type: 'success' | 'error' | null
		message: string
	}>({ type: null, message: '' })

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault()
		setIsSubmitting(true)
		setSubmitStatus({ type: null, message: '' })

		const formData = new FormData(event.currentTarget)

		const projectData: ProjectRequestData = {
			userName: formData.get('name') as string,
			userEmail: formData.get('email') as string,
			projectName: formData.get('project') as string,
			budget: formData.get('budget') as string,
			projectDescription: formData.get('message') as string,
		}

		try {
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(projectData),
			})

			const result = await response.json()

			if (!response.ok || !result.success) {
				throw new Error(result.error || 'Failed to send email')
			}

			setSubmitStatus({
				type: 'success',
				message: t('modal.form.successMessage'),
			})

			// Close modal after delay
			setTimeout(() => {
				onClose()
				setSubmitStatus({ type: null, message: '' })
			}, 2000)
		} catch (error) {
			componentLogger.error('Error sending email', {
				scope: 'form-submission-error',
				details: { error },
			})
			setSubmitStatus({
				type: 'error',
				message:
					error instanceof Error
						? error.message
						: t('modal.form.errorMessage'),
			})
		} finally {
			setIsSubmitting(false)
		}
	}
	return (
		<BaseModal
			isOpen={isOpen}
			onClose={onClose}
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

			{/* Status Message */}
			{submitStatus.type && (
				<div
					className={`mb-4 rounded-md border p-4 text-sm ${
						submitStatus.type === 'success'
							? 'border-green-200 bg-green-50 text-green-800'
							: 'border-red-200 bg-red-50 text-red-800'
					}`}
				>
					{submitStatus.message}
				</div>
			)}

			{/* Form */}
			<form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
				<FormGrid columns={2}>
					<FormField
						id="name"
						label={t('modal.form.name')}
						placeholder={t('modal.form.namePlaceholder')}
						required
						disabled={isSubmitting}
					/>
					<FormField
						id="email"
						label={t('modal.form.email')}
						type="email"
						placeholder={t('modal.form.emailPlaceholder')}
						required
						disabled={isSubmitting}
					/>
				</FormGrid>

				<FormField
					id="project"
					label={t('modal.form.projectType')}
					placeholder={t('modal.form.projectTypePlaceholder')}
					required
					disabled={isSubmitting}
				/>

				<FormField
					id="budget"
					label={t('modal.form.budget')}
					placeholder={t('modal.form.budgetPlaceholder')}
					disabled={isSubmitting}
				/>

				<FormField
					id="message"
					label={t('modal.form.details')}
					type="textarea"
					placeholder={t('modal.form.detailsPlaceholder')}
					inputClassName="min-h-[100px] sm:min-h-[120px]"
					disabled={isSubmitting}
				/>

				<Button
					type="submit"
					disabled={isSubmitting || submitStatus.type === 'success'}
					className="btn-gradient-primary w-full font-semibold text-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting
						? t('modal.form.sending')
						: submitStatus.type === 'success'
							? t('modal.form.sent')
							: t('modal.form.submit')}
				</Button>
			</form>
		</BaseModal>
	)
}
