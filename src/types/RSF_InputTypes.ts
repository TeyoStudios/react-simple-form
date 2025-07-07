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

export interface CommonRSFProps {
  name: string;
  label?: string;
  inputClass?: string | null;
  error?: string | null;
}

/** Props para <input /> genérico */
export type InputProps = CommonRSFProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    type?: Exclude<InputTypeKeys, "SELECTOR" | "TEXTAREA">;
  };

/** Props para <select> */
export type SelectorProps = CommonRSFProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    placeholder?: string;
    placeholderPlus?: boolean;
    selectOptions?: SelectOpt[] | null;
    selectedrest?: string[] | null;
    options?: SelectOpt[] | null;
  };

/** Props para <textarea> */
export type TextAreaCustomProps = CommonRSFProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    type: "textarea";
};


/** Props para <input /> genérico */
export type PreInputProps = InputProps & {
  formData: RSF_FormType;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: InputTypeKeys;
};

/** Props para <select> */
export type PreSelectorProps = SelectorProps & { 
  formData: RSF_FormType;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  type?: InputTypeKeys;
}
   
/** Props para <textarea> */
export type PreTextAreaProps = TextAreaCustomProps & {
  formData: RSF_FormType;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  type?: InputTypeKeys;

};


export type RSF_FormInputProps = 
  | PreInputProps
  | PreSelectorProps
  | PreTextAreaProps;
