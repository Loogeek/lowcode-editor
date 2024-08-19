import { useState } from "react";
import { Segmented } from "antd";
import Materail from "./Materail";
import Outline from "./Outline";
import Source from "./Source";

function MaterailWrapper() {
  const [key, setKey] = useState<string>("物料");

  return (
    <div className="materail">
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={["物料", "大纲", "源码"]}
      />
      <div className="pt-[20px] h-[calc(100vh-60px-30px-20px)]">
        {key === "物料" && <Materail />}
        {key === "大纲" && <Outline />}
        {key === "源码" && <Source />}
      </div>
    </div>
  );
}

export default MaterailWrapper;
