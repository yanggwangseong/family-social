import { MediaInfo } from '@/shared/interfaces/media.interface';
import { SwiperOptions } from 'swiper/types';

export interface SwiperContainerProps {
	list: MediaInfo[];
	overrideSwiperOptions?: SwiperOptions;
}
