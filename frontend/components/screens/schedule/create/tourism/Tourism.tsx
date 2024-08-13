import React, { FC, useState } from 'react';
import styles from './Tourism.module.scss';

import TabMenu from '@/components/ui/tab-menu/TabMenu';
import { tourismTabMenus } from '@/components/ui/tab-menu/tab-menu.constants';
import { useRouter } from 'next/router';
import TourSearch from './tour-search/TourSearch';
import Festival from './festival/Festival';
import TourContentType from './tour-content-type/TourContentType';

const Tourism: FC = () => {
	const router = useRouter();
	const query = router.query as {
		menu: 'TOURCONTENTTYPE' | 'FESTIVAL' | 'TOURSEARCH';
	};

	return (
		<div className={styles.tourism_container}>
			<div className={styles.top_title_container}>
				<div className={styles.step_title}>STEP 4</div>
				<div className={styles.title}>관광 선택</div>
			</div>

			{/* 탭 메뉴 */}
			<TabMenu
				list={tourismTabMenus}
				options={query.menu ?? 'TOURCONTENTTYPE'}
			></TabMenu>

			{(query.menu === 'TOURCONTENTTYPE' || !query.menu) && (
				<TourContentType></TourContentType>
			)}

			{/* 행사/축제 검색 */}
			{query.menu === 'FESTIVAL' && <Festival></Festival>}

			{/* 키워드 검색 */}
			{query.menu === 'TOURSEARCH' && <TourSearch></TourSearch>}
		</div>
	);
};

export default Tourism;
