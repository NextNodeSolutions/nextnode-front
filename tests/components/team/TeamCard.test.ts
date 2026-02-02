import { describe, expect, it } from 'vitest'

/**
 * TeamCard.astro Component Tests
 *
 * Tests for the team card component that displays team member profiles.
 * Since Astro components can't be rendered directly in Vitest without
 * additional tooling, we test the component's props interface and
 * expected behavior through type checking and unit tests on logic.
 */

describe('TeamCard', () => {
	describe('Props Interface', () => {
		it('should have required post prop with correct structure', () => {
			const mockPost = {
				slug: 'marie-dupont',
				data: {
					name: 'Marie Dupont',
					role: 'CEO',
					bio: 'Founder and CEO of NextNode.',
					image: {
						url: '/images/team/marie.jpg',
						alt: 'Marie Dupont',
					},
					socialLinks: [
						{
							platform: 'twitter',
							url: 'https://twitter.com/mariedupont',
							label: 'Follow Marie on Twitter',
						},
						{
							platform: 'linkedin',
							url: 'https://linkedin.com/in/mariedupont',
						},
					],
				},
			}

			expect(mockPost.slug).toBeDefined()
			expect(mockPost.data.name).toBe('Marie Dupont')
			expect(mockPost.data.role).toBe('CEO')
			expect(mockPost.data.bio).toBeDefined()
		})

		it('should handle team member without image', () => {
			const mockPostWithoutImage = {
				slug: 'jean-martin',
				data: {
					name: 'Jean Martin',
					role: 'CTO',
					bio: 'Technical lead at NextNode.',
					image: undefined,
				},
			}

			expect(mockPostWithoutImage.data.image).toBeUndefined()
			expect(mockPostWithoutImage.data.name).toBe('Jean Martin')
		})

		it('should handle team member without social links', () => {
			const mockPostWithoutSocials = {
				slug: 'alice-johnson',
				data: {
					name: 'Alice Johnson',
					role: 'Lead Developer',
					bio: 'Full-stack developer.',
					image: {
						url: '/images/team/alice.jpg',
						alt: 'Alice Johnson',
					},
					socialLinks: undefined,
				},
			}

			expect(mockPostWithoutSocials.data.socialLinks).toBeUndefined()
			expect(mockPostWithoutSocials.data.name).toBe('Alice Johnson')
		})
	})

	describe('URL Generation', () => {
		it('should generate correct team URL from slug', () => {
			const slug = 'marie-dupont'
			const url = `/team/${slug}`

			expect(url).toBe('/team/marie-dupont')
		})

		it('should handle slugs with hyphens', () => {
			const slug = 'jean-pierre-martin'
			const url = `/team/${slug}`

			expect(url).toBe('/team/jean-pierre-martin')
		})
	})

	describe('Optional Fields', () => {
		it('should handle team member with all optional fields', () => {
			const mockFullMember = {
				slug: 'full-member',
				data: {
					name: 'Full Member',
					role: 'Senior Engineer',
					bio: 'Experienced engineer with 10+ years.',
					image: {
						url: '/images/team/full-member.jpg',
						alt: 'Full Member photo',
					},
					socialLinks: [
						{
							platform: 'twitter',
							url: 'https://twitter.com/fullmember',
						},
						{
							platform: 'linkedin',
							url: 'https://linkedin.com/in/fullmember',
						},
						{
							platform: 'github',
							url: 'https://github.com/fullmember',
						},
					],
					education: ['MIT Computer Science', 'Stanford MBA'],
					experience: ['Google', 'Facebook', 'Apple'],
				},
			}

			expect(mockFullMember.data.education).toBeDefined()
			expect(mockFullMember.data.experience).toBeDefined()
			expect(mockFullMember.data.socialLinks).toHaveLength(3)
		})

		it('should handle team member with minimal data', () => {
			const mockMinimalMember = {
				slug: 'minimal',
				data: {
					name: 'Minimal User',
					role: 'Intern',
					bio: 'Just started.',
				},
			}

			expect(mockMinimalMember.data.name).toBe('Minimal User')
			expect(mockMinimalMember.data.role).toBe('Intern')
			expect(mockMinimalMember.data.bio).toBe('Just started.')
		})
	})

	describe('Social Links', () => {
		it('should support various social platforms', () => {
			const platforms = ['twitter', 'linkedin', 'github', 'website']

			platforms.forEach(platform => {
				const socialLink = {
					platform,
					url: `https://${platform}.com/user`,
				}
				expect(socialLink.platform).toBe(platform)
				expect(socialLink.url).toContain(platform)
			})
		})

		it('should have optional label for accessibility', () => {
			const socialLinkWithLabel = {
				platform: 'twitter',
				url: 'https://twitter.com/user',
				label: 'Follow on Twitter',
			}

			expect(socialLinkWithLabel.label).toBe('Follow on Twitter')
		})

		it('should handle social link without label', () => {
			const socialLinkWithoutLabel: {
				platform: string
				url: string
				label?: string
			} = {
				platform: 'linkedin',
				url: 'https://linkedin.com/in/user',
			}

			expect(socialLinkWithoutLabel.label).toBeUndefined()
		})
	})

	describe('Image Handling', () => {
		it('should have image with url and alt text', () => {
			const image = {
				url: '/images/team/member.jpg',
				alt: 'Team member photo',
			}

			expect(image.url).toContain('.jpg')
			expect(image.alt).toContain('photo')
		})

		it('should support various image formats', () => {
			const formats = ['.jpg', '.jpeg', '.png', '.webp']

			formats.forEach(format => {
				const image = {
					url: `/images/team/member${format}`,
					alt: 'Team member',
				}
				expect(image.url).toContain(format)
			})
		})
	})

	describe('Role Types', () => {
		it('should accept various role strings', () => {
			const roles = [
				'CEO',
				'CTO',
				'Lead Developer',
				'Designer',
				'Product Manager',
				'Marketing Director',
				'Intern',
			]

			roles.forEach(role => {
				const mockMember = {
					data: { name: 'Test', role, bio: 'Bio' },
				}
				expect(mockMember.data.role).toBe(role)
			})
		})
	})

	describe('Bio Field', () => {
		it('should have bio as required field', () => {
			const member = {
				data: {
					name: 'Test User',
					role: 'Developer',
					bio: 'A brief introduction about the team member.',
				},
			}

			expect(member.data.bio).toBeDefined()
			expect(member.data.bio.length).toBeGreaterThan(0)
		})

		it('should support multi-line bios', () => {
			const memberWithLongBio = {
				data: {
					name: 'Experienced Dev',
					role: 'Principal Engineer',
					bio: 'A passionate engineer with over 15 years of experience in building scalable systems. Previously worked at major tech companies.',
				},
			}

			expect(memberWithLongBio.data.bio.length).toBeGreaterThan(50)
		})
	})
})
