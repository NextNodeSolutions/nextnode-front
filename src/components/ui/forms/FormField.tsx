/**
 * FormField - Reusable form field wrapper component
 * Consolidates form field patterns from modal components
 */

import React from 'react'

import { cn } from '@/lib/core/utils'

import { Input } from './input'
import { Textarea } from './textarea'

export interface FormFieldProps {
	/** Field label */
	label: string
	/** Field ID and name */
	id: string
	/** Input type */
	type?: 'text' | 'email' | 'textarea'
	/** Placeholder text */
	placeholder?: string
	/** Required field */
	required?: boolean
	/** Additional className for container */
	className?: string
	/** Additional className for input */
	inputClassName?: string
	/** Field value */
	value?: string
	/** Change handler */
	onChange?: (value: string) => void
}

export const FormField: React.FC<FormFieldProps> = ({
	label,
	id,
	type = 'text',
	placeholder,
	required = false,
	className,
	inputClassName,
	value,
	onChange,
}) => {
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	): void => {
		onChange?.(e.target.value)
	}

	const commonInputProps = {
		id,
		name: id,
		placeholder,
		required,
		value,
		onChange: handleChange,
		className: cn('bg-white/80 backdrop-blur-sm', inputClassName),
	}

	return (
		<div className={cn('space-y-2', className)}>
			<label
				htmlFor={id}
				className="text-sm font-medium text-gray-700 dark:text-gray-300"
			>
				{label}
				{required && <span className="ml-1 text-red-500">*</span>}
			</label>
			{type === 'textarea' ? (
				<Textarea {...commonInputProps} rows={4} />
			) : (
				<Input {...commonInputProps} type={type} />
			)}
		</div>
	)
}

/**
 * FormGrid - Grid layout for form fields
 */
export const FormGrid: React.FC<{
	children: React.ReactNode
	columns?: 1 | 2
	className?: string
}> = ({ children, columns = 1, className }) => (
	<div
		className={cn(
			'grid gap-4',
			{
				'grid-cols-1': columns === 1,
				'grid-cols-1 sm:grid-cols-2': columns === 2,
			},
			className,
		)}
	>
		{children}
	</div>
)
