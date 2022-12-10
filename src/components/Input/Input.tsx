import { useState, KeyboardEvent } from "react";

type InputProps = {
  className: string;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  value: string;
};

export default function Input({ className, onKeyDown }: InputProps) {
  return (
    <div>
      <input type="text" name="text" className={className} onKeyDown={onKeyDown}></input>
    </div>
  );
}
