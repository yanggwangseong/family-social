import { ChangeEvent, useState } from 'react';
import { useDebounce } from './useDebounce';

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const debounceSearch = useDebounce<string>(searchTerm, 500);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return {
		handleSearch,
		searchTerm,
		debounceSearch,
	};
};
