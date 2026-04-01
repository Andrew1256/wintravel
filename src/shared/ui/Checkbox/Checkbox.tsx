import React from 'react'

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, className, ...props }, ref) => {
		return (
			<label
				className={cn('h-6 flex items-center cursor-pointer group', className)}
			>
				<div className="relative h-6 w-6 flex items-center justify-center shrink-0">
					<input
						type="checkbox"
						ref={ref}
						className="peer absolute inset-0 cursor-pointer appearance-none opacity-0 z-10"
						{...props}
					/>
					<svg
						className="h-5 w-5 pointer-events-none overflow-visible"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect
							x="1"
							y="1"
							width="18"
							height="18"
							rx="2.5"
							stroke="#31393C"
							strokeWidth="2"
							fill="white"
						/>
					</svg>
					{/* Tick SVG */}
					<svg
						className={
							'absolute h-5 w-5 scale-0 stroke-[#0073FF] opacity-0 transition-all peer-checked:scale-[1.1] peer-checked:opacity-100'
						}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="4"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<polyline points="18 7 9 16 6 13"></polyline>
					</svg>
				</div>
				{label && (
					<span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
						{label}
					</span>
				)}
			</label>
		)
	}
)

Checkbox.displayName = 'Checkbox'
