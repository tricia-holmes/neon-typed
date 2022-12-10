import "./Prompt.css";

type PromptProps = {
  words: string;
};

export default function Promopt({ words }: PromptProps) {
  return <div className="game__prompt">{words}</div>;
}
