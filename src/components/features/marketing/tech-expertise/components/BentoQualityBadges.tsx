import { Shield } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'
import { renderIcon } from '@/lib/ui/icon-mapper'

import BentoCard from './BentoCard'

interface BentoQualityBadgesProps {
	readonly data: {
		readonly title: string
		readonly items: readonly {
			readonly title: string
			readonly subtitle: string
			readonly icon: 'shield' | 'check' | 'activity' | 'lock'
		}[]
	}
}

/**
 * Quality badges section for Bento grid
 * Displays quality metrics with icons
 */
const BentoQualityBadges = ({ data }: BentoQualityBadgesProps) => {
	return (
		<BentoCard className="lg:col-span-2">
			<div className="relative z-10">
				<div className="mb-6 flex items-center gap-3">
					<Shield className="text-brand-blue h-6 w-6" />
					<h3 className="text-xl font-bold text-white">
						{data.title}
					</h3>
				</div>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
					{data.items.map((badge, index) => (
						<motion.div
							key={badge.subtitle}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className={cn(
								'flex flex-col items-center gap-2 rounded-lg p-4',
								'from-brand-green/10 to-brand-blue/10 bg-gradient-to-br',
								'border-brand-green/30 border',
								'hover:border-brand-green/50 transition-colors',
							)}
						>
							<div className="flex items-center gap-2">
								{renderIcon(badge.icon, {
									className: 'text-brand-green h-5 w-5',
								})}
								<span className="text-lg font-bold text-white">
									{badge.title}
								</span>
							</div>
							<span className="text-xs text-gray-400">
								{badge.subtitle}
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</BentoCard>
	)
}

export default BentoQualityBadges
