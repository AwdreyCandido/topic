import { useState } from "react";
import Home from "./pages/home/Home";
import { CardProvider } from "./data/contexts/CardsContext";
import TextEditor from "./components/text-editor/TextEditor";

function App() {
  return (
    <div className="w-[100vw] h-[100vh]">
      <TextEditor/>
    </div>
    // <CardProvider>
    //   <Home />
    // </CardProvider>
  );
}

export default App;
