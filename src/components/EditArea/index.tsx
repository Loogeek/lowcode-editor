import React, { useState } from "react";
import { Component, useComponentsStore } from "@/stores/components";
import { useComponentConfig } from "@/stores/component-config";
import HoverMask from "../HoverMask";

export function EditArea() {
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfig();
  const [hoverComponentId, setHoverComponentId] = useState<number>();
  const handlerGetComponentId = (e: React.MouseEvent<HTMLDivElement>) => {
    const paths = e.nativeEvent.composedPath();
    for (const path of paths) {
      const { componentId } = (path as HTMLElement).dataset;

      if (componentId) {
        setHoverComponentId(+componentId);
        return;
      }
    }
  };

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
    <div
      id="edit-area"
      className="h-full"
      onMouseMove={handlerGetComponentId}
      onMouseLeave={() => setHoverComponentId(undefined)}
    >
      {renderComponentConfig(components)}
      {hoverComponentId && (
        <HoverMask
          portalWrapperClassName="portal-wrapper"
          componentId={hoverComponentId}
          containerClassName="edit-area"
        />
      )}
      <div className="portal-wrapper"></div>
    </div>
  );
}
