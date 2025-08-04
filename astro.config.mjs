import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

import node from '@astrojs/node'
import react from '@astrojs/react'

const host = process.env.HOST ?? '0.0.0.0'
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4321
const site = process.env.URL ?? `http://${host}:${port}`

console.log({ port, site, host })

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
	integrations: [react()],
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'fr'],
		routing: 'manual'
	},
})
