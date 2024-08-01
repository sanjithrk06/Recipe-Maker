import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/Sidebar";
import Builder from "./components/Builder";
import FieldSettings from "./components/FieldSettings";
import { useState } from "react";
import BuilderTray from "./components/BuilderTray";

const Layout = ({ type, handleTypeChange }) => {
  const [saveClicked, setSaveClicked] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex max-md:flex-col h-screen bg-slate-100">
        <Sidebar type={type} />
        {type === "ingredients" ? (
          <BuilderTray type={type} saveClicked={saveClicked} setSaveClicked={setSaveClicked} />
        ) : (
          <Builder type={type} setSaveClicked={setSaveClicked} />
        )}
        <FieldSettings
          type={type}
          onTypeChange={handleTypeChange}
          saveClicked={saveClicked}
        />
      </div>
    </DndProvider>
  );
};

export default Layout;
