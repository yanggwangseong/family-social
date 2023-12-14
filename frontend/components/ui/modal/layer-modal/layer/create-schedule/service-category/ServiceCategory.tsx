import React, { FC, useEffect } from 'react';
import styles from './ServiceCategory.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useQuery } from 'react-query';
import { TourService } from '@/services/tour/tour.service';
import { contentIdsAtom } from '@/atoms/contentIdAtom';
import { useRecoilState } from 'recoil';
import { serviceCategoriesAtom } from '@/atoms/serviceCategoriesAtom';

const ServiceCategory: FC = () => {
	const [isAtomContentId, setIsAtomContentId] = useRecoilState(contentIdsAtom);
	const [isServiceCategories, setIsServiceCategories] = useRecoilState(
		serviceCategoriesAtom,
	);

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
		['tour-second-service-category'],
		async () =>
			await TourService.getServiceCategories({
				contentTypeId: '12',
				firstCategory: 'A01',
			}),
	);

	// 소분류 서비스 코드
	const {
		data: thirdServiceCategoryData,
		isLoading: thirdServiceCategoryLoading,
	} = useQuery(
		['tour-third-service-category'],
		async () =>
			await TourService.getServiceCategories({
				contentTypeId: '12',
				firstCategory: 'A01',
				secondCategory: 'A0101',
			}),
	);

	if (serviceCategoryLoading) return <div>loading</div>;
	if (!serviceCategoryData) return <div>loading</div>;

	if (secondServiceCategoryLoading) return <div>loading</div>;
	if (!secondServiceCategoryData) return <div>loading</div>;

	if (thirdServiceCategoryLoading) return <div>loading</div>;
	if (!thirdServiceCategoryData) return <div>loading</div>;

	const selectedFirstServiceCategory = (code: string) => {
		setIsServiceCategories({
			firstCategory: code,
			secondCategory: '',
			thirdCategory: '',
		});
	};

	const selectedSecondServiceCategory = (code: string) => {
		setIsServiceCategories({
			firstCategory: isServiceCategories.firstCategory,
			secondCategory: code,
			thirdCategory: '',
		});
	};

	const selectedThirdServiceCategory = (code: string) => {
		setIsServiceCategories({
			firstCategory: isServiceCategories.firstCategory,
			secondCategory: isServiceCategories.secondCategory,
			thirdCategory: code,
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrap}>
				<div className={styles.contents_wrap}>
					<div className={styles.service_category_container}>
						<div className={styles.service_category_item_wrap}>
							<div className={styles.service_category_header}>대분류</div>
							{serviceCategoryData.items.item.map((item, index) => (
								<div
									className={styles.service_category_item}
									key={index}
									onClick={() => selectedFirstServiceCategory(item.code)}
								>
									{item.name}
								</div>
							))}
						</div>
						<div className={styles.service_category_item_wrap}>
							<div className={styles.service_category_header}>중분류</div>
							{secondServiceCategoryData.items.item.map((item, index) => (
								<div
									className={styles.service_category_item}
									key={index}
									onClick={() => selectedSecondServiceCategory(item.code)}
								>
									{item.name}
								</div>
							))}
						</div>
						<div className={styles.service_category_item_wrap}>
							<div className={styles.service_category_header}>소분류</div>
							{thirdServiceCategoryData.items.item.map((item, index) => (
								<div
									className={styles.service_category_item}
									key={index}
									onClick={() => selectedThirdServiceCategory(item.code)}
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
					>
						확인
					</CustomButton>

					<CustomButton
						type="button"
						className="bg-white text-customDark 
									font-bold border border-solid border-customDark 
									rounded-full p-[10px] w-full hover:bg-gray-200"
					>
						취소
					</CustomButton>
				</div>
			</div>
		</div>
	);
};

export default ServiceCategory;
