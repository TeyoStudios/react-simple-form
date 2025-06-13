import { RSF_DataPropsType, RSF_DataType } from "./types/RSF_DataTypes";
import { RSF_FormDataTypes } from "./types/RSF_FormDataTypes";
import { FormValue, ValidatorFn } from "./types/RSF_HookTypes";
import { InputTextProps, InputTypeKeys, RSF_InputTypes, SelectOpt } from "./types/RSF_InputTypes";

const InputTypeEquivalents: Record<RSF_FormDataTypes, string> = {
  [RSF_FormDataTypes.STRING]: RSF_InputTypes.TEXT,
  [RSF_FormDataTypes.NUMBER]: RSF_InputTypes.TEXT,
  [RSF_FormDataTypes.PASSWORD]: RSF_InputTypes.PASSWORD,
  [RSF_FormDataTypes.EMAIL]: RSF_InputTypes.TEXT,
  [RSF_FormDataTypes.DATE]: RSF_InputTypes.DATE,
  [RSF_FormDataTypes.CHECKBOX]: RSF_InputTypes.CHECKBOX,
  [RSF_FormDataTypes.BOOLEAN]: RSF_InputTypes.CHECKBOX,
};

export const RSF_Data = ({name, type}: RSF_DataPropsType): RSF_DataType => { 
  const validators: ValidatorFn[] = [];
  let defaultValue: FormValue = "";
  let label: string|undefined = undefined;
  let placeholder: string|undefined = undefined;
  let inputType: string = InputTypeEquivalents[type] ?? RSF_InputTypes.TEXT;
  let selectOptions: SelectOpt[] | null = null;
  let isRequired = false;

  const api: RSF_DataType = {
    name,
    inputType,
    selectOptions, // ⬅️ AÑADE ESTA LÍNEA

    getDefaultValue: () => defaultValue,
    getLabel: () => label,
    getPlaceholder: () => placeholder,
    getSelectOptions: () => selectOptions,

    setDefault: (value: FormValue) => {
      defaultValue = value;
      return api;
    },
    setLabel: (_label: string) => {
      label = _label;
      return api;
    },
    setPlaceholder: (_placeholder: string) => {
      placeholder = _placeholder;
      return api;
    },
    setSelectOptions: (_options: SelectOpt[] | null) => {
      selectOptions = _options;
      return api;
    },

    // VALIDATORS
    required: (message: string) => {
      isRequired = true;
      validators.push((value: FormValue) => {
        if (
          value === undefined ||
          value === null ||
          (typeof value === "string" && value.trim() === "")
        ) {
          return message;
        }
        return null;
      });
      return api;
    },
    min: (limit: number, message: string) => { 
      validators.push((value: FormValue) => {
        if (value === undefined || value === null) return null;

        if (type === RSF_FormDataTypes.NUMBER) {
          if (typeof value !== "number" || value < limit) return message;
        } else if (
          type === RSF_FormDataTypes.STRING ||
          type === RSF_FormDataTypes.PASSWORD ||
          type === RSF_FormDataTypes.EMAIL
        ) {
          if (typeof value === "string" && (value === "" || value.trim() === "")) return null; 

          if (typeof value === "string" && value.length < limit) return message;
        }
        return null;
      });
      return api;
    },
    max: (limit: number, message: string) => {
      validators.push((value: FormValue) => {
        if (value === undefined || value === null) return null;

        if (type === RSF_FormDataTypes.NUMBER) {
          if (typeof value !== "number" || value > limit) return message;
        } else if (
          type === RSF_FormDataTypes.STRING ||
          type === RSF_FormDataTypes.PASSWORD ||
          type === RSF_FormDataTypes.EMAIL
        ) {
          if (typeof value === "string" && value.length > limit) return message;
        }
        return null;
      });
      return api;
    },
    email: (message: string) => { 
      validators.push((value: FormValue) => {
        if (value === undefined || value === null) return null;
        if (type !== RSF_FormDataTypes.EMAIL) return null;
        if (typeof value !== "string") return message;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return message;

        return null;
      });
      return api;
    },
    regex: (pattern: RegExp, message: string) => {
      validators.push((value: FormValue) => {
        if (value === undefined || value === null) return null;
        if (typeof value !== "string") return message;

        if (!pattern.test(value)) return message;

        return null;
      });
      return api;
    },
    length: (len: number, message: string) => {
      validators.push((value: FormValue) => {
        if (value === undefined || value === null) return null;
        if (typeof value !== "string") return message;

        if (value.length !== len) return message;

        return null;
      });
      return api;
    },

    validate: (value: FormValue): string | null => {
      for (const validator of validators) {
        const error = validator(value);
        if (error !== null) return error;
      }
      return null;
    },
  };

  return api;
};