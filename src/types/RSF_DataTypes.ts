import { RSF_FormDataTypes } from "./RSF_FormDataTypes";
import { FormValue } from "./RSF_HookTypes";
import { SelectOpt } from "./RSF_InputTypes";

export interface RSF_DataType {
  name: string;
  inputType: string;
  selectOptions: SelectOpt[] | null;

  // Métodos de acceso
  getDefaultValue: () => FormValue;
  getLabel: () => string | undefined;
  getPlaceholder: () => string | undefined;
  getSelectOptions: () => SelectOpt[] | null;

  // Encadenadores
  setDefault: (value: FormValue) => RSF_DataType;
  setLabel: (_label: string) => RSF_DataType;
  setPlaceholder: (_placeholder: string) => RSF_DataType;
  setSelectOptions: (_options: SelectOpt[] | null) => RSF_DataType;

  required: (message: string) => RSF_DataType;
  min: (limit: number, message: string) => RSF_DataType;
  max: (limit: number, message: string) => RSF_DataType;
  email: (message: string) => RSF_DataType;
  regex: (pattern: RegExp, message: string) => RSF_DataType;
  length: (len: number, message: string) => RSF_DataType;

  // Validación directa
  validate: (value: FormValue) => string | null;
}

export interface RSF_DataPropsType {
  name: string;
  type: RSF_FormDataTypes;
}
