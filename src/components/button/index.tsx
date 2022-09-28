import { StyledButton } from "./style";


type ButtonProps = {
  text: string;
  onClick: () => void;
  className: string;
};

export const Button = ({ text ,onClick, className}: ButtonProps) => {

  return (
    <StyledButton onClick={() => onClick()} className={className}>
      {text}
    </StyledButton>
  );
};
