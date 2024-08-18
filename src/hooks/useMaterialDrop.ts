import { useComponentConfig } from "@/stores/component-config";
import { useComponentsStore } from "@/stores/components";
import { useDrop } from "react-dnd";

interface useMeterialDropProps {
  id: number;
  accept: string[];
}

function useMeterialDrop({ id, accept }: useMeterialDropProps) {
  const { componentConfig } = useComponentConfig();
  const { addComponent } = useComponentsStore();
  const [{ canDrop }, drop] = useDrop(() => ({
    accept,
    drop: (item: { type: string }, monitor) => {
      const props = componentConfig[item.type].defaultProps;
      const didDrop = monitor.didDrop();
      if (didDrop) return;

      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          props,
        },
        id
      );
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  return { canDrop, drop };
}

export default useMeterialDrop;
