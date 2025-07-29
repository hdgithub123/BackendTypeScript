
import {TranslateMessageMap} from './dataType'
export const messagesVi : TranslateMessageMap = {
  required: "{label} là bắt buộc phải nhập.",
  format: "{label} phải đúng định dạng {format}.",
  type: "{label} phải có kiểu dữ liệu là {type}.",
  min: "{label} cần tối thiểu {min} ký tự.",
  max: "{label} không được vượt quá {max} ký tự.",
  enum: "{label} phải là một trong các giá trị: {values}.",
  regex: "{label} phải đúng với biểu thức quy định.",
  hasUpperCase: "{label} cần có ít nhất một chữ in hoa.",
  hasLowerCase: "{label} cần có ít nhất một chữ thường.",
  hasNumber: "{label} cần chứa ít nhất một chữ số.",
  hasSpecialChar: "{label} cần có ít nhất một ký tự đặc biệt.",
  noCheckXSS: "{label} không được chứa nội dung HTML hoặc mã nguy hiểm.",
  custom: "{label} không đạt kiểm tra tùy chỉnh."
};

export const messagesEn :TranslateMessageMap = {
  required: "{label} is required.",
  format: "{label} must match the {format} format.",
  type: "{label} must be of type {type}.",
  min: "{label} must be at least {min} characters long.",
  max: "{label} must not exceed {max} characters.",
  enum: "{label} must be one of the following values: {values}.",
  regex: "{label} must match the required pattern.",
  hasUpperCase: "{label} must contain at least one uppercase letter.",
  hasLowerCase: "{label} must contain at least one lowercase letter.",
  hasNumber: "{label} must include at least one number.",
  hasSpecialChar: "{label} must contain at least one special character.",
  noCheckXSS: "{label} must not include HTML content or malicious code.",
  custom: "{label} failed the custom validation."
};