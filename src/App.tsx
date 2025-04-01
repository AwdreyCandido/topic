import { useState } from "react";
import Home from "./pages/home/Home";
import { CardProvider } from "./data/contexts/CardsContext";

function App() {
  return (
    <CardProvider>
      <Home />
    </CardProvider>
  );
}

export default App;
