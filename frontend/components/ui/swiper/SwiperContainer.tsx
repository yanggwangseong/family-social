import React, { FC } from 'react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import { Swiper as SwiperCore } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CgArrowLeft, CgArrowRight } from 'react-icons/cg';
import Image from 'next/image';
import styles from './SwiperContainer.module.scss';
import { MediaInfo } from '@/shared/interfaces/media.interface';

const SwiperContainer: FC<{ list: MediaInfo[] }> = ({ list }) => {
	const navigationPrevRef = React.useRef(null);
	const navigationNextRef = React.useRef(null);
	const swiperRef = React.useRef<SwiperCore>();

	return (
		<Swiper
			className={styles.swiper_container}
			modules={[Navigation, Pagination, A11y]}
			spaceBetween={50}
			slidesPerView={1}
			pagination={{
				clickable: true,
			}}
			onBeforeInit={swiper => {
				swiperRef.current = swiper;
			}}
			navigation={{
				prevEl: navigationPrevRef.current,
				nextEl: navigationNextRef.current,
			}}
		>
			{list.map((media, index) => (
				<SwiperSlide key={index} className={styles.swiper_container}>
					<Image
						fill
						src={media.url}
						alt="image"
						style={{ objectFit: 'inherit' }}
					></Image>

					<div
						className={styles.swiper_button_next}
						ref={navigationPrevRef}
						onClick={e => {
							swiperRef.current?.slideNext();
						}}
					>
						<CgArrowRight size={24} />
					</div>

					<div
						className={styles.swiper_button_prev}
						ref={navigationNextRef}
						onClick={e => {
							swiperRef.current?.slidePrev();
						}}
					>
						<CgArrowLeft size={24} />
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default SwiperContainer;
