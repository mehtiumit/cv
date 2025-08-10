# TypeScript Type Definitions

This directory contains comprehensive TypeScript type definitions for the multilingual portfolio application. The type system is designed to provide strong type safety, excellent developer experience, and support for internationalization.

## Structure

### Core Type Files

- **`index.ts`** - Main export file for all type definitions
- **`global.d.ts`** - Global type declarations and module augmentations
- **`validators.ts`** - Runtime type validation utilities

### Domain-Specific Types

- **`translations.ts`** - Translation system and internationalization types
- **`content.ts`** - Content data structures (projects, experiences, education, etc.)
- **`components.ts`** - React component props and state types
- **`context.ts`** - React context types for state management
- **`api.ts`** - API request/response and data fetching types
- **`utils.ts`** - Utility functions and helper types

## Key Features

### 1. Multilingual Support

All content types support localization through the `LocalizedString` interface:

```typescript
interface LocalizedString {
  en: string;
  tr: string;
}
```

### 2. Type-Safe Translations

Translation keys are strongly typed using template literal types:

```typescript
type TranslationKeyPath = 
  | `navigation.${keyof NavigationTranslations}`
  | `projects.${keyof ProjectTranslations}`
  | `common.${keyof CommonTranslations}`;
```

### 3. Component Type Safety

All React components have comprehensive prop interfaces:

```typescript
interface ProjectCardProps extends BaseComponentProps {
  project: Project;
  language?: Language;
  onProjectClick?: (project: Project) => void;
  variant?: 'default' | 'compact' | 'featured';
}
```

### 4. Runtime Validation

Type validators ensure runtime type safety:

```typescript
export const isValidProject = (value: any): value is Project => {
  // Runtime validation logic
};
```

## Usage Guidelines

### 1. Importing Types

```typescript
// Import specific types
import { Project, Language, TranslationFunction } from '@/types';

// Import all types (not recommended for large applications)
import * as Types from '@/types';
```

### 2. Component Props

```typescript
import { ProjectCardProps } from '@/types';

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  language = 'en',
  onProjectClick,
  variant = 'default'
}) => {
  // Component implementation
};
```

### 3. Content Data

```typescript
import { Project, LocalizedString } from '@/types';

const project: Project = {
  id: 'web-1',
  title: 'My Project',
  description: 'Project description',
  // ... other properties
};
```

### 4. Translation Usage

```typescript
import { TranslationFunction, Language } from '@/types';

const useTranslation = (): { t: TranslationFunction; language: Language } => {
  // Hook implementation
};
```

## Type Safety Best Practices

### 1. Use Strict TypeScript Configuration

The project uses strict TypeScript settings:
- `strict: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`

### 2. Prefer Interfaces Over Types

Use interfaces for object shapes that might be extended:

```typescript
// Good
interface ProjectProps {
  project: Project;
  className?: string;
}

// Less preferred for extensible objects
type ProjectProps = {
  project: Project;
  className?: string;
};
```

### 3. Use Union Types for Enums

```typescript
type Platform = 'web' | 'android' | 'ios' | 'all';
type Language = 'en' | 'tr';
```

### 4. Generic Types for Reusability

```typescript
interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}
```

## Validation

### Runtime Type Checking

Use the provided validators for runtime type safety:

```typescript
import { isValidProject, validateRequired } from '@/types';

const processProject = (data: unknown) => {
  if (!isValidProject(data)) {
    throw new Error('Invalid project data');
  }
  
  // data is now typed as Project
  return data;
};
```

### Validation Context

For complex validations, use the ValidationContext:

```typescript
import { ValidationContext } from '@/types';

const validateProjectData = (data: any): ValidationResult => {
  const context = new ValidationContext();
  
  context.pushPath('project');
  
  if (!data.title) {
    context.addError('Title is required', data.title);
  }
  
  context.popPath();
  
  return context.getResult();
};
```

## Extension Guidelines

### Adding New Types

1. Create types in the appropriate domain file
2. Export from the main `index.ts` file
3. Add runtime validators if needed
4. Update documentation

### Modifying Existing Types

1. Consider backward compatibility
2. Update related validators
3. Update component props if affected
4. Test thoroughly

## Development Tools

### VS Code Integration

The type system is optimized for VS Code with:
- IntelliSense support
- Auto-completion for translation keys
- Type checking on save
- Import suggestions

### Type Checking

Run type checking:

```bash
# Check all files
npx tsc --noEmit

# Check specific file
npx tsc --noEmit path/to/file.ts
```

## Migration Notes

When converting from JavaScript to TypeScript:

1. Start with basic type annotations
2. Add component prop interfaces
3. Implement content data types
4. Add translation type safety
5. Include runtime validation

## Performance Considerations

- Types are compile-time only and don't affect runtime performance
- Runtime validators should be used judiciously
- Consider lazy loading for large type definitions
- Use type guards for performance-critical paths

## Troubleshooting

### Common Issues

1. **Missing type exports**: Check if types are exported from `index.ts`
2. **Circular dependencies**: Avoid importing types that create circular references
3. **Generic type errors**: Ensure proper type parameter constraints
4. **Translation key errors**: Verify translation key paths match the actual structure

### Debug Tips

1. Use TypeScript's `--traceResolution` flag for import issues
2. Enable `--strict` mode gradually if migrating from JavaScript
3. Use type assertions sparingly and prefer type guards
4. Leverage TypeScript's utility types for complex transformations