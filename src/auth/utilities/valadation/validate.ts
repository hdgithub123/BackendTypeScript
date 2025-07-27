type SchemaField = {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required?: boolean;
  format?: 'email' | 'url' | 'date' | 'json';
  min?: number;
  max?: number;
  enum?: string[];
  regex?: string;
  hasUpperCase?: boolean;
  hasLowerCase?: boolean;
  hasNumber?: boolean;
  hasSpecialChar?: boolean;
  noXSS?: boolean;
};

export type Schema = Record<string, SchemaField>;

export type CustomMessageRules = Record<string, Record<string, string>>;

export type ValidationResult<T> = {
  index: number;
  valid: boolean;
  errors: Record<string, string>;
  sanitized: T;
};

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function autoGenRules(schema: Schema): Record<string, string> {
  const rules: Record<string, string> = {};

  for (const [field, props] of Object.entries(schema)) {
    const ruleParts: string[] = [];

    if (props.required) ruleParts.push('required');
    ruleParts.push(props.type);

    if (props.format) ruleParts.push(props.format);
    if (props.min !== undefined) ruleParts.push(`min:${props.min}`);
    if (props.max !== undefined) ruleParts.push(`max:${props.max}`);
    if (props.enum) ruleParts.push(`enum:${props.enum.join(',')}`);
    if (props.regex) ruleParts.push(`regex:${props.regex}`);

    if (props.hasUpperCase) ruleParts.push('hasUpperCase');
    if (props.hasLowerCase) ruleParts.push('hasLowerCase');
    if (props.hasNumber) ruleParts.push('hasNumber');
    if (props.hasSpecialChar) ruleParts.push('hasSpecialChar');
    if (props.noXSS) ruleParts.push('noXSS');

    rules[field] = ruleParts.join('|');
  }

  return rules;
}

export function autoGenMessages(schema: Schema): Record<string, string> {
  const messages: Record<string, string> = {};

  for (const [field, props] of Object.entries(schema)) {
    const label = capitalize(field);
    const parts: string[] = [];

    if (props.required) parts.push(`${label} là bắt buộc`);
    parts.push(`${label} phải là ${props.type}`);
    if (props.format === 'email') parts.push('đúng định dạng email');
    if (props.format === 'url') parts.push('đúng định dạng URL');
    if (props.format === 'date') parts.push('là ngày hợp lệ');
    if (props.format === 'json') parts.push('là JSON hợp lệ');
    if (props.min !== undefined) parts.push(`tối thiểu ${props.min}`);
    if (props.max !== undefined) parts.push(`tối đa ${props.max}`);
    if (props.enum) parts.push(`một trong: ${props.enum.join(', ')}`);
    if (props.regex) parts.push(`đúng biểu thức`);
    if (props.hasUpperCase) parts.push('có chữ hoa');
    if (props.hasLowerCase) parts.push('có chữ thường');
    if (props.hasNumber) parts.push('có số');
    if (props.hasSpecialChar) parts.push('có ký tự đặc biệt');
    if (props.noXSS) parts.push('không chứa nội dung nguy hiểm');

    messages[field] = parts.join(', ') + '.';
  }

  return messages;
}

export function getMessages(schema: Schema, customMessages: Record<string, string> = {}): Record<string, string> {
  const autoMessages = autoGenMessages(schema);
  const result: Record<string, string> = {};

  for (const key of Object.keys(schema)) {
    result[key] = customMessages[key] || autoMessages[key];
  }

  return result;
}

export function validateField(
  value: any,
  ruleString: string,
  customRuleMessages: Record<string, string> = {}
): string[] {
  const rules = ruleString.split('|');
  const errors: string[] = [];

  for (const rule of rules) {
    const msg = customRuleMessages[rule];

    if (rule === 'required' && (value === undefined || value === null || value === '')) {
      errors.push(msg || 'is required');
    }

    else if (rule === 'string' && typeof value !== 'string') {
      errors.push(msg || 'must be a string');
    }

    else if (rule === 'number' && typeof value !== 'number') {
      errors.push(msg || 'must be a number');
    }

    else if (rule === 'boolean' && typeof value !== 'boolean') {
      errors.push(msg || 'must be true or false');
    }

    else if (rule === 'array' && !Array.isArray(value)) {
      errors.push(msg || 'must be an array');
    }

    else if (rule === 'object' && (typeof value !== 'object' || value === null || Array.isArray(value))) {
      errors.push(msg || 'must be an object');
    }

    else if (rule === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof value !== 'string' || !emailRegex.test(value)) {
        errors.push(msg || 'is not a valid email');
      }
    }

    else if (rule === 'url') {
      try {
        new URL(value);
      } catch {
        errors.push(msg || 'is not a valid URL');
      }
    }

    else if (rule === 'date') {
      if (isNaN(Date.parse(value))) {
        errors.push(msg || 'is not a valid date');
      }
    }

    else if (rule === 'json') {
      try {
        typeof value === 'string' ? JSON.parse(value) : JSON.stringify(value);
      } catch {
        errors.push(msg || 'is not valid JSON');
      }
    }

    else if (rule.startsWith('min:')) {
      const min = parseFloat(rule.split(':')[1]);
      if ((typeof value === 'string' && value.length < min) || (typeof value === 'number' && value < min)) {
        errors.push(msg || `must be at least ${min}`);
      }
    }

    else if (rule.startsWith('max:')) {
      const max = parseFloat(rule.split(':')[1]);
      if ((typeof value === 'string' && value.length > max) || (typeof value === 'number' && value > max)) {
        errors.push(msg || `must be at most ${max}`);
      }
    }

    else if (rule.startsWith('enum:')) {
      const list = rule.split(':')[1].split(',');
      if (!list.includes(value)) {
        errors.push(msg || `must be one of: ${list.join(', ')}`);
      }
    }

    else if (rule.startsWith('regex:')) {
      const pattern = rule.split(':')[1];
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        errors.push(msg || `does not match pattern ${pattern}`);
      }
    }

    else if (rule === 'hasUpperCase' && !/[A-Z]/.test(value)) {
      errors.push(msg || 'must contain uppercase letter');
    }

    else if (rule === 'hasLowerCase' && !/[a-z]/.test(value)) {
      errors.push(msg || 'must contain lowercase letter');
    }

    else if (rule === 'hasNumber' && !/[0-9]/.test(value)) {
      errors.push(msg || 'must contain number');
    }

    else if (rule === 'hasSpecialChar' && !/[!@#$%^&*(),.?":{}|<>_\-+=~`]/.test(value)) {
      errors.push(msg || 'must contain special character');
    }

    else if (rule === 'noXSS') {
      const xssPattern = /<[^>]*>|javascript:|on\w+="|&#\d+;/gi;
      if (typeof value === 'string' && xssPattern.test(value)) {
        errors.push(msg || 'contains potentially unsafe content');
      }
    }
  }

  return errors;
}



