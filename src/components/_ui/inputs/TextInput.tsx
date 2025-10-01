import React from "react";

interface TextInputProps {
  id: string;
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  type = "text",
  label,
  placeholder = "",
  value,
  onChange,
  style,
  className,
}) => {
  return (
    <div className={`space-y-2 text-black ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block font-medium text-inherit select-none"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={style}
        className={`w-full px-3 py-[0.8rem] text-base rounded-xl border border-neutral-400 focus:outline-none `}
      />
    </div>
  );
};

export default TextInput;
