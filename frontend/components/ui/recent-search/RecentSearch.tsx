import React, { FC } from 'react';
import styles from './RecentSearch.module.scss';
import { SearchService } from '@/services/search/search.service';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { NOT_FOUND_RECENT_MESSAGE } from '@/constants/index';
import NotFoundSearch from '../not-found/search/NotFoundSearch';
import { PiMagnifyingGlassDuotone, PiXBold } from 'react-icons/pi';
import { BUTTONGESTURE } from '@/utils/animation/gestures';
import { motion } from 'framer-motion';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useSuccessLayerModal } from '@/hooks/useSuccessLayerModal';
import { LayerMode } from 'types';
import axios from 'axios';
import { Confirm } from 'notiflix';

const RecentSearch: FC<{
	onSearch: (term: string) => void;
}> = ({ onSearch }) => {
	const queryClient = useQueryClient();
	const { handleSuccessLayerModal } = useSuccessLayerModal();

	const { data } = useQuery(
		['search-recent-member', 'member'],
		async () => await SearchService.getRecentSearch('member'),
	);

	const handleSearch = (term: string) => {
		onSearch(term);
	};

	const { mutate: deleteRecentSearchAllSync } = useMutation(
		['delete-recent-search-member-all'],
		async () => await SearchService.deleteAllRecentSearch('member'),
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
				queryClient.invalidateQueries(['search-recent-member', 'member']);
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
		['delete-recent-search-member'],
		async (term: string) =>
			await SearchService.deleteRecentSearchByTerm('member', term),
		{
			onMutate: variable => {},
			onSuccess(data) {
				queryClient.invalidateQueries(['search-recent-member', 'member']);
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
		<div className={styles.recent_search_wrap}>
			<div className={styles.recent_search_title_container}>
				<div className={styles.recent_search_title}>최근 검색어</div>
				<motion.div
					{...BUTTONGESTURE}
					className={styles.recent_search_delete_all}
					onMouseDown={e => {
						e.preventDefault(); // 부모 Input의 blur 방지
					}}
					onClick={e => {
						e.stopPropagation();
						handleDeleteRecentSearchAll();
					}}
				>
					전체 삭제
				</motion.div>
			</div>
			{data && data.length > 0 ? (
				<div className={styles.recent_search_item_container}>
					{data.map((item, index) => (
						<div className={styles.recent_search_item_wrap} key={index}>
							<div className={styles.recent_search_item}>
								<PiMagnifyingGlassDuotone size={18} />
								<div
									className={styles.recent_search_item_text}
									onClick={() => handleSearch(item)}
								>
									{item}
								</div>
							</div>
							<motion.div
								{...BUTTONGESTURE}
								className={styles.recent_search_item_delete}
								onMouseDown={e => {
									e.preventDefault(); // 부모 Input의 blur 방지
								}}
								onClick={e => {
									e.stopPropagation();
									handleDeleteRecentSearch(item);
								}}
							>
								<PiXBold size={18} />
							</motion.div>
						</div>
					))}
				</div>
			) : (
				<NotFoundSearch message={NOT_FOUND_RECENT_MESSAGE} />
			)}
		</div>
	);
};

export default RecentSearch;
