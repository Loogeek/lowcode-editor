import { create } from "zustand";
import Container from "@/components/Materail/Container";
import Button from "@/components/Materail/Button";
import Page from "@/components/Materail/Page";

interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  component: any;
}

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Actions {
  registerComponents: (name: string, component: any) => void;
}

export const useComponentConfig = create<State & Actions>((set) => ({
  componentConfig: {
    Container: {
      name: "Container",
      defaultProps: {},
      desc: "容器",
      component: Container,
    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        test: "按钮",
      },
      desc: "按钮",
      component: Button,
    },
    Page: {
      name: "Page",
      defaultProps: {},
      desc: "页面",
      component: Page,
    },
  },
  registerComponents: (name, component) =>
    set((state) => {
      return {
        ...state.componentConfig,
        componentConfig: {
          ...state.componentConfig,
          [name]: component,
        },
      };
    }),
}));
