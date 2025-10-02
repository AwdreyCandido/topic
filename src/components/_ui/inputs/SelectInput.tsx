import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  className?: string;
  style?: React.CSSProperties;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  className
}) => {
  return (
    <div className={`space-y-2 text-black ${className}`}>
      <label htmlFor={id} className="block font-medium text-inherit">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-2 py-[0.8rem] text-base font-normal rounded-xl border border-neutral-400 focus:outline-none"
      >
        <option value="" disabled className="text-black">
          Selecione uma opção
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-black">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
