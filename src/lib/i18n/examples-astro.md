# Guide d'utilisation du système i18n dans Astro

Ce guide montre comment utiliser le nouveau système i18n unifié dans différents contextes Astro.

## 1. Dans les composants Astro (.astro)

### Méthode 1: Utiliser les locals du middleware (recommandé)

```astro
---
// Le middleware a déjà initialisé locale et t dans Astro.locals
const { locale, t } = Astro.locals
---

<html lang={locale}>
	<head>
		<title>{t('home.pageTitle')}</title>
		<meta name="description" content={t('meta.defaultDescription')} />
	</head>
	<body>
		<h1>{t('home.hero.title')}</h1>
		<p>{t('home.hero.description')}</p>

		<!-- Récupérer une section complète -->
		{
			(() => {
				const navigation = t('common.navigation')
				return (
					<nav>
						<a href="/en/">{navigation.home}</a>
						<a href="/en/about">{navigation.about}</a>
					</nav>
				)
			})()
		}
	</body>
</html>
```

### Méthode 2: Initialiser manuellement

```astro
---
import { getI18nFromContext } from '../lib/i18n/astro'

const { locale, t } = getI18nFromContext(Astro.request)
---

<h1>{t('home.hero.title')}</h1>
```

## 2. Dans les API Routes

```typescript
// src/pages/api/contact.ts
import type { APIRoute } from 'astro'
import { getI18nForAPI } from '../../lib/i18n/astro'

export const POST: APIRoute = async context => {
	const { locale, t } = getI18nForAPI(context)

	// Utiliser les traductions dans la réponse
	const successMessage = t('contact.form.successMessage')

	return new Response(
		JSON.stringify({
			message: successMessage,
			locale,
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		},
	)
}
```

## 3. Dans les composants React

### Utilisation de base

```tsx
// src/components/LanguageSwitcher.tsx
import { useI18n } from '../lib/i18n/react'

export function LanguageSwitcher() {
	const { locale, setLocale, t } = useI18n()

	return (
		<div>
			<span>{t('common.ui.language')}: </span>
			<button onClick={() => setLocale('en')} disabled={locale === 'en'}>
				English
			</button>
			<button onClick={() => setLocale('fr')} disabled={locale === 'fr'}>
				Français
			</button>
		</div>
	)
}
```

### Utilisation avec traduction spécifique

```tsx
// src/components/WelcomeMessage.tsx
import { useTranslation } from '../lib/i18n/react'

export function WelcomeMessage({ userName }: { userName: string }) {
	const { value: greeting } = useTranslation(
		'common.examples.interpolation.greeting',
		{
			name: userName,
			siteName: 'Nextnode',
		},
	)

	return <h2>{greeting}</h2>
}
```

### Utilisation avec section complète

```tsx
// src/components/Navigation.tsx
import { useTranslationSection } from '../lib/i18n/react'

interface NavigationSection {
	home: string
	about: string
	services: string
	contact: string
}

export function Navigation() {
	const { section: nav } =
		useTranslationSection<NavigationSection>('common.navigation')

	return (
		<nav>
			<a href="/en/">{nav.home}</a>
			<a href="/en/about">{nav.about}</a>
			<a href="/en/services">{nav.services}</a>
			<a href="/en/contact">{nav.contact}</a>
		</nav>
	)
}
```

## 4. Gestion des URLs et SEO

### Liens hreflang automatiques

```astro
---
// src/layouts/Layout.astro
import { getHrefLangLinks } from '../lib/i18n/astro'

const hrefLangLinks = getHrefLangLinks(Astro.request)
---

<html>
	<head>
		{
			hrefLangLinks.map(link => (
				<link
					rel="alternate"
					hreflang={link.hreflang}
					href={link.href}
				/>
			))
		}
	</head>
</html>
```

### Navigation entre langues

```astro
---
import {
	getAlternateLocale,
	pathToLocalized,
	removeLocalePrefix,
} from '../lib/i18n/astro'

const { locale } = Astro.locals
const alternateLocale = getAlternateLocale(locale)
const currentPath = removeLocalePrefix(Astro.url.pathname)
const alternatePath = pathToLocalized(alternateLocale, currentPath)
---

<div class="language-switcher">
	<a href={alternatePath}>
		{alternateLocale === 'fr' ? 'Français' : 'English'}
	</a>
</div>
```

## 5. Exemples avancés

### Utilisation avec clés dynamiques

```astro
---
const { t } = Astro.locals

// Pour une FAQ avec index dynamique
const faqItems = [0, 1, 2].map(index => ({
	question: t('pricing.faq.questions.{index}.question', { index }),
	answer: t('pricing.faq.questions.{index}.answer', { index }),
}))
---

<div class="faq">
	{
		faqItems.map(item => (
			<div>
				<h3>{item.question}</h3>
				<p>{item.answer}</p>
			</div>
		))
	}
</div>
```

### Récupération de données avec interpolation

```astro
---
const { t } = Astro.locals

// Avec variables d'interpolation
const welcomeMessage = t('common.examples.interpolation.greeting', {
	name: 'John',
	siteName: 'Nextnode',
})

// Avec date formatée automatiquement
const lastUpdated = t('common.legal.lastUpdated', {
	date: new Date(),
})
---

<p>{welcomeMessage}</p>
<small>{lastUpdated}</small>
```

## 6. Migration depuis l'ancien système

### Avant (ancien système)

```astro
---
import { getI18n } from '../lib/i18n/i18n-server'
const { t, locale } = await getI18n(Astro.request)
---
```

### Après (nouveau système)

```astro
---
// Plus besoin d'importer, disponible via Astro.locals
const { t, locale } = Astro.locals
---
```

### Comparaison des fonctionnalités

| Fonctionnalité       | Ancien système | Nouveau système     |
| -------------------- | -------------- | ------------------- |
| Import requis        | ✅             | ❌ (via middleware) |
| Types auto-inférés   | ❌             | ✅                  |
| Clés dynamiques      | ❌             | ✅                  |
| Interpolation native | ❌             | ✅                  |
| Cache intégré        | ✅             | ✅                  |
| Support React        | ✅             | ✅ (amélioré)       |
| Objets imbriqués     | ❌             | ✅                  |

Le nouveau système offre une API plus simple, des types plus précis, et de meilleures performances !
