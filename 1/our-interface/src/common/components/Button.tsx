const Button = ({
  text,
  isMain,
  onClick,
}: {
  text: string;
  isMain: boolean;
  onClick: () => void;
}): JSX.Element => (
  <button
    className={`inline-flex items-center justify-center px-4 py-1 text-base font-light transition-all text-dark-accent bg-dark-primary whitespace-nowrap ${
      isMain ? `mainButton` : ""
    }`}
    onClick={onClick || undefined}
    type="button"
  >
    {text}
  </button>
);
export default Button;
