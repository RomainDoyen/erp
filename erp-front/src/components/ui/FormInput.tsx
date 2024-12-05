type FormInputProps = {
  label: string;
  type: string;
  name: string;
  value?: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  error?: string;
  options?: string[];
};

const FormInput = ({ label, type, name, value, onChange, error, options }: FormInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`block w-full p-2 border ${error ? "border-red-500" : "border-gray-300"} rounded`}
        >
          {options?.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`block w-full p-2 border ${error ? "border-red-500" : "border-gray-300"} rounded`}
        />
      )}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default FormInput;
