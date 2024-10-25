import React, { FC, useState } from 'react';
import styles from './SearchBoxDiscover.module.scss';
import { useQuery, useQueryClient } from 'react-query';
import { useSearch } from '@/hooks/useSearch';
import { SearchService } from '@/services/search/search.service';
import { useSearchBoxAnimation } from '@/hooks/useSearchBoxAnimation';
import { useSuccessLayerModal } from '@/hooks/useSuccessLayerModal';
import Field from '../../field/Field';
import { motion } from 'framer-motion';
import RecentSearch from '../../recent-search/RecentSearch';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Confirm } from 'notiflix';
import { useCreateMutation } from '@/hooks/useCreateMutation';
import { LayerMode } from 'types';
import { SearchBoxDiscoverProps } from './search-box-discover.interface';

const SearchBoxDiscorver: FC<SearchBoxDiscoverProps> = ({
	debounceSearch,
	onSearch,
	onChangeSearchTerm,
}) => {
	const queryClient = useQueryClient();

	const [isFocused, setIsFocused] = useState(false);

	const { searchBoxScope } = useSearchBoxAnimation(debounceSearch, isFocused);

	const handleFocus = () => setIsFocused(true);
	const handleBlur = () => setIsFocused(false);

	const { handleSuccessLayerModal } = useSuccessLayerModal();

	const { data } = useQuery(
		['search-recent-group', 'group'],
		async () => await SearchService.getRecentSearch('group'),
	);

	const handleChangeSearchTerm = (term: string) => {
		onChangeSearchTerm(term);
	};

	const { mutate: deleteRecentSearchAllSync } = useCreateMutation(
		async () => await SearchService.deleteAllRecentSearch('group'),
		{
			mutationKey: ['delete-recent-search-group-all'],
			onSuccess: data => {
				Loading.remove();
				handleSuccessLayerModal({
					modalTitle: '모든 검색어 삭제 성공',
					layer: LayerMode.successLayerModal,
					lottieFile: 'deleteAnimation',
					message: '모든 검색어를 삭제 하였습니다',
					onConfirm: () => {
						queryClient.invalidateQueries(['search-recent-group', 'group']);
					},
				});
			},
		},
	);

	const { mutate: deleteRecentSearchSync } = useCreateMutation(
		async (term: string) =>
			await SearchService.deleteRecentSearchByTerm('group', term),
		{
			mutationKey: ['delete-recent-search-group'],
			onMutate: () => {},
			onSuccess: data => {
				queryClient.invalidateQueries(['search-recent-group', 'group']);
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
				fieldClass={'input'}
				placeholder="키워드를 입력하세요."
				onChange={onSearch}
				onFocus={handleFocus}
				onBlur={handleBlur}
			></Field>
			{isFocused && !debounceSearch && (
				<motion.div
					className={styles.search_lst_container}
					ref={searchBoxScope}
				>
					<RecentSearch
						data={data}
						handleDeleteRecentSearchAll={handleDeleteRecentSearchAll}
						handleDeleteRecentSearch={handleDeleteRecentSearch}
						handleChangeSearchTerm={handleChangeSearchTerm}
					/>
				</motion.div>
			)}
		</div>
	);
};

export default SearchBoxDiscorver;
