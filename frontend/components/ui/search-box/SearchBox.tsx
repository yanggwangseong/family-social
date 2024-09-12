import React, { FC } from 'react';
import styles from './SearchBox.module.scss';
import { motion } from 'framer-motion';
import Field from '../field/Field';
import Profile from '../profile/Profile';
import NotFoundSearchMember from '../not-found/search-member/NotFoundSearchMember';
import { useRouter } from 'next/router';
import { INLINEBUTTONGESTURE } from '@/utils/animation/gestures';
import { useSearch } from '@/hooks/useSearch';
import { useQuery } from 'react-query';
import { MemberService } from '@/services/member/member.service';
import { useSearchBoxAnimation } from '@/hooks/useSearchBoxAnimation';

const SearchBox: FC = () => {
	const router = useRouter();
	const { handleSearch, debounceSearch } = useSearch();

	const { data } = useQuery(
		['search-chat-members', debounceSearch],
		async () => await MemberService.getMembersByUserName(debounceSearch),
		{
			enabled: !!debounceSearch,
		},
	);

	const { searchBoxScope } = useSearchBoxAnimation(debounceSearch);

	return (
		<div className={styles.search_field_wrap}>
			<Field
				style={{ marginLeft: '40px' }}
				fieldClass={'input'}
				onChange={handleSearch}
			/>
			<motion.div className={styles.search_lst_container} ref={searchBoxScope}>
				{data?.length ? (
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
					<NotFoundSearchMember />
				)}
			</motion.div>
		</div>
	);
};

export default SearchBox;
