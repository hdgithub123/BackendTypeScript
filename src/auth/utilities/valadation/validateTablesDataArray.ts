import { ValidationResult, CustomMessageRules, validateField, autoGenRules, getMessages, Schema } from './validate';

export type TableDataEntry<T> = {
    table: string;
    dataIn: T[];
};

export type TableValidationResult<T> = {
    table: string;
    results: ValidationResult<T>[];
};


export function validateTablesDataArray<T extends Record<string, any>>(
    tables: Record<string, T[]>,
    schemasPerTable: Record<string, Schema>,
    customMessagesPerTable: Record<string, Record<string, string>> = {}
): {
    status: boolean;
    results: Record<string, ValidationResult<T>[]>;
} {
    const results: Record<string, ValidationResult<T>[]> = {};
    let allValid = true;

    for (const tableName in tables) {
        const data = tables[tableName];
        const schema = schemasPerTable[tableName];
        const rules = autoGenRules(schema);
        const messages = getMessages(schema, customMessagesPerTable[tableName] || {});

        const tableResults: ValidationResult<T>[] = data.map((item, index) => {
            const errors: Record<string, string> = {};
            let valid = true;
            const sanitized = {} as T;

            for (const field of Object.keys(item)) {
                if (!(field in rules)) {
                    valid = false;
                    errors[field] = `Trường "${field}" không được phép`;
                }
            }

            for (const key in rules) {
                const typedKey = key as keyof T;
                const value = item[typedKey];
                const ruleString = rules[typedKey as string];
                const customRuleMessages = messages[typedKey as string] || {};
                const fieldErrors = validateField(value, ruleString, customRuleMessages);

                if (fieldErrors.length > 0) {
                    valid = false;
                    errors[typedKey as string] = fieldErrors.join(', ');
                }

                sanitized[typedKey] = value;
            }

            return { index, valid, errors, sanitized };
        });

        results[tableName] = tableResults;
        if (!tableResults.every(r => r.valid)) {
            allValid = false;
        }
    }

    return {
        status: allValid,
        results
    };
}



