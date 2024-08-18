import useMeterialDrop from "@/hooks/useMaterialDrop";
import React from "react";
import { CommonComponentProps } from "@/types";

const Container: React.FC<CommonComponentProps> = ({ children, id }) => {
  const { drop, canDrop } = useMeterialDrop({
    accept: ["Button", "Container"],
    id,
  });
  return (
    <div
      ref={drop}
      className={`min-h-[100px] p-[20px] ${
        canDrop ? "border-[2px] border-[blue]" : "border-[1px] border-[#000]"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
