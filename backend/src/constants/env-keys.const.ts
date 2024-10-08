// database
export const ENV_DB_TYPE = 'DB_TYPE' as const;
export const ENV_DB_HOST = 'DB_HOST' as const;
export const ENV_DB_SOURCE_HOST = 'DB_SOURCE_HOST' as const;
export const ENV_DB_PORT = 'DB_PORT' as const;
export const ENV_DB_USERNAME = 'DB_USERNAME' as const;
export const ENV_DB_PASSWORD = 'DB_PASSWORD' as const;
export const ENV_DB_DATABASE = 'DB_DATABASE' as const;
export const ENV_DB_SYNCHRONIZE = 'DB_SYNCHRONIZE' as const;

// mail
export const ENV_MAIL_HOST = 'MAIL_HOST' as const;
export const ENV_MAIL_PORT = 'MAIL_PORT' as const;
export const ENV_MAIL_USER = 'MAIL_USER' as const;
export const ENV_MAIL_PWD = 'MAIL_PWD' as const;

// jwt
export const ENV_JWT_ACCESS_TOKEN_SECRET = 'JWT_ACCESS_TOKEN_SECRET' as const;
export const ENV_JWT_ACCESS_TOKEN_EXPIRATION =
	'JWT_ACCESS_TOKEN_EXPIRATION' as const;
export const ENV_JWT_REFRESH_TOKEN_SECRET = 'JWT_REFRESH_TOKEN_SECRET' as const;
export const ENV_JWT_REFRESH_TOKEN_EXPIRATION =
	'JWT_REFRESH_TOKEN_EXPIRATION' as const;

// cookie
export const ENV_COOKIE_MAX_AGE = 'COOKIE_MAX_AGE' as const;
export const ENV_ACCESS_TOKEN_COOKIE_NAME = 'ACCESS_TOKEN_COOKIE_NAME' as const;
export const ENV_REFRESH_TOKEN_COOKIE_NAME =
	'REFRESH_TOKEN_COOKIE_NAME' as const;
export const ENV_SECRET_COOKIE_KEY = 'SECRET_COOKIE_KEY' as const;
export const ENV_COOKIE_SECURE = 'COOKIE_SECURE' as const;

//tour-api
export const ENV_TOUR_API_SERVICE_KEY = 'TOUR_API_SERVICE_KEY' as const;
export const ENV_TOUR_API_END_POINT = 'TOUR_API_END_POINT' as const;

//throttler
export const ENV_THROTTLER_TTL = 'THROTTLER_TTL' as const;
export const ENV_THROTTLER_LIMIT = 'THROTTLER_LIMIT' as const;

// application
export const ENV_APPLICATION_PORT = 'APPLICATION_PORT' as const;
export const ENV_GLOBAL_PREFIX = 'GLOBAL_PREFIX' as const;

// http protocol host
export const ENV_PROTOCOL_KEY = 'SERVER_PROTOCOL' as const;
export const ENV_HOST_KEY = 'SERVER_HOST' as const;

// sentry
export const ENV_SENTRY_DNS_KEY = 'SENTRY_DNS_KEY' as const;

// slack
export const ENV_SLACK_URL = 'SLACK_URL' as const;

// client_socket_url
export const ENV_CLIENT_SOCKET_URL = 'CLIENT_SOCKET_URL' as const;

// redis
export const ENV_REDIS_PROTOCOL = 'REDIS_PROTOCOL' as const;
export const ENV_REDIS_HOST = 'REDIS_HOST' as const;
export const ENV_REDIS_PORT = 'REDIS_PORT' as const;
export const ENV_REDIS_TYPE = 'REDIS_TYPE' as const;
export const ENV_GROUP_INVITE_TTL = 'GROUP_INVITE_TTL' as const;

// like cache type
export const ENV_LIKE_CACHE_TYPE_FEED = 'LIKE_CACHE_TYPE_FEED' as const;
export const ENV_LIKE_CACHE_TYPE_COMMENT = 'LIKE_CACHE_TYPE_COMMENT' as const;
