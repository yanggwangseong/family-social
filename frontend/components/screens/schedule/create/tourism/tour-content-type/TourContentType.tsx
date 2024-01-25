import React, { FC } from 'react';
import styles from './TourContentType.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useRecoilState } from 'recoil';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { contentIdsAtom } from '@/atoms/contentIdAtom';
import { serviceCategoriesAtom } from '@/atoms/serviceCategoriesAtom';
import { areaCodeAtom } from '@/atoms/areaCodeAtom';
import { ContentTypeName } from '@/constants/content-type.constant';
import { LayerMode } from 'types';
import { useInfiniteQuery } from 'react-query';
import { TourService } from '@/services/tour/tour.service';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import TourismItem from '@/components/ui/tourism/TourismItem';
import SelectBox from '@/components/ui/select/SelectBox';
import { PeriodsType } from '@/atoms/periodAtom';
import { useSelect } from '@/hooks/useSelect';
import { orderSelectOptionsKeys } from '../tourism.interface';
import { optionsLists } from '../tourism.constants';
import { TourContentTypeProps } from './tour-content-type.interface';

const TourContentType: FC<TourContentTypeProps> = ({ onChangePeriods }) => {
	const { handleChangeSelected, handleSelectToggle, isToggle, isSelected } =
		useSelect<orderSelectOptionsKeys>(optionsLists[0]);

	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);

	const [isAtomContentId, setIsAtomContentId] = useRecoilState(contentIdsAtom);

	const [isServiceCategories, setIsServiceCategories] = useRecoilState(
		serviceCategoriesAtom,
	);

	const [isAreaCode, setIsAreaCode] = useRecoilState(areaCodeAtom);

	const handleSelectedContentType = () => {
		setIsShowing(!isShowing);
		setIsLayer({
			modal_title: '관광 타입 선택',
			layer: LayerMode.selectedContentType,
		});
	};

	const handleSelectedServiceCategory = () => {
		setIsShowing(!isShowing);
		setIsLayer({
			modal_title: '서비스 분류 선택',
			layer: LayerMode.serviceCategory,
		});
	};

	const handleSelectedAreaCode = () => {
		setIsShowing(!isShowing);
		setIsLayer({
			modal_title: '지역 선택',
			layer: LayerMode.areaCode,
		});
	};

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isError,
		isRefetching,
		refetch,
	} = useInfiniteQuery(
		[
			'tour-list',
			isAreaCode.areaCodeMain,
			isAreaCode.areaCodeSub,
			isServiceCategories.firstCategory,
			isServiceCategories.secondCategory,
			isServiceCategories.thirdCategory,
			isSelected,
		],
		async ({ pageParam = 1 }) =>
			await TourService.getTourLists({
				numOfRows: 10,
				pageNo: pageParam,
				areaCode: isAreaCode.areaCodeMain,
				contentTypeId: '12',
				sigunguCode: isAreaCode.areaCodeSub,
				cat1: isServiceCategories.firstCategory,
				cat2: isServiceCategories.secondCategory,
				cat3: isServiceCategories.thirdCategory,
				isSelected,
			}),
		{
			getNextPageParam: (lastPage, allPosts) => {
				return lastPage.pageNo !==
					Math.ceil(allPosts[0].totalCount / allPosts[0].numOfRows)
					? lastPage.pageNo + 1
					: undefined;
			},
			enabled: !!(
				isAtomContentId.length > 0 &&
				isAreaCode.areaCodeMain &&
				isAreaCode.areaCodeSub &&
				isServiceCategories.firstCategory &&
				isServiceCategories.secondCategory &&
				isServiceCategories.thirdCategory
			),
		},
	);

	const handleTourSearch = () => {
		fetchNextPage();
	};

	const handleChangePeriods = (dates: PeriodsType[]) => {
		onChangePeriods(dates);
	};

	return (
		<div className={styles.container}>
			<div className={styles.selected_type_container}>
				<div className={styles.btn_container}>
					<CustomButton
						type="button"
						className=" bg-basic text-customDark 
                        font-bold border border-solid border-customDark 
                        rounded-full p-[10px]
                        w-full hover:bg-orange-500
                        "
						onClick={handleSelectedContentType}
					>
						관광타입
					</CustomButton>
				</div>
				<div className={styles.description_container}>
					{isAtomContentId.map((item, index) => {
						const comma = index === isAtomContentId.length - 1 ? '' : ',';
						return (
							<span key={index}>{`${ContentTypeName[item]}${comma}`}</span>
						);
					})}
				</div>
			</div>

			<div className={styles.selected_type_container}>
				<div className={styles.btn_container}>
					<CustomButton
						type="button"
						className=" bg-basic text-customDark 
                        font-bold border border-solid border-customDark 
                        rounded-full p-[10px]
                        w-full hover:bg-orange-500
                        "
						onClick={handleSelectedServiceCategory}
					>
						서비스분류
					</CustomButton>
				</div>
				<div className={styles.description_container}>
					{isServiceCategories.firstCategory &&
						`대분류: ${isServiceCategories.firstCategoryName}, `}
					{isServiceCategories.secondCategory &&
						`중분류: ${isServiceCategories.secondCategoryName}, `}
					{isServiceCategories.thirdCategory &&
						`소분류: ${isServiceCategories.thirdCategoryName}`}
				</div>
			</div>

			<div className={styles.selected_type_container}>
				<div className={styles.btn_container}>
					<CustomButton
						type="button"
						className=" bg-basic text-customDark 
                        font-bold border border-solid border-customDark 
                        rounded-full p-[10px]
                        w-full hover:bg-orange-500
                        "
						onClick={handleSelectedAreaCode}
					>
						지역
					</CustomButton>
				</div>
				<div className={styles.description_container}>
					{isAreaCode.areaCodeMain && `시/도: ${isAreaCode.areaCodeMainName}, `}
					{isAreaCode.areaCodeSub && `시/군/구: ${isAreaCode.areaCodeSubName}`}
				</div>
			</div>

			<div>
				<div>
					<SelectBox
						options={optionsLists}
						onChangeSelected={handleChangeSelected}
						onSelectToggle={handleSelectToggle}
						isToggle={isToggle}
						isSelected={isSelected}
						comment={`관광정보 정렬`}
					></SelectBox>
				</div>
			</div>

			<div className={styles.search_btn_container}>
				<CustomButton
					type="button"
					className=" bg-basic text-customDark 
								font-bold border border-solid border-customDark 
								rounded-full p-[10px]
								w-full hover:bg-orange-500
								"
					onClick={handleTourSearch}
				>
					검색
				</CustomButton>
			</div>

			<div className={styles.tourism_item_container}>
				{isLoading && <Skeleton />}
				{data?.pages.map((page, pageIndex) => (
					<React.Fragment key={pageIndex}>
						{page.items.item.map((tour: any, index: number) => (
							<TourismItem
								key={index}
								tour={tour}
								onChangePeriods={handleChangePeriods}
							/>
						))}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default TourContentType;
