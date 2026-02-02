/**
 * SVG Decorative Shape Components
 *
 * Animated geometric shapes for visual embellishment in sections.
 * Each shape has unique animation timings and visual characteristics.
 *
 * @example
 * ```astro
 * ---
 * import { Shape1, Shape2 } from '@/components/assets/shapes'
 * ---
 * <div class="relative">
 *   <Shape1 class="absolute top-0 right-0 w-64 h-64 opacity-50" />
 *   <Shape2 class="absolute bottom-0 left-0 w-48 h-48 opacity-30" />
 * </div>
 * ```
 */

// Re-export shape components for convenient importing
// Note: Astro components cannot be exported from .ts files
// Import directly from .astro files instead:
//
// import Shape1 from '@/components/assets/shapes/Shape1.astro'
// import Shape2 from '@/components/assets/shapes/Shape2.astro'
// import Shape3 from '@/components/assets/shapes/Shape3.astro'
// import Shape4 from '@/components/assets/shapes/Shape4.astro'
// import Shape5 from '@/components/assets/shapes/Shape5.astro'
// import Shape6 from '@/components/assets/shapes/Shape6.astro'

export type ShapeVariant = 1 | 2 | 3 | 4 | 5 | 6

/**
 * Shape descriptions for documentation
 */
export const shapeDescriptions: Record<ShapeVariant, string> = {
	1: 'Triangles with pulsing circles - 20s rotation, 18s pulse',
	2: 'Stars with rotating diamonds - 20s rotation, 25s pulse',
	3: 'Squares with pulsing circles - 25s rotation, 18s pulse',
	4: 'Triangles with ellipses and circles - 30s rotation, 18s/25s pulse',
	5: 'Slow squares with slow circles - 50s rotation, 30s pulse',
	6: 'Square, circles, and hexagon - 18s/25s rotation, 30s pulse',
}
