import React from "react";
import { Button as AntdButton } from "antd";
import type { ButtonType } from "antd/es/button";

interface ButtonProps {
  type: ButtonType;
  test: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type,
  test,
  className = "",
}) => {
  return (
    <AntdButton type={type} onClick={onClick} className={` ${className}`}>
      {test}
    </AntdButton>
  );
};

export default Button;
