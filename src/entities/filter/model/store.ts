import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { SearchRequestFilter } from './types'

interface FilterState {
	selectedFilters: SearchRequestFilter
	setSelectedFilters: (filters: SearchRequestFilter) => void
	resetFilters: () => void
}

export const useFilterStore = create<FilterState>()(
	persist(
		set => ({
			selectedFilters: {},
			setSelectedFilters: filters => set({ selectedFilters: filters }),
			resetFilters: () => set({ selectedFilters: {} })
		}),
		{
			name: 'filter-storage'
		}
	)
)
