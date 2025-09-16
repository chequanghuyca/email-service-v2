import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

@ApiTags('health')
@Controller()
@UseInterceptors(ResponseInterceptor)
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiOperation({ summary: 'Get service status' })
	@ApiResponse({ status: 200, description: 'Service is running' })
	getHello(): string {
		return this.appService.getHello();
	}

	@Get('health')
	@ApiOperation({ summary: 'Health check endpoint' })
	@ApiResponse({
		status: 200,
		description: 'Service health status',
		schema: {
			type: 'object',
			properties: {
				status: { type: 'string', example: 'OK' },
				timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
			},
		},
	})
	getHealth(): { status: string; timestamp: string } {
		return this.appService.getHealth();
	}
}
