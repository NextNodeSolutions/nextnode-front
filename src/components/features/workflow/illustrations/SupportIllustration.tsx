import { Headphones } from 'lucide-react'

interface IllustrationProps {
	color?: string
}

export const SupportIllustration = ({ color }: IllustrationProps) => {
	return (
		<Headphones
			className="h-full w-full"
			strokeWidth={1.5}
			style={{ color }}
		/>
	)
}
