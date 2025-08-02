import React, { cloneElement } from 'react'

interface VisuallyHiddenProps {
	children: React.ReactNode
	asChild?: boolean
}

/**
 * Composant pour masquer visuellement du contenu tout en le gardant accessible aux lecteurs d'écran
 * Basé sur les recommandations de Scott O'Hara pour l'accessibilité
 */
export default function VisuallyHidden({
	children,
	asChild = false,
}: VisuallyHiddenProps): React.ReactElement {
	const styles: React.CSSProperties = {
		position: 'absolute',
		width: '1px',
		height: '1px',
		padding: '0',
		margin: '-1px',
		overflow: 'hidden',
		clip: 'rect(0, 0, 0, 0)',
		whiteSpace: 'nowrap',
		border: '0',
	}

	if (asChild) {
		return cloneElement(children as React.ReactElement, {
			style: {
				...styles,
				...(children as React.ReactElement).props.style,
			},
		})
	}

	return <span style={styles}>{children}</span>
}
