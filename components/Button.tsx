const Button = ({ text, isMain, onClick }): JSX.Element => (
  <button
    className={`${
      isMain && `mainButton`
    } inline-flex items-center justify-center px-4 py-1 text-base font-light transition-all text-dark-accent bg-dark-primary whitespace-nowrap`}
    onClick={onClick}
    type="button"
  >
    {text}
  </button>
);
export default Button;
