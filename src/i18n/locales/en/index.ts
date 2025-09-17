import { common } from './common'
import { faq } from './components/faq'
import { footer } from './components/footer'
import { modal } from './components/modal'
import { error } from './pages/error'
import { home } from './pages/home'
import { howWeWork } from './pages/how-we-work'
import { pricing } from './pages/pricing'
import { privacy } from './pages/privacy'
import { terms } from './pages/terms'

export const en = {
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
} as const
