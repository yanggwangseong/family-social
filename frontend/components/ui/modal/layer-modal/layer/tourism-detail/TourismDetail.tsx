import React, { FC, useRef } from 'react';
import styles from './TourismDetail.module.scss';
import { TourService } from '@/services/tour/tour.service';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { tourDetailAtom } from '@/atoms/tourDetailAtom';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import {
	ContentTypeId,
	ContentTypeName,
} from '@/constants/content-type.constant';
import { Union } from 'types';
import HeartAndStar from '@/components/ui/heart-and-star/HeartAndStar';
import ImagesGallary from './images-gallary/ImagesGallary';

const TourismDetail: FC = () => {
	const isContentIdTypeId = useRecoilValue(tourDetailAtom);

	const { data, isLoading } = useQuery(
		['tour-detail'],
		async () =>
			await TourService.getTourDetail(
				isContentIdTypeId.contentId,
				isContentIdTypeId.contentTypeId,
			),
	);

	return (
		<div className={styles.tourism_detail_container}>
			<div className={styles.contentTypeName}>
				{
					ContentTypeName[
						isContentIdTypeId.contentTypeId as Union<typeof ContentTypeId>
					]
				}
			</div>
			<HeartAndStar></HeartAndStar>

			<div className={styles.container}>
				{isLoading ? (
					<Skeleton></Skeleton>
				) : (
					data && <ImagesGallary images={data.items.image.item}></ImagesGallary>
				)}
			</div>
		</div>
	);
};

export default TourismDetail;
