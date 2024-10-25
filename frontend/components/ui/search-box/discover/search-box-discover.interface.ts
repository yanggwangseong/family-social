export interface SearchBoxDiscoverProps {
	debounceSearch: string;
	onSearch: () => void;
	onChangeSearchTerm: (term: string) => void;
}
