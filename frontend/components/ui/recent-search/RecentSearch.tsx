import React, { FC } from 'react';
import styles from './RecentSearch.module.scss';
import { SearchService } from '@/services/search/search.service';
import { useQuery } from 'react-query';
import { NOT_FOUND_RECENT_MESSAGE } from '@/constants/index';
import NotFoundSearch from '../not-found/search/NotFoundSearch';

const RecentSearch: FC = () => {
	// TODO userid 추가 ueseQuery key값에
	const { data } = useQuery(
		['search-recent-member', 'member'],
		async () => await SearchService.getRecentSearch('member'),
	);

	return (
		<div className={styles.recent_search_wrap}>
			{data && data.length > 0 ? (
				data.map((item, index) => <div key={index}>{item}</div>)
			) : (
				<NotFoundSearch message={NOT_FOUND_RECENT_MESSAGE} />
			)}
		</div>
	);
};

export default RecentSearch;
