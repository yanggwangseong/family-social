import React, { FC, useRef } from 'react';
import Image from 'next/image';
import styles from './ImagesGallary.module.scss';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper as SwiperCore } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CgArrowLeft, CgArrowRight } from 'react-icons/cg';
import { useQuery } from 'react-query';
import { TourService } from '@/services/tour/tour.service';
import { tourDetailAtomType } from '@/atoms/tourDetailAtom';

const ImagesGallary: FC<{ contentIdTypeId: tourDetailAtomType }> = ({
	contentIdTypeId,
}) => {
	const navigationPrevRef = React.useRef(null);
	const navigationNextRef = React.useRef(null);
	const swiperRef = useRef<SwiperCore>();

	const { data, isLoading } = useQuery(
		['tour-images', contentIdTypeId.contentId],
		async () =>
			await TourService.getTourImages(contentIdTypeId.contentId, '10', '1'),
	);

	return (
		data && (
			<div className={styles.images_gallary_container}>
				{
					<Swiper
						className={styles.uploaded_swiper}
						modules={[Navigation, Pagination, A11y]}
						spaceBetween={50}
						slidesPerView={1}
						navigation={{
							prevEl: navigationPrevRef.current,
							nextEl: navigationNextRef.current,
						}}
						onBeforeInit={swiper => {
							swiperRef.current = swiper;
						}}
						pagination={{
							clickable: true,
						}}
						onSwiper={swiper => console.log(swiper)}
						onSlideChange={() => console.log('slide change')}
					>
						{/* [TODO] api에 전달받은 프로퍼티값 수정 */}
						{data.list.map((url, index) => (
							<SwiperSlide key={index} className={styles.uploaded_swiper_slide}>
								<Image
									fill
									src={url.originimgurl}
									alt={url.imgname}
									style={{ objectFit: 'inherit' }}
								></Image>
								<div
									className={styles.swiper_button_next}
									ref={navigationPrevRef}
									onClick={() => swiperRef.current?.slideNext()}
								>
									<CgArrowRight size={24} />
								</div>
								<div
									className={styles.swiper_button_prev}
									ref={navigationNextRef}
									onClick={() => swiperRef.current?.slidePrev()}
								>
									<CgArrowLeft size={24} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				}
			</div>
		)
	);
};

export default ImagesGallary;
