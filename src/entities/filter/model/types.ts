export interface FilterOption {
	id: string
	name: string
	description?: string
}

export interface FilterItem {
	id: string
	name: string
	description?: string
	type: 'OPTION'
	options: FilterOption[]
}

export interface SearchRequestFilter {
	[categoryId: string]: string[] // Array of selected option IDs
}
