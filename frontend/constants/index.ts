import { ChatType, Union } from 'types';

export const ACCESS_TOKEN_KEY = process.env.NEXT_PUBLIC_COOKIE_KEY;
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const SSR_API_URL = process.env.NEXT_PUBLIC_SSR_API_URL;
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
export const SSR_REFRESH_TOKEN_URL = `${SSR_API_URL}/auth/refreshtoken`;

export const NOT_FOUND_MEMBER_MESSAGE = '해당 멤버를 찾을 수 없습니다.';
export const NOT_FOUND_RECENT_MESSAGE = '최근 검색어가 없습니다.';
export const NOT_FOUND_TOUR_MESSAGE = '해당 관광지를 찾을 수 없습니다.';
export const NOT_FOUND_CHAT = '채팅 목록이 없습니다.';

export const DEFAULT_CHAT_TYPE = 'DIRECT' satisfies Union<typeof ChatType>;
export const DEFAULT_GROUP_CHAT_TYPE = 'GROUP' satisfies Union<typeof ChatType>;
