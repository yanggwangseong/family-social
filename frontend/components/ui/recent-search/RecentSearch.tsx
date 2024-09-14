import React, { ChangeEvent, FC } from 'react';
import styles from './RecentSearch.module.scss';
import { SearchService } from '@/services/search/search.service';
import { useQuery } from 'react-query';
import { NOT_FOUND_RECENT_MESSAGE } from '@/constants/index';
import NotFoundSearch from '../not-found/search/NotFoundSearch';
import { PiMagnifyingGlassDuotone } from 'react-icons/pi';

const RecentSearch: FC<{
	onSearch: (term: string) => void;
}> = ({ onSearch }) => {
	const { data } = useQuery(
		['search-recent-member', 'member'],
		async () => await SearchService.getRecentSearch('member'),
	);

	const handleSearch = (term: string) => {
		onSearch(term);
	};

	return (
		<div className={styles.recent_search_wrap}>
			<div className={styles.recent_search_title_container}>
				<div className={styles.recent_search_title}>최근 검색어</div>
				<div className={styles.recent_search_delete_all}>전체 삭제</div>
			</div>
			{data && data.length > 0 ? (
				<div className={styles.recent_search_item_container}>
					{data.map((item, index) => (
						<div className={styles.recent_search_item} key={index}>
							<PiMagnifyingGlassDuotone size={18} />
							<div
								className={styles.recent_search_item_text}
								onClick={() => handleSearch(item)}
							>
								{item}
							</div>
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
