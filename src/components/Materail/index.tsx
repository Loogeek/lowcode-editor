import { useMemo } from "react";
import { useComponentConfig } from "@/stores/component-config";
import MaterialItem from "./MaterialItem";

function Materail() {
  const { componentConfig } = useComponentConfig();
  const components = useMemo(
    () => Object.values(componentConfig).filter((item) => item.name !== "Page"),
    [componentConfig]
  );

  return (
    <div className="materail">
      {components.map((component, index) => (
        <MaterialItem
          name={component.name}
          desc={component.desc}
          key={component.name + index}
        />
      ))}
    </div>
  );
}

export default Materail;
