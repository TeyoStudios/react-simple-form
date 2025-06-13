import {
  InputTextProps,
  SelectOpt,
  SelectorProps,
  TextAreaCustomProps,
  RSF_FormInputProps,
  RSF_InputTypes,
} from "./types/RSF_InputTypes";

const RSF_Input = ({
  name,
  formData,
  inputClass = null,
  type,
  options = [],
}: RSF_FormInputProps) => {
  const value = formData.values[name] ?? "";
  const handlerChange = formData.onChange;
  const error = formData.errors[name] ?? null;

  
  // Obtener label desde el formData
  const data = formData.getData?.(name);
  
  console.log(data);
  
  const label = data?.getLabel?.() ?? "";
  const placeholder = data?.getPlaceholder?.() ?? "";
  // const type = data?.inputType ?? RSF_InputTypes.TEXT; 
  
  const inputProps = {
    name,
    value: typeof value === "string" || typeof value === "number" ? value : "",
    onChange: handlerChange,
    label,
    placeholder,
    inputClass: inputClass || "",
    error,
    type,
  };

  const components: Record<string, React.JSX.Element> = {
    [RSF_InputTypes.TEXT]: <InputText {...inputProps} />,
    [RSF_InputTypes.NUMBER]: <InputText {...inputProps} type="number" />,
    [RSF_InputTypes.PASSWORD]: <InputText {...inputProps} type="password" />,
    [RSF_InputTypes.DATE]: <InputText {...inputProps} type="date" />,
    [RSF_InputTypes.TIME]: <InputText {...inputProps} type="time" />,
    [RSF_InputTypes.SELECTOR]: (
      <Selector
        {...inputProps}
        options={options || []}
        placeholder={label}
      />
    ),
    [RSF_InputTypes.TEXTAREA]: <TextAreaCustom {...inputProps} />,
  };

  return <div className="flex flex-col mb-2">{components[type]}</div>;
};

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
}: InputTextProps) => {
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
  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="uppercase text-xs font-semibold ml-2 tracking-widest"
        >
          {label}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`bg-white h-8 ${inputClass}`}
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
  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="uppercase text-xs font-semibold ml-2 tracking-widest"
        >
          {label}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={`border border-[#363636] ${inputClass}`}
        {...rest}
      ></textarea>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default RSF_Input;