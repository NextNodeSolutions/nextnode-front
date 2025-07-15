import { cn } from '@/lib/utils'
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

export const StartProjectModal = (): React.ReactElement => (
	<Dialog>
		<DialogTrigger asChild>
			<Button
				variant="default"
				className={cn(
					'group w-full cursor-pointer px-4 py-6 transition-all duration-500',
					'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
					'transform shadow-lg hover:scale-[1.02] hover:shadow-xl',
					'text-base font-bold tracking-wide text-white',
					'sm:px-6 sm:py-6 sm:text-lg',
					'md:px-8 md:py-6 md:text-lg',
					'flex items-center justify-center gap-2',
				)}
			>
				<span
					className={cn(
						'transition-all duration-300',
						'uppercase group-hover:-translate-x-1',
					)}
				>
					🚀 Start your project with us
				</span>
				<span
					className={cn(
						'opacity-0 transition-all duration-300',
						'group-hover:translate-x-1 group-hover:opacity-100',
					)}
				>
					→
				</span>
			</Button>
		</DialogTrigger>
		<DialogContent className="overflow-y-auto sm:max-w-[600px]">
			<DialogHeader className="pb-2">
				<DialogTitle className="mb-2 text-center text-2xl font-bold sm:text-3xl">
					Start Your Project With Us
				</DialogTitle>
				<DialogDescription className="text-center text-base sm:text-lg">
					Let&lsquo;s create something amazing together. Fill out the
					form below and we&lsquo;ll get back to you within 24 hours.
				</DialogDescription>
			</DialogHeader>
			<form className="space-y-4 pb-4 sm:space-y-6 sm:pb-0">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="space-y-2">
						<label htmlFor="name" className="text-sm font-medium">
							Name
						</label>
						<Input id="name" placeholder="Your name" />
					</div>
					<div className="space-y-2">
						<label htmlFor="email" className="text-sm font-medium">
							Email
						</label>
						<Input
							id="email"
							type="email"
							placeholder="your@email.com"
						/>
					</div>
				</div>
				<div className="space-y-2">
					<label htmlFor="project" className="text-sm font-medium">
						Project Type
					</label>
					<Input
						id="project"
						placeholder="What kind of project are you looking for?"
					/>
				</div>
				<div className="space-y-2">
					<label htmlFor="budget" className="text-sm font-medium">
						Budget Range
					</label>
					<Input id="budget" placeholder="Your budget range" />
				</div>
				<div className="space-y-2">
					<label htmlFor="message" className="text-sm font-medium">
						Project Details
					</label>
					<Textarea
						id="message"
						placeholder="Tell us more about your project..."
						className="min-h-[100px] sm:min-h-[120px]"
					/>
				</div>
				<Button
					type="submit"
					className="bg-primary hover:bg-primary/90 sticky bottom-0 w-full sm:static"
				>
					Submit Project Request
				</Button>
			</form>
		</DialogContent>
	</Dialog>
)
