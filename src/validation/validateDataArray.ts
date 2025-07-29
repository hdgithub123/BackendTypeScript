// 🔁 Array-level validation
import {  validateField } from './validateField'
import { autoGenMessageRulesMultiLang  } from './autoGenMessageRulesMultiLang';
import {RuleSchema,TranslateMessageMap,CustomMessageRules,ValidationResult,} from './dataType'


export function validateDataArray<T extends Record<string, any>>(
  data: T[],
  schema: RuleSchema,
  translateMessages?: Partial<TranslateMessageMap>,// ← tên mới nè
): {
  status: boolean;
  results: ValidationResult<T>[];
} {
    const customMessages: CustomMessageRules = autoGenMessageRulesMultiLang(schema,translateMessages)

  const results = data.map((item, index): ValidationResult<T> => {
    const errors: Record<string, string> = {};
    let valid = true;

    for (const key in schema) {
      const fieldSchema = schema[key];
      const messages = customMessages[key] || {};
      const value = item[key as keyof T];

      const isRequired = fieldSchema.required === true;
      const hasValue = !(value === undefined || value === null || value === '');

      if (isRequired || hasValue) {
        const fieldErrors = validateField(value, fieldSchema, messages);
        if (fieldErrors.length > 0) {
          valid = false;
          errors[key] = fieldErrors.join(' ');
        }
      }
    }

    return {
      index,
      valid,
      errors,
    };
  });

  const status = results.every(r => r.valid);
  return { status, results };
}