import React, { FC, useState } from 'react';
import styles from './Tourism.module.scss';
import { TourismProps } from './tourism.interface';
import { useInfiniteQuery, useQuery } from 'react-query';
import { TourService } from '@/services/tour/tour.service';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useRecoilState } from 'recoil';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { LayerMode } from 'types';
import { contentIdsAtom } from '@/atoms/contentIdAtom';
import { ContentTypeName } from '@/constants/content-type.constant';
import { serviceCategoriesAtom } from '@/atoms/serviceCategoriesAtom';
import { areaCodeAtom } from '@/atoms/areaCodeAtom';

const Tourism: FC<TourismProps> = ({ isPeriods }) => {
	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);

	const [isAtomContentId, setIsAtomContentId] = useRecoilState(contentIdsAtom);

	const [isServiceCategories, setIsServiceCategories] = useRecoilState(
		serviceCategoriesAtom,
	);

	const [isAreaCode, setIsAreaCode] = useRecoilState(areaCodeAtom);

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isError,
		isRefetching,
		refetch,
	} = useInfiniteQuery(
		['feeds'],
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
			}),
		{
			getNextPageParam: (lastPage, allPosts) => {
				return lastPage.page !== allPosts[0].totalPage
					? lastPage.page + 1
					: undefined;
			},
			enabled: isAtomContentId.length > 0,
		},
	);

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

	const handleTourSearch = () => {
		console.log(data);
	};

	return (
		<div className={styles.tourism_container}>
			<div className={styles.step_title}>STEP 3</div>
			<div className={styles.title}>관광 선택</div>

			<div className="mt-10 flex flex-col gap-4">
				<div className="flex gap-4">
					<div className="w-1/4">
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
					<div className="w-3/4 flex items-center">
						{isAtomContentId.map((item, index) => {
							const comma = index === isAtomContentId.length - 1 ? '' : ',';
							return (
								<span key={index}>{`${ContentTypeName[item]}${comma}`}</span>
							);
						})}
					</div>
				</div>

				<div className="flex gap-4">
					<div className="w-1/4">
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
					<div className="w-3/4 flex items-center">
						{isServiceCategories.firstCategory &&
							`대분류: ${isServiceCategories.firstCategoryName}, `}
						{isServiceCategories.secondCategory &&
							`중분류: ${isServiceCategories.secondCategoryName}, `}
						{isServiceCategories.thirdCategory &&
							`소분류: ${isServiceCategories.thirdCategoryName}`}
					</div>
				</div>

				<div className="flex gap-4">
					<div className="w-1/4">
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
					<div className="w-3/4 flex items-center">
						{isServiceCategories.firstCategory &&
							`시/도: ${isAreaCode.areaCodeMainName}, `}
						{isServiceCategories.thirdCategory &&
							`시/군/구: ${isAreaCode.areaCodeSubName}`}
					</div>
				</div>
			</div>
			<div>
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
		</div>
	);
};

export default Tourism;
