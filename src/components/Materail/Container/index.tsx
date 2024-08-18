import React, { PropsWithChildren } from "react";

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="border-[1px] border-[#000] p-[20px] min-h-[100px]">
      {children}
    </div>
  );
};

export default Container;
