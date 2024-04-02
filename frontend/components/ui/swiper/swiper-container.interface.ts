import { MediaInfo } from '@/shared/interfaces/media.interface';
import { SwiperOptions } from 'swiper/types';

// export interface SwiperContainerProps {
// 	list: MediaInfo[] | any[];
// 	overrideSwiperOptions?: SwiperOptions;
// }

export interface SwiperContainerMediaInfo {
	type: 'feed-item';
	list: MediaInfo[];
	overrideSwiperOptions?: SwiperOptions;
	handleExcludeMedia?: (key: number) => void;
}

export interface SwiperContainerImagesGallary {
	type: 'image-gallary';
	list: any[];
	overrideSwiperOptions?: SwiperOptions;
	handleExcludeMedia?: (key: number) => void;
}

export interface SwiperContainerCreateFeed {
	type: 'create-feed';
	list: string[];
	overrideSwiperOptions?: SwiperOptions;
	handleExcludeMedia?: (key: number) => void;
}

export interface SwiperContainerCreateFeedForm {
	type: 'create-feed-form';
	list: string[];
	overrideSwiperOptions?: SwiperOptions;
	handleExcludeMedia?: (key: number) => void;
}

export type SwiperContainerProps =
	| SwiperContainerMediaInfo
	| SwiperContainerImagesGallary
	| SwiperContainerCreateFeed
	| SwiperContainerCreateFeedForm;
