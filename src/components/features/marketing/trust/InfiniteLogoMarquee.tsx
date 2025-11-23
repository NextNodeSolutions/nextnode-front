import { cn } from '@/lib/core/utils'

interface Client {
	name: string
	logo: string
	alt: string
}

interface InfiniteLogoMarqueeProps {
	clients: Client[]
	speed?: 'slow' | 'normal' | 'fast'
	pauseOnHover?: boolean
	className?: string
}

export default function InfiniteLogoMarquee({
	clients,
	speed = 'normal',
	pauseOnHover = true,
	className,
}: InfiniteLogoMarqueeProps) {
	const speedClasses = {
		slow: 'animate-scroll-slow',
		normal: 'animate-scroll',
		fast: 'animate-scroll-fast',
	}

	// Duplicate clients for seamless infinite scroll
	const duplicatedClients = [...clients, ...clients]

	return (
		<div className={cn('relative w-full overflow-hidden', className)}>
			{/* Gradient overlays for fade effect */}
			<div className="dark:from-brand-charcoal dark:via-brand-charcoal/80 pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-white via-white/80 to-transparent" />
			<div className="dark:from-brand-charcoal dark:via-brand-charcoal/80 pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-white via-white/80 to-transparent" />

			{/* Scrolling container */}
			<div
				className={cn(
					'flex gap-8',
					speedClasses[speed],
					pauseOnHover && 'hover:pause-animation',
				)}
			>
				{duplicatedClients.map((client, index) => (
					<div
						key={`${client.name}-${index}`}
						className="flex-shrink-0 overflow-hidden rounded-2xl"
					>
						<div
							className={cn(
								'group relative',
								'rounded-2xl p-8',
								'backdrop-blur-sm',
								'dark:bg-brand-charcoal/90 bg-white/90',
								'border border-white/20 dark:border-white/10',
								'shadow-sm',
								'transition-all duration-500',
								'hover:scale-105 hover:shadow-xl',
								'dark:hover:bg-brand-charcoal hover:bg-white',
								'hover:border-brand-blue/30 dark:hover:border-brand-blue/50',
							)}
						>
							{/* Gradient glow on hover */}
							<div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
								<div className="from-brand-blue/20 to-brand-green/20 absolute inset-0 rounded-2xl bg-gradient-to-br via-transparent" />
							</div>

							{/* Logo container */}
							<div className="relative h-16 w-48 sm:h-20 sm:w-56">
								<img
									src={client.logo}
									alt={client.alt}
									className={cn(
										'h-full w-full object-contain',
										'transition-all duration-500',
										'opacity-60 grayscale',
										'group-hover:opacity-100 group-hover:grayscale-0',
										'text-brand-charcoal dark:text-white',
									)}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
