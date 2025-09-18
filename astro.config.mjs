import { defineConfig } from 'astro/config'

import node from '@astrojs/node'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { configManagerIntegration } from '@nextnode/config-manager/astro'
import tailwindcss from '@tailwindcss/vite'

import { astroLogger } from './src/lib/logging/index.ts'

const host = process.env.HOST ?? '0.0.0.0'
const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 4321
const site = process.env.URL ?? `http://${host}:${port}`

// Log configuration
astroLogger.info('Configuration loaded', {
	details: {
		host,
		port,
		site,
		environment: process.env.NODE_ENV || 'development',
	},
})

// https://astro.build/config
export default defineConfig({
	site,
	output: 'server',
	server: {
		port,
		host,
	},
	vite: {
		plugins: [tailwindcss()],
	},
	adapter: node({
		mode: 'standalone',
	}),
	integrations: [
		react(),
		sitemap({
			// Configuration SEO optimisée pour agence web Paris
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en',
					fr: 'fr',
				},
			},
			filter: page => {
				// Exclure les pages de debug et API du sitemap
				return (
					!page.includes('/debug/') &&
					!page.includes('/api/') &&
					!page.includes('/health') &&
					!page.includes('/metrics')
				)
			},
		}),
		configManagerIntegration({
			verbose: false, // Disable verbose logging for production
		}),
	],
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'fr'],
		routing: 'manual',
	},
})
