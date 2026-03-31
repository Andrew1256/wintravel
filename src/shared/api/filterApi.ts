import { useQuery } from '@tanstack/react-query'

import { FilterItem } from '../../entities/filter/model/types'
import filterData from '../temp/filterData.json'

export const useGetFilters = () => {
	return useQuery({
		queryKey: ['filters'],
		queryFn: async (): Promise<FilterItem[]> => {
			// Simulating a fetch delay
			await new Promise(resolve => setTimeout(resolve, 500))
			return filterData.filterItems as FilterItem[]
		}
	})
}
