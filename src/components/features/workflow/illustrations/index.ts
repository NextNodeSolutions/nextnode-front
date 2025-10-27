import { DeploymentIllustration } from './DeploymentIllustration'
import { DesignIllustration } from './DesignIllustration'
import { DevelopmentIllustration } from './DevelopmentIllustration'
import { DiscoveryIllustration } from './DiscoveryIllustration'
import { SupportIllustration } from './SupportIllustration'
import { TestingIllustration } from './TestingIllustration'

import type { StepKey } from '@/types/i18n'

export const getStepIllustration = (stepKey: StepKey) => {
	const illustrations = {
		discovery: DiscoveryIllustration,
		design: DesignIllustration,
		development: DevelopmentIllustration,
		testing: TestingIllustration,
		deployment: DeploymentIllustration,
		support: SupportIllustration,
	}
	return illustrations[stepKey]
}

export {
	DeploymentIllustration,
	DesignIllustration,
	DevelopmentIllustration,
	DiscoveryIllustration,
	SupportIllustration,
	TestingIllustration,
}
