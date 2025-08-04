import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n-client'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export const StartProjectModal = (): React.ReactElement => {
	const { t } = useI18n()
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="default"
					className={cn(
						'group w-full cursor-pointer px-4 py-6 transition-all duration-300',
						'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
						'transform shadow-lg hover:scale-[1.05] hover:shadow-2xl',
						'text-base font-bold tracking-wide text-white',
						'sm:px-6 sm:py-6 sm:text-lg',
						'md:px-8 md:py-6 md:text-lg',
						'flex items-center justify-center gap-2',
						'hover:animate-pulse-dark',
					)}
				>
					<span
						className={cn(
							'transition-transform duration-300',
							'uppercase group-hover:-translate-x-2',
						)}
					>
						{t('home.hero.startProjectButton')}
					</span>
					<span
						className={cn(
							'opacity-0 transition-all duration-300',
							'group-hover:translate-x-2 group-hover:opacity-100',
						)}
					>
						→
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="overflow-y-auto sm:max-w-[600px]">
				<DialogHeader className="pb-2">
					<DialogTitle className="mb-2 text-center text-2xl font-bold sm:text-3xl">
						{t('modal.title')}
					</DialogTitle>
					<DialogDescription className="text-center text-base sm:text-lg">
						{t('modal.description')}
					</DialogDescription>
				</DialogHeader>
				<form className="space-y-4 pb-4 sm:space-y-6 sm:pb-0">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<label
								htmlFor="name"
								className="text-sm font-medium"
							>
								{t('modal.form.name')}
							</label>
							<Input
								id="name"
								placeholder={t('modal.form.namePlaceholder')}
							/>
						</div>
						<div className="space-y-2">
							<label
								htmlFor="email"
								className="text-sm font-medium"
							>
								{t('modal.form.email')}
							</label>
							<Input
								id="email"
								type="email"
								placeholder={t('modal.form.emailPlaceholder')}
							/>
						</div>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="project"
							className="text-sm font-medium"
						>
							{t('modal.form.projectType')}
						</label>
						<Input
							id="project"
							placeholder={t('modal.form.projectTypePlaceholder')}
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="budget" className="text-sm font-medium">
							{t('modal.form.budget')}
						</label>
						<Input
							id="budget"
							placeholder={t('modal.form.budgetPlaceholder')}
						/>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="message"
							className="text-sm font-medium"
						>
							{t('modal.form.details')}
						</label>
						<Textarea
							id="message"
							placeholder={t('modal.form.detailsPlaceholder')}
							className="min-h-[100px] sm:min-h-[120px]"
						/>
					</div>
					<Button
						type="submit"
						className="bg-primary hover:bg-primary/90 sticky bottom-0 w-full sm:static"
					>
						{t('modal.form.submit')}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
