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

const ImagesGallary: FC<{ images: any[] }> = ({ images }) => {
	const navigationPrevRef = React.useRef(null);
	const navigationNextRef = React.useRef(null);
	const swiperRef = useRef<SwiperCore>();

	return (
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
					{images.map((url, index) => (
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
	);
};

export default ImagesGallary;
