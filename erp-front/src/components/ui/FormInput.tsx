import React from "react";
import { FormInputProps } from "../../types/typesUI";

const FormInput = React.forwardRef<
  HTMLInputElement | HTMLSelectElement,
  FormInputProps
>(({ label, type, name, error, options, ...rest }, ref) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {type === "select" ? (
        <select
          name={name}
          ref={ref as React.Ref<HTMLSelectElement>}
          className={`block w-full p-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded`}
          {...rest}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          ref={ref as React.Ref<HTMLInputElement>}
          className={`block w-full p-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded`}
          {...rest}
        />
      )}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
});

FormInput.displayName = "FormInput";

export default FormInput;
