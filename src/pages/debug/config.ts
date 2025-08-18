import {
	getConfig,
	getAvailableEnvironments,
	getEnvironment,
} from '../../lib/config'

import type { APIRoute } from 'astro'
import type { RootConfig } from '../../lib/config'

export const GET: APIRoute = async () => {
	try {
		const currentConfig = getConfig<RootConfig>()
		const environment = process.env.APP_ENV || 'NOT_SET'
		const nodeEnv = process.env.NODE_ENV || 'NOT_SET'
		const currentEnv = getEnvironment()

		const debugInfo = {
			timestamp: new Date().toISOString(),
			environment: {
				APP_ENV: environment,
				NODE_ENV: nodeEnv,
				detected_environment: currentEnv,
			},
			config: {
				app: currentConfig?.app,
				// Only show non-sensitive config
				features: currentConfig?.app?.features || [],
				environment_from_config:
					currentConfig?.app?.environment || 'unknown',
			},
			availableConfigs: getAvailableEnvironments(),
		}

		return new Response(JSON.stringify(debugInfo, null, 2), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache, no-store, must-revalidate',
			},
		})
	} catch (error) {
		const errorInfo = {
			timestamp: new Date().toISOString(),
			error: {
				message:
					error instanceof Error ? error.message : 'Unknown error',
				type:
					error instanceof Error
						? error.constructor.name
						: 'UnknownError',
			},
			environment: {
				APP_ENV: process.env.APP_ENV || 'NOT_SET',
				NODE_ENV: process.env.NODE_ENV || 'NOT_SET',
			},
		}

		return new Response(JSON.stringify(errorInfo, null, 2), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache, no-store, must-revalidate',
			},
		})
	}
}
