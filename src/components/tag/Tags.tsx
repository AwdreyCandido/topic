import React, { JSX } from "react";

const Tag: React.FC<{
  title: string;
  icon?: JSX.Element;
  onClick?: () => void;
}> = function (props) {
  return (
    <p
      onClick={props.onClick}
      className="h-[2.2rem] w-fit flex items-center justify-center px-6 gap-[0.5rem] text-primary font-medium hover:bg-primary-light duration-300 rounded-xl text-base md:text-quaternary-h border border-primary-light"
    >
      {/* {props.icon && <div>{props.icon}</div>} */}
      <p className="leading-none w-max text-[1.2rem]">{props.title}</p>
    </p>
  );
};

export default Tag;
