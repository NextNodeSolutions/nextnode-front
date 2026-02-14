import standards from '@nextnode/standards/lint-staged'

export default {
	...standards,
	'*': ['pnpm lint', 'pnpm format'],
}
