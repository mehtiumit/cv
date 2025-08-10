// Type validation utilities
// These utilities provide runtime type checking and validation

import { Language, Platform } from './index';
import { 
  Project, 
  Experience, 
  Education, 
  SkillCategory, 
  Leadership,
  LocalizedString 
} from './content';
import { TranslationKeys } from './translations';

// Language validation
export const isValidLanguage = (value: any): value is Language => {
  return typeof value === 'string' && ['en', 'tr'].includes(value);
};

export const isValidPlatform = (value: any): value is Platform => {
  return typeof value === 'string' && ['web', 'android', 'ios', 'all'].includes(value);
};

// Localized string validation
export const isValidLocalizedString = (value: any): value is LocalizedString => {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.en === 'string' &&
    typeof value.tr === 'string'
  );
};

// Content validation functions
export const isValidProject = (value: any): value is Project => {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.description === 'string' &&
    typeof value.purpose === 'string' &&
    Array.isArray(value.features) &&
    value.features.every((f: any) => typeof f === 'string') &&
    isValidPlatform(value.platform) &&
    Array.isArray(value.technologies) &&
    value.technologies.every((t: any) => typeof t === 'string') &&
    typeof value.featured === 'boolean' &&
    typeof value.completionDate === 'string'
  );
};

export const isValidExperience = (value: any): value is Experience => {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.id === 'string' &&
    isValidLocalizedString(value.company) &&
    isValidLocalizedString(value.workType) &&
    isValidLocalizedString(value.position) &&
    typeof value.startDate === 'string' &&
    (typeof value.endDate === 'string' || value.endDate === 'present') &&
    Array.isArray(value.bulletPoints) &&
    value.bulletPoints.every((bp: any) => isValidLocalizedString(bp)) &&
    typeof value.isCurrentPosition === 'boolean'
  );
};

export const isValidEducation = (value: any): value is Education => {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.id === 'string' &&
    isValidLocalizedString(value.institution) &&
    isValidLocalizedString(value.degree) &&
    isValidLocalizedString(value.field) &&
    typeof value.startDate === 'string' &&
    typeof value.endDate === 'string'
  );
};

export const isValidSkillCategory = (value: any): value is SkillCategory => {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.id === 'string' &&
    isValidLocalizedString(value.name) &&
    Array.isArray(value.skills) &&
    typeof value.order === 'number'
  );
};

export const isValidLeadership = (value: any): value is Leadership => {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.id === 'string' &&
    isValidLocalizedString(value.organization) &&
    isValidLocalizedString(value.role) &&
    isValidLocalizedString(value.description) &&
    typeof value.startDate === 'string' &&
    (typeof value.endDate === 'string' || value.endDate === 'present') &&
    typeof value.isCurrentRole === 'boolean'
  );
};

// Translation validation
export const isValidTranslationKeys = (value: any): value is TranslationKeys => {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.navigation === 'object' &&
    typeof value.projects === 'object' &&
    typeof value.projectDetails === 'object' &&
    typeof value.common === 'object' &&
    typeof value.accessibility === 'object'
  );
};

// Generic validation utilities
export const validateRequired = <T>(value: T | null | undefined, fieldName: string): T => {
  if (value === null || value === undefined) {
    throw new Error(`${fieldName} is required`);
  }
  return value;
};

export const validateString = (value: any, fieldName: string, minLength = 0, maxLength = Infinity): string => {
  if (typeof value !== 'string') {
    throw new Error(`${fieldName} must be a string`);
  }
  if (value.length < minLength) {
    throw new Error(`${fieldName} must be at least ${minLength} characters long`);
  }
  if (value.length > maxLength) {
    throw new Error(`${fieldName} must be at most ${maxLength} characters long`);
  }
  return value;
};

export const validateNumber = (value: any, fieldName: string, min = -Infinity, max = Infinity): number => {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error(`${fieldName} must be a valid number`);
  }
  if (value < min) {
    throw new Error(`${fieldName} must be at least ${min}`);
  }
  if (value > max) {
    throw new Error(`${fieldName} must be at most ${max}`);
  }
  return value;
};

export const validateBoolean = (value: any, fieldName: string): boolean => {
  if (typeof value !== 'boolean') {
    throw new Error(`${fieldName} must be a boolean`);
  }
  return value;
};

export const validateArray = <T>(
  value: any, 
  fieldName: string, 
  itemValidator?: (item: any, index: number) => T,
  minLength = 0,
  maxLength = Infinity
): T[] => {
  if (!Array.isArray(value)) {
    throw new Error(`${fieldName} must be an array`);
  }
  if (value.length < minLength) {
    throw new Error(`${fieldName} must have at least ${minLength} items`);
  }
  if (value.length > maxLength) {
    throw new Error(`${fieldName} must have at most ${maxLength} items`);
  }
  
  if (itemValidator) {
    return value.map((item, index) => {
      try {
        return itemValidator(item, index);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`${fieldName}[${index}]: ${errorMessage}`);
      }
    });
  }
  
  return value;
};

export const validateObject = <T>(
  value: any,
  fieldName: string,
  validator: (obj: any) => T
): T => {
  if (typeof value !== 'object' || value === null) {
    throw new Error(`${fieldName} must be an object`);
  }
  
  try {
    return validator(value);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`${fieldName}: ${errorMessage}`);
  }
};

export const validateEnum = <T extends string>(
  value: any,
  fieldName: string,
  allowedValues: readonly T[]
): T => {
  if (!allowedValues.includes(value)) {
    throw new Error(`${fieldName} must be one of: ${allowedValues.join(', ')}`);
  }
  return value;
};

export const validateDate = (value: any, fieldName: string): string => {
  if (typeof value !== 'string') {
    throw new Error(`${fieldName} must be a string`);
  }
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    throw new Error(`${fieldName} must be a valid date string`);
  }
  
  return value;
};

export const validateUrl = (value: any, fieldName: string, required = false): string | undefined => {
  if (!required && (value === undefined || value === null || value === '')) {
    return undefined;
  }
  
  if (typeof value !== 'string') {
    throw new Error(`${fieldName} must be a string`);
  }
  
  try {
    new URL(value);
    return value;
  } catch {
    throw new Error(`${fieldName} must be a valid URL`);
  }
};

export const validateEmail = (value: any, fieldName: string): string => {
  const email = validateString(value, fieldName);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    throw new Error(`${fieldName} must be a valid email address`);
  }
  
  return email;
};

// Validation result types
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings?: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  value: any;
  code: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
  value: any;
  code: string;
}

// Validation context for complex validations
export class ValidationContext {
  private errors: ValidationError[] = [];
  private warnings: ValidationWarning[] = [];
  private path: string[] = [];

  pushPath(segment: string): void {
    this.path.push(segment);
  }

  popPath(): void {
    this.path.pop();
  }

  getCurrentPath(): string {
    return this.path.join('.');
  }

  addError(message: string, value: any, code = 'VALIDATION_ERROR'): void {
    this.errors.push({
      field: this.getCurrentPath(),
      message,
      value,
      code
    });
  }

  addWarning(message: string, value: any, code = 'VALIDATION_WARNING'): void {
    this.warnings.push({
      field: this.getCurrentPath(),
      message,
      value,
      code
    });
  }

  getResult(): ValidationResult {
    return {
      isValid: this.errors.length === 0,
      errors: [...this.errors],
      warnings: [...this.warnings]
    };
  }

  reset(): void {
    this.errors = [];
    this.warnings = [];
    this.path = [];
  }
}