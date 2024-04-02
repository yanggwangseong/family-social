import { MediaInfo } from '@/shared/interfaces/media.interface';
import { SwiperOptions } from 'swiper/types';

// export interface SwiperContainerProps {
// 	list: MediaInfo[] | any[];
// 	overrideSwiperOptions?: SwiperOptions;
// }

export interface SwiperContainerMediaInfo {
	list: MediaInfo[];
	overrideSwiperOptions?: SwiperOptions;
}

export interface SwiperContainerImagesGallary {
	list: any[];
	overrideSwiperOptions?: SwiperOptions;
}

export type SwiperContainerProps =
	| SwiperContainerMediaInfo
	| SwiperContainerImagesGallary;
