import React, { FC, useEffect, useState } from 'react';
import styles from './ServiceCategory.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useQuery } from 'react-query';
import { TourService } from '@/services/tour/tour.service';
import { contentIdsAtom } from '@/atoms/contentIdAtom';
import { useRecoilState } from 'recoil';
import { serviceCategoriesAtom } from '@/atoms/serviceCategoriesAtom';
import cn from 'classnames';
import { modalAtom } from '@/atoms/modalAtom';
import LayerModalVariantWrapper from '../../LayerModalVariantWrapper';

const ServiceCategory: FC = () => {
	const [isAtomContentId, setIsAtomContentId] = useRecoilState(contentIdsAtom);
	const [isServiceCategories, setIsServiceCategories] = useRecoilState(
		serviceCategoriesAtom,
	);

	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);

	// 대분류 서비스 코드
	const { data: serviceCategoryData, isLoading: serviceCategoryLoading } =
		useQuery(
			['tour-service-category'],
			async () =>
				await TourService.getServiceCategories({
					contentTypeId: '12',
				}),
		);

	// 중분류 서비스 코드
	const {
		data: secondServiceCategoryData,
		isLoading: secondServiceCategoryLoading,
	} = useQuery(
		['tour-second-service-category', isServiceCategories.firstCategory],
		async () =>
			await TourService.getServiceCategories({
				contentTypeId: '12',
				firstCategory: isServiceCategories.firstCategory,
			}),
		{
			enabled: !!isServiceCategories.firstCategory,
		},
	);

	// 소분류 서비스 코드
	const {
		data: thirdServiceCategoryData,
		isLoading: thirdServiceCategoryLoading,
	} = useQuery(
		['tour-third-service-category', isServiceCategories.secondCategory],
		async () =>
			await TourService.getServiceCategories({
				contentTypeId: '12',
				firstCategory: isServiceCategories.firstCategory,
				secondCategory: isServiceCategories.secondCategory,
			}),
		{
			enabled: !!isServiceCategories.secondCategory,
		},
	);

	if (serviceCategoryLoading) return <div>loading</div>;
	if (!serviceCategoryData) return <div>loading</div>;

	// if (secondServiceCategoryLoading) return <div>loading</div>;
	// if (!secondServiceCategoryData) return <div>loading</div>;

	// if (thirdServiceCategoryLoading) return <div>loading</div>;
	// if (!thirdServiceCategoryData) return <div>loading</div>;

	const selectedFirstServiceCategory = (code: string, name: string) => {
		setIsServiceCategories({
			firstCategory: code,
			firstCategoryName: name,
			secondCategory: '',
			secondCategoryName: '',
			thirdCategory: '',
			thirdCategoryName: '',
		});
	};

	const selectedSecondServiceCategory = (code: string, name: string) => {
		setIsServiceCategories({
			firstCategory: isServiceCategories.firstCategory,
			firstCategoryName: isServiceCategories.firstCategoryName,
			secondCategory: code,
			secondCategoryName: name,
			thirdCategory: '',
			thirdCategoryName: '',
		});
	};

	const selectedThirdServiceCategory = (code: string, name: string) => {
		setIsServiceCategories({
			firstCategory: isServiceCategories.firstCategory,
			firstCategoryName: isServiceCategories.firstCategoryName,
			secondCategory: isServiceCategories.secondCategory,
			secondCategoryName: isServiceCategories.secondCategoryName,
			thirdCategory: code,
			thirdCategoryName: name,
		});
	};

	const handleSelectedComplete = () => {
		setIsShowing(false);
	};

	return (
		<LayerModalVariantWrapper className={styles.container}>
			<div className={styles.wrap}>
				<div className={styles.contents_wrap}>
					<div className={styles.service_category_container}>
						<div className={styles.service_category_item_wrap}>
							<div className={styles.service_category_header}>대분류</div>
							{serviceCategoryData.list.map((item, index) => (
								<div
									className={cn(styles.service_category_item, {
										[styles.active]:
											isServiceCategories.firstCategory === item.code,
									})}
									key={index}
									onClick={() =>
										selectedFirstServiceCategory(item.code, item.name)
									}
								>
									{item.name}
								</div>
							))}
						</div>
						<div className={styles.service_category_item_wrap}>
							<div className={styles.service_category_header}>중분류</div>
							{secondServiceCategoryData?.list.map((item, index) => (
								<div
									className={cn(styles.service_category_item, {
										[styles.active]:
											isServiceCategories.secondCategory === item.code,
									})}
									key={index}
									onClick={() =>
										selectedSecondServiceCategory(item.code, item.name)
									}
								>
									{item.name}
								</div>
							))}
						</div>
						<div className={styles.service_category_item_wrap}>
							<div className={styles.service_category_header}>소분류</div>
							{thirdServiceCategoryData?.list.map((item, index) => (
								<div
									className={cn(styles.service_category_item, {
										[styles.active]:
											isServiceCategories.thirdCategory === item.code,
									})}
									key={index}
									onClick={() =>
										selectedThirdServiceCategory(item.code, item.name)
									}
								>
									{item.name}
								</div>
							))}
						</div>
					</div>
				</div>

				<div className={styles.btn_container}>
					<CustomButton
						type="button"
						className="bg-customDark text-customOrange 
									font-bold border border-solid border-customDark 
									rounded-full p-[10px] w-full hover:opacity-80"
						onClick={handleSelectedComplete}
					>
						확인
					</CustomButton>

					<CustomButton
						type="button"
						className="bg-white text-customDark 
									font-bold border border-solid border-customDark 
									rounded-full p-[10px] w-full hover:bg-gray-200"
						onClick={() => setIsShowing(false)}
					>
						취소
					</CustomButton>
				</div>
			</div>
		</LayerModalVariantWrapper>
	);
};

export default ServiceCategory;
