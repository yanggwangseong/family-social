import React, { FC, useState } from 'react';
import styles from './SearchBoxTour.module.scss';
import { useSearchBoxAnimation } from '@/hooks/useSearchBoxAnimation';
import Field from '../../field/Field';
import { SearchBoxTourProps } from './search-box-tour.interface';
import { motion } from 'framer-motion';
import RecentSearch from '../../recent-search/RecentSearch';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSuccessLayerModal } from '@/hooks/useSuccessLayerModal';
import { SearchService } from '@/services/search/search.service';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';
import { Confirm } from 'notiflix';
import { LayerMode } from 'types';

const SearchBoxTour: FC<SearchBoxTourProps> = ({
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
		['search-recent-tour', 'tour'],
		async () => await SearchService.getRecentSearch('tour'),
	);

	const handleChangeSearchTerm = (term: string) => {
		onChangeSearchTerm(term);
	};

	const { mutate: deleteRecentSearchAllSync } = useMutation(
		['delete-recent-search-tour-all'],
		async () => await SearchService.deleteAllRecentSearch('tour'),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();

				handleSuccessLayerModal({
					modalTitle: '모든 검색어 삭제 성공',
					layer: LayerMode.successLayerModal,
					lottieFile: 'deleteAnimation',
					message: '모든 검색어를 삭제 하였습니다',
				});
				queryClient.invalidateQueries(['search-recent-tour', 'tour']);
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning(
						'실패',
						`${error.response?.data.message}`,
						'확인',
						() => Loading.remove(),
					);
				}
			},
		},
	);

	const { mutate: deleteRecentSearchSync } = useMutation(
		['delete-recent-search-tour'],
		async (term: string) =>
			await SearchService.deleteRecentSearchByTerm('tour', term),
		{
			onMutate: variable => {},
			onSuccess(data) {
				queryClient.invalidateQueries(['search-recent-tour', 'tour']);
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning(
						'실패',
						`${error.response?.data.message}`,
						'확인',
						() => Loading.remove(),
					);
				}
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
		<div className={styles.search_field_container}>
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

export default SearchBoxTour;
