import { Allotment } from "allotment";
import Header from "@/components/Header";

import "allotment/dist/style.css";
import "./App.css";
import { EditArea } from "./components/EditArea";
import MaterailWrapper from "./components/MaterailWrapper";
import Setting from "./components/Setting";

export default function LowcodeEditor() {
  return (
    <div className="h-lvh flex flex-col">
      <Header />
      <Allotment>
        <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
          <MaterailWrapper />
        </Allotment.Pane>
        <Allotment.Pane>
          <EditArea />
        </Allotment.Pane>
        <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
          <Setting />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
