import { createLogger } from '@nextnode/logger'

export const middlewareLogger = createLogger({ prefix: 'middleware' })
export const emailLogger = createLogger({ prefix: 'email-api' })
export const layoutLogger = createLogger({ prefix: 'layout' })
