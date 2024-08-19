import { useState } from "react";
import { Segmented } from "antd";
import { useComponentsStore } from "@/stores/components";
import ComponentAttr from "./components/Attr";
import ComponentEvent from "./components/Event";
import ComponentStyle from "./components/Style";

function Setting() {
  const { curComponentId } = useComponentsStore();

  const [key, setKey] = useState<string>("属性");

  if (!curComponentId) return null;

  return (
    <div>
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={["属性", "样式", "事件"]}
      />
      <div className="pt-5">
        {key === "属性" && <ComponentAttr />}
        {key === "样式" && <ComponentStyle />}
        {key === "事件" && <ComponentEvent />}
      </div>
    </div>
  );
}

export default Setting;
