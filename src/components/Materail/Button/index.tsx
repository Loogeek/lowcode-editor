import React from "react";
import { Button as AntdButton } from "antd";
import { CommonComponentProps } from "@/types";

const Button: React.FC<CommonComponentProps> = ({
  onClick,
  type,
  test,
  className = "",
  id,
}) => {
  return (
    <AntdButton
      data-component-id={id}
      type={type}
      onClick={onClick}
      className={` ${className}`}
    >
      {test}
    </AntdButton>
  );
};

export default Button;
