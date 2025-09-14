import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import {
	EmailOptions,
	EmailResponse,
	BulkEmailResponse,
} from './interfaces/email.interface';
import {
	SendEmailDto,
	SendBulkEmailDto,
	SendTemplateEmailDto,
} from './dto/send-email.dto';

@Injectable()
export class EmailService {
	private readonly logger = new Logger(EmailService.name);
	private transporter: nodemailer.Transporter;

	constructor(private configService: ConfigService) {
		this.initializeTransporter();
	}

	private initializeTransporter() {
		// Use Gmail SMTP with user's configuration
		this.transporter = nodemailer.createTransport({
			host: this.configService.get<string>('SYSTEM_EMAIL_HOST', 'smtp.gmail.com'),
			port: this.configService.get<number>('SYSTEM_EMAIL_PORT', 465),
			secure: true, // true for 465, false for other ports
			auth: {
				user: this.configService.get<string>('SYSTEM_EMAIL'),
				pass: this.configService.get<string>('SYSTEM_EMAIL_SERVER'),
			},
		});

		// Verify connection configuration
		this.transporter.verify((error, success) => {
			if (error) {
				this.logger.error('Email transporter configuration error:', error);
			} else {
				this.logger.log('Email transporter is ready to send messages');
			}
		});
	}

	async sendEmail(sendEmailDto: SendEmailDto): Promise<EmailResponse> {
		try {
			const mailOptions: nodemailer.SendMailOptions = {
				from: this.configService.get<string>('SYSTEM_EMAIL'),
				to: sendEmailDto.to,
				cc: sendEmailDto.cc,
				bcc: sendEmailDto.bcc,
				subject: sendEmailDto.subject,
				text: sendEmailDto.text,
				html: sendEmailDto.html,
				attachments: sendEmailDto.attachments?.map((att) => ({
					filename: att.filename,
					content: Buffer.from(att.content, 'base64'),
					contentType: att.contentType,
				})),
			};

			const result = await this.transporter.sendMail(mailOptions);

			this.logger.log(`Email sent successfully to ${sendEmailDto.to}`);

			return {
				success: true,
				messageId: result.messageId,
				message: 'Email sent successfully',
			};
		} catch (error) {
			this.logger.error('Failed to send email:', error);

			return {
				success: false,
				message: 'Failed to send email',
				error: error.message,
			};
		}
	}

	async sendBulkEmail(sendBulkEmailDto: SendBulkEmailDto): Promise<BulkEmailResponse> {
		const results: EmailResponse[] = [];
		let sent = 0;
		let failed = 0;

		for (const recipient of sendBulkEmailDto.to) {
			try {
				const emailDto: SendEmailDto = {
					to: recipient,
					subject: sendBulkEmailDto.subject,
					text: sendBulkEmailDto.text,
					html: sendBulkEmailDto.html,
					attachments: sendBulkEmailDto.attachments,
				};

				const result = await this.sendEmail(emailDto);
				results.push(result);

				if (result.success) {
					sent++;
				} else {
					failed++;
				}
			} catch (error) {
				failed++;
				results.push({
					success: false,
					message: `Failed to send email to ${recipient}`,
					error: error.message,
				});
			}
		}

		return {
			success: failed === 0,
			sent,
			failed,
			results,
		};
	}

	async sendTemplateEmail(
		sendTemplateEmailDto: SendTemplateEmailDto,
	): Promise<EmailResponse> {
		try {
			const template = this.getEmailTemplate(sendTemplateEmailDto.template);

			if (!template) {
				throw new BadRequestException(
					`Template '${sendTemplateEmailDto.template}' not found`,
				);
			}

			const compiledTemplate = handlebars.compile(template);
			const html = compiledTemplate(sendTemplateEmailDto.variables || {});

			const emailDto: SendEmailDto = {
				to: sendTemplateEmailDto.to,
				cc: sendTemplateEmailDto.cc,
				bcc: sendTemplateEmailDto.bcc,
				subject: sendTemplateEmailDto.subject,
				html,
			};

			return await this.sendEmail(emailDto);
		} catch (error) {
			this.logger.error('Failed to send template email:', error);

			return {
				success: false,
				message: 'Failed to send template email',
				error: error.message,
			};
		}
	}

	private getEmailTemplate(templateName: string): string | null {
		const templates: Record<string, string> = {
			welcome: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Welcome {{name}}!</h1>
          <p>Thank you for joining us. We're excited to have you on board.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Your account details:</strong></p>
            <ul>
              <li>Email: {{email}}</li>
              <li>Account created: {{createdAt}}</li>
            </ul>
          </div>
          <p>Best regards,<br>The Team</p>
        </div>
      `,

			reset_password: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Password Reset Request</h1>
          <p>Hi {{name}},</p>
          <p>You requested a password reset for your account. Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{resetLink}}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          </div>
          <p>This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br>The Team</p>
        </div>
      `,

			notification: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">{{title}}</h1>
          <p>Hi {{name}},</p>
          <div style="background-color: #e7f3ff; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #007bff;">
            <p>{{message}}</p>
          </div>
          {{#if actionUrl}}
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{actionUrl}}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">{{actionText}}</a>
          </div>
          {{/if}}
          <p>Best regards,<br>The Team</p>
        </div>
      `,
		};

		return templates[templateName] || null;
	}

	async testConnection(): Promise<{ success: boolean; message: string }> {
		try {
			await this.transporter.verify();
			return {
				success: true,
				message: 'Email service connection is working',
			};
		} catch (error) {
			return {
				success: false,
				message: `Email service connection failed: ${error.message}`,
			};
		}
	}
}
