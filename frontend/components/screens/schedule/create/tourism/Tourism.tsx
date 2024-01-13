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

const Tourism: FC<TourismProps> = ({ onChangePeriods, isSelectedPeriod }) => {
	const router = useRouter();
	const query = router.query as {
		menu: 'TOURCONTENTTYPE' | 'FESTIVAL' | 'TOURSEARCH';
	};

	// const { handleChangeSelected, handleSelectToggle, isToggle, isSelected } =
	// 	useSelect<orderSelectOptionsKeys>(optionsLists[0]);

	// const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	// const [, setIsLayer] = useRecoilState(modalLayerAtom);

	// const [isAtomContentId, setIsAtomContentId] = useRecoilState(contentIdsAtom);

	// const [isServiceCategories, setIsServiceCategories] = useRecoilState(
	// 	serviceCategoriesAtom,
	// );

	// const [isAreaCode, setIsAreaCode] = useRecoilState(areaCodeAtom);

	// const {
	// 	data,
	// 	fetchNextPage,
	// 	hasNextPage,
	// 	isLoading,
	// 	isError,
	// 	isRefetching,
	// 	refetch,
	// } = useInfiniteQuery(
	// 	[
	// 		'tour-list',
	// 		isAreaCode.areaCodeMain,
	// 		isAreaCode.areaCodeSub,
	// 		isServiceCategories.firstCategory,
	// 		isServiceCategories.secondCategory,
	// 		isServiceCategories.thirdCategory,
	// 		isSelected,
	// 	],
	// 	async ({ pageParam = 1 }) =>
	// 		await TourService.getTourLists({
	// 			numOfRows: 10,
	// 			pageNo: pageParam,
	// 			areaCode: isAreaCode.areaCodeMain,
	// 			contentTypeId: '12',
	// 			sigunguCode: isAreaCode.areaCodeSub,
	// 			cat1: isServiceCategories.firstCategory,
	// 			cat2: isServiceCategories.secondCategory,
	// 			cat3: isServiceCategories.thirdCategory,
	// 			isSelected,
	// 		}),
	// 	{
	// 		getNextPageParam: (lastPage, allPosts) => {
	// 			return lastPage.pageNo !==
	// 				Math.ceil(allPosts[0].totalCount / allPosts[0].numOfRows)
	// 				? lastPage.pageNo + 1
	// 				: undefined;
	// 		},
	// 		enabled: !!(
	// 			isAtomContentId.length > 0 &&
	// 			isAreaCode.areaCodeMain &&
	// 			isAreaCode.areaCodeSub &&
	// 			isServiceCategories.firstCategory &&
	// 			isServiceCategories.secondCategory &&
	// 			isServiceCategories.thirdCategory
	// 		),
	// 	},
	// );

	// const handleSelectedContentType = () => {
	// 	setIsShowing(!isShowing);
	// 	setIsLayer({
	// 		modal_title: '관광 타입 선택',
	// 		layer: LayerMode.selectedContentType,
	// 	});
	// };

	// const handleSelectedServiceCategory = () => {
	// 	setIsShowing(!isShowing);
	// 	setIsLayer({
	// 		modal_title: '서비스 분류 선택',
	// 		layer: LayerMode.serviceCategory,
	// 	});
	// };

	// const handleSelectedAreaCode = () => {
	// 	setIsShowing(!isShowing);
	// 	setIsLayer({
	// 		modal_title: '지역 선택',
	// 		layer: LayerMode.areaCode,
	// 	});
	// };

	// const handleTourSearch = () => {
	// 	fetchNextPage();
	// };

	const handleChangePeriods = (dates: PeriodsType[]) => {
		onChangePeriods(dates);
	};

	return (
		<div className={styles.tourism_container}>
			<div className={styles.step_title}>STEP 3</div>
			<div className={styles.title}>관광 선택</div>

			{/* 탭 메뉴 */}
			<TabMenu
				list={tourismTabMenus}
				options={query.menu ?? 'TOURCONTENTTYPE'}
			></TabMenu>

			{(query.menu === 'TOURCONTENTTYPE' || !query.menu) && (
				<TourContentType
					onChangePeriods={handleChangePeriods}
					isSelectedPeriod={isSelectedPeriod}
				></TourContentType>
			)}

			{/* 행사/축제 검색 */}
			{query.menu === 'FESTIVAL' && <Festival></Festival>}

			{/* 키워드 검색 */}
			{query.menu === 'TOURSEARCH' && <TourSearch></TourSearch>}
		</div>
	);
};

export default Tourism;
