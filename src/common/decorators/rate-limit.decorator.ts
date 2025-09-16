import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'rate-limit';

export interface RateLimitOptions {
	ttl: number; // Time to live in seconds
	limit: number; // Maximum number of requests
}

export const RateLimit = (options: RateLimitOptions) =>
	SetMetadata(RATE_LIMIT_KEY, options);

// Predefined rate limit decorator for portfolio response
export const EmailRateLimit = () => RateLimit({ ttl: 60, limit: 10 }); // 10 emails per minute
