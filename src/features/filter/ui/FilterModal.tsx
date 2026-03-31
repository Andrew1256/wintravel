import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterStore } from '../../../entities/filter/model/store'
import { SearchRequestFilter } from '../../../entities/filter/model/types'
import { useGetFilters } from '../../../shared/api/filterApi'
import { Button } from '../../../shared/ui/Button/Button'
import { Checkbox } from '../../../shared/ui/Checkbox/Checkbox'
import { ConfirmationDialog } from '../../../shared/ui/Modal/ConfirmationDialog'
import { Modal } from '../../../shared/ui/Modal/Modal'

interface FilterModalProps {
	isOpen: boolean
	onClose: () => void
}

export const FilterModal: React.FC<FilterModalProps> = ({
	isOpen,
	onClose
}) => {
	const { t } = useTranslation('filter')
	const { data: filterCategories, isLoading } = useGetFilters()
	const { selectedFilters, setSelectedFilters } = useFilterStore()

	const [localFilters, setLocalFilters] = useState<SearchRequestFilter>({})
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setLocalFilters(selectedFilters)
		}
	}, [isOpen, selectedFilters])

	const handleToggleOption = (categoryId: string, optionId: string) => {
		setLocalFilters(prev => {
			const categoryOptions = prev[categoryId] || []
			const newOptions = categoryOptions.includes(optionId)
				? categoryOptions.filter(id => id !== optionId)
				: [...categoryOptions, optionId]

			const newFilters = { ...prev }
			if (newOptions.length > 0) {
				newFilters[categoryId] = newOptions
			} else {
				delete newFilters[categoryId]
			}
			return newFilters
		})
	}

	const handleApply = () => {
		setIsConfirmOpen(true)
	}

	const handleConfirmApply = () => {
		setSelectedFilters(localFilters)
		setIsConfirmOpen(false)
		onClose()
	}

	if (isLoading) {
		return null
	}

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				title={t('title')}
				className="w-full max-w-[1280px] h-full "
				footer={
					<>
						<div className="flex justify-center space-x-3">
							<Button
								variant="primary"
								onClick={handleApply}
								size="lg"
							>
								{t('apply')}
							</Button>

							<Button
								className="absolute right-4 bottom-[59px] text-[#078691] font-[600] underline"
								variant="ghost"
								onClick={() => setLocalFilters({})}
							>
								{t('clear_all')}
							</Button>
						</div>
					</>
				}
			>
				<div className="border-t-[2px] border-gray-400 mx-[34px] pt-8">
					{filterCategories?.map(category => (
						<section
							key={category.id}
							className="py-8 mx-[34px] border-b-[2px] border-gray-400"
						>
							<div>
								<h4 className="text-2xl font-medium text-black-500">
									{category.name}
								</h4>
							</div>
							<div className="w-[1037px] grid grid-cols-3 mt-6 gap-4">
								{category.options.map(option => (
									<div
										key={option.id}
										className="hover:bg-blue-50/30 transition-all cursor-pointer group"
										onClick={() => handleToggleOption(category.id, option.id)}
									>
										<div className="flex gap-4">
											<Checkbox
												className="mt-[2px]"
												checked={
													localFilters[category.id]?.includes(option.id) ||
													false
												}
												onChange={() => {}}
											/>
											<div className="">
												<span className="block font-semibold text-gray-800">
													{option.name}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</section>
					))}
				</div>
			</Modal>

			<ConfirmationDialog
				isOpen={isConfirmOpen}
				onClose={() => setIsConfirmOpen(false)}
				onConfirm={handleConfirmApply}
			/>
		</>
	)
}
