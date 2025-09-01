import { defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: {
		alias: {
			'@': './src',
			'@/types': './types',
		},
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.ts'],
		coverage: {
			provider: 'v8',
			reporter: [
				[
					'json',
					{
						file: `../coverage.json`,
					},
				],
			],
			enabled: true,
		},
	},
})
