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
	ApiSecurity,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { EmailService } from './email.service';
import { PortfolioResponseDto, WelcomeUserDto } from './dto/send-email.dto';
import { EmailResponseDto } from './dto/email-response.dto';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { EmailRateLimit } from '../common/decorators/rate-limit.decorator';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('email')
@Controller('email')
@UseGuards(ThrottlerGuard, ApiKeyGuard)
@UseInterceptors(ResponseInterceptor)
@UsePipes(
	new ValidationPipe({
		transform: true,
		whitelist: true,
		forbidNonWhitelisted: true,
	}),
)
@ApiSecurity('ApiKey')
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
	@ApiUnauthorizedResponse({ description: 'Invalid or missing API key' })
	@ApiTooManyRequestsResponse({ description: 'Rate limit exceeded' })
	@ApiInternalServerErrorResponse({
		description: 'Failed to send portfolio response email',
	})
	async sendPortfolioResponse(
		@Body() portfolioResponseDto: PortfolioResponseDto,
	): Promise<EmailResponseDto> {
		return await this.emailService.sendPortfolioResponse(portfolioResponseDto);
	}

	@Post('welcome-user')
	@HttpCode(HttpStatus.OK)
	@EmailRateLimit()
	@ApiOperation({
		summary: 'Send welcome email to new user',
		description: 'Send a welcome email to user who just registered for the first time',
	})
	@ApiBody({ type: WelcomeUserDto })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Welcome email sent successfully',
		type: EmailResponseDto,
	})
	@ApiBadRequestResponse({ description: 'Invalid welcome user data provided' })
	@ApiUnauthorizedResponse({ description: 'Invalid or missing API key' })
	@ApiTooManyRequestsResponse({ description: 'Rate limit exceeded' })
	@ApiInternalServerErrorResponse({
		description: 'Failed to send welcome email',
	})
	async sendWelcomeUser(
		@Body() welcomeUserDto: WelcomeUserDto,
	): Promise<EmailResponseDto> {
		return await this.emailService.sendWelcomeUser(welcomeUserDto);
	}
}
