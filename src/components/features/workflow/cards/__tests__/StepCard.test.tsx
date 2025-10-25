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
		stepLabel: 'Step',
		clickToSeeMore: 'Click to see more',
	}

	it('should render step card with correct content', () => {
		render(<StepCard {...defaultProps} />)

		expect(screen.getByText('Discovery & Strategy')).toBeInTheDocument()
		expect(
			screen.getByText('We dive deep into your business goals'),
		).toBeInTheDocument()
		expect(screen.getByText('Click to see more')).toBeInTheDocument()
	})

	it('should render step label with number', () => {
		render(<StepCard {...defaultProps} />)

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

	it('should render description', () => {
		render(<StepCard {...defaultProps} />)

		// Description is visible on large screens (hidden on md via Tailwind)
		const description = screen.queryByText(
			'We dive deep into your business goals',
		)
		expect(description).toBeInTheDocument()
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
