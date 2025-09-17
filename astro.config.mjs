import { defineConfig } from 'astro/config'

import node from '@astrojs/node'
import react from '@astrojs/react'
import { configManagerIntegration } from '@nextnode/config-manager/astro'
import tailwindcss from '@tailwindcss/vite'

const host = process.env.HOST ?? '0.0.0.0'
const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 4321
const site = process.env.URL ?? `http://${host}:${port}`

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
