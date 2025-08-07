/**
 * BaseModal - Consolidated modal structure for consistent modal patterns
 * Extracted common patterns from StartProjectModal and StepModal
 */

import React from 'react'

import { cn } from '@/lib/core/utils'
import ModalContainer from '@/components/ui/overlays/modal-container'

export interface BaseModalProps {
	/** Modal open state */
	isOpen: boolean
	/** Close handler */
	onClose: () => void
	/** Modal title */
	title: string
	/** Accent color for theming */
	color?: string
	/** Modal width */
	width?: string
	/** Max width */
	maxWidth?: string
	/** Additional className */
	className?: string
	/** Glassmorphism configuration */
	glassmorphismOptions?: {
		baseOpacity?: number
		blur?: number
		colorOpacity?: number
		readabilityOpacity?: number
	}
	/** Main content */
	children: React.ReactNode
	/** Optional left panel content (for split layout) */
	leftPanel?: React.ReactNode
	/** Layout variant */
	layout?: 'single' | 'split'
}

export const BaseModal: React.FC<BaseModalProps> = ({
	isOpen,
	onClose,
	title,
	color = '#3B82F6',
	width = '600px',
	maxWidth = '95vw',
	className,
	glassmorphismOptions,
	children,
	leftPanel,
	layout = 'single',
}) => (
		<ModalContainer
			isOpen={isOpen}
			onClose={onClose}
			color={color}
			title={title}
			width={width}
			maxWidth={maxWidth}
			className={className}
			glassmorphismOptions={glassmorphismOptions}
		>
			{layout === 'split' && leftPanel ? (
				<div
					className={cn(
						'animate-in fade-in flex h-auto min-h-[450px] flex-col duration-300 sm:h-[520px] sm:min-h-[520px] sm:flex-row',
					)}
				>
					{/* Left Panel */}
					<div
						className="animate-in slide-in-from-left relative flex w-full items-center justify-center border-r border-white/20 bg-white/10 p-4 shadow-inner backdrop-blur-md duration-500 sm:w-2/5 sm:p-6"
						style={{
							background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, ${color}20 50%, rgba(255,255,255,0.05) 100%)`,
						}}
					>
						{leftPanel}
					</div>

					{/* Right Panel */}
					<div className="animate-in slide-in-from-right flex w-full flex-col justify-between border-l border-white/10 bg-white/30 p-6 shadow-sm backdrop-blur-sm delay-100 duration-500 sm:w-3/5 sm:p-8">
						{children}
					</div>
				</div>
			) : (
				<div className="animate-in fade-in p-6 duration-300 sm:p-8">
					{children}
				</div>
			)}
		</ModalContainer>
	)

/**
 * Modal section components for consistent styling
 */
export const ModalHeader: React.FC<{
	title: string
	description?: string
	badge?: {
		text: string
		color: string
	}
	className?: string
}> = ({ title, description, badge, className }) => (
	<div className={cn('mb-4 sm:mb-6', className)}>
		{badge && (
			<div className="mb-3 flex items-center gap-3">
				<span
					className="flex-shrink-0 rounded-full px-2 py-1 text-xs font-bold text-white sm:px-3 sm:text-sm"
					style={{ backgroundColor: badge.color }}
				>
					{badge.text}
				</span>
				<h2 className="text-lg leading-tight font-bold text-gray-900 sm:text-2xl">
					{title}
				</h2>
			</div>
		)}
		{!badge && (
			<h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
				{title}
			</h2>
		)}
		{description && (
			<p className="text-sm leading-relaxed text-gray-600 sm:text-base">
				{description}
			</p>
		)}
	</div>
)

export const ModalInfoCard: React.FC<{
	icon: React.ReactNode
	title: string
	content: string
	color: 'blue' | 'purple' | 'green'
	className?: string
}> = ({ icon, title, content, color, className }) => {
	const colorClasses = {
		blue: {
			border: 'border-blue-200 dark:border-blue-800',
			bg: 'bg-blue-50 dark:bg-blue-900/20',
			hoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',
			iconText: 'text-blue-600 dark:text-blue-400',
			titleText: 'text-blue-900 dark:text-blue-100',
			contentText: 'text-blue-800 dark:text-blue-200',
		},
		purple: {
			border: 'border-purple-200 dark:border-purple-800',
			bg: 'bg-purple-50 dark:bg-purple-900/20',
			hoverBg: 'hover:bg-purple-100 dark:hover:bg-purple-900/30',
			iconText: 'text-purple-600 dark:text-purple-400',
			titleText: 'text-purple-900 dark:text-purple-100',
			contentText: 'text-purple-800 dark:text-purple-200',
		},
		green: {
			border: 'border-green-200 dark:border-green-800',
			bg: 'bg-green-50 dark:bg-green-900/20',
			hoverBg: 'hover:bg-green-100 dark:hover:bg-green-900/30',
			iconText: 'text-green-600 dark:text-green-400',
			titleText: 'text-green-900 dark:text-green-100',
			contentText: 'text-green-800 dark:text-green-200',
		},
	}

	const colors = colorClasses[color]

	return (
		<div
			className={cn(
				'flex-1 rounded-xl border p-3 backdrop-blur-sm transition-all duration-200 hover:shadow-md sm:p-4',
				colors.border,
				colors.bg,
				colors.hoverBg,
				className,
			)}
		>
			<div className="mb-2 flex items-center gap-2">
				<div className={cn('h-4 w-4 sm:h-5 sm:w-5', colors.iconText)}>
					{icon}
				</div>
				<h4
					className={cn(
						'text-xs font-semibold sm:text-sm',
						colors.titleText,
					)}
				>
					{title}
				</h4>
			</div>
			<p
				className={cn(
					'text-xs leading-snug sm:text-sm',
					colors.contentText,
				)}
			>
				{content}
			</p>
		</div>
	)
}
