import { Search } from 'lucide-react'

interface IllustrationProps {
	color?: string
}

export const DiscoveryIllustration = ({ color }: IllustrationProps) => {
	return (
		<Search className="h-full w-full" strokeWidth={1.5} style={{ color }} />
	)
}
