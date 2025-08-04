import { en } from './locales/en'
import { fr } from './locales/fr'
import {
	SUPPORTED_LOCALES,
	DEFAULT_LOCALE,
	type Locale,
} from '../lib/i18n/i18n-constants'

export const translations = {
	en: { common: en },
	fr: { common: fr },
}

export const locales: readonly Locale[] = SUPPORTED_LOCALES
export const defaultLocale: Locale = DEFAULT_LOCALE
