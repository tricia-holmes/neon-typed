import { KeyboardEvent, ChangeEvent, forwardRef } from "react";
import "./Input.css";

type InputProps = {
  className: string;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  disabled: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => (
    <div>
      <input
        ref={ref}
        type="text"
        name="text"
        className={props.className}
        onKeyDown={props.onKeyDown}
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
      />
    </div>
  )
);

// export default function Input({
//   {className,
//   onKeyDown,
//   onChange,
//   value},
//   ref
// }: InputProps) {
//   return (
//     <div>
//       <input
//         ref={ref}
//         type="text"
//         name="text"
//         className={className}
//         onKeyDown={onKeyDown}
//         onChange={onChange}
//         value={value}
//       ></input>
//     </div>
//   );
// }
