interface StepCardFooterProps {
	readonly showStepLabel: boolean
	readonly stepLabel: string
	readonly number: string
	readonly clickToSeeMore: string
}

/**
 * StepCardFooter - Footer with step label and CTA
 * Uses fixed grid height with flex layout for content alignment
 */
export const StepCardFooter = ({
	showStepLabel,
	stepLabel,
	number,
	clickToSeeMore,
}: StepCardFooterProps) => {
	return (
		<div className="flex h-[var(--card-footer-height)] flex-col justify-end">
			{showStepLabel && (
				<div className="mb-1">
					<span className="text-xs font-medium tracking-wider whitespace-nowrap text-gray-500 uppercase dark:text-gray-400">
						{stepLabel} {number}
					</span>
				</div>
			)}

			<div className="flex items-center">
				<span className="text-xs font-medium text-blue-600 dark:text-blue-400">
					{clickToSeeMore}
				</span>
				<span className="ml-1 text-xs font-medium text-blue-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 dark:text-blue-400">
					&gt;
				</span>
			</div>
		</div>
	)
}
