import { CommonComponentProps } from "@/types";
import useMeterialDrop from "@/hooks/useMaterialDrop";

function Page({ children, id, styles }: CommonComponentProps) {
  const { drop, canDrop } = useMeterialDrop({
    accept: ["Button", "Container"],
    id,
  });

  return (
    <div
      data-component-id={id}
      style={styles}
      ref={drop}
      className={`p-[20px] h-[100%] box-border ${
        canDrop ? "border-[2px] border-[blue]" : "border-[1px] border-[#000]"
      }`}
    >
      {children}
    </div>
  );
}

export default Page;
