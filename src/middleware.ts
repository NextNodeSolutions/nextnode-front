import { sequence } from 'astro:middleware'

import { i18nMiddleware } from './lib/middleware/i18n'
import { loggingMiddleware } from './lib/middleware/logging'
import { metricsMiddleware } from './lib/middleware/metrics'
// Import specialized middleware modules
import { urlMappingMiddleware } from './lib/middleware/url-mapping'

export const onRequest = sequence(
	urlMappingMiddleware, // 1. Map URLs → internal [locale]/ structure
	i18nMiddleware, // 2. Initialize i18n system and inject context
	metricsMiddleware, // 3. Collect application metrics
	loggingMiddleware, // 4. Log requests and responses
)
