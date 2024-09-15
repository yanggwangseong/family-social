import React, { FC } from 'react';
import styles from './RecentSearch.module.scss';
import { NOT_FOUND_RECENT_MESSAGE } from '@/constants/index';
import NotFoundSearch from '../not-found/search/NotFoundSearch';
import { PiMagnifyingGlassDuotone, PiXBold } from 'react-icons/pi';
import { BUTTONGESTURE } from '@/utils/animation/gestures';
import { motion } from 'framer-motion';
import { RecentSearchProps } from './recent-search.interface';

const RecentSearch: FC<RecentSearchProps> = ({
	data,
	handleDeleteRecentSearchAll,
	handleDeleteRecentSearch,
	handleChangeSearchTerm,
}) => {
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
									onClick={() => handleChangeSearchTerm(item)}
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
