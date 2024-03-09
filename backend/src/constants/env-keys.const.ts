// database
export const ENV_DB_TYPE = 'DB_TYPE' as const;
export const ENV_DB_HOST = 'DB_HOST' as const;
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
