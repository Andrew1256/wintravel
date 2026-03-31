import React, { useEffect } from 'react'

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

export interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children: React.ReactNode
	footer?: React.ReactNode
	className?: string
}

export const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
	footer,
	className
}) => {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}
		if (isOpen) {
			document.body.style.overflow = 'hidden'
			window.addEventListener('keydown', handleEscape)
		}
		return () => {
			document.body.style.overflow = 'auto'
			window.removeEventListener('keydown', handleEscape)
		}
	}, [isOpen, onClose])

	if (!isOpen) {
		return null
	}

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
				onClick={onClose}
			/>

			{/* Modal Container (for scrolling and centering) */}
			<div className="relative min-h-full flex items-center justify-center p-4 md:p-8 pointer-events-none">
				{/* Modal Content */}
				<div
					className={cn(
						'relative bg-white rounded-2xl shadow-xl animate-in zoom-in-95 fade-in duration-300 flex flex-col pointer-events-auto',
						className
					)}
				>
					{/* Header */}
					<div className="mx-[34px] py-[40px] border-gray-400 flex justify-center items-center">
						<h3 className="text-[40px] Inter font-[500] text-[#31393C]">
							{title}
						</h3>
						<button
							onClick={onClose}
							className="absolute right-10 text-gray-400 hover:text-gray-600 cursor-pointer rounded-full transition-all"
						>
							<img
								src="./src/assets/close.svg"
								alt="close"
							/>
						</button>
					</div>

					{/* Body */}
					<div>{children}</div>

					{/* Footer */}
					{footer && (
						<div className="py-8 flex justify-center space-x-3 mx-[34px]">
							{footer}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
