import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Helpcenter Status Page', () => {
	const filePath = join(process.cwd(), 'src/pages/helpcenter/status.astro')
	const content = readFileSync(filePath, 'utf-8')

	describe('Layout Integration', () => {
		it('uses BaseLayout', () => {
			expect(content).toContain(
				"import BaseLayout from '@/layouts/BaseLayout.astro'",
			)
		})

		it('wraps content in BaseLayout', () => {
			expect(content).toContain('<BaseLayout')
			expect(content).toContain('</BaseLayout>')
		})

		it('has page title', () => {
			expect(content).toContain('title="System Status | NextNode"')
		})

		it('has page description', () => {
			expect(content).toContain('description=')
			expect(content).toContain('operational status')
		})
	})

	describe('Component Imports', () => {
		it('imports Status component as StatusDisplay', () => {
			expect(content).toContain(
				"import StatusDisplay from '@/components/helpcenter/Status.astro'",
			)
		})

		it('imports StatusItem type', () => {
			expect(content).toContain('import type {')
			expect(content).toContain('StatusItem,')
			expect(content).toContain('StatusEvent,')
			expect(content).toContain(
				"} from '@/components/helpcenter/Status.astro'",
			)
		})
	})

	describe('Status Component Usage', () => {
		it('renders StatusDisplay component', () => {
			expect(content).toContain('<StatusDisplay')
		})

		it('passes title prop', () => {
			expect(content).toContain('title="System Status:"')
		})

		it('passes subtitle prop', () => {
			expect(content).toContain('subtitle="All systems operational"')
		})

		it('passes description prop', () => {
			expect(content).toContain('description=')
			expect(content).toContain('infrastructure')
		})

		it('passes lastSyncTime prop', () => {
			expect(content).toContain('lastSyncTime={lastSyncTime}')
		})

		it('passes services prop', () => {
			expect(content).toContain('services={services}')
		})

		it('passes incidentsTitle prop', () => {
			expect(content).toContain('incidentsTitle=')
		})

		it('passes incidentsSubtitle prop', () => {
			expect(content).toContain('incidentsSubtitle=')
		})

		it('passes incidentsDateLabel prop', () => {
			expect(content).toContain('incidentsDateLabel=')
		})

		it('passes events prop', () => {
			expect(content).toContain('events={events}')
		})
	})

	describe('Services Array', () => {
		it('defines services array with StatusItem type', () => {
			expect(content).toContain('const services: StatusItem[] = [')
		})

		it('includes API Gateway service', () => {
			expect(content).toContain("service: 'API Gateway'")
		})

		it('includes Web Application service', () => {
			expect(content).toContain("service: 'Web Application'")
		})

		it('includes Authentication Service', () => {
			expect(content).toContain("service: 'Authentication Service'")
		})

		it('includes Database Cluster service', () => {
			expect(content).toContain("service: 'Database Cluster'")
		})

		it('includes CDN service', () => {
			expect(content).toContain("service: 'CDN & Edge Network'")
		})

		it('includes Background Processing service', () => {
			expect(content).toContain("service: 'Background Processing'")
		})

		it('includes Email Service', () => {
			expect(content).toContain("service: 'Email Service'")
		})

		it('uses operational status for services', () => {
			const operationalCount = (
				content.match(/status: 'operational'/g) || []
			).length
			expect(operationalCount).toBeGreaterThanOrEqual(6)
		})
	})

	describe('Events Array', () => {
		it('defines events array with StatusEvent type', () => {
			expect(content).toContain('const events: StatusEvent[] = [')
		})

		it('includes Completed event', () => {
			expect(content).toContain("status: 'Completed'")
		})

		it('includes In progress event', () => {
			expect(content).toContain("status: 'In progress'")
		})

		it('includes Scheduled event', () => {
			expect(content).toContain("status: 'Scheduled'")
		})

		it('events have descriptions', () => {
			expect(content).toContain('description:')
			expect(content).toContain('maintenance')
		})

		it('events have timestamps', () => {
			expect(content).toContain('timestamp:')
			expect(content).toContain('UTC')
		})
	})

	describe('Dynamic Sync Time', () => {
		it('creates Date object for current time', () => {
			expect(content).toContain('const now = new Date()')
		})

		it('generates lastSyncTime from current time', () => {
			expect(content).toContain('const lastSyncTime = now.toISOString()')
		})

		it('formats time as HH:MM:SS UTC', () => {
			expect(content).toContain("slice(11, 19) + ' UTC'")
		})
	})

	describe('TypeScript', () => {
		it('uses TypeScript frontmatter block', () => {
			expect(content).toContain('---')
		})

		it('has JSDoc comment for page description', () => {
			expect(content).toContain('/**')
			expect(content).toContain('*/')
		})

		it('uses typed arrays for services', () => {
			expect(content).toContain('StatusItem[]')
		})

		it('uses typed arrays for events', () => {
			expect(content).toContain('StatusEvent[]')
		})
	})

	describe('Content', () => {
		it('uses NextNode branding in title', () => {
			expect(content).toContain('NextNode')
		})

		it('describes monitoring capability', () => {
			expect(content).toContain('monitored')
		})

		it('mentions real time updates', () => {
			expect(content).toContain('real time')
		})

		it('mentions incidents reporting', () => {
			expect(content).toContain('incidents')
		})

		it('mentions maintenance', () => {
			expect(content).toContain('maintenance')
		})
	})

	describe('Service Status Values', () => {
		it('all services have status property', () => {
			const statusMatches = content.match(/status: '/g)
			expect(statusMatches).not.toBeNull()
			expect(statusMatches!.length).toBeGreaterThanOrEqual(7)
		})

		it('all services have service property', () => {
			const serviceMatches = content.match(/service: '/g)
			expect(serviceMatches).not.toBeNull()
			expect(serviceMatches!.length).toBeGreaterThanOrEqual(7)
		})
	})

	describe('Event Structure', () => {
		it('events array has at least 3 items', () => {
			const eventObjectMatches = content.match(
				/\{\s*status:\s*'[^']+',\s*description:/g,
			)
			expect(eventObjectMatches).not.toBeNull()
			expect(eventObjectMatches!.length).toBeGreaterThanOrEqual(3)
		})

		it('events cover multiple status types', () => {
			expect(content).toContain("status: 'Completed'")
			expect(content).toContain("status: 'In progress'")
			expect(content).toContain("status: 'Scheduled'")
		})
	})
})
