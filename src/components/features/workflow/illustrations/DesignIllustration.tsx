import { Palette } from 'lucide-react'

interface IllustrationProps {
	color?: string
}

export const DesignIllustration = ({ color }: IllustrationProps) => {
	return (
		<Palette
			className="h-full w-full"
			strokeWidth={1.5}
			style={{ color }}
		/>
	)
}
