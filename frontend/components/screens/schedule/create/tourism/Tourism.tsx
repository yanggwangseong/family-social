import React, { FC, useState } from 'react';
import styles from './Tourism.module.scss';
import { TourismProps } from './tourism.interface';
import { PeriodsType } from '@/atoms/periodAtom';
import TabMenu from '@/components/ui/tab-menu/TabMenu';
import { tourismTabMenus } from '@/components/ui/tab-menu/tab-menu.constants';
import { useRouter } from 'next/router';
import TourSearch from './tour-search/TourSearch';
import Festival from './festival/Festival';
import TourContentType from './tour-content-type/TourContentType';

const Tourism: FC<TourismProps> = ({ onChangePeriods }) => {
	const router = useRouter();
	const query = router.query as {
		menu: 'TOURCONTENTTYPE' | 'FESTIVAL' | 'TOURSEARCH';
	};

	const handleChangePeriods = (dates: PeriodsType[]) => {
		onChangePeriods(dates);
	};

	return (
		<div className={styles.tourism_container}>
			<div className={styles.top_title_container}>
				<div className={styles.step_title}>STEP 3</div>
				<div className={styles.title}>관광 선택</div>
			</div>

			{/* 탭 메뉴 */}
			<TabMenu
				list={tourismTabMenus}
				options={query.menu ?? 'TOURCONTENTTYPE'}
			></TabMenu>

			{(query.menu === 'TOURCONTENTTYPE' || !query.menu) && (
				<TourContentType
					onChangePeriods={handleChangePeriods}
				></TourContentType>
			)}

			{/* 행사/축제 검색 */}
			{query.menu === 'FESTIVAL' && (
				<Festival onChangePeriods={handleChangePeriods}></Festival>
			)}

			{/* 키워드 검색 */}
			{query.menu === 'TOURSEARCH' && (
				<TourSearch onChangePeriods={handleChangePeriods}></TourSearch>
			)}
		</div>
	);
};

export default Tourism;
