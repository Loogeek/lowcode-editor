import React, { useState } from "react";
import { Component, useComponentsStore } from "@/stores/components";
import { useComponentConfig } from "@/stores/component-config";
import HoverMask from "../HoverMask";
import SelectedMask from "../SelectedMask";

export function EditArea() {
  const { components, curComponentId, setCurComponentId } =
    useComponentsStore();
  const { componentConfig } = useComponentConfig();
  const [hoverComponentId, setHoverComponentId] = useState<number>();
  const handlerHoverComponent = (e: React.MouseEvent<HTMLDivElement>) => {
    const paths = e.nativeEvent.composedPath();
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i] as HTMLElement;
      if (path.dataset) {
        const { componentId } = (path as HTMLElement).dataset;

        if (componentId) {
          setHoverComponentId(+componentId);
          return;
        }
      }
    }
  };

  const handlerClickComponent = (e: React.MouseEvent<HTMLDivElement>) => {
    const paths = e.nativeEvent.composedPath();
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i] as HTMLElement;
      if (path.dataset) {
        const { componentId } = (path as HTMLElement).dataset;

        if (componentId) {
          setCurComponentId(+componentId);
          return;
        }
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
          styles: component.styles,
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
      onMouseMove={handlerHoverComponent}
      onMouseLeave={() => setHoverComponentId(undefined)}
      onClick={handlerClickComponent}
    >
      {renderComponentConfig(components)}
      {hoverComponentId && hoverComponentId !== curComponentId && (
        <HoverMask
          portalWrapperClassName="portal-wrapper"
          componentId={hoverComponentId}
          containerClassName="edit-area"
        />
      )}
      {curComponentId && (
        <SelectedMask
          portalWrapperClassName="portal-wrapper"
          componentId={curComponentId}
          containerClassName="edit-area"
        />
      )}
      <div className="portal-wrapper"></div>
    </div>
  );
}
