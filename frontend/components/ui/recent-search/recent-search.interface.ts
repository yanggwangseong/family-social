export interface RecentSearchProps {
	data?: string[];
	handleDeleteRecentSearchAll: () => void;
	handleDeleteRecentSearch: (term: string) => void;
	handleChangeSearchTerm: (term: string) => void;
}
