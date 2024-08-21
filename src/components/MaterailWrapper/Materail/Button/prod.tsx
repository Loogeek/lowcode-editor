import React from "react";
import { Button as AntdButton } from "antd";
import { CommonComponentProps } from "@/types";

const Button: React.FC<CommonComponentProps> = ({
  onClick,
  type,
  text,
  className = "",
  styles,
}) => {
  return (
    <AntdButton
      type={type}
      onClick={onClick}
      style={styles}
      className={` ${className}`}
    >
      {text}
    </AntdButton>
  );
};

export default Button;
