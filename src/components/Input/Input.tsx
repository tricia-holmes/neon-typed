import { KeyboardEvent, ChangeEvent} from "react";
import "./Input.css";

type InputProps = {
  className: string;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export function Input({className, onChange, onKeyDown, value}: InputProps) {
  return (
    <div>
      <input
        type="text"
        name="text"
        className={className}
        onKeyDown={onKeyDown}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
