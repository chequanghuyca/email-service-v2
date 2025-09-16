import {
	Controller,
	Post,
	Body,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBody,
	ApiBadRequestResponse,
	ApiTooManyRequestsResponse,
	ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { EmailService } from './email.service';
import { PortfolioResponseDto } from './dto/send-email.dto';
import { EmailResponseDto } from './dto/email-response.dto';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { EmailRateLimit } from '../common/decorators/rate-limit.decorator';

@ApiTags('email')
@Controller('email')
@UseGuards(ThrottlerGuard)
@UseInterceptors(ResponseInterceptor)
@UsePipes(
	new ValidationPipe({
		transform: true,
		whitelist: true,
		forbidNonWhitelisted: true,
	}),
)
export class EmailController {
	constructor(private readonly emailService: EmailService) {}

	@Post('response-portfolio')
	@HttpCode(HttpStatus.OK)
	@EmailRateLimit()
	@ApiOperation({
		summary: 'Send portfolio response email',
		description:
			'Send a thank you email response to someone who contacted through portfolio',
	})
	@ApiBody({ type: PortfolioResponseDto })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Portfolio response email sent successfully',
		type: EmailResponseDto,
	})
	@ApiBadRequestResponse({ description: 'Invalid portfolio response data provided' })
	@ApiTooManyRequestsResponse({ description: 'Rate limit exceeded' })
	@ApiInternalServerErrorResponse({
		description: 'Failed to send portfolio response email',
	})
	async sendPortfolioResponse(
		@Body() portfolioResponseDto: PortfolioResponseDto,
	): Promise<EmailResponseDto> {
		return await this.emailService.sendPortfolioResponse(portfolioResponseDto);
	}
}
