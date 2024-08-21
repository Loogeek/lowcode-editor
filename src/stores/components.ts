import { CSSProperties } from "react";
import { create } from "zustand";

export interface Component {
  id: number;
  name: string;
  props: any;
  desc: string;
  styles?: CSSProperties;
  children?: Component[];
  parentId?: number;
}

interface State {
  components: Component[];
  curComponentId?: number | null;
  curComponent: Component | null;
  mode: "edit" | "preview";
}

interface Actions {
  addComponent: (component: Component, parentId?: number) => void;
  deleteComponent: (componentId: number) => void;
  updateComponentProps: (componentId: number, props: any) => void;
  updateComponentStyles: (
    componentId: number,
    styles: CSSProperties,
    replace?: boolean
  ) => void;
  setCurComponentId: (componentId: number | null) => void;
  setMode: (mode: State["mode"]) => void;
}

export const useComponentsStore = create<State & Actions>((set, get) => ({
  components: [
    {
      id: 1,
      name: "Page",
      props: {},
      desc: "页面",
    },
  ],
  curComponentId: null,
  curComponent: null,
  mode: "edit",
  setMode: (mode) => set({ mode }),
  addComponent: (component, parentId) =>
    set((state) => {
      if (parentId) {
        const parentComponent = getComponentById(parentId, state.components);

        if (parentComponent) {
          parentComponent.children = parentComponent.children || [];
          parentComponent.children.push(component);
        }

        component.parentId = parentId;

        return { components: [...state.components] };
      }

      return { components: [...state.components, component] };
    }),
  deleteComponent: (componentId) => {
    if (!componentId) return;
    const component = getComponentById(componentId, get().components);

    if (component?.parentId) {
      const parentComponent = getComponentById(
        component.parentId,
        get().components
      );

      if (parentComponent && parentComponent.children) {
        parentComponent.children = parentComponent.children.filter(
          (c) => c.id !== componentId
        );

        set({
          components: [...get().components],
        });
      }
    }
  },
  updateComponentProps: (componentId, props) => {
    if (!componentId) return;
    const stateComponents = get().components;
    const component = getComponentById(componentId, stateComponents);

    if (component) {
      component.props = { ...component.props, ...props };

      // return { components: [...stateComponents, component] };
    }

    set({ components: [...stateComponents] });
  },
  updateComponentStyles: (componentId, styles, replace) =>
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.styles = replace
          ? { ...styles }
          : { ...component.styles, ...styles };

        return { components: [...state.components] };
      }

      return { components: [...state.components] };
    }),
  setCurComponentId: (componentId) =>
    set((state) => ({
      curComponentId: componentId,
      curComponent: getComponentById(componentId, state.components),
    })),
}));

export function getComponentById(
  id: number | null,
  components: Component[]
): Component | null {
  if (!id) return null;

  for (const component of components) {
    if (id === component.id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }

  return null;
}
