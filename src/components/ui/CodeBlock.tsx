import { useEffect, useRef } from 'react'

import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import '@/styles/prism-nord.css'

interface CodeBlockProps {
	readonly code: string
	readonly language?: string
	readonly className?: string
}

/**
 * Lightweight code block component using Prism.js directly
 * Replaces react-syntax-highlighter for better bundle size
 */
const CodeBlock = ({
	code,
	language = 'typescript',
	className = '',
}: CodeBlockProps) => {
	const codeRef = useRef<HTMLElement>(null)

	useEffect(() => {
		if (codeRef.current) {
			Prism.highlightElement(codeRef.current)
		}
	}, [code, language])

	return (
		<div className={`overflow-hidden rounded-lg ${className}`}>
			<pre className="m-0 p-4 text-sm">
				<code ref={codeRef} className={`language-${language}`}>
					{code}
				</code>
			</pre>
		</div>
	)
}

export default CodeBlock
