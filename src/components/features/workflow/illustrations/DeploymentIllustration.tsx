import { Rocket } from 'lucide-react'

interface IllustrationProps {
	color?: string
}

export const DeploymentIllustration = ({ color }: IllustrationProps) => {
	return (
		<Rocket className="h-full w-full" strokeWidth={1.5} style={{ color }} />
	)
}
