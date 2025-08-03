import { common } from './common'
import { home } from './pages/home'
import { howWeWork } from './pages/how-we-work'
import { privacy } from './pages/privacy'
import { terms } from './pages/terms'
import { error } from './pages/error'
import { modal } from './components/modal'
import { footer } from './components/footer'
import { faq } from './components/faq'

export const en = {
	...common,
	hero: home.hero,
	sidePanel: home.sidePanel,
	howWeWork,
	workflow: howWeWork.workflow,
	faqCategories: howWeWork.faqCategories,
	techStats: howWeWork.techStats,
	privacy,
	terms,
	error,
	modal: modal.form,
	stepModal: modal.stepModal,
	footer,
	technicalFaq: faq.technicalFaq,
} as const
