import {
  InputProps,
  SelectOpt,
  SelectorProps,
  TextAreaCustomProps,
  RSF_FormInputProps,
  RSF_InputTypes,
  PreInputProps,
  PreSelectorProps,
  PreTextAreaProps,
} from "./types/RSF_InputTypes";

const RSF_Input = (props: RSF_FormInputProps) => {
  let component = null;

  switch (props.type) {
    case RSF_InputTypes.SELECTOR:
      const selectProps = props as PreSelectorProps;
      component = getSelector(selectProps);
      break;
    case RSF_InputTypes.TEXTAREA:
      const textAreaProps = props as PreTextAreaProps;
      component = getTextArea(textAreaProps);
      break;
    case RSF_InputTypes.TEXT:
    case RSF_InputTypes.NUMBER:
    case RSF_InputTypes.PASSWORD:
    case RSF_InputTypes.DATE:
    case RSF_InputTypes.TIME:
    default:
      const inputProps = props as PreInputProps;
      component = getInput(inputProps);
  }
  
  return <div className="flex flex-col mb-2 flex-1">{component}</div>;
};

function createOnChangeHandler<E extends HTMLElement>(
  handlerChange: (e: React.ChangeEvent<E>) => void,
  onChange?: React.ChangeEventHandler<E>
): React.ChangeEventHandler<E> {
  return (e) => {
    handlerChange(e);
    onChange?.(e);
  };
}

const getInput = ({name,
  formData,
  inputClass = null,
  type,
  onChange,
  ...props}: PreInputProps) => {

  const value = formData.values[name] ?? "";
  const handlerChange = formData.onChange;
  const error = formData.errors[name] ?? null;
  
  // Obtener label desde el formData
  const data = formData.getData?.(name);
  const label = data?.getLabel?.() ?? "";
  const placeholder = data?.getPlaceholder?.() ?? "";

  const inputProps = {
    name,
    value: typeof value === "string" || typeof value === "number" ? value : "",
    onChange: createOnChangeHandler<HTMLInputElement>(handlerChange, onChange),
    label,
    placeholder,
    inputClass: inputClass || "",
    error,
    type: type ?? RSF_InputTypes.TEXT,
    ...props
  };

  return <InputText {...inputProps} />;
}

const getSelector = ({name,
  formData,
  inputClass = null,
  onChange,
  ...props}: PreSelectorProps) => {

  const value = formData.values[name] ?? "";
  const handlerChange = formData.onChange;
  const error = formData.errors[name] ?? null;
  
  const data = formData.getData?.(name);
  const selectOptions = data?.getSelectOptions?.() ?? [];
    
  const label = data?.getLabel?.() ?? "";
  const placeholder = data?.getPlaceholder?.() ?? "";

  const selectProps = {
    name,
    value: typeof value === "string" || typeof value === "number" ? value : "",
    onChange: createOnChangeHandler<HTMLSelectElement>(handlerChange, onChange),
    label,
    placeholder,
    inputClass: inputClass || "",
    error,
    type: RSF_InputTypes.SELECTOR,
    selectOptions,
    ...props
  };

  const component = <Selector {...selectProps} />

  return component; 
}

const getTextArea = ({name,
  formData,
  inputClass = null,
  onChange,
  ...props}: PreTextAreaProps) => {

  const value = formData.values[name] ?? "";
  const handlerChange = formData.onChange;
  const error = formData.errors[name] ?? null;
  
  const data = formData.getData?.(name);
  const label = data?.getLabel?.() ?? "";
  const placeholder = data?.getPlaceholder?.() ?? "";

  const inputProps = {
    name,
    value: typeof value === "string" || typeof value === "number" ? value : "",
    onChange: createOnChangeHandler<HTMLTextAreaElement>(handlerChange, onChange),
    label,
    placeholder,
    inputClass: inputClass || "",
    error,
    ...props
  };

  return <TextAreaCustom {...inputProps} type={RSF_InputTypes.TEXTAREA} />; 
}

const InputText = ({
  value,
  onChange,
  label,
  type = "text",
  placeholder = "",
  inputClass = "p-2",
  min,
  max,
  error,
  name,
  ...rest
}: InputProps) => {

  const inputClassName = `w-full h-10 p-2 rounded-lg border-2 border-gray-300 focus:border-second focus:outline-none ${inputClass}`;

  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="uppercase text-xs font-semibold ml-2 mb-1 tracking-widest"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={inputClassName}
        {...(max !== undefined && { max })}
        {...(min !== undefined && { min })}
        {...rest}
      />
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

const Selector = ({
  value,
  label,
  onChange,
  placeholder,
  placeholderPlus,
  inputClass = "px-4 py-2",
  selectedrest = null,
  options = [],
  error,
  name,
  ...rest
}: SelectorProps) => {

  const inputClassName = `w-full h-10 p-2 rounded-lg border-2 border-gray-300 focus:border-second focus:outline-none ${inputClass}`;

  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="uppercase text-xs font-semibold ml-2 mb-1 tracking-widest"
        >
          {label}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`${inputClassName}`}
        {...rest}
      >
        {(placeholder !== undefined || placeholderPlus !== undefined) && (
          <option value="" disabled={placeholderPlus} hidden={placeholderPlus}>
            {placeholder || placeholderPlus}
          </option>
        )}
        {options?.map((opt: SelectOpt, index: number) => (
          <option
            key={index}
            value={opt.id}
            disabled={!!selectedrest && selectedrest.includes(opt.id)}
          >
            {opt.value}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

const TextAreaCustom = ({
  value,
  onChange,
  inputClass = "",
  error,
  label,
  name,
  ...rest
}: TextAreaCustomProps) => {

  const inputClassName = `w-full h-20 min-h-20 p-2 rounded-lg border-2 border-gray-300 focus:border-second focus:outline-none ${inputClass}`;

  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="uppercase text-xs font-semibold ml-2 mb-1 tracking-widest"
        >
          {label}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={`${inputClassName}`}
        {...rest}
      ></textarea>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default RSF_Input;