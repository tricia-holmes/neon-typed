import { useState } from "react";

type InputProps = {
  className: string;
};

export default function Input({ className }: InputProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <form>
      <input className={className}></input>
    </form>
  );
}
