import React from 'react'

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility for merging tailwind classes.
 */
const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
	size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = 'primary', size = 'md', ...props }, ref) => {
		const variants = {
			primary: 'bg-[#ff5f00] rounded-4 text-white active:scale-[0.98]',
			secondary:
				'bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-[0.98]',
			outline:
				'border-2 border-gray-300 text-[#474747] text-base bg-transparent hover:bg-gray-50 active:scale-[0.98]',
			ghost: 'bg-transparent hover:bg-gray-100 active:scale-[0.98]',
			danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]'
		}

		const sizes = {
			sm: 'px-3 py-1.5 text-sm',
			md: 'px-4 py-2 text-base font-medium',
			lg: 'px-[70px] py-[26px] text-lg font-semibold',
			xl: 'w-[280px] h-[64px]'
		}

		return (
			<button
				ref={ref}
				className={cn(
					'inline-flex items-center justify-center cursor-pointer rounded-xl transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
					variants[variant],
					sizes[size],
					className
				)}
				{...props}
			/>
		)
	}
)

Button.displayName = 'Button'
