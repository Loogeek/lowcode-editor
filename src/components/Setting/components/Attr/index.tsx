import {
  ComponentConfig,
  ComponentSetter,
  useComponentConfig,
} from "@/stores/component-config";
import { useComponentsStore } from "@/stores/components";
import { Form, Input, Select } from "antd";
import { useEffect } from "react";

function SettingComponentAttr() {
  const [form] = Form.useForm();
  const { curComponentId, curComponent, updateComponentProps } =
    useComponentsStore();
  const { componentConfig } = useComponentConfig();

  useEffect(() => {
    const data = form.getFieldsValue();
    form.setFieldsValue({
      ...data,
      ...curComponent?.props,
    });
  }, [curComponent, form]);

  if (!curComponent || !curComponentId) return null;

  const handleValueChange = (value: ComponentConfig) => {
    if (curComponentId) {
      updateComponentProps(curComponentId, value);
    }
  };

  function renderFormElement(setting: ComponentSetter) {
    const { type, options } = setting;

    switch (type) {
      case "select":
        return <Select options={options} />;
      case "input":
        return <Input />;
      default:
        return null;
    }
  }
  return (
    <Form
      form={form}
      onValuesChange={handleValueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item label="组件id">
        <Input value={curComponent.id} disabled />
      </Form.Item>
      <Form.Item label="组件名称">
        <Input value={curComponent.name} disabled />
      </Form.Item>
      <Form.Item label="组件描述">
        <Input value={curComponent.desc} disabled />
      </Form.Item>
      {componentConfig[curComponent.name]?.setter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElement(setter)}
        </Form.Item>
      ))}
    </Form>
  );
}

export default SettingComponentAttr;
