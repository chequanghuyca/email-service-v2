export interface EmailAttachment {
  filename: string;
  content: string | Buffer;
  contentType?: string;
}

export interface EmailOptions {
  to: string | string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: EmailAttachment[];
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  message: string;
  error?: string;
}

export interface BulkEmailResponse {
  success: boolean;
  sent: number;
  failed: number;
  results: EmailResponse[];
}
