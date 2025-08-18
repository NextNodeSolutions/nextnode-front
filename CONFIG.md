# Configuration System Documentation

## Overview

Ce projet utilise un système de configuration JSON flexible avec support des environnements, objets/arrays, et accès par dot notation.

## Architecture

### Structure des fichiers

```
config/
├── default.json        # Configuration de base (obligatoire)
├── development.json    # Override pour développement
├── production.json     # Override pour production
├── test.json          # Override pour tests
└── staging.json       # Override pour staging (optionnel)
```

### Librairie de configuration

```
src/lib/config/
├── index.ts           # API publique
├── types.ts           # Types TypeScript
├── loader.ts          # Chargement des fichiers
├── utils.ts           # Utilitaires (deep merge, dot notation)
└── test-config.ts     # Script de test
```

## Utilisation

### Import et configuration de base

```typescript
import { getConfig, getTypedConfig } from '@/lib/config'
import type { EmailConfig } from '@/lib/config/types'
```

### Accès aux configurations

#### Accès simple par clé

```typescript
// Configuration complète
const emailConfig = getConfig<EmailConfig>('email')

// Valeur spécifique
const fromEmail = getConfig<string>('email.from')
const appName = getConfig<string>('app.name')
```

#### Accès par dot notation

```typescript
// Navigation dans les objets
const subject = getConfig<string>('email.templates.projectRequest.subject')
const websiteUrl = getConfig<string>('email.templates.projectRequest.websiteUrl')

// Arrays
const features = getConfig<string[]>('app.features')
```

#### Configuration typée

```typescript
// Accès typé avec autocomplétion
const emailConfig = getTypedConfig('email')  // Type: EmailConfig
const appConfig = getTypedConfig('app')      // Type: AppConfig
```

#### Environnement spécifique

```typescript
// Forcer un environnement
const devEmail = getConfig<string>('email.from', 'development')
const prodEmail = getConfig<string>('email.from', 'production')
```

### Validation et vérification

```typescript
import { hasConfig, validateRequiredConfig } from '@/lib/config'

// Vérifier l'existence
const exists = hasConfig('email.from')
const existsNested = hasConfig('email.templates.projectRequest')

// Validation de configuration requise
const validation = validateRequiredConfig([
  'email.from',
  'email.to',
  'email.provider',
  'app.name'
])

if (!validation.valid) {
  console.error('Missing config:', validation.missing)
}
```

### Utilitaires avancés

```typescript
import { 
  clearConfigCache, 
  getEnvironment,
  getAvailableEnvironments 
} from '@/lib/config'

// Environment actuel
const env = getEnvironment()  // 'development', 'production', etc.

// Environnements disponibles
const environments = getAvailableEnvironments()  // ['default', 'development', 'production']

// Clear cache (utile pour les tests)
clearConfigCache()
```

## Configuration par environnement

### Principe de merge

- **default.json** : Configuration de base (obligatoire)
- **{environment}.json** : Override par environnement (optionnel)
- **Merge par clé** : Les valeurs de l'environnement remplacent celles du default

### Exemple pratique

**config/default.json**
```json
{
  "email": {
    "from": "noreply@example.com",
    "to": "contact@example.com",
    "templates": {
      "projectRequest": {
        "subject": "Nouvelle demande : {{projectName}}",
        "companyName": "Mon Entreprise"
      }
    }
  },
  "app": {
    "features": ["email", "i18n"]
  }
}
```

**config/development.json**
```json
{
  "email": {
    "from": "dev@localhost",
    "templates": {
      "projectRequest": {
        "subject": "[DEV] Demande : {{projectName}}"
      }
    }
  },
  "app": {
    "features": ["email", "i18n", "debug"]
  }
}
```

**Résultat mergé en développement :**
```json
{
  "email": {
    "from": "dev@localhost",        // Override de development
    "to": "contact@example.com",    // Conservé de default
    "templates": {
      "projectRequest": {
        "subject": "[DEV] Demande : {{projectName}}", // Override
        "companyName": "Mon Entreprise"               // Conservé
      }
    }
  },
  "app": {
    "features": ["email", "i18n", "debug"]  // Remplacé entièrement
  }
}
```

## Types de configuration

### Structure recommandée

```typescript
// Organisé par domaines
{
  "app": {
    "name": "string",
    "version": "string",
    "features": ["array", "of", "strings"]
  },
  "email": {
    "provider": "resend" | "nodemailer",
    "from": "string",
    "to": "string",
    "templates": {
      "templateName": {
        "subject": "string avec {{variables}}",
        "companyName": "string"
      }
    }
  },
  "database": {
    "host": "string",
    "port": 5432,
    "ssl": true
  }
}
```

### Types supportés

- **Primitives** : `string`, `number`, `boolean`, `null`
- **Objects** : Objets imbriqués avec merge intelligent  
- **Arrays** : Remplacés entièrement (pas de merge)
- **Variables** : Support des templates comme `{{variableName}}`

## Variables d'environnement

### Séparation des responsabilités

- **Config JSON** : Configuration applicative (emails, URLs, features)
- **Environment Variables** : Secrets et configuration système

```bash
# .env - Seulement les secrets
RESEND_API_KEY=re_xxxxxxxxxxxxx
DATABASE_PASSWORD=secret123
JWT_SECRET=supersecret

# NODE_ENV détermine le fichier de config à charger
NODE_ENV=development
```

## Bonnes pratiques

### Organisation

1. **Par domaine** : Grouper les configs par fonctionnalité
2. **Hiérarchie claire** : `domaine.sousdomaine.propriete`
3. **Noms explicites** : `email.templates.projectRequest` vs `email.tmpl.pr`

### Sécurité

1. **Jamais de secrets dans JSON** : API keys, mots de passe en env vars
2. **Git tracking** : Config files commités, .env dans .gitignore
3. **Validation** : Toujours valider les configs requises

### Performance

1. **Cache automatique** : Les configs sont mises en cache
2. **Lazy loading** : Chargement à la première utilisation
3. **Clear cache** : Pour les tests ou hot reloading

### Testing

```typescript
// Dans vos tests
beforeEach(() => {
  clearConfigCache()
})

// Test avec environnement spécifique
const testConfig = getConfig('email', 'test')
```

## Exemple d'utilisation dans l'email system

```typescript
// src/pages/api/send-email.ts
import { getConfig } from '../../lib/config'
import type { EmailConfig } from '../../lib/config/types'

export const POST: APIRoute = async ({ request }) => {
  // Récupération de la config email
  const emailConfig = getConfig<EmailConfig>('email')
  
  if (!emailConfig) {
    throw new Error('Email configuration not found')
  }
  
  // Utilisation avec template
  const templateConfig = emailConfig.templates.projectRequest
  const subject = templateConfig.subject.replace('{{projectName}}', data.projectName)
  
  // Service email
  const emailService = new EmailService({
    provider: emailConfig.provider,
    apiKey: process.env.RESEND_API_KEY, // Toujours en env var
    defaultFrom: emailConfig.from
  })
  
  await emailService.sendEmail({
    to: emailConfig.to,
    from: emailConfig.from,
    subject,
    template: templateComponent
  })
}
```

## Extensibilité

### Ajouter un nouveau domaine de configuration

1. **Mettre à jour les types**
```typescript
// src/lib/config/types.ts
export interface DatabaseConfig {
  host: string
  port: number
  name: string
}

export interface RootConfig {
  email: EmailConfig
  app: AppConfig
  database: DatabaseConfig  // Nouveau
}
```

2. **Ajouter aux fichiers de config**
```json
// config/default.json
{
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "myapp"
  }
}
```

3. **Utiliser dans le code**
```typescript
const dbConfig = getTypedConfig('database')
// Auto-completion et type safety garantis
```

Ce système vous offre une gestion centralisée, flexible et type-safe de toute votre configuration applicative.