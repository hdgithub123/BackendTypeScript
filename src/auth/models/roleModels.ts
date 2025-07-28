import bcrypt from 'bcrypt';
import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../../connectSql'
//import { validateDataArray } from '../utilities/valadation/validateDataArray'
//import { RuleSchema } from '../utilities/valadation/validate'
import { validateDataArray, RuleSchema, CustomMessageRules,MessageFieldRules } from '../utilities/valadation/validators'


function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function autoGenVietnameseMessageRulesSmart(schema: RuleSchema): CustomMessageRules {
  const messages: CustomMessageRules = {};

  for (const [field, props] of Object.entries(schema)) {
    const label = capitalize(field); // Có thể dùng labelMap nếu muốn tiếng Việt đẹp hơn
    const ruleMessages: Partial<MessageFieldRules> = {};

    if (props.required)
      ruleMessages.required = `${label} là bắt buộc phải nhập.`;

    if (props.format)
      ruleMessages.type = `${label} phải đúng định dạng ${props.format}.`; // Ưu tiên định dạng

    else if (props.type)
      ruleMessages.type = `${label} phải có kiểu dữ liệu là ${props.type}.`;

    if (props.min !== undefined)
      ruleMessages.min = `${label} cần tối thiểu ${props.min} ký tự.`;

    if (props.max !== undefined)
      ruleMessages.max = `${label} không được vượt quá ${props.max} ký tự.`;

    if (props.enum)
      ruleMessages.enum = `${label} phải là một trong các giá trị: ${props.enum.join(', ')}.`;

    if (props.regex)
      ruleMessages.regex = `${label} phải đúng với biểu thức quy định.`;

    if (props.hasUpperCase)
      ruleMessages.hasUpperCase = `${label} cần có ít nhất một chữ in hoa.`;

    if (props.hasLowerCase)
      ruleMessages.hasLowerCase = `${label} cần có ít nhất một chữ thường.`;

    if (props.hasNumber)
      ruleMessages.hasNumber = `${label} cần chứa ít nhất một chữ số.`;

    if (props.hasSpecialChar)
      ruleMessages.hasSpecialChar = `${label} cần có ít nhất một ký tự đặc biệt.`;

    if (props.noCheckXSS !== true)
      ruleMessages.noCheckXSS = `${label} không được chứa nội dung HTML hoặc mã nguy hiểm.`;

    if (props.custom)
      ruleMessages.custom = `${label} không đạt kiểm tra tùy chỉnh.`;

    messages[field] = ruleMessages;
  }

  return messages;
}






//Tạo type cho user
export type role = {
    name: string;
    code: string;
    description?: string;
};


const customMessages: CustomMessageRules = {
    name: {
        required: "Name là bắt buộc phải nhập.",
        type: "Name phải có kiểu dữ liệu là date.",
        min: "Name cần tối thiểu 2 ký tự hoặc giá trị.",
        max: "Name không được vượt quá 50 ký tự hoặc giá trị.",
        hasUpperCase: "Name cần có ít nhất một chữ in hoa."
    }
}




export async function getRole(code: string) {
    const sqlQuery = "SELECT * FROM roles WHERE code = ?";
    return await executeQuery(sqlQuery, [code]);
}
export async function getRoles() {
    const Sqlstring = "Select * from roles";
    const data = await executeQuery(Sqlstring);
    return data;

}


// export async function insertRole(role: role): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
//     return await insertObject("roles", role);
// }


export async function insertRole(role: role): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    // dùng validateDataArray để kiểm tra dữ liệu trước khi insert
    const roleRule: RuleSchema = {
        id: {
            type: 'string',
            required: false,
            format: 'uuid'
        },
        name: {
            type: 'string',
            required: true,
            max: 50,
            min: 2,
            noCheckXSS: true
        },
        code: {
            type: 'string',
            required: true,
            max: 50
        },
        description: {
            type: 'string',
            required: false,
            noCheckXSS: false
        },
        createdAt: {
            type: 'string',
            required: false,
            format: 'datetime'
        },
        createdBy: {
            type: 'string',
            required: false,
            max: 100
        }
    }

const customVnMessages:CustomMessageRules = autoGenVietnameseMessageRulesSmart(roleRule)

    const { status, results } = validateDataArray([role], roleRule, customVnMessages);
    if (status) {
        return await insertObject("roles", role);
    }
    return { data: null, status: status, errorCode: { dataFail: results } };
}


export async function updateRole(rolesId: string, role: role): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const roleRule: RuleSchema = {
        id: {
            type: 'string',
            required: true,
            format: 'uuid'
        },
        name: {
            type: 'string',
            required: false,
            max: 50,
            noCheckXSS: true
        },
        code: {
            type: 'string',
            required: false,
            max: 50
        },
        description: {
            type: 'string',
            required: false,
        },
        createdAt: {
            type: 'string',
            required: false,
            format: 'date'
        },
        createdBy: {
            type: 'string',
            required: false,
            max: 100
        }
    }

    const { status, results } = validateDataArray([role], roleRule);
    if (status) {
        const columKey = { id: rolesId }; // Use userId as the columKey
        return await updateObject("roles", role, columKey);
    }
    return { data: null, status: status, errorCode: { dataFail: results } };

}


export async function deleteRole(rolesId: string | number): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await deleteObject("roles", { id: rolesId });
}


export async function insertRoles(roles: Array<role>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await insertObjects("roles", roles);
}


export async function updateRoles(roles: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await updateObjects("roles", roles, ["id"]);
}

export async function deleteRoles(roles: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await deleteObjects("roles", roles);
}
