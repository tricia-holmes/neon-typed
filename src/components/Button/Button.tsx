import "./Button.css";

type ButtonProps = {
  content: string;
  className: string;
};

export default function Button({ content, className }: ButtonProps) {
  return (
    <>
      <button className={className}>{content}</button>
    </>
  );
}
