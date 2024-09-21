import React, { FC, useState } from 'react';
import styles from './SearchBox.module.scss';
import { motion } from 'framer-motion';
import Field from '../field/Field';
import Profile from '../profile/Profile';
import { useRouter } from 'next/router';
import { INLINEBUTTONGESTURE } from '@/utils/animation/gestures';
import { useSearch } from '@/hooks/useSearch';
import { useQuery, useQueryClient } from 'react-query';
import { useSearchBoxAnimation } from '@/hooks/useSearchBoxAnimation';
import RecentSearch from '../recent-search/RecentSearch';
import { SearchService } from '@/services/search/search.service';
import NotFoundSearch from '../not-found/search/NotFoundSearch';
import { NOT_FOUND_MEMBER_MESSAGE } from '@/constants/index';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { LayerMode } from 'types';
import { useSuccessLayerModal } from '@/hooks/useSuccessLayerModal';
import { Confirm } from 'notiflix';
import { useCreateMutation } from '@/hooks/useCreateMutation';

const SearchBox: FC = () => {
	const router = useRouter();

	const queryClient = useQueryClient();

	const [isFocused, setIsFocused] = useState(false);

	const { handleSearch, debounceSearch, handleChangeSearchTerm } = useSearch();

	const { data } = useQuery(
		['search-chat-members', debounceSearch],
		async () => await SearchService.getMembersByUserName(debounceSearch),
		{
			enabled: !!debounceSearch,
			onSuccess: () => {
				// 최근 검색어에 방금 검색한 검색어를 반영
				queryClient.invalidateQueries(['search-recent-member', 'member']);
			},
		},
	);

	const { searchBoxScope } = useSearchBoxAnimation(debounceSearch, isFocused);

	const handleFocus = () => setIsFocused(true);
	const handleBlur = () => setIsFocused(false);

	const { handleSuccessLayerModal } = useSuccessLayerModal();

	const { data: recentSearchData } = useQuery(
		['search-recent-member', 'member'],
		async () => await SearchService.getRecentSearch('member'),
	);

	const { mutate: deleteRecentSearchAllSync } = useCreateMutation(
		async () => await SearchService.deleteAllRecentSearch('member'),
		{
			mutationKey: ['delete-recent-search-member-all'],
			onSuccess: data => {
				Loading.remove();
				handleSuccessLayerModal({
					modalTitle: '모든 검색어 삭제 성공',
					layer: LayerMode.successLayerModal,
					lottieFile: 'deleteAnimation',
					message: '모든 검색어를 삭제 하였습니다',
					onConfirm: () => {
						queryClient.invalidateQueries(['search-recent-member', 'member']);
					},
				});
			},
		},
	);

	const { mutate: deleteRecentSearchSync } = useCreateMutation(
		async (term: string) =>
			await SearchService.deleteRecentSearchByTerm('member', term),
		{
			mutationKey: ['delete-recent-search-member'],
			onMutate: () => {},
			onSuccess: data => {
				queryClient.invalidateQueries(['search-recent-member', 'member']);
			},
		},
	);

	const handleDeleteRecentSearchAll = () => {
		Confirm.show(
			'최근 검색어 모두 삭제',
			'최근 검색어를 모두 삭제하시겠습니까?',
			'모두 삭제',
			'닫기',
			() => {
				deleteRecentSearchAllSync();
			},
			() => {},
			{},
		);
	};

	const handleDeleteRecentSearch = (term: string) => {
		deleteRecentSearchSync(term);
	};

	return (
		<div className={styles.search_field_wrap}>
			<Field
				style={{ marginLeft: '40px' }}
				fieldClass={'input'}
				onChange={handleSearch}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			<motion.div className={styles.search_lst_container} ref={searchBoxScope}>
				{isFocused && !debounceSearch ? (
					<RecentSearch
						data={recentSearchData}
						handleDeleteRecentSearchAll={handleDeleteRecentSearchAll}
						handleDeleteRecentSearch={handleDeleteRecentSearch}
						handleChangeSearchTerm={handleChangeSearchTerm}
					/>
				) : data?.length ? (
					data.map((item, index) => (
						<motion.div
							className={styles.search_profile_wrap}
							{...INLINEBUTTONGESTURE}
							key={index}
							onClick={() => router.push(`/accounts/${item.email}`)}
						>
							<Profile username={item.username} email={item.email} />
						</motion.div>
					))
				) : (
					<NotFoundSearch message={NOT_FOUND_MEMBER_MESSAGE} />
				)}
			</motion.div>
		</div>
	);
};

export default SearchBox;
