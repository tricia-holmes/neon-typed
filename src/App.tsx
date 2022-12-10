import { useState, KeyboardEvent} from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Promopt from "./components/Prompt/Prompt";
import Input from "./components/Input/Input";

function App() {
  const [text, setText] = useState("");

  const handleChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Space") {
      console.log("YOU DID IT");
    }
    // console.log(event.target.value);
  };

  return (
    <div className="App">
      <Promopt words="I am just going to add a bunch of words and see what happens" />
      <Input className="game__input" onKeyDown={handleChange} value={text} />
      <Button className="game__btn" content="See the top scores!" />
    </div>
  );
}

export default App;
