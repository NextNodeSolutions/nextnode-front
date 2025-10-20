import { useRef } from 'react'

import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import useOutsideClick from '../useOutsideClick'

describe('useOutsideClick', () => {
	let handler: ReturnType<typeof vi.fn>

	beforeEach(() => {
		handler = vi.fn()
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	const TestComponent = () => {
		const ref = useRef<HTMLDivElement>(null)
		useOutsideClick(ref, handler)

		return (
			<div>
				<div ref={ref} data-testid="inside">
					Inside
				</div>
				<div data-testid="outside">Outside</div>
			</div>
		)
	}

	it('should call handler when clicking outside', () => {
		const { getByTestId } = render(<TestComponent />)

		const outsideElement = getByTestId('outside')
		outsideElement.click()

		expect(handler).toHaveBeenCalledOnce()
	})

	it('should not call handler when clicking inside', () => {
		const { getByTestId } = render(<TestComponent />)

		const insideElement = getByTestId('inside')
		insideElement.click()

		expect(handler).not.toHaveBeenCalled()
	})

	it('should handle touch events', () => {
		const { getByTestId } = render(<TestComponent />)

		const outsideElement = getByTestId('outside')
		const touchEvent = new TouchEvent('touchstart', {
			bubbles: true,
			cancelable: true,
		})

		outsideElement.dispatchEvent(touchEvent)

		expect(handler).toHaveBeenCalledOnce()
	})
})
