import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterStore } from '../../../entities/filter/model/store'
import { FilterModal } from '../../../features/filter/ui/FilterModal'
import { Button } from '../../../shared/ui/Button/Button'

export const App = () => {
	const { t } = useTranslation('filter')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { selectedFilters } = useFilterStore()

	return (
		<main className="w-full bg-gray-50 flex flex-col items-center justify-center p-6 space-y-12 overflow-auto">
			<div className="text-center space-y-4">
				<h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
					{t('brand')}
				</h1>
			</div>

			<div className="flex flex-col items-center space-y-8 w-full max-w-4xl">
				<Button
					size="lg"
					onClick={() => setIsModalOpen(true)}
					className="shadow-lg shadow-blue-200"
				>
					{t('title')}
				</Button>

				<div className="w-full bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-lg font-bold text-gray-900">
							{t('debug.title')}
						</h2>
						<span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
							{t('debug.format')}
						</span>
					</div>
					<pre className="bg-gray-900 text-green-400 p-6 rounded-2xl overflow-auto text-sm font-mono max-h-96 custom-scrollbar">
						{JSON.stringify(selectedFilters, null, 2)}
					</pre>
					{Object.keys(selectedFilters).length === 0 && (
						<p className="text-center text-gray-400 mt-4 italic">
							{t('empty')}
						</p>
					)}
				</div>
			</div>

			<FilterModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</main>
	)
}
