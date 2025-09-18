import { createLogger } from '@nextnode/logger'

export const middlewareLogger = createLogger({ prefix: 'middleware' })
export const emailLogger = createLogger({ prefix: 'email-api' })
export const layoutLogger = createLogger({ prefix: 'layout' })
export const configLogger = createLogger({ prefix: 'config' })
export const i18nLogger = createLogger({ prefix: 'i18n' })
export const metricsLogger = createLogger({ prefix: 'metrics' })
export const componentLogger = createLogger({ prefix: 'component' })
export const astroLogger = createLogger({ prefix: 'astro' })
