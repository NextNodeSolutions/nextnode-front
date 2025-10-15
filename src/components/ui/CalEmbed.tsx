import { useCallback, useMemo } from 'react'

import Cal, { getCalApi } from '@calcom/embed-react'

import { cn } from '@/lib/core/utils'
import { useI18n } from '@/lib/i18n/I18nReact'
import { componentLogger } from '@/lib/logging'

import type { Locale } from '@/types/i18n'

export interface CalEmbedProps {
	/** Cal.com username/link (e.g., 'walid-mos') */
	calLink: string
	/** Display mode - popup opens modal, inline embeds directly */
	mode?: 'popup' | 'inline'
	/** Button text override */
	buttonText?: string
	/** Custom button className */
	buttonClassName?: string
	/** Cal.com theme */
	theme?: 'light' | 'dark' | 'auto'
	/** Additional Cal.com configuration */
	config?: Record<string, unknown>
	/** Locale override for proper SSR hydration */
	locale?: Locale
}

/**
 * Modern Cal.com integration component with TypeScript and i18n support
 *
 * Features:
 * - Automatic language detection from NextNode i18n system
 * - TypeScript-first with strict typing
 * - Modern React patterns with hooks
 * - Graceful error handling and fallbacks
 * - Responsive design and accessibility
 */
export const CalEmbed = ({
	calLink,
	mode = 'popup',
	buttonText,
	buttonClassName,
	theme = 'auto',
	config = {},
	locale: initialLocale,
}: CalEmbedProps) => {
	const { locale, t } = useI18n(initialLocale)

	// Default texts with i18n support
	const defaultButtonText =
		buttonText || t('common.cal.scheduleButton') || '📅 Schedule a meeting'

	// Language configuration based on locale
	const calLanguage = useMemo(() => {
		return locale === 'fr' ? 'fr' : 'en'
	}, [locale])

	// Cal.com configuration - only used for inline mode
	const calConfig = useMemo(
		() => ({
			theme,
			language: calLanguage,
			...config,
		}),
		[theme, calLanguage, config],
	)

	// Popup mode handler
	const handlePopupClick = useCallback(async () => {
		try {
			const cal = await getCalApi({})
			cal('modal', {
				calLink: calLink,
				config: {
					theme,
					layout: 'month_view',
				},
			})
		} catch (error) {
			componentLogger.error('Cal.com popup failed', {
				details: {
					calLink: calLink,
					error:
						error instanceof Error ? error.message : String(error),
				},
			})
		}
	}, [calLink, theme])

	// Default button styles following NextNode design system
	const defaultButtonStyles = cn(
		'btn-gradient-primary group w-full cursor-pointer px-4 py-6',
		'hover-lift shadow-lg transition-shadow hover:shadow-2xl',
		'text-base font-bold tracking-wide text-white',
		'sm:px-6 sm:py-6 sm:text-lg',
		'md:px-8 md:py-6 md:text-lg',
		'flex-center gap-2',
		'hover:animate-pulse-dark',
		buttonClassName,
	)

	if (mode === 'popup') {
		return (
			<button
				type="button"
				onClick={handlePopupClick}
				className={defaultButtonStyles}
				aria-label={`${defaultButtonText} - ${t('common.cal.opensInModal')}`}
			>
				<span
					className={cn(
						'transition-transform',
						'uppercase group-hover:-translate-x-2',
					)}
				>
					{defaultButtonText}
				</span>
				<span
					className={cn(
						'opacity-0 transition-all duration-300',
						'group-hover:translate-x-2 group-hover:opacity-100',
					)}
				>
					→
				</span>
			</button>
		)
	}

	// Inline mode
	return (
		<div className="cal-embed-container">
			<Cal
				calLink={calLink}
				config={calConfig}
				style={{
					width: '100%',
					height: '100%',
					border: 'none',
				}}
			/>
		</div>
	)
}

export default CalEmbed
