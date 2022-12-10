import { useState, KeyboardEvent, ChangeEvent } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Promopt from "./components/Prompt/Prompt";
import Input from "./components/Input/Input";

function App() {
  const [text, setText] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
    console.log(text);
  };


  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Space") {
      setText('');
      console.log("text", text);
      console.log("input", e.currentTarget.value);
    }
  };


  return (
    <div className="App">
      <Promopt words="I am just going to add a bunch of words and see what happens" />
      <Input
        className="game__input"
        onChange={handleChange}
        onKeyDown={handleInput}
        value={text}
      />
      <Button className="game__btn" content="See the top scores!" />
    </div>
  );
}

export default App;
