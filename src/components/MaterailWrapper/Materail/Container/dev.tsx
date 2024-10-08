import useMeterialDrop from "@/hooks/useMaterialDrop";
import React from "react";
import { CommonComponentProps } from "@/types";

const Container: React.FC<CommonComponentProps> = ({
  children,
  id,
  styles,
}) => {
  const { drop, canDrop } = useMeterialDrop({
    accept: ["Button", "Container"],
    id,
  });
  return (
    <div
      ref={drop}
      style={styles}
      data-component-id={id}
      className={`min-h-[100px] p-[20px] ${
        canDrop ? "border-[2px] border-[blue]" : "border-[1px] border-[#000]"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
