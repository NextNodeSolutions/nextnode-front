# Email System Documentation

## Overview

This project implements a complete email system for sending project requests using React Email templates and Resend as the email provider.

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

```bash
RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=contact@yourdomaine.com
```

### Resend Setup

1. Create an account at [resend.com](https://resend.com)
2. Generate an API key in your dashboard
3. Verify your domain (or use the test domain for development)
4. Add the API key to your environment variables

## Architecture

### Module Structure

```
src/lib/email/
├── templates/           # React email templates
│   ├── ProjectRequest.tsx
│   └── index.ts
├── providers/          # Email service providers
│   ├── resend.ts
│   └── index.ts
├── types/             # TypeScript definitions
│   └── email.ts
├── utils/             # Utilities
│   ├── render.ts      # Template rendering
│   ├── validation.ts  # Data validation
│   └── index.ts
└── index.ts           # Main email service
```

### API Endpoint

- **URL**: `POST /api/send-email`
- **Body**: JSON with project request data
- **Response**: Success/error status with message ID

### Template Preview

Use the preview file for development:

```bash
# Located at: emails/preview-project-request.tsx
```

## Usage

### From React Components

```typescript
const projectData: ProjectRequestData = {
  userName: 'John Doe',
  userEmail: 'john@example.com',
  projectName: 'My Project',
  // ... other fields
}

const response = await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(projectData),
})

const result = await response.json()
```

### Direct Service Usage

```typescript
import { EmailService } from '@/lib/email'
import { ProjectRequest } from '@/lib/email/templates'

const emailService = new EmailService({
  provider: 'resend',
  apiKey: 'your-api-key',
  defaultFrom: 'noreply@yourdomaine.com'
})

const result = await emailService.sendEmail(
  {
    to: 'recipient@example.com',
    subject: 'Project Request',
    template: 'ProjectRequest',
    data: projectData
  },
  ProjectRequest({ data: projectData })
)
```

## Features

- **React Templates**: Write email templates in React/JSX
- **Type Safety**: Full TypeScript support throughout
- **Validation**: Comprehensive input validation
- **Error Handling**: Robust error handling and logging
- **Responsive Design**: Mobile-friendly email templates
- **Internationalization**: Ready for multiple languages
- **Modular Architecture**: Easy to extend and reuse

## Testing

1. **Type Checking**: `pnpm type-check`
2. **Linting**: `pnpm lint`
3. **Build**: `pnpm build`
4. **Development**: `pnpm dev`

## Extending

### Adding New Templates

1. Create a new React component in `src/lib/email/templates/`
2. Add the template to the exports in `templates/index.ts`
3. Create a preview file in `emails/` directory
4. Update the API route to handle the new template

### Adding New Providers

1. Create a provider class in `src/lib/email/providers/`
2. Implement the same interface as `ResendProvider`
3. Add the provider to `EmailService` configuration
4. Export the provider from `providers/index.ts`

## Production Deployment

1. Set up domain verification with Resend
2. Configure production environment variables
3. Test email delivery in staging
4. Monitor email sending logs and metrics