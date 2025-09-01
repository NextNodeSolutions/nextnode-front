import React, { useState } from 'react'

import { useI18n } from '@/lib/i18n/react'
import { componentLogger } from '@/lib/logging'
import { GLASSMORPHISM_PRESETS } from '@/lib/ui/ui-constants'
import { Button } from '@/components/ui/forms/button'
import { BaseModal, ModalHeader } from '@/components/ui/modals/BaseModal'
import { FormField, FormGrid } from '@/components/ui/forms/FormField'
import { SelectLegacy as Select } from '@/components/ui/forms/SelectLegacy'

import { PRICING_CONFIG, formatPrice } from './pricing-config'

interface ProfessionalProjectModalContentProps {
	isOpen: boolean
	onClose: () => void
	plan: 'business' | 'enterprise'
}

export const ProfessionalProjectModalContent = ({
	isOpen,
	onClose,
	plan,
}: ProfessionalProjectModalContentProps): React.ReactElement => {
	const { t } = useI18n()
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
		componentLogger.info('Professional project form submitted', {
			scope: 'form-submission',
			details: {
				...formData,
				plan,
			},
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
					{t('modal.professionalModal.selectedPlan')}{' '}
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
								{
									value: '1-10',
									label: t(
										'modal.professionalModal.form.employeeOptions.1-10',
									),
								},
								{
									value: '11-50',
									label: t(
										'modal.professionalModal.form.employeeOptions.11-50',
									),
								},
								{
									value: '51-200',
									label: t(
										'modal.professionalModal.form.employeeOptions.51-200',
									),
								},
								{
									value: '200+',
									label: t(
										'modal.professionalModal.form.employeeOptions.200+',
									),
								},
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
												value: `${PRICING_CONFIG.professional.ranges[0].min}-${PRICING_CONFIG.professional.ranges[0].max}`,
												label: formatPrice.range(
													PRICING_CONFIG.professional
														.ranges[0].min,
													PRICING_CONFIG.professional
														.ranges[0].max,
													'€',
												),
											},
											{
												value: `${PRICING_CONFIG.professional.ranges[1].min}-${PRICING_CONFIG.professional.ranges[1].max}`,
												label: formatPrice.range(
													PRICING_CONFIG.professional
														.ranges[1].min,
													PRICING_CONFIG.professional
														.ranges[1].max,
													'€',
												),
											},
											{
												value: `${PRICING_CONFIG.professional.ranges[2].min}-${PRICING_CONFIG.professional.ranges[2].max}`,
												label: formatPrice.range(
													PRICING_CONFIG.professional
														.ranges[2].min,
													PRICING_CONFIG.professional
														.ranges[2].max,
													'€',
												),
											},
											{
												value: `${PRICING_CONFIG.professional.ranges[3].min}+`,
												label: formatPrice.range(
													PRICING_CONFIG.professional
														.ranges[3].min,
													PRICING_CONFIG.professional
														.ranges[3].max,
													'€',
												),
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
												value: `${PRICING_CONFIG.professional.enterprise.ranges[0].min}-${PRICING_CONFIG.professional.enterprise.ranges[0].max}`,
												label: formatPrice.range(
													PRICING_CONFIG.professional
														.enterprise.ranges[0]
														.min,
													PRICING_CONFIG.professional
														.enterprise.ranges[0]
														.max,
													'€',
												),
											},
											{
												value: `${PRICING_CONFIG.professional.enterprise.ranges[1].min}-${PRICING_CONFIG.professional.enterprise.ranges[1].max}`,
												label: formatPrice.range(
													PRICING_CONFIG.professional
														.enterprise.ranges[1]
														.min,
													PRICING_CONFIG.professional
														.enterprise.ranges[1]
														.max,
													'€',
												),
											},
											{
												value: `${PRICING_CONFIG.professional.enterprise.ranges[2].min}-${PRICING_CONFIG.professional.enterprise.ranges[2].max}`,
												label: formatPrice.range(
													PRICING_CONFIG.professional
														.enterprise.ranges[2]
														.min,
													PRICING_CONFIG.professional
														.enterprise.ranges[2]
														.max,
													'€',
												),
											},
											{
												value: `${PRICING_CONFIG.professional.enterprise.ranges[3].min}+`,
												label: formatPrice.range(
													PRICING_CONFIG.professional
														.enterprise.ranges[3]
														.min,
													PRICING_CONFIG.professional
														.enterprise.ranges[3]
														.max,
													'€',
												),
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
								{
									value: 'urgent',
									label: t(
										'modal.professionalModal.form.timelineOptions.urgent',
									),
								},
								{
									value: '1-3months',
									label: t(
										'modal.professionalModal.form.timelineOptions.1-3months',
									),
								},
								{
									value: '3-6months',
									label: t(
										'modal.professionalModal.form.timelineOptions.3-6months',
									),
								},
								{
									value: '6months+',
									label: t(
										'modal.professionalModal.form.timelineOptions.6months+',
									),
								},
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
									label: t(
										'modal.professionalModal.form.trafficOptions.low',
									),
								},
								{
									value: 'medium',
									label: t(
										'modal.professionalModal.form.trafficOptions.medium',
									),
								},
								{
									value: 'high',
									label: t(
										'modal.professionalModal.form.trafficOptions.high',
									),
								},
								{
									value: 'very-high',
									label: t(
										'modal.professionalModal.form.trafficOptions.very-high',
									),
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
								{
									value: 'non',
									label: t(
										'modal.professionalModal.form.technicalOptions.non',
									),
								},
								{
									value: 'oui',
									label: t(
										'modal.professionalModal.form.technicalOptions.oui',
									),
								},
								{
									value: 'externe',
									label: t(
										'modal.professionalModal.form.technicalOptions.externe',
									),
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
							{
								value: 'non',
								label: t(
									'modal.professionalModal.form.integrationOptions.non',
								),
							},
							{
								value: 'oui-simple',
								label: t(
									'modal.professionalModal.form.integrationOptions.oui-simple',
								),
							},
							{
								value: 'oui-complexe',
								label: t(
									'modal.professionalModal.form.integrationOptions.oui-complexe',
								),
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
