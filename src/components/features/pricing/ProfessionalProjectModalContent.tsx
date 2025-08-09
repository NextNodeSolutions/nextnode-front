import React, { useState } from 'react'

import { useI18n } from '@/lib/i18n/i18n-client'
import { GLASSMORPHISM_PRESETS } from '@/lib/ui/ui-constants'
import { Button } from '@/components/ui/forms/button'
import { BaseModal, ModalHeader } from '@/components/ui/modals/BaseModal'
import { FormField, FormGrid } from '@/components/ui/forms/FormField'
import { Select } from '@/components/ui/forms/select'

interface ProfessionalProjectModalContentProps {
	isOpen: boolean
	onClose: () => void
	locale?: string
	plan: 'business' | 'enterprise'
}

export const ProfessionalProjectModalContent = ({
	isOpen,
	onClose,
	locale,
	plan,
}: ProfessionalProjectModalContentProps): React.ReactElement => {
	const { t } = useI18n(locale)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		companyName: '',
		sector: '',
		employees: '',
		currentWebsite: '',
		budget: '',
		features: '',
		timeline: '',
		hasTechnicalContact: 'non',
		needsIntegrations: 'non',
		expectedTraffic: '',
		projectDetails: '',
	})

	const handleInputChange =
		(name: string) =>
		(value: string): void => {
			setFormData(prev => ({
				...prev,
				[name]: value,
			}))
		}

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault()
		// TODO: Handle form submission
		console.log('Professional project form submitted:', {
			...formData,
			plan,
		})
		onClose()
	}

	return (
		<BaseModal
			isOpen={isOpen}
			onClose={onClose}
			color={plan === 'business' ? '#6366f1' : '#8b5cf6'}
			title={t('modal.professionalModal.title')}
			width="700px"
			maxWidth="95vw"
			className="sm:max-w-[700px]"
			glassmorphismOptions={GLASSMORPHISM_PRESETS.modal}
		>
			{/* Header */}
			<div className="mb-6 text-center">
				<ModalHeader
					title={t('modal.professionalModal.title')}
					description={t('modal.professionalModal.description')}
				/>
				<div className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
					Plan sélectionné :{' '}
					{plan === 'business' ? 'Business' : 'Enterprise'}
				</div>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Contact Info */}
				<FormGrid columns={2}>
					<FormField
						label={t('modal.form.name')}
						id="name"
						type="text"
						placeholder={t('modal.form.namePlaceholder')}
						value={formData.name}
						onChange={handleInputChange('name')}
						required
					/>
					<FormField
						label={t('modal.form.email')}
						id="email"
						type="email"
						placeholder={t('modal.form.emailPlaceholder')}
						value={formData.email}
						onChange={handleInputChange('email')}
						required
					/>
				</FormGrid>

				{/* Company Info */}
				<FormGrid columns={2}>
					<FormField
						label={t('modal.professionalModal.form.companyName')}
						id="companyName"
						type="text"
						placeholder={t(
							'modal.professionalModal.form.companyNamePlaceholder',
						)}
						value={formData.companyName}
						onChange={handleInputChange('companyName')}
						required
					/>
					<FormField
						label={t('modal.professionalModal.form.sector')}
						id="sector"
						type="text"
						placeholder={t(
							'modal.professionalModal.form.sectorPlaceholder',
						)}
						value={formData.sector}
						onChange={handleInputChange('sector')}
					/>
				</FormGrid>

				<FormGrid columns={2}>
					<div className="space-y-2">
						<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
							{t('modal.professionalModal.form.employees')}
						</label>
						<Select
							name="employees"
							value={formData.employees}
							onChange={e =>
								handleInputChange('employees')(e.target.value)
							}
							className="bg-white/80 backdrop-blur-sm"
							options={[
								{
									value: '',
									label: t(
										'modal.professionalModal.form.employeesPlaceholder',
									),
								},
								{ value: '1-10', label: '1-10 employés' },
								{ value: '11-50', label: '11-50 employés' },
								{ value: '51-200', label: '51-200 employés' },
								{ value: '200+', label: '200+ employés' },
							]}
						/>
					</div>
					<FormField
						label={t('modal.professionalModal.form.currentWebsite')}
						id="currentWebsite"
						type="text"
						placeholder={t(
							'modal.professionalModal.form.currentWebsitePlaceholder',
						)}
						value={formData.currentWebsite}
						onChange={handleInputChange('currentWebsite')}
					/>
				</FormGrid>

				{/* Project Details */}
				<FormGrid columns={2}>
					<div className="space-y-2">
						<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
							{t('modal.professionalModal.form.budget')}
							<span className="ml-1 text-red-500">*</span>
						</label>
						<Select
							name="budget"
							value={formData.budget}
							onChange={e =>
								handleInputChange('budget')(e.target.value)
							}
							className="bg-white/80 backdrop-blur-sm"
							required
							options={
								plan === 'business'
									? [
											{
												value: '',
												label: t(
													'modal.professionalModal.form.budgetPlaceholder',
												),
											},
											{
												value: '1500-3500',
												label: '1 500€ - 3 500€',
											},
											{
												value: '3500-7500',
												label: '3 500€ - 7 500€',
											},
											{
												value: '7500-15000',
												label: '7 500€ - 15 000€',
											},
											{
												value: '15000+',
												label: '15 000€+',
											},
										]
									: [
											{
												value: '',
												label: t(
													'modal.professionalModal.form.budgetPlaceholder',
												),
											},
											{
												value: '15000-30000',
												label: '15 000€ - 30 000€',
											},
											{
												value: '30000-50000',
												label: '30 000€ - 50 000€',
											},
											{
												value: '50000-100000',
												label: '50 000€ - 100 000€',
											},
											{
												value: '100000+',
												label: '100 000€+',
											},
										]
							}
						/>
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
							{t('modal.professionalModal.form.timeline')}
							<span className="ml-1 text-red-500">*</span>
						</label>
						<Select
							name="timeline"
							value={formData.timeline}
							onChange={e =>
								handleInputChange('timeline')(e.target.value)
							}
							className="bg-white/80 backdrop-blur-sm"
							required
							options={[
								{
									value: '',
									label: t(
										'modal.professionalModal.form.timelinePlaceholder',
									),
								},
								{ value: 'urgent', label: 'Urgent (< 1 mois)' },
								{ value: '1-3months', label: '1-3 mois' },
								{ value: '3-6months', label: '3-6 mois' },
								{ value: '6months+', label: '6+ mois' },
							]}
						/>
					</div>
				</FormGrid>

				{/* Technical Requirements */}
				<FormGrid columns={2}>
					<div className="space-y-2">
						<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
							{t('modal.professionalModal.form.expectedTraffic')}
						</label>
						<Select
							name="expectedTraffic"
							value={formData.expectedTraffic}
							onChange={e =>
								handleInputChange('expectedTraffic')(
									e.target.value,
								)
							}
							className="bg-white/80 backdrop-blur-sm"
							options={[
								{
									value: '',
									label: t(
										'modal.professionalModal.form.expectedTrafficPlaceholder',
									),
								},
								{
									value: 'low',
									label: '< 1 000 visiteurs/mois',
								},
								{
									value: 'medium',
									label: '1 000 - 10 000 visiteurs/mois',
								},
								{
									value: 'high',
									label: '10 000 - 100 000 visiteurs/mois',
								},
								{
									value: 'very-high',
									label: '100 000+ visiteurs/mois',
								},
							]}
						/>
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
							{t(
								'modal.professionalModal.form.hasTechnicalContact',
							)}
						</label>
						<Select
							name="hasTechnicalContact"
							value={formData.hasTechnicalContact}
							onChange={e =>
								handleInputChange('hasTechnicalContact')(
									e.target.value,
								)
							}
							className="bg-white/80 backdrop-blur-sm"
							options={[
								{ value: 'non', label: 'Non' },
								{
									value: 'oui',
									label: 'Oui, nous avons une équipe technique',
								},
								{
									value: 'externe',
									label: 'Oui, via un prestataire externe',
								},
							]}
						/>
					</div>
				</FormGrid>

				<div className="space-y-2">
					<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
						{t('modal.professionalModal.form.needsIntegrations')}
					</label>
					<Select
						name="needsIntegrations"
						value={formData.needsIntegrations}
						onChange={e =>
							handleInputChange('needsIntegrations')(
								e.target.value,
							)
						}
						className="bg-white/80 backdrop-blur-sm"
						options={[
							{ value: 'non', label: 'Non' },
							{
								value: 'oui-simple',
								label: 'Oui, intégrations simples (CRM, Email)',
							},
							{
								value: 'oui-complexe',
								label: 'Oui, intégrations complexes (ERP, APIs custom)',
							},
						]}
					/>
				</div>

				<FormField
					label={t('modal.professionalModal.form.features')}
					id="features"
					type="textarea"
					placeholder={t(
						'modal.professionalModal.form.featuresPlaceholder',
					)}
					value={formData.features}
					onChange={handleInputChange('features')}
				/>

				<FormField
					label={t('modal.professionalModal.form.projectDetails')}
					id="projectDetails"
					type="textarea"
					placeholder={t(
						'modal.professionalModal.form.projectDetailsPlaceholder',
					)}
					value={formData.projectDetails}
					onChange={handleInputChange('projectDetails')}
					required
				/>

				{/* Submit Button */}
				<div className="pt-4">
					<Button
						type="submit"
						variant="default"
						className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
					>
						{t('modal.professionalModal.form.submit')}
					</Button>
				</div>
			</form>
		</BaseModal>
	)
}
