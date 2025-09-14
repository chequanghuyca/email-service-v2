import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Response<T> {
	data: T;
	timestamp: string;
	path: string;
	method: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
	private readonly logger = new Logger(ResponseInterceptor.name);

	intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
		const request = context.switchToHttp().getRequest();
		const { method, url } = request;

		const now = Date.now();

		return next.handle().pipe(
			tap(() => {
				const responseTime = Date.now() - now;
				this.logger.log(`${method} ${url} - Response time: ${responseTime}ms`);
			}),
			map((data) => ({
				data,
				timestamp: new Date().toISOString(),
				path: url,
				method,
			})),
		);
	}
}
