import { defineConfig } from 'astro/config'

import node from '@astrojs/node'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { configManagerIntegration } from '@nextnode/config-manager/astro'
import { logger } from '@nextnode/logger'
import tailwindcss from '@tailwindcss/vite'

import { astroLogger } from './src/lib/logging/index.ts'

const host = process.env.HOST ?? '0.0.0.0'
const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 4321
const site = process.env.URL ?? `http://${host}:${port}`

// Log configuration for debugging
logger.info('Configuration loaded', {
	details: {
		host,
		port,
		site,
		environment: process.env.NODE_ENV || 'development',
	},
})

const siteMapPages = [
	{ name: '', priority: 1, changeFreq: 'weekly' },
	{ name: 'how-we-work', priority: 0.8, changeFreq: 'monthly' },
	{ name: 'pricing', priority: 0.9, changeFreq: 'monthly' },
	{ name: 'privacy', priority: 0.3, changeFreq: 'yearly' },
	{ name: 'terms', priority: 0.3, changeFreq: 'yearly' },
]

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
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en',
					fr: 'fr',
				},
			},
			// For SSR mode, explicitly define the routes
			customPages: [
				// French pages (primary market for Paris local SEO)
				...siteMapPages.map(page => `${site}/fr/${page.name}`),
				// English pages (secondary market)
				...siteMapPages.map(page => `${site}/${page.name}`),
			],
			filter: page => {
				// Exclude API endpoints, debug pages, health checks, and error pages
				return (
					!page.includes('/api/') &&
					!page.includes('/debug/') &&
					!page.includes('/health') &&
					!page.includes('/metrics') &&
					!page.includes('/404') &&
					!page.includes('/500')
				)
			},
			serialize: item => {
				const url = new URL(item.url)
				const pathname = url.pathname

				// Extract page name from path (remove /fr/ prefix if present)
				const pageName = pathname.startsWith('/fr/')
					? pathname.slice(4) // Remove '/fr/'
					: pathname.slice(1) // Remove leading '/'

				// Find matching page configuration
				const pageConfig = siteMapPages.find(
					({ name }) => name === pageName,
				)

				if (!pageConfig) {
					// Fallback for unknown pages
					return {
						...item,
						priority: 0.5,
						changefreq: 'monthly',
					}
				}

				// Apply SEO priorities optimized for Paris local search
				let priority = pageConfig.priority

				// English pages get lower priority (secondary market)
				if (!pathname.startsWith('/fr/')) {
					priority = Math.max(0.1, priority - 0.3)
				}

				return {
					...item,
					priority,
					changefreq: pageConfig.changeFreq,
				}
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
