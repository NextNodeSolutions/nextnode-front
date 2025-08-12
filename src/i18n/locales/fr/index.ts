import { common } from './common'
import { home } from './pages/home'
import { howWeWork } from './pages/how-we-work'
import { pricing } from './pages/pricing'
import { privacy } from './pages/privacy'
import { terms } from './pages/terms'
import { error } from './pages/error'
import { modal } from './components/modal'
import { footer } from './components/footer'
import { faq } from './components/faq'

import type { TranslationDict } from '../../../lib/i18n/types'

export const fr = {
	common,
	home,
	howWeWork,
	pricing,
	privacy,
	terms,
	error,
	modal,
	footer,
	faq,
} satisfies TranslationDict
