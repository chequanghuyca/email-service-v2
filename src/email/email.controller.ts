import {
	Controller,
	Post,
	Body,
	Get,
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
import {
	SendEmailDto,
	SendBulkEmailDto,
	SendTemplateEmailDto,
} from './dto/send-email.dto';
import {
	EmailResponseDto,
	BulkEmailResponseDto,
	ConnectionTestResponseDto,
	TemplatesResponseDto,
} from './dto/email-response.dto';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import {
	EmailRateLimit,
	BulkEmailRateLimit,
	TestRateLimit,
} from '../common/decorators/rate-limit.decorator';

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

	@Post('send')
	@HttpCode(HttpStatus.OK)
	@EmailRateLimit()
	@ApiOperation({
		summary: 'Send a single email',
		description:
			'Send an email to a single recipient with optional CC, BCC, and attachments',
	})
	@ApiBody({ type: SendEmailDto })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Email sent successfully',
		type: EmailResponseDto,
	})
	@ApiBadRequestResponse({ description: 'Invalid email data provided' })
	@ApiTooManyRequestsResponse({ description: 'Rate limit exceeded' })
	@ApiInternalServerErrorResponse({ description: 'Failed to send email' })
	async sendEmail(@Body() sendEmailDto: SendEmailDto): Promise<EmailResponseDto> {
		return await this.emailService.sendEmail(sendEmailDto);
	}

	@Post('send-bulk')
	@HttpCode(HttpStatus.OK)
	@BulkEmailRateLimit()
	@ApiOperation({
		summary: 'Send emails to multiple recipients',
		description: 'Send the same email content to multiple recipients in bulk',
	})
	@ApiBody({ type: SendBulkEmailDto })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Bulk emails processed',
		type: BulkEmailResponseDto,
	})
	@ApiBadRequestResponse({ description: 'Invalid bulk email data provided' })
	@ApiTooManyRequestsResponse({ description: 'Rate limit exceeded' })
	@ApiInternalServerErrorResponse({ description: 'Failed to process bulk emails' })
	async sendBulkEmail(
		@Body() sendBulkEmailDto: SendBulkEmailDto,
	): Promise<BulkEmailResponseDto> {
		return await this.emailService.sendBulkEmail(sendBulkEmailDto);
	}

	@Post('send-template')
	@HttpCode(HttpStatus.OK)
	@EmailRateLimit()
	@ApiOperation({
		summary: 'Send email using a predefined template',
		description:
			'Send an email using a predefined HTML template with variable substitution',
	})
	@ApiBody({ type: SendTemplateEmailDto })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Template email sent successfully',
		type: EmailResponseDto,
	})
	@ApiBadRequestResponse({
		description: 'Invalid template email data or template not found',
	})
	@ApiTooManyRequestsResponse({ description: 'Rate limit exceeded' })
	@ApiInternalServerErrorResponse({ description: 'Failed to send template email' })
	async sendTemplateEmail(
		@Body() sendTemplateEmailDto: SendTemplateEmailDto,
	): Promise<EmailResponseDto> {
		return await this.emailService.sendTemplateEmail(sendTemplateEmailDto);
	}

	@Get('test')
	@HttpCode(HttpStatus.OK)
	@TestRateLimit()
	@ApiOperation({
		summary: 'Test email service connection',
		description: 'Test the connection to the email service provider',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Connection test result',
		type: ConnectionTestResponseDto,
	})
	@ApiTooManyRequestsResponse({ description: 'Rate limit exceeded' })
	@ApiInternalServerErrorResponse({ description: 'Connection test failed' })
	async testConnection(): Promise<ConnectionTestResponseDto> {
		return await this.emailService.testConnection();
	}

	@Get('templates')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: 'Get list of available email templates',
		description:
			'Retrieve a list of all available email templates for use with the send-template endpoint',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'List of available templates',
		type: TemplatesResponseDto,
	})
	getAvailableTemplates(): TemplatesResponseDto {
		return this.emailService.getAvailableTemplates();
	}
}
