import React, { FC, useState } from 'react';
import styles from './Tourism.module.scss';
import { TourismProps } from './tourism.interface';
import { useQuery } from 'react-query';
import { TourService } from '@/services/tour/tour.service';
import Table from '@/components/ui/table/Table';

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

			{/* {isPeriods.map((period, index) => (
				<div key={index}>{period}</div>
			))}
			{data.items.item.map((item, index) => (
				<div key={index}>
					<div>{item.name}</div>
				</div>
			))}

			{areaCodeData.items.item.map((item, index) => (
				<div key={index}>
					<div>{item.name}</div>
				</div>
			))} */}

			{/* {serviceCategoryData.items.item.map((item, index) => (
				<div key={index}>
					<div>{item.name}</div>
				</div>
			))} */}

			{/* {secondServiceCategoryData.items.item.map((item, index) => (
				<div key={index}>
					<div>{item.name}</div>
				</div>
			))} */}

			{/* {thirdServiceCategoryData.items.item.map((item, index) => (
				<div key={index}>
					<div>{item.name}</div>
				</div>
			))} */}
		</div>
	);
};

export default Tourism;
