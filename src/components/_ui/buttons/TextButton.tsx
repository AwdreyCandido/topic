import React from "react";

const TextButton: React.FC<{
  title: string;
  type?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = (props) => {
  const btnStyle = props.type
    ? "flex items-center justify-center gap-4 w-full bg-white py-5 px-8 rounded-xl text-primary hover:text-white text-base hover:bg-primary outline cursor-pointer hover:outline-1 hover:outline-primary hover:text-white duration-200 "
    : "flex items-center justify-center gap-4 w-full bg-primary py-5 px-8 rounded-xl text-white hover: text-base hover:bg-primary-light outline cursor-pointer hover:outline-1 hover:outline-primary hover:text-primary duration-200 ";

  return (
    <button
      onClick={props.onClick}
      className="flex items-center justify-center gap-4 w-full bg-primary py-5 px-8 font-medium rounded-xl text-white hover: text-base hover:bg-primary-light outline cursor-pointer hover:outline-1 hover:outline-primary hover:text-primary duration-200 "
    >
      <div>{props.title}</div>
    </button>
  );
};

export default TextButton;
