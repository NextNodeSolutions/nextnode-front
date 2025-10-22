import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import StepCard from '../StepCard'

describe('StepCard', () => {
	afterEach(() => {
		cleanup()
		vi.clearAllMocks()
	})
	const defaultProps = {
		stepKey: 'discovery',
		index: 0,
		number: '01',
		title: 'Discovery & Strategy',
		description: 'We dive deep into your business goals',
		variant: 'mini' as const,
		stepLabel: 'Step',
		clickToSeeMore: 'Click to see more',
	}

	it('should render step card with correct content', () => {
		// Use compact variant to show description
		render(<StepCard {...defaultProps} variant="compact" />)

		expect(screen.getByText('Discovery & Strategy')).toBeInTheDocument()
		expect(
			screen.getByText('We dive deep into your business goals'),
		).toBeInTheDocument()
		expect(screen.getByText('Click to see more')).toBeInTheDocument()
	})

	it('should render step label with number', () => {
		// Use compact variant to show step label
		render(<StepCard {...defaultProps} variant="compact" />)

		const stepLabelElement = screen.getByText(/Step/)
		expect(stepLabelElement).toBeInTheDocument()
		expect(stepLabelElement.textContent).toContain('01')
	})

	it('should call onExpand when card is clicked and not expanded', () => {
		const onExpand = vi.fn()
		const { container } = render(
			<StepCard
				{...defaultProps}
				isExpanded={false}
				onExpand={onExpand}
			/>,
		)

		const cardElement = container.firstChild as HTMLElement
		cardElement.click()

		expect(onExpand).toHaveBeenCalledOnce()
	})

	it('should not call onExpand when card is already expanded', () => {
		const onExpand = vi.fn()
		const { container } = render(
			<StepCard
				{...defaultProps}
				isExpanded={true}
				onExpand={onExpand}
			/>,
		)

		const cardElement = container.firstChild as HTMLElement
		cardElement.click()

		expect(onExpand).not.toHaveBeenCalled()
	})

	it('should render expanded content when isExpanded is true', () => {
		const expandedContent = <div>Expanded Content Test</div>

		render(
			<StepCard
				{...defaultProps}
				isExpanded={true}
				expandedContent={expandedContent}
			/>,
		)

		expect(screen.getByText('Expanded Content Test')).toBeInTheDocument()
	})

	it('should not render expanded content when isExpanded is false', () => {
		const expandedContent = <div>Expanded Content Test</div>

		render(
			<StepCard
				{...defaultProps}
				isExpanded={false}
				expandedContent={expandedContent}
			/>,
		)

		expect(
			screen.queryByText('Expanded Content Test'),
		).not.toBeInTheDocument()
	})

	it('should hide description for mini variant', () => {
		render(<StepCard {...defaultProps} variant="mini" />)

		// Description should not be visible with mini variant
		const description = screen.queryByText(
			'We dive deep into your business goals',
		)
		expect(description).toBeNull()
	})

	it('should render progress bar with correct number of segments', () => {
		const { container } = render(<StepCard {...defaultProps} />)

		// Progress bar has 6 segments (Array.from({ length: 6 }))
		const progressSegments = container.querySelectorAll(
			'[class*="flex-1"][class*="rounded-full"]',
		)

		expect(progressSegments).toHaveLength(6)
	})
})
