import { useMemo } from "react";
import { useComponentConfig } from "@/stores/component-config";
import MaterialItem from "./MaterialItem";

export default function Material() {
  const { componentConfig } = useComponentConfig();

  const components = useMemo(() => {
    return Object.values(componentConfig).filter(
      (item) => item.name !== "Page"
    );
  }, [componentConfig]);

  return (
    <div>
      {components.map((item, index) => {
        return (
          <MaterialItem
            name={item.name}
            desc={item.desc}
            key={item.name + index}
          />
        );
      })}
    </div>
  );
}
