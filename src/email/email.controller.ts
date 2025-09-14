import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { EmailService } from './email.service';
import {
	SendEmailDto,
	SendBulkEmailDto,
	SendTemplateEmailDto,
} from './dto/send-email.dto';
import { EmailResponse, BulkEmailResponse } from './interfaces/email.interface';

@ApiTags('email')
@Controller('email')
@UseGuards(ThrottlerGuard)
export class EmailController {
	constructor(private readonly emailService: EmailService) {}

	@Post('send')
	@ApiOperation({ summary: 'Send a single email' })
	@ApiBody({ type: SendEmailDto })
	@ApiResponse({
		status: 200,
		description: 'Email sent successfully',
		schema: {
			type: 'object',
			properties: {
				success: { type: 'boolean' },
				messageId: { type: 'string' },
				message: { type: 'string' },
			},
		},
	})
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 429, description: 'Too many requests' })
	async sendEmail(@Body() sendEmailDto: SendEmailDto): Promise<EmailResponse> {
		return await this.emailService.sendEmail(sendEmailDto);
	}

	@Post('send-bulk')
	@ApiOperation({ summary: 'Send emails to multiple recipients' })
	@ApiBody({ type: SendBulkEmailDto })
	@ApiResponse({
		status: 200,
		description: 'Bulk emails processed',
		schema: {
			type: 'object',
			properties: {
				success: { type: 'boolean' },
				sent: { type: 'number' },
				failed: { type: 'number' },
				results: { type: 'array', items: { type: 'object' } },
			},
		},
	})
	async sendBulkEmail(
		@Body() sendBulkEmailDto: SendBulkEmailDto,
	): Promise<BulkEmailResponse> {
		return await this.emailService.sendBulkEmail(sendBulkEmailDto);
	}

	@Post('send-template')
	@ApiOperation({ summary: 'Send email using a predefined template' })
	@ApiBody({ type: SendTemplateEmailDto })
	@ApiResponse({ status: 200, description: 'Template email sent successfully' })
	async sendTemplateEmail(
		@Body() sendTemplateEmailDto: SendTemplateEmailDto,
	): Promise<EmailResponse> {
		return await this.emailService.sendTemplateEmail(sendTemplateEmailDto);
	}

	@Get('test')
	@ApiOperation({ summary: 'Test email service connection' })
	@ApiResponse({
		status: 200,
		description: 'Connection test result',
		schema: {
			type: 'object',
			properties: {
				success: { type: 'boolean' },
				message: { type: 'string' },
			},
		},
	})
	async testConnection(): Promise<{ success: boolean; message: string }> {
		return await this.emailService.testConnection();
	}

	@Get('templates')
	@ApiOperation({ summary: 'Get list of available email templates' })
	@ApiResponse({
		status: 200,
		description: 'List of available templates',
		schema: {
			type: 'object',
			properties: {
				templates: { type: 'array', items: { type: 'string' } },
			},
		},
	})
	getAvailableTemplates(): { templates: string[] } {
		return {
			templates: ['welcome', 'reset_password', 'notification'],
		};
	}
}
