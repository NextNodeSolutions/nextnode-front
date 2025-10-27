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

	it('should call onExpand when card is clicked', () => {
		const onExpand = vi.fn()
		const { container } = render(
			<StepCard {...defaultProps} onExpand={onExpand} />,
		)

		const cardElement = container.firstChild as HTMLElement
		cardElement.click()

		expect(onExpand).toHaveBeenCalledOnce()
	})

	it('should render description', () => {
		render(<StepCard {...defaultProps} />)

		// Description is visible on large screens (hidden on md via Tailwind)
		const description = screen.queryByText(
			'We dive deep into your business goals',
		)
		expect(description).toBeInTheDocument()
	})

	it('should have glassmorphic styling', () => {
		const { container } = render(<StepCard {...defaultProps} />)

		const cardElement = container.firstChild as HTMLElement

		// Check for glassmorphic classes
		expect(cardElement.className).toContain('backdrop-blur')
		expect(cardElement.className).toContain('border')
	})
})
