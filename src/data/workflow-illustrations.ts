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
 * Discovery phase progress items with visual styling
 */
export const DISCOVERY_ITEMS = [
	{
		name: 'Research',
		dotClass: 'bg-blue-500',
		gradientClass: 'bg-gradient-to-r from-blue-500 to-blue-300',
		progress: 100,
	},
	{
		name: 'Analysis',
		dotClass: 'bg-purple-500',
		gradientClass: 'bg-gradient-to-r from-purple-500 to-purple-300',
		progress: 95,
	},
	{
		name: 'Planning',
		dotClass: 'bg-pink-500',
		gradientClass: 'bg-gradient-to-r from-pink-500 to-pink-300',
		progress: 90,
	},
] as const

/**
 * Device card styling variations for different platforms
 */
export const DEVICE_STYLES = [
	{
		bg: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800',
		text: 'text-blue-700 dark:text-blue-300',
	},
	{
		bg: 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800',
		text: 'text-purple-700 dark:text-purple-300',
	},
	{
		bg: 'bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800',
		text: 'text-pink-700 dark:text-pink-300',
	},
	{
		bg: 'bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800',
		text: 'text-indigo-700 dark:text-indigo-300',
	},
] as const

/**
 * Technology stack items for development phase
 */
export const STACK_ITEMS = [
	{
		label: 'Frontend',
		tech: 'React, Next.js, Astro',
		textClass: 'text-green-600 dark:text-green-400',
	},
	{
		label: 'Backend',
		tech: 'Node.js, APIs',
		textClass: 'text-blue-600 dark:text-blue-400',
	},
	{
		label: 'Database',
		tech: 'PostgreSQL, MongoDB',
		textClass: 'text-purple-600 dark:text-purple-400',
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
