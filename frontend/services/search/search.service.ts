import { SearchMemberResponse } from '@/shared/interfaces/member.interface';
import { axiosAPI } from 'api/axios';
import { SearchType, Union } from 'types';

export const SearchService = {
	async getRecentSearch(searchType: Union<typeof SearchType>) {
		const { data } = await axiosAPI.get<string[]>(
			`/search/search-histories/${searchType}`,
		);
		return data;
	},

	async getMembersByUserName(username: string) {
		const { data } = await axiosAPI.get<SearchMemberResponse[]>(
			`/search/members/username/${username}`,
		);
		return data;
	},

	async deleteAllRecentSearch(searchType: Union<typeof SearchType>) {
		const { data } = await axiosAPI.delete(
			`/search/search-histories/${searchType}`,
		);
		return data;
	},

	async deleteRecentSearchByTerm(
		searchType: Union<typeof SearchType>,
		term: string,
	) {
		const { data } = await axiosAPI.delete(
			`/search/search-histories/${searchType}/${term}`,
		);
		return data;
	},
};
