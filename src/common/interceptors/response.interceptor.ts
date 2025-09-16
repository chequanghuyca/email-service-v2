import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	Logger,
	HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IApiResponse<T>> {
	private readonly logger = new Logger(ResponseInterceptor.name);

	intercept(context: ExecutionContext, next: CallHandler): Observable<IApiResponse<T>> {
		const request = context.switchToHttp().getRequest();
		const response = context.switchToHttp().getResponse();
		const { method, url } = request;

		const now = Date.now();

		return next.handle().pipe(
			tap(() => {
				const responseTime = Date.now() - now;
				this.logger.log(`${method} ${url} - Response time: ${responseTime}ms`);
			}),
			map((data) => {
				// Lấy status code từ response
				const statusCode = response.statusCode || HttpStatus.OK;

				// Tạo message dựa trên data hoặc status code
				let message = 'Success';
				if (data && typeof data === 'object' && 'message' in data) {
					message = (data as any).message;
				}

				return {
					code: statusCode,
					data,
					message,
				};
			}),
		);
	}
}
