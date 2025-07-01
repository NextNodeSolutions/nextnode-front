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
					'py-5 group transition-all duration-300 cursor-pointer w-full',
				)}
			>
				<span
					className={cn(
						'inline-block transition-transform duration-300',
						'group-hover:-translate-x-2 uppercase',
					)}
				>
					Start your project with us
				</span>
				<span
					className={cn(
						'inline-block opacity-0 transition-all duration-300',
						'group-hover:translate-x-2 group-hover:opacity-100',
					)}
				>
					→
				</span>
			</Button>
		</DialogTrigger>
		<DialogContent className="sm:max-w-[600px] overflow-y-auto">
			<DialogHeader className="pb-2">
				<DialogTitle className="text-2xl sm:text-3xl font-bold text-center mb-2">
					Start Your Project With Us
				</DialogTitle>
				<DialogDescription className="text-center text-base sm:text-lg">
					Let&lsquo;s create something amazing together. Fill out the
					form below and we&lsquo;ll get back to you within 24 hours.
				</DialogDescription>
			</DialogHeader>
			<form className="space-y-4 sm:space-y-6 pb-4 sm:pb-0">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
					className="w-full bg-primary hover:bg-primary/90 sticky bottom-0 sm:static"
				>
					Submit Project Request
				</Button>
			</form>
		</DialogContent>
	</Dialog>
)
