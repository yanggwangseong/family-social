import React, { FC, useState } from 'react';
import styles from './SearchBox.module.scss';
import { motion } from 'framer-motion';
import Field from '../field/Field';
import Profile from '../profile/Profile';
import { useRouter } from 'next/router';
import { INLINEBUTTONGESTURE } from '@/utils/animation/gestures';
import { useSearch } from '@/hooks/useSearch';
import { useQuery } from 'react-query';
import { useSearchBoxAnimation } from '@/hooks/useSearchBoxAnimation';
import RecentSearch from '../recent-search/RecentSearch';
import { SearchService } from '@/services/search/search.service';
import NotFoundSearch from '../not-found/search/NotFoundSearch';
import { NOT_FOUND_MEMBER_MESSAGE } from '@/constants/index';

const SearchBox: FC = () => {
	const router = useRouter();

	const [isFocused, setIsFocused] = useState(false);

	const { handleSearch, debounceSearch, handleChangeSearchTerm } = useSearch();

	const { data } = useQuery(
		['search-chat-members', debounceSearch],
		async () => await SearchService.getMembersByUserName(debounceSearch),
		{
			enabled: !!debounceSearch,
		},
	);

	const { searchBoxScope } = useSearchBoxAnimation(debounceSearch, isFocused);

	const handleFocus = () => setIsFocused(true);
	const handleBlur = () => setIsFocused(false);

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
					<RecentSearch onSearch={handleChangeSearchTerm} />
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
