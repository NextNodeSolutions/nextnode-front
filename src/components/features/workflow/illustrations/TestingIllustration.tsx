import { CheckCircle2 } from 'lucide-react'

interface IllustrationProps {
	color?: string
}

export const TestingIllustration = ({ color }: IllustrationProps) => {
	return (
		<CheckCircle2
			className="h-full w-full"
			strokeWidth={1.5}
			style={{ color }}
		/>
	)
}
