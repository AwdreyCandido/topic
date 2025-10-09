import { useState } from "react";
import Home from "./pages/home/Home";
import { CardProvider } from "./data/contexts/CardsContext";
import CardSummary from "./components/card-summary/CardSummary";
import { sampleDeck } from "./data/data";

function App() {
  return (
    <CardProvider>
      {/* <Home /> */}
      <CardSummary selectedCard={sampleDeck[0].flashcards[0]} selectedTopicId={1}/>
    </CardProvider>
  );
}

export default App;
