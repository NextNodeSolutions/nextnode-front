import { defineConfig } from 'astro/config'

import node from '@astrojs/node'
import react from '@astrojs/react'
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
		// Sitemap personnalisé via src/pages/sitemap.xml.ts pour meilleur contrôle SEO
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
