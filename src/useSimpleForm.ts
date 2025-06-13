import { useState, useMemo } from "react";
import { RSF_Form } from "./RSF_Form";
import { RSF_DataType } from "./types/RSF_DataTypes";
import { RSF_FormType } from "./types/RSF_FormTypes";
import { FormErrors, FormValues } from "./types/RSF_HookTypes";

export const useSimpleForm = (datas: RSF_DataType[]): RSF_FormType => {
  const initialValues: FormValues = {};
  const initialErrors: FormErrors = {};

  datas.forEach((data) => {
    initialValues[data.name] = data.getDefaultValue() ?? "";
    initialErrors[data.name] = null;
  });

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);

  return useMemo(() => RSF_Form(datas, values, setValues, errors, setErrors), [datas, values, errors]);
};
