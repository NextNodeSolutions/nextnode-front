import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'

import { buttonVariants } from '@/components/ui/forms/button'
import { cn } from '@/lib/core/utils'

export interface ButtonWithLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const ButtonWithLink = React.forwardRef<HTMLAnchorElement, ButtonWithLinkProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'a'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)
ButtonWithLink.displayName = 'ButtonWithLink'

export { ButtonWithLink }
