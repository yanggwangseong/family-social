export interface SearchBoxTourProps {
	debounceSearch: string;
	onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeSearchTerm: (term: string) => void;
}
