import { create } from "zustand";

export interface Component {
  id: number;
  name: string;
  props: any;
  children?: Component[];
  parentId?: number;
}

interface State {
  components: Component[];
}

interface Actions {
  addComponent: (component: Component, parentId?: number) => void;
  deleteComponent: (componentId: number) => void;
  updateComponentProps: (componentId: number, props: any) => void;
}

export const useComponentsStore = create<State & Actions>((set, get) => ({
  components: [
    {
      id: 1,
      name: "test",
      props: {},
      children: [],
      desc: "name",
    },
  ],
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
