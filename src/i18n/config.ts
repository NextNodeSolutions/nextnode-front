import en from '../../public/locales/en/common.json' with { type: 'json' }
import fr from '../../public/locales/fr/common.json' with { type: 'json' }

export const translations = {
	en: { common: en },
	fr: { common: fr },
}

export const locales = ['en', 'fr'] as const
export const defaultLocale = 'en'
