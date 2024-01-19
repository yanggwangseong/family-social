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
	console.log(data);
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
					data && (
						<div>
							<ImagesGallary images={data.items.image.item}></ImagesGallary>
							<div className="text-sm text-customGray font-normal mt-2 text-ellipsis whitespace-nowrap overflow-hidden">
								{data.items.item[0].overview}
							</div>
							<div className="flex mt-2 gap-2">
								<div className="text-sm text-customDark font-normal">주소:</div>
								<div className="text-sm text-customDark font-normal">{`(${data.items.item[0].zipcode})${data.items.item[0].addr1}${data.items.item[0].addr2}`}</div>
							</div>
							<div className="flex mt-2 gap-2">
								<div className="text-sm text-customDark font-normal">
									전화번호:
								</div>
								<div className="text-sm text-customDark font-normal">{`${data.items.introduction.item[0].infocenter}`}</div>
							</div>
							<div className="flex mt-2 gap-2">
								<div className="text-sm text-customDark font-normal">
									영업시간:
								</div>
								<div className="text-sm text-customDark font-normal">{`${data.items.introduction.item[0].usetime}`}</div>
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default TourismDetail;
