import { create } from "zustand";
import Container from "@/components/MaterailWrapper/Materail/Container";
import Button from "@/components/MaterailWrapper/Materail/Button";
import Page from "@/components/MaterailWrapper/Materail/Page";

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
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
        text: "按钮",
      },
      desc: "按钮",
      setter: [
        {
          name: "type",
          label: "按钮类型",
          type: "select",
          options: [
            { label: "主按钮", value: "primary" },
            { label: "次按钮", value: "default" },
          ],
        },
        {
          name: "text",
          label: "文本",
          type: "input",
        },
      ],
      stylesSetter: [
        {
          name: "width",
          label: "宽度",
          type: "inputNumber",
        },
        {
          name: "height",
          label: "高度",
          type: "inputNumber",
        },
      ],
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
