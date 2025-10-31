import { Code2 } from 'lucide-react'

interface IllustrationProps {
	color?: string
}

export const DevelopmentIllustration = ({ color }: IllustrationProps) => {
	return (
		<Code2 className="h-full w-full" strokeWidth={1.5} style={{ color }} />
	)
}
