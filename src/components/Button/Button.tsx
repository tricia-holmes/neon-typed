import { MouseEvent } from "react";
import "./Button.css";

type ButtonProps = {
  content: string;
  className: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ content, className, onClick }: ButtonProps) {
  return (
    <>
      <button className={className} onClick={onClick}>{content}</button>
    </>
  );
}
