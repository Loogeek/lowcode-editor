import React, { useEffect } from "react";
import { Component, useComponentsStore } from "@/stores/components";
import { useComponentConfig } from "@/stores/component-config";

export function EditArea() {
  const { components, addComponent, deleteComponent, updateComponentProps } =
    useComponentsStore();
  const { componentConfig, registerComponents } = useComponentConfig();

  useEffect(() => {
    addComponent(
      {
        id: 222,
        name: "Container",
        props: {},
        children: [],
      },
      1
    );

    addComponent(
      {
        id: 333,
        name: "Button",
        props: {},
        children: [],
      },
      222
    );

    //   updateComponentProps(222, {
    //     title: "6666",
    //   });

    //   // setTimeout(() => {
    //   //   deleteComponent(333);
    //   // }, 3000);
  }, []);

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
