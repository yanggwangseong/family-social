import React, { FC, useEffect, useRef } from 'react';
import styles from './MediaLayer.module.scss';
import Image from 'next/image';
import {
	mediasLayerModalAtom,
	mediasLayerModalAtomType,
} from '@/atoms/mediasLayerModalAtom';
import { useRecoilState } from 'recoil';
import { Navigation, A11y, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import { Swiper as SwiperCore } from 'swiper/types';
import { CgArrowLeft, CgArrowRight } from 'react-icons/cg';

const MediaLayer: FC = () => {
	const [layer, setLayer] =
		useRecoilState<mediasLayerModalAtomType>(mediasLayerModalAtom);

	const handleCloseModal = () => {
		setLayer({
			isShowing: false,
			medias: [],
		});
	};

	const navigationPrevRef = React.useRef(null);
	const navigationNextRef = React.useRef(null);
	const swiperRef = useRef<SwiperCore>();

	return (
		<>
			{layer.isShowing && (
				<div className={styles.modal_mask}>
					<div className={styles.modal_close_wrap} onClick={handleCloseModal}>
						x
					</div>
					<div className={styles.modal_container}>
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
							{layer.medias.map((media, index) => (
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
										//onClick={() => swiperRef.current?.slideNext()}
									>
										<CgArrowRight size={24} />
									</div>

									<div
										className={styles.swiper_button_prev}
										ref={navigationNextRef}
										onClick={e => {
											swiperRef.current?.slidePrev();
										}}
										//onClick={() => swiperRef.current?.slidePrev()}
									>
										<CgArrowLeft size={24} />
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			)}
		</>
	);
};

export default MediaLayer;
