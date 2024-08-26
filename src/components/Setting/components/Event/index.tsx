import { Collapse, Input, Select, CollapseProps } from "antd";
import { useComponentsStore } from "@/stores/components";
import { useComponentConfig } from "@/stores/component-config";

export function ComponentEvent() {
  const { curComponent, curComponentId, updateComponentProps } =
    useComponentsStore();
  const { componentConfig } = useComponentConfig();

  if (!curComponent) return null;

  const selectAction = (eventName: string, value: string) => {
    if (!curComponentId) return;

    updateComponentProps(curComponentId, { [eventName]: { type: value } });
  };

  const items: CollapseProps["items"] = (
    componentConfig[curComponent.name].events || []
  ).map((event) => {
    return {
      key: event.name,
      label: event.label,
      children: (
        <div>
          <div className="flex items-center">
            <div>动作：</div>
            <Select
              className="w-[160px]"
              options={[
                { label: "显示提示", value: "showMessage" },
                { label: "跳转链接", value: "goToLink" },
              ]}
              onChange={(value) => {
                selectAction(event.name, value);
              }}
              value={curComponent?.props?.[event.name]?.type}
            />
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="px-[10px]">
      <Collapse className="mb-[10px]" items={items} />
    </div>
  );
}
