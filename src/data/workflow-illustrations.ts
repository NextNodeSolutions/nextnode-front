/**
 * Workflow illustrations data configuration
 * Extracted from StepIllustrations.tsx for better maintainability
 */

/**
 * Device types supported for responsive illustrations
 */
export const DEVICE_TYPES = ['Mobile', 'Desktop', 'Tablet', 'Watch'] as const
export type DeviceType = (typeof DEVICE_TYPES)[number]

/**
 * Discovery phase progress items with CSS variable styling
 */
export const DISCOVERY_ITEMS = [
	{
		name: 'Research',
		dotClass: 'bg-primary',
		gradientClass: 'bg-discovery-research',
		progress: 100,
	},
	{
		name: 'Analysis',
		dotClass: 'bg-secondary',
		gradientClass: 'bg-discovery-analysis',
		progress: 95,
	},
	{
		name: 'Planning',
		dotClass: 'bg-rose-accent',
		gradientClass: 'bg-discovery-planning',
		progress: 90,
	},
] as const

/**
 * Device card styling variations using CSS variables
 */
export const DEVICE_STYLES = [
	{
		bg: 'bg-device-1',
		text: 'text-device-1',
	},
	{
		bg: 'bg-device-2',
		text: 'text-device-2',
	},
	{
		bg: 'bg-device-3',
		text: 'text-device-3',
	},
	{
		bg: 'bg-device-4',
		text: 'text-device-4',
	},
] as const

/**
 * Technology stack items using CSS variables
 */
export const STACK_ITEMS = [
	{
		label: 'Frontend',
		tech: 'React, Next.js, Astro',
		textClass: 'text-green-stack',
	},
	{
		label: 'Backend',
		tech: 'Node.js, APIs',
		textClass: 'text-blue-stack',
	},
	{
		label: 'Database',
		tech: 'PostgreSQL, MongoDB',
		textClass: 'text-purple-stack',
	},
] as const

/**
 * Type definitions for illustration data
 */
export type DiscoveryItem = (typeof DISCOVERY_ITEMS)[number]
export type DeviceStyle = (typeof DEVICE_STYLES)[number]
export type StackItem = (typeof STACK_ITEMS)[number]

/**
 * Helper function to get device style by index
 */
export function getDeviceStyle(index: number): DeviceStyle {
	return DEVICE_STYLES[index % DEVICE_STYLES.length] as DeviceStyle
}

/**
 * Helper function to get discovery item by index
 */
export function getDiscoveryItem(index: number): DiscoveryItem {
	return DISCOVERY_ITEMS[index % DISCOVERY_ITEMS.length] as DiscoveryItem
}

/**
 * Helper function to get stack item by index
 */
export function getStackItem(index: number): StackItem {
	return STACK_ITEMS[index % STACK_ITEMS.length] as StackItem
}
