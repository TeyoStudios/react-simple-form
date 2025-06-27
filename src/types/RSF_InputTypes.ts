import { RSF_FormType } from "./RSF_FormTypes";

// Tipado del input principal (genérico) que recibe el componente RSF_Input
export interface RSF_FormInputProps extends React.InputHTMLAttributes<HTMLElement> {
  name: string;                       // Clave del campo en el formulario
  formData: RSF_FormType;            // Formulario completo con values, errors y handlers
  label?: string;                    // Etiqueta opcional
  type?: InputTypeKeys | "text";
  inputClass?: string | null;       // Clase opcional para estilos
  selectOptions?: SelectOpt[] | null;     // Solo para selectores
  onChange?: (e: React.ChangeEvent<HTMLElement>) => void;
}

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

// Props del input clásico tipo <input />
export interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  value: string | number | readonly string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  type?: string;
  placeholder?: string;
  inputClass?: string | null;
  min?: string | number;
  max?: string | number;
  error?: string | null;
}

// Opciones para selectores (select)
export interface SelectOpt {
  id: string;
  value: string | number;
}

// Props específicos para el selector
export interface SelectorProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name?: string;
  value: string | number;
  label?: string;
  options?: SelectOpt[] | null;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  placeholderPlus?: boolean;
  inputClass?: string | null;
  selectedrest?: string[] | null;
  error?: string | null;
}

// Props para <textarea>
export interface TextAreaCustomProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  label?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inputClass?: string | null;
  error?: string | null;
}
