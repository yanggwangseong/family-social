import React, { FC, useEffect, useRef, useState } from 'react';
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
import { LayerMode, Union } from 'types';
import HeartAndStar from '@/components/ui/heart-and-star/HeartAndStar';
import ImagesGallary from './images-gallary/ImagesGallary';
import {
	IoInformationCircle,
	IoLocationSharp,
	IoChevronDownOutline,
	IoChevronUp,
} from 'react-icons/io5';
import LayerModalVariantWrapper from '../LayerModalVariantWrapper';
import TourIntroductionController from '@/components/ui/tour/TourIntroductionController';

const TourismDetail: FC = () => {
	const [isDescription, setIsDescription] = useState<boolean>(false);

	const isContentIdTypeId = useRecoilValue(tourDetailAtom);

	const { data, isLoading } = useQuery(
		['tour-detail', isContentIdTypeId.contentId],
		async () =>
			await TourService.getTourDetail(
				isContentIdTypeId.contentId,
				isContentIdTypeId.contentTypeId,
			),
	);

	const { data: IntroductionData, isLoading: IntroductionLoading } = useQuery(
		['tour-introduction', isContentIdTypeId.contentId],
		async () =>
			await TourService.getIntroductionByContentTypeId({
				contentId: isContentIdTypeId.contentId,
				contentTypeId: isContentIdTypeId.contentTypeId,
				pageNo: '1',
				numOfRows: '10',
			}),
	);

	const handleDescriptionToggle = () => {
		setIsDescription(!isDescription);
	};

	return (
		<LayerModalVariantWrapper className={styles.tourism_detail_container}>
			<div className="flex gap-2">
				<div className={styles.contentTypeName}>
					{
						ContentTypeName[
							isContentIdTypeId.contentTypeId as Union<typeof ContentTypeId>
						]
					}
				</div>
				<HeartAndStar></HeartAndStar>
			</div>

			<div className={styles.container}>
				{isLoading ? (
					<Skeleton></Skeleton>
				) : (
					data && (
						<div className="flex flex-col gap-4">
							<ImagesGallary
								contentIdTypeId={isContentIdTypeId}
							></ImagesGallary>

							<div className={styles.intro_container}>
								<div className="flex gap-2">
									<div className="flex">
										<IoInformationCircle size={18} color="#0a0a0a" />
									</div>
									<div className="text-sm text-customDark font-normal">
										개요:
									</div>
								</div>

								{isDescription ? (
									<div className="flex-1 flex ">
										<div className="text-sm text-customDark font-normal flex-1 overflow-y-auto max-h-16">
											{data.list[0].overview}
										</div>
										<div
											className="cursor-pointer"
											onClick={handleDescriptionToggle}
										>
											<IoChevronUp size={18} color="#0a0a0a" />
										</div>
									</div>
								) : (
									<div
										className="flex-1 flex text-ellipsis whitespace-nowrap overflow-hidden cursor-pointer"
										onClick={handleDescriptionToggle}
									>
										<div className="text-ellipsis whitespace-nowrap overflow-hidden text-sm text-customDark font-normal">
											{data.list[0].overview}
										</div>
										<div>
											<IoChevronDownOutline size={18} color="#0a0a0a" />
										</div>
									</div>
								)}
							</div>
							<div className={styles.address_container}>
								<div className="flex gap-2">
									<div className="flex items-center">
										<IoLocationSharp size={18} color="#0a0a0a" />
									</div>
									<div className="text-sm text-customDark font-normal">
										주소:
									</div>
								</div>
								<div className="text-sm text-customDark font-normal">
									{data.list[0].fullAddr}
								</div>
							</div>
							<div className="overflow-y-auto h-[10vh]">
								{IntroductionData && IntroductionData.list.length > 0 && (
									<TourIntroductionController
										status={IntroductionData.kind}
										list={IntroductionData}
									/>
								)}
							</div>
						</div>
					)
				)}
			</div>
		</LayerModalVariantWrapper>
	);
};

export default TourismDetail;
