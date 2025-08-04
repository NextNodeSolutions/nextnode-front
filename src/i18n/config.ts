import { en } from './locales/en'
import { fr } from './locales/fr'

import type { Locale } from './types'

export const translations = {
	en: { common: en },
	fr: { common: fr },
}

export const locales: readonly Locale[] = ['en', 'fr'] as const
export const defaultLocale: Locale = 'en'
