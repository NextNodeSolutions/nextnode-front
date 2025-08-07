import React, { useState } from 'react'

import { cn } from '@/lib/core/utils'
import { useI18n } from '@/lib/i18n/i18n-client'
import { GLASSMORPHISM_PRESETS } from '@/lib/ui/ui-constants'
import { Button } from '@/components/ui/forms/button'
import { Input } from '@/components/ui/forms/input'
import { Textarea } from '@/components/ui/forms/textarea'
import ModalContainer from '@/components/ui/overlays/modal-container'

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
					'group w-full cursor-pointer px-4 py-6 transition-all duration-300',
					'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
					'transform shadow-lg hover:scale-[1.05] hover:shadow-2xl',
					'text-base font-bold tracking-wide text-white',
					'sm:px-6 sm:py-6 sm:text-lg',
					'md:px-8 md:py-6 md:text-lg',
					'flex items-center justify-center gap-2',
					'hover:animate-pulse-dark',
				)}
			>
				<span
					className={cn(
						'transition-transform duration-300',
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

			<ModalContainer
				isOpen={isOpen}
				onClose={handleClose}
				color="#3B82F6"
				title={t('modal.title')}
				width="600px"
				maxWidth="95vw"
				className="sm:max-w-[600px]"
				glassmorphismOptions={GLASSMORPHISM_PRESETS.modal}
			>
				<div className="animate-in fade-in p-6 duration-300 sm:p-8">
					{/* Header */}
					<div className="mb-6 text-center">
						<h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
							{t('modal.title')}
						</h2>
						<p className="text-base text-gray-600 sm:text-lg">
							{t('modal.description')}
						</p>
					</div>

					{/* Form */}
					<form className="space-y-4 sm:space-y-6">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<label
									htmlFor="name"
									className="text-sm font-medium text-gray-700"
								>
									{t('modal.form.name')}
								</label>
								<Input
									id="name"
									placeholder={t(
										'modal.form.namePlaceholder',
									)}
									className="bg-white/80 backdrop-blur-sm"
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="text-sm font-medium text-gray-700"
								>
									{t('modal.form.email')}
								</label>
								<Input
									id="email"
									type="email"
									placeholder={t(
										'modal.form.emailPlaceholder',
									)}
									className="bg-white/80 backdrop-blur-sm"
								/>
							</div>
						</div>
						<div className="space-y-2">
							<label
								htmlFor="project"
								className="text-sm font-medium text-gray-700"
							>
								{t('modal.form.projectType')}
							</label>
							<Input
								id="project"
								placeholder={t(
									'modal.form.projectTypePlaceholder',
								)}
								className="bg-white/80 backdrop-blur-sm"
							/>
						</div>
						<div className="space-y-2">
							<label
								htmlFor="budget"
								className="text-sm font-medium text-gray-700"
							>
								{t('modal.form.budget')}
							</label>
							<Input
								id="budget"
								placeholder={t('modal.form.budgetPlaceholder')}
								className="bg-white/80 backdrop-blur-sm"
							/>
						</div>
						<div className="space-y-2">
							<label
								htmlFor="message"
								className="text-sm font-medium text-gray-700"
							>
								{t('modal.form.details')}
							</label>
							<Textarea
								id="message"
								placeholder={t('modal.form.detailsPlaceholder')}
								className="min-h-[100px] bg-white/80 backdrop-blur-sm sm:min-h-[120px]"
							/>
						</div>
						<Button
							type="submit"
							className="w-full bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
						>
							{t('modal.form.submit')}
						</Button>
					</form>
				</div>
			</ModalContainer>
		</div>
	)
}
