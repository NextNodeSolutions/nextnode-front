import { Code2 } from 'lucide-react'

import CodeBlock from '@/components/ui/CodeBlock'

import BentoCard from './BentoCard'

interface BentoCodeExampleProps {
	readonly title: string
}

const CODE_SAMPLE = `// Track customer engagement with type-safe scoring
type EngagementAction = 'visit' | 'click' | 'signup' | 'purchase'

interface EngagementScore {
  stage: string
  points: number
}

const getEngagementScore = (action: EngagementAction): EngagementScore => {
  const stages: Record<EngagementAction, EngagementScore> = {
    visit: { stage: 'Discovery', points: 10 },
    click: { stage: 'Interest', points: 25 },
    signup: { stage: 'Lead', points: 50 },
    purchase: { stage: 'Customer', points: 100 }
  }

  return stages[action]
}`

/**
 * Code example section for Bento grid
 * Displays TypeScript code sample with syntax highlighting
 */
const BentoCodeExample = ({ title }: BentoCodeExampleProps) => {
	return (
		<BentoCard className="lg:col-span-2">
			<div className="relative z-10">
				<div className="mb-4 flex items-center gap-3">
					<Code2 className="text-brand-blue h-6 w-6" />
					<h3 className="text-xl font-bold text-white">{title}</h3>
				</div>
				<CodeBlock code={CODE_SAMPLE} language="typescript" />
			</div>
		</BentoCard>
	)
}

export default BentoCodeExample
