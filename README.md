# Nextnode Front - Creative Agency Website

Official website and portfolio for Nextnode, built with Astro JS to showcase our company, services, and projects.

## 🚀 About

Nextnode is a creative agency specialized in custom web development and ultra-fast deployment on private cloud. Our website showcases our custom web development services and digital innovation expertise.

## 🛠️ Technologies Used

- **[Astro](https://astro.build)** - Modern web framework for performant static sites
- **[React](https://react.dev)** - For interactive components
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org)** - Static typing
- **[Radix UI](https://www.radix-ui.com)** - Accessible UI components
- **[Lucide React](https://lucide.dev)** - Modern icons
- **[Vitest](https://vitest.dev)** - Testing framework
- **[Biome](https://biomejs.dev)** - Code linter and formatter

## 📋 Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.11.0

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
# Start development server
pnpm dev

# Type check with TypeScript
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
# Lint code
pnpm lint

# Fix linting errors automatically
pnpm lint:fix

# Format code with Biome
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

### Version management
```bash
# Create a changeset
pnpm changeset

# Version packages
pnpm changeset:version

# Publish packages
pnpm changeset:publish
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── common/         # Common components
│   ├── layout/         # Layout components
│   ├── marketing/      # Marketing components
│   └── ui/             # Base UI components
├── layouts/            # Astro layouts
├── lib/                # Utilities and constants
├── pages/              # Site pages
└── styles/             # Global styles
```

## 🌐 Configuration

The project uses the following environment variables:

- `HOST` - Server host (default: `0.0.0.0`)
- `PORT` - Server port (default: `4321`)
- `URL` - Site URL

## 🧪 Testing

The project uses Vitest for unit and component testing. Tests are configured to work with React Testing Library and jsdom.

## 📦 Deployment

The project is configured with Astro's Node.js adapter for standalone deployment.

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
