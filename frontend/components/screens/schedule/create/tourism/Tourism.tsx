import React, { FC, useState } from 'react';
import styles from './Tourism.module.scss';
import { TourismProps } from './tourism.interface';
import { useQuery } from 'react-query';
import { TourService } from '@/services/tour/tour.service';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';

const Tourism: FC<TourismProps> = ({ isPeriods }) => {
	const [isAreaCode, setIsAreaCode] = useState<string>('1');
	const { data, isLoading } = useQuery(
		['tour-area-code-main'],
		async () => await TourService.getTourAreaCodes(),
	);

	const { data: areaCodeData, isLoading: areaCodeLoading } = useQuery(
		['tour-area-code'],
		async () => await TourService.getTourAreaCodes(isAreaCode),
	);

	// 대분류 서비스 코드
	const { data: serviceCategoryData, isLoading: serviceCategoryLoading } =
		useQuery(
			['tour-service-category'],
			async () =>
				await TourService.getServiceCategories({ contentTypeId: '12' }),
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

	if (isLoading) return <div>loading</div>;
	if (!data) return <div>loading</div>;

	if (areaCodeLoading) return <div>loading</div>;
	if (!areaCodeData) return <div>loading</div>;

	if (serviceCategoryLoading) return <div>loading</div>;
	if (!serviceCategoryData) return <div>loading</div>;

	if (secondServiceCategoryLoading) return <div>loading</div>;
	if (!secondServiceCategoryData) return <div>loading</div>;

	if (thirdServiceCategoryLoading) return <div>loading</div>;
	if (!thirdServiceCategoryData) return <div>loading</div>;

	return (
		<div className={styles.tourism_container}>
			<div className={styles.step_title}>STEP 3</div>
			<div className={styles.title}>관광 선택</div>

			<div className="flex gap-4">
				<div className="w-1/4">
					<CustomButton
						type="button"
						className=" bg-basic text-customDark 
								font-bold border border-solid border-customDark 
								rounded-full p-[10px]
								w-full hover:bg-orange-500
								"
					>
						관광타입
					</CustomButton>
				</div>
				<div className="w-3/4 flex items-center">관광지</div>
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
					>
						서비스분류
					</CustomButton>
				</div>
				<div className="w-3/4 flex items-center">관광지</div>
			</div>

			<div className="absolute w-full h-full z-"></div>
		</div>
	);
};

export default Tourism;
