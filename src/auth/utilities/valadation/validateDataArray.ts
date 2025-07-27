import {ValidationResult,validateField,autoGenRules,getMessages,Schema} from './validate';




// export function validateDataArray<T extends Record<string, any>>(
//   data: T[],
//   schema: Schema,
//   customMessages: Record<string, string> = {}
// ): {
//   status: boolean;
//   results: ValidationResult<T>[];
// } {
//   const rules: Record<string, string> = autoGenRules(schema);
//   const messages: Record<string, string> = getMessages(schema, customMessages);

//   const results = data.map((item, index): ValidationResult<T> => {
//     const errors: Record<string, string> = {};
//     let valid = true;
//     const sanitized = {} as T;

//     // 🛑 Field không nằm trong schema
//     for (const field of Object.keys(item)) {
//       if (!(field in rules)) {
//         valid = false;
//         errors[field] = `Trường "${field}" không được phép`;
//       }
//     }

//     // ✅ Validate từng field theo rule chuỗi
//     for (const key in rules) {
//       const ruleString = rules[key];
//       const messageMap = messages[key] || {};
//       const value = item[key as keyof T];
//       const fieldErrors = validateField(value, ruleString, messageMap);

//       if (fieldErrors.length > 0) {
//         valid = false;
//         errors[key] = fieldErrors.join(', ');
//       }

//       sanitized[key as keyof T] = value;
//     }

//     return {
//       index,
//       valid,
//       errors,
//       sanitized
//     };
//   });

//   const status = results.every(r => r.valid);

//   return { status, results };
// }


export function validateDataArray<T extends Record<string, any>>(
  data: T[],
  schema: Schema,
  customMessages: Record<string, string> = {}
): {
  status: boolean;
  results: ValidationResult<T>[];
} {
  const rules: Record<string, string> = autoGenRules(schema);
  const messages: Record<string, string> = getMessages(schema, customMessages);

  const results = data.map((item, index): ValidationResult<T> => {
    const errors: Record<string, string> = {};
    let valid = true;
    const sanitized = {} as T;

    // ✅ Chỉ validate những field nằm trong schema
    for (const key in rules) {
      const ruleString = rules[key];
      const messageMap = messages[key] || {};
      const value = item[key as keyof T];
      const isRequired = ruleString.includes('required');
      const hasValue = !(value === undefined || value === null || value === '');

      if (isRequired || hasValue) {
        const fieldErrors = validateField(value, ruleString, messageMap);
        if (fieldErrors.length > 0) {
          valid = false;
          errors[key] = fieldErrors.join(', ');
        }

        sanitized[key as keyof T] = value;
      }
      
      
    }

    return {
      index,
      valid,
      errors,
      sanitized
    };
  });

  const status = results.every(r => r.valid);

  return { status, results };
}

