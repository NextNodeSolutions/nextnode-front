import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	// @ts-ignore - Plugin type compatibility issue between Vite versions
	plugins: [tsconfigPaths()],
	test: {
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['json'],
			reportsDirectory: './src/test/coverage',
			enabled: true,
		},
	},
})
