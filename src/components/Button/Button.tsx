import { MouseEvent } from "react";
import "./Button.css";

type ButtonProps = {
  content: string;
  className: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
};

export default function Button({ content, className, onClick, disabled }: ButtonProps) {
  return (
    <>
      <button className={className} onClick={onClick} disabled={disabled}>{content}</button>
    </>
  );
}
