import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Enable CORS for cross-origin requests
	app.enableCors({
		origin: ['http://localhost:8000', 'https://www.huyche.site'],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-api-key'],
		optionsSuccessStatus: 200,
	});

	// Enable global validation
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	// Set global prefix
	app.setGlobalPrefix('api');

	// Swagger configuration
	const config = new DocumentBuilder()
		.setTitle('Email Service API')
		.setDescription(
			'A robust email service API for sending emails, bulk emails, and template-based emails',
		)
		.setVersion('1.0')
		.addTag('email', 'Email operations')
		.addTag('health', 'Health check operations')
		.addApiKey(
			{
				type: 'apiKey',
				name: 'x-api-key',
				in: 'header',
				description:
					'API Key for authentication. Use: email-service-secure-key-huyche-00000000',
			},
			'ApiKey',
		)
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/docs', app, document, {
		customSiteTitle: 'Email Service API Documentation',
		customfavIcon: '📧',
		customJs: [
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
		],
		customCssUrl: [
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
		],
		swaggerOptions: {
			persistAuthorization: true,
			displayRequestDuration: true,
			docExpansion: 'none',
			filter: true,
			showRequestHeaders: true,
			tryItOutEnabled: true,
		},
	});

	const port = process.env.PORT || 4000;
	await app.listen(port);

	console.log(`🚀 Email Service is running on port ${port}`);
}

bootstrap();
