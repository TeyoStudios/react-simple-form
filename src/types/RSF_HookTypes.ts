import { RSF_FormDataTypes } from "./RSF_FormDataTypes";

export type FormValue = string | number | boolean | Date | null;

export type FormValues = Record<string, FormValue>;
export type FormErrors = Record<string, string | null>;

export type ValidatorFn = (value: FormValue) => string | null;

export interface UseFormValidatorReturn {
  values: FormValues;
  errors: FormErrors;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  setOptions: (opts: object) => UseFormValidatorReturn;
  setCallback: (
    cb: (values: FormValues, errors: FormErrors) => void
  ) => UseFormValidatorReturn;
}



export interface BaseField<T> {
  default: T;
  type: RSF_FormDataTypes;
  min?: number;
  max?: number;
  validators?: ((value: T) => string | null)[];
}

export type FieldConfig<T> = {
  [K in keyof T]: BaseField<T[K]>;
};

