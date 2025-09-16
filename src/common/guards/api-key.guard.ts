import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
	Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
	private readonly logger = new Logger(ApiKeyGuard.name);

	constructor(private readonly configService: ConfigService) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const apiKey = request.headers['x-api-key'];

		if (!apiKey) {
			this.logger.warn('API request without API key');
			throw new UnauthorizedException('API key is required');
		}

		const validApiKey = this.configService.get<string>('API_KEY');
		if (!validApiKey) {
			this.logger.error('API_KEY environment variable not configured');
			throw new UnauthorizedException('API key validation not configured');
		}

		if (apiKey !== validApiKey) {
			this.logger.warn(`Invalid API key attempt: ${apiKey.substring(0, 8)}...`);
			throw new UnauthorizedException('Invalid API key');
		}

		this.logger.log('API key validation successful');
		return true;
	}
}
