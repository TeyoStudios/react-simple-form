import { RSF_DataType } from "./types/RSF_DataTypes";
import { RSF_FormType } from "./types/RSF_FormTypes";
import { FormErrors, FormValue, FormValues } from "./types/RSF_HookTypes";

export const RSF_Form = (
  datas: RSF_DataType[],
  values: FormValues,
  setValues: React.Dispatch<React.SetStateAction<FormValues>>,
  errors: FormErrors,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
): RSF_FormType => {

  // Callbacks opcionales
  let successCallback: ((values: FormValues) => void) | null = null;
  let errorCallback: ((errors: FormErrors) => void) | null = null;


  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
      const target = e.target;
      const { name, type, value } = target;
      let newValue: FormValue;

      if (type === "checkbox" && target instanceof HTMLInputElement) {
        newValue = target.checked;
      } else if (type === "number") {
        newValue = Number(value);
      } else {
        newValue = value;
      }

      setValues((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    };

  const validate = (): string | null => {
    const newErrors: FormErrors = {};
    let hasError = false;

    for (const data of datas) {
      const error = data.validate(values[data.name]);
      newErrors[data.name] = error;
      if (error !== null) hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      if (errorCallback) errorCallback(newErrors);
      return "Validation failed";
    } else {
      if (successCallback) successCallback(values);
      return null;
    }
  };

  const setCallback = (cb: (values: FormValues) => void): RSF_FormType => {
    successCallback = cb;
    return api;
  };

  const setErrorCallback = (cb: (errors: FormErrors) => void): RSF_FormType => {
    errorCallback = cb;
    return api;
  };

  const setOptions = (_opts: object): RSF_FormType => {
    // Futuras opciones
    return api;
  };

  const getData = (name: string): RSF_DataType| null => {
    return datas.find((data) => data.name === name) ?? null;
  };

  const api: RSF_FormType = {
    values,
    errors,
    getData,
    onChange,
    validate,
    setCallback,
    setErrorCallback,
    setOptions,
  };

  return api;
};

