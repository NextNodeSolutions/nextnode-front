import { Code2 } from 'lucide-react'

import CodeBlock from '@/components/ui/CodeBlock'

import BentoCard from './BentoCard'

interface BentoCodeExampleProps {
	readonly title: string
	readonly code: string
}

/**
 * Code example section for Bento grid
 * Displays TypeScript code sample with syntax highlighting
 * Code is internationalized via i18n system
 */
const BentoCodeExample = ({ title, code }: BentoCodeExampleProps) => {
	return (
		<BentoCard className="lg:col-span-2">
			<div className="relative z-10">
				<div className="mb-4 flex items-center gap-3">
					<Code2 className="text-brand-blue h-6 w-6" />
					<h3 className="text-xl font-bold text-white">{title}</h3>
				</div>
				<CodeBlock code={code} language="typescript" />
			</div>
		</BentoCard>
	)
}

export default BentoCodeExample
