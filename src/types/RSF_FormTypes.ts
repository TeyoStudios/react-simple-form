import { RSF_DataType } from "./RSF_DataTypes";
import {
  FormValues,
  FormErrors,
} from "./RSF_HookTypes";

export interface RSF_FormType {
  values: FormValues;
  errors: FormErrors;

  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;

  validate: () => string | null;

  getData: (name: string) => RSF_DataType | null;

  setCallback: (cb: (values: FormValues) => void) => RSF_FormType;
  setErrorCallback: (cb: (errors: FormErrors) => void) => RSF_FormType;
  setOptions: (opts: object) => RSF_FormType;
}