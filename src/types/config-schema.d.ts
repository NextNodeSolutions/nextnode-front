/**
 * Type declaration for @nextnode/functions-server config schema
 * This file provides type safety for our specific configuration structure
 */

import type { EmailConfig, AppConfig } from '../lib/config-types'

declare module '@nextnode/functions-server/config' {
	interface UserConfigSchema {
		email: EmailConfig
		app: AppConfig
	}
}
