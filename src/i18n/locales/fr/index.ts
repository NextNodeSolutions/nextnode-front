import { common } from './common'
import { footer } from './components/footer'
import { error } from './pages/error'
import { home } from './pages/home'
import { howWeWork } from './pages/how-we-work'
import { pricing } from './pages/pricing'
import { privacy } from './pages/privacy'
import { terms } from './pages/terms'

import type { TranslationDict } from '@/types/i18n'

export const fr = {
	common,
	home,
	howWeWork,
	pricing,
	privacy,
	terms,
	error,
	footer,
} satisfies TranslationDict
