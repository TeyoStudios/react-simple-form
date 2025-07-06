import { RSF_FormType } from "./RSF_FormTypes";

/** Tipos posibles del input */
export const RSF_InputTypes = {
  TEXT: "text",
  NUMBER: "number",
  PASSWORD: "password",
  DATE: "date",
  TIME: "time",
  SELECTOR: "selector",
  CHECKBOX: "checkbox",
  TEXTAREA: "textarea",
} as const;

export type InputTypeKeys = typeof RSF_InputTypes[keyof typeof RSF_InputTypes];

/** Opciones para selectores (select) */
export interface SelectOpt {
  id: string;
  value: string | number;
}

/** Props comunes a todos los inputs */
export interface CommonRSFProps {
  name: string;
  formData: RSF_FormType;
  label?: string;
  inputClass?: string | null;
  selectOptions?: SelectOpt[] | null;
  error?: string | null;
}

/** Props para <input /> genérico */
export type InputTextProps = CommonRSFProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    type?: Exclude<InputTypeKeys, "SELECTOR" | "TEXTAREA">;
  };

/** Props para <select> */
export type SelectorProps = CommonRSFProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    type: "selector";
    placeholder?: string;
    placeholderPlus?: boolean;
    selectedrest?: string[] | null;
    options?: SelectOpt[] | null;
  };

/** Props para <textarea> */
export type TextAreaCustomProps = CommonRSFProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    type: "textarea";
  };

/** Unión final para el componente RSF_Input */
export type RSF_FormInputProps =
  | InputTextProps
  | SelectorProps
  | TextAreaCustomProps;
