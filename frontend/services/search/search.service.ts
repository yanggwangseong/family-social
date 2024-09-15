import { SearchMemberResponse } from '@/shared/interfaces/member.interface';
import { BasicPaginationResponse } from '@/shared/interfaces/pagination.interface';
import { SearchTourListArgs } from '@/shared/interfaces/search.interface';
import { TourSearchItem } from '@/shared/interfaces/tour.interface';
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

	async searchTourLists({
		keyword,
		isSelected,
		contentTypeId,
		pageNo,
		numOfRows,
	}: SearchTourListArgs) {
		let arrange = 'O';
		if (isSelected === 'orderSubject') {
			arrange = 'O';
		} else if (isSelected === 'orderCreated') {
			arrange = 'R';
		} else if (isSelected === 'orderUpdated') {
			arrange = 'Q';
		}

		let url = `search/tours/keyword/${keyword}?arrange=${arrange}&contentTypeId=${contentTypeId}&numOfRows=${numOfRows}&pageNo=${pageNo}`;

		const { data } = await axiosAPI.get<
			BasicPaginationResponse<TourSearchItem>
		>(url);

		return data;
	},
};
