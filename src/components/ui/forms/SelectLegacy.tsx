import { forwardRef } from 'react'

import type { SelectHTMLAttributes } from 'react'

import { cn } from '@/lib/core/utils'

export interface SelectLegacyProps
	extends SelectHTMLAttributes<HTMLSelectElement> {
	/** Select options */
	options: Array<{ value: string; label: string }>
}

export const SelectLegacy = forwardRef<HTMLSelectElement, SelectLegacyProps>(
	({ className, options, ...props }, ref) => (
		<select
			className={cn(
				'flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2',
				'text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium',
				'placeholder:text-gray-500 focus-visible:ring-2 focus-visible:outline-none',
				'focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-800',
				'dark:placeholder:text-gray-400 dark:focus-visible:ring-indigo-400',
				className,
			)}
			ref={ref}
			{...props}
		>
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	),
)
SelectLegacy.displayName = 'SelectLegacy'
