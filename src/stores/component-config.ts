import { create } from "zustand";
import ContainerDev from "@/components/MaterailWrapper/Materail/Container/dev";
import ContainerProd from "@/components/MaterailWrapper/Materail/Container/prod";
import ButtonDev from "@/components/MaterailWrapper/Materail/Button/dev";
import ButtonProd from "@/components/MaterailWrapper/Materail/Button/prod";
import PageDev from "@/components/MaterailWrapper/Materail/Page/dev";
import PageProd from "@/components/MaterailWrapper/Materail/Page/prod";

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

export interface ComponentEvent {
  name: string;
  label: string;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  events?: ComponentEvent[];
  dev: any;
  prod: any;
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
      dev: ContainerDev,
      prod: ContainerProd,
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
      events: [
        {
          name: "onClick",
          label: "点击事件",
        },
        {
          name: "onDoubleClick",
          label: "双击事件",
        },
      ],
      dev: ButtonDev,
      prod: ButtonProd,
    },
    Page: {
      name: "Page",
      defaultProps: {},
      desc: "页面",
      dev: PageDev,
      prod: PageProd,
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
