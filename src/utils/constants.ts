const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

export const ACCESS_TOKEN_COOKIE_MAX_AGE = 2 * HOUR;
export const REFRESH_TOKEN_COOKIE_MAX_AGE = 2 * WEEK;

export const ACCESS_TOKEN_MAX_AGE = HOUR;
export const REFRESH_TOKEN_MAX_AGE = 2 * WEEK;

export const ACCESS_TOKEN_COOKIE_KEY = 'accessToken';
export const REFRESH_TOKEN_COOKIE_KEY = 'refreshToken';
