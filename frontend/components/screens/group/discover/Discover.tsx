import React, { FC } from 'react';
import styles from './Discover.module.scss';
import Format from '@/components/ui/layout/Format';
import GroupFormat from '@/components/ui/layout/group/GroupFormat';
import { useQuery, useQueryClient } from 'react-query';
import { useSearch } from '@/hooks/useSearch';
import SearchBoxDiscover from '@/components/ui/search-box/discover/SearchBoxDiscover';
import { SearchService } from '@/services/search/search.service';
import NotFoundSearch from '@/components/ui/not-found/search/NotFoundSearch';
import { NOT_FOUND_GROUP_MESSAGE } from '@/constants/index';
import GroupItemCard from '@/components/ui/group/item-card/GroupItemCard';
import GroupSearchCard from '@/components/ui/group/search-card/GroupSearchCard';

const Discover: FC = () => {
	const queryClient = useQueryClient();
	const { handleSearch, debounceSearch, handleChangeSearchTerm } = useSearch();

	const { data } = useQuery(
		['search-group-name', debounceSearch],
		async () => await SearchService.getGroupByGroupName(debounceSearch),
		{
			enabled: !!debounceSearch,
			onSuccess: () => {
				// 최근 검색어에 방금 검색한 검색어를 반영
				queryClient.invalidateQueries(['search-recent-group', 'group']);
			},
		},
	);

	/**
	 * 그룹 이름으로 검색 완료 했을때 그룹 카드로 보여주고
	 * 그룹 가입 신청 버튼과 내가 관리하고 있는 그룹과 해당 그룹의 팔로우 신청 버튼
	 * 그룹 신청 버튼에 이미 신청한 그룹이라면 신청 완료 아니면 그룹 가입 신청 버튼 표시
	 * 그룹 팔로우 신청 layer-modal 만들기
	 */
	return (
		<Format title={'group-discover'}>
			<GroupFormat>
				<div className={styles.top_title_container}>
					<div className={styles.top_title}>찾아보기</div>
				</div>
				<div className={styles.contents_container}>
					<SearchBoxDiscover
						debounceSearch={debounceSearch}
						onSearch={handleSearch}
						onChangeSearchTerm={handleChangeSearchTerm}
					/>

					{data && data.length > 0 ? (
						<div className={styles.group_item_card_container}>
							{data.map((item, index) => (
								<GroupSearchCard group={item} key={index} />
							))}
						</div>
					) : (
						debounceSearch && (
							<NotFoundSearch message={NOT_FOUND_GROUP_MESSAGE} />
						)
					)}
				</div>
			</GroupFormat>
		</Format>
	);
};

export default Discover;
