import { useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Promopt from "./components/Prompt/Prompt";
import Input from "./components/Input/Input";

function App() {
  return (
    <div className="App">
      <Promopt words="I am just going to add a bunch of words and see what happens" />
      <Input className="game__input" />
      <Button className="game__btn" content="See the top scores!" />
    </div>
  );
}

export default App;
