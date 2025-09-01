# Nextnode Front - Creative Agency Website

Official website and portfolio for Nextnode, built with Astro JS to showcase our company, services, and projects.

## 🚀 About

Nextnode is a creative agency specialized in custom web development and ultra-fast deployment on private cloud. Our website showcases our custom web development services and digital innovation expertise.

## 🛠️ Technologies Used

- **[Astro 5.x](https://astro.build)** - Modern web framework with SSR and selective hydration
- **[React 19](https://react.dev)** - For interactive components with latest features
- **[Tailwind CSS v4](https://tailwindcss.com)** - Latest utility-first CSS framework with design tokens
- **[TypeScript](https://www.typescriptlang.org)** - Static typing in strict mode
- **[Radix UI](https://www.radix-ui.com)** - Accessible UI components
- **[Lucide React](https://lucide.dev)** - Modern icon system
- **[Vitest](https://vitest.dev)** - Fast unit and component testing
- **[Playwright](https://playwright.dev)** - End-to-end testing framework
- **[i18next](https://www.i18next.com)** - Internationalization system
- **[React Email](https://react.email)** - Email template components
- **[@nextnode/config-manager](https://www.npmjs.com/package/@nextnode/config-manager)** - Environment-based configuration
- **[@nextnode/eslint-plugin](https://www.npmjs.com/package/@nextnode/eslint-plugin)** - Shared linting rules

## 📋 Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.12.4 (current: 10.12.4)

## 🚀 Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd nextnode-front
    ```

2. **Install dependencies**
    ```bash
    pnpm install
    ```

## 🎯 Available Scripts

### Development

```bash
# Start development server with hot reload
pnpm dev

# Type check with TypeScript and Astro
pnpm type-check
```

### Build and deployment

```bash
# Build project for production
pnpm build

# Preview production build
pnpm preview
```

### Code quality

```bash
# Lint code with @nextnode/eslint-plugin
pnpm lint

# Format code with Prettier
pnpm format
```

### Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# UI for tests
pnpm test:ui
```

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable components
│   │   ├── common/         # Shared utility components
│   │   ├── features/       # Business logic components
│   │   │   ├── marketing/  # Marketing-related features
│   │   │   ├── workflow/   # Complex workflow visualizations
│   │   │   └── pricing/    # Pricing page components
│   │   ├── layout/         # Header, footer, navigation
│   │   └── ui/             # Base design system components
│   ├── i18n/               # Internationalization
│   │   └── locales/        # Translation dictionaries (en/fr)
│   ├── layouts/            # Astro layout templates
│   ├── lib/                # Utilities and shared logic
│   │   ├── config/         # Environment-based configuration
│   │   ├── email/          # Email template system
│   │   ├── i18n/           # Translation utilities
│   │   └── middleware/     # Specialized middleware modules
│   ├── pages/              # File-based routing
│   │   └── [locale]/       # Internationalized pages
│   └── styles/             # Global CSS and Tailwind
├── types/                  # TypeScript definitions
├── emails/                 # React Email templates
├── config/                 # Environment configurations
├── public/                 # Static assets
└── railway.toml           # Railway deployment config
```

## 🌐 Configuration

The project uses the following environment variables:

- `HOST` - Server host (default: `0.0.0.0`)
- `PORT` - Server port (default: `4321`)
- `URL` - Site URL

## 🌍 Internationalization

- **Manual routing**: URLs structured as `/en/page` and `/fr/page`
- **Middleware-driven**: Automatic locale detection and URL mapping
- **Unified translation system**: Works both server-side (Astro) and client-side (React)
- **Structured dictionaries**: Translation files in `src/i18n/locales/{en,fr}/`

## 🧪 Testing

- **Vitest**: Fast unit and component testing with jsdom environment
- **Playwright**: End-to-end testing for complex user journeys
- **React Testing Library**: Component testing with accessibility focus
- **Coverage reporting**: V8 provider with comprehensive reporting

## 📦 Deployment

- **Platform**: Railway with Docker containerization
- **Adapter**: Astro Node.js adapter for SSR capability
- **Health checks**: Built-in health monitoring and restart policies
- **Docker**: Multi-stage builds optimized for production

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 👥 Team

- **Nextnode** - Creative agency specialized in web development

---

Built with ❤️ by the Nextnode team
