import React from "react";
import { CommonComponentProps } from "@/types";

const Container: React.FC<CommonComponentProps> = ({ children, styles }) => {
  return (
    <div style={styles} className={`p-[20px]`}>
      {children}
    </div>
  );
};

export default Container;
