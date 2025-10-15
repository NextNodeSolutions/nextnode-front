import type { StepKey } from '@/types/i18n'

const STEP_ICONS: Record<StepKey, string> = {
	discovery: '🔍',
	design: '🎨',
	development: '⚡',
	testing: '🧪',
	deployment: '🚀',
	support: '🛟',
}

interface StepIllustrationProps {
	stepKey: StepKey
}

export default function StepIllustration({ stepKey }: StepIllustrationProps) {
	return (
		<div className="flex h-full w-full items-center justify-center p-8">
			<div className="text-6xl">{STEP_ICONS[stepKey]}</div>
		</div>
	)
}
