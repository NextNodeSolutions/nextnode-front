import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import { configManagerIntegration } from '@nextnode/config-manager/astro'

import node from '@astrojs/node'
import react from '@astrojs/react'

const host = process.env.HOST ?? '0.0.0.0'
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4321
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
		build: {
			rollupOptions: {
				output: {
					manualChunks: {
						// Vendor libraries
						'vendor-react': ['react', 'react-dom'],
						'vendor-radix': [
							'@radix-ui/react-dialog',
							'@radix-ui/react-slot',
							'@radix-ui/react-accordion',
						],
						'vendor-utils': [
							'clsx',
							'class-variance-authority',
							'tailwind-merge',
						],
						// Feature-based splitting
						workflow: [
							'./src/components/features/workflow/interactive/WorkflowJourneyInteractive.tsx',
							'./src/components/features/workflow/interactive/StepModal.tsx',
						],
						marketing: [
							'./src/components/features/marketing/interaction/start-project-modal.tsx',
						],
						// Icons can be separated
						icons: ['lucide-react'],
					},
				},
			},
		},
	},
	adapter: node({
		mode: 'standalone',
	}),
	integrations: [
		react(), 
		configManagerIntegration({
			verbose: false, // Disable verbose logging for production
		})
	],
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'fr'],
		routing: 'manual',
	},
})
