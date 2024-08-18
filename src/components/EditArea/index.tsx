import React, { useEffect } from "react";
import { Component, useComponentsStore } from "@/stores/components";
import { useComponentConfig } from "@/stores/component-config";

export function EditArea() {
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfig();

  function renderComponentConfig(components: Component[]): React.ReactNode {
    return components.map((component) => {
      const config = componentConfig[component.name];
      if (!config?.component) return null;

      return React.createElement(
        config.component,
        {
          id: component.id,
          key: component.id,
          name: component.name,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponentConfig(component.children || [])
      );
    });
  }

  return (
    <div className="h-full">
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
      {renderComponentConfig(components)}
    </div>
  );
}
