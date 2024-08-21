import { useComponentsStore } from "@/stores/components";
import { Space, Button } from "antd";
import React from "react";

const Header: React.FC = () => {
  const { mode, setMode, setCurComponentId } = useComponentsStore();
  return (
    <header className="h-[60px] flex items-center border-b-[1px] border-[#000]">
      <div className="h-[50px] w-full flex justify-between items-center px-[20px]">
        <h1 className="text-2xl font-bold">Lowcode Editor</h1>
        <Space>
          {mode === "edit" && (
            <Button
              onClick={() => {
                setMode("preview");
                setCurComponentId(null);
              }}
              type="primary"
            >
              预览
            </Button>
          )}
          {mode === "preview" && (
            <Button
              onClick={() => {
                setMode("edit");
              }}
              type="primary"
            >
              退出预览
            </Button>
          )}
        </Space>
      </div>
    </header>
  );
};

export default Header;
