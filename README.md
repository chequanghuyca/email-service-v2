# Email Service API

A robust NestJS-based email service that can be deployed to Vercel. This service supports sending individual emails, bulk emails, and template-based emails with attachments.

## 🚀 Features

- ✅ Send individual emails
- ✅ Send bulk emails to multiple recipients
- ✅ Template-based emails with variables
- ✅ File attachments support
- ✅ Rate limiting (10 requests/minute)
- ✅ Input validation
- ✅ Gmail and SMTP support
- ✅ Health check endpoint
- ✅ Vercel deployment ready

## 📦 Installation

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

## ⚙️ Configuration

Make sure your `.env` file contains the following variables:

```env
# Email Provider (gmail or smtp)
EMAIL_PROVIDER=gmail

# Gmail Configuration (if using gmail)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# SMTP Configuration (if using smtp)
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASSWORD=your-smtp-password

# Email From Address
EMAIL_FROM="Your Name <your-email@gmail.com>"

# Server Configuration
PORT=3000
NODE_ENV=production
```

### Gmail Setup

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: Google Account > Security > 2-Step Verification > App passwords
3. Use the generated password in `GMAIL_APP_PASSWORD`

## 🏃‍♂️ Running the Application

```bash
# Development with Bun (hot reload)
bun run dev

# Traditional NestJS development
bun run start:dev

# Production
bun run build
bun run start:prod
```

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Test Email Connection
```
GET /api/email/test
```

### Send Single Email
```
POST /api/email/send
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "text": "Plain text content",
  "html": "<h1>HTML content</h1>",
  "cc": ["cc@example.com"],
  "bcc": ["bcc@example.com"],
  "attachments": [
    {
      "filename": "document.pdf",
      "content": "base64-encoded-content",
      "contentType": "application/pdf"
    }
  ]
}
```

### Send Bulk Email
```
POST /api/email/send-bulk
Content-Type: application/json

{
  "to": ["user1@example.com", "user2@example.com"],
  "subject": "Bulk Email",
  "html": "<h1>Bulk message</h1>"
}
```

### Send Template Email
```
POST /api/email/send-template
Content-Type: application/json

{
  "to": "user@example.com",
  "template": "welcome",
  "subject": "Welcome!",
  "variables": {
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01"
  }
}
```

### Get Available Templates
```
GET /api/email/templates
```

## 📧 Available Templates

1. **welcome** - Welcome new users
   - Variables: `name`, `email`, `createdAt`

2. **reset_password** - Password reset emails
   - Variables: `name`, `resetLink`

3. **notification** - General notifications
   - Variables: `name`, `title`, `message`, `actionUrl`, `actionText`

## 🚀 Deployment to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set environment variables in Vercel dashboard or via CLI:
```bash
vercel env add EMAIL_PROVIDER
vercel env add GMAIL_USER
vercel env add GMAIL_APP_PASSWORD
vercel env add EMAIL_FROM
```

## 🔒 Security Features

- Rate limiting: 10 requests per minute per IP
- Input validation with class-validator
- CORS enabled
- Environment variable validation

## 🧪 Testing

Test the email service:

```bash
# Test connection
curl https://your-vercel-url.vercel.app/api/email/test

# Send test email
curl -X POST https://your-vercel-url.vercel.app/api/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "text": "This is a test email"
  }'
```

## 📝 Response Format

All endpoints return responses in the following format:

```typescript
// Single email response
{
  "success": boolean,
  "messageId"?: string,
  "message": string,
  "error"?: string
}

// Bulk email response
{
  "success": boolean,
  "sent": number,
  "failed": number,
  "results": EmailResponse[]
}
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Run tests
npm run test

# Build for production
npm run build
```

## 📄 License

This project is licensed under the UNLICENSED License.
