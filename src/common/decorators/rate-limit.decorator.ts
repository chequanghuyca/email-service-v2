import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'rate-limit';

export interface RateLimitOptions {
	ttl: number; // Time to live in seconds
	limit: number; // Maximum number of requests
}

export const RateLimit = (options: RateLimitOptions) =>
	SetMetadata(RATE_LIMIT_KEY, options);

// Predefined rate limit decorators for common use cases
export const EmailRateLimit = () => RateLimit({ ttl: 60, limit: 10 }); // 10 emails per minute
export const BulkEmailRateLimit = () => RateLimit({ ttl: 300, limit: 3 }); // 3 bulk operations per 5 minutes
export const TestRateLimit = () => RateLimit({ ttl: 60, limit: 5 }); // 5 tests per minute
