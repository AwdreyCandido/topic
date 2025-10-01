import React, { JSX } from "react";

interface BackdropProps {
  children: JSX.Element;
}

const Backdrop: React.FC<BackdropProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-100 flex justify-center items-center backdrop-blur-md bg-black/30">
      {children}
    </div>
  );
};

export default Backdrop;
