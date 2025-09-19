import type { APIRoute } from 'astro'

// Configuration des pages avec leurs priorités SEO
const siteUrl = 'https://nextnode.fr'

const pages = [
	// Pages principales FR (priorité maximale pour SEO local Paris)
	{ url: '/fr', priority: 1.0, changefreq: 'weekly' as const },
	{ url: '/fr/pricing', priority: 0.9, changefreq: 'monthly' as const },
	{ url: '/fr/how-we-work', priority: 0.8, changefreq: 'monthly' as const },

	// Pages légales FR
	{ url: '/fr/privacy', priority: 0.3, changefreq: 'yearly' as const },
	{ url: '/fr/terms', priority: 0.3, changefreq: 'yearly' as const },

	// Pages EN (marché secondaire)
	{ url: '/', priority: 0.7, changefreq: 'weekly' as const },
	{ url: '/pricing', priority: 0.6, changefreq: 'monthly' as const },
	{ url: '/how-we-work', priority: 0.5, changefreq: 'monthly' as const },
	{ url: '/privacy', priority: 0.2, changefreq: 'yearly' as const },
	{ url: '/terms', priority: 0.2, changefreq: 'yearly' as const },
]

function generateSitemap(): string {
	const lastmod = new Date().toISOString().split('T')[0] // Format YYYY-MM-DD

	const urlEntries = pages
		.map(
			page => `
  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
		)
		.join('')

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlEntries}
</urlset>`
}

export const GET: APIRoute = () => {
	const sitemap = generateSitemap()

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600', // Cache 1 heure
		},
	})
}
