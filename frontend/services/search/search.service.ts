import { SearchMemberResponse } from '@/shared/interfaces/member.interface';
import { axiosAPI } from 'api/axios';
import { SearchType, Union } from 'types';

export const SearchService = {
	async getRecentSearch(searchType: Union<typeof SearchType>) {
		const { data } = await axiosAPI.get<string[]>(
			`/search/search-history?searchType=${searchType}`,
		);
		return data;
	},

	async getMembersByUserName(username: string) {
		const { data } = await axiosAPI.get<SearchMemberResponse[]>(
			`/search/members/username/${username}`,
		);
		return data;
	},
};
