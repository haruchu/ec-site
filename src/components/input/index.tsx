import { FormInput } from "./style";


type InputProps = {
  name: string;
  required: boolean;
  onChange: (value: string) => void;
  className: string;
};

export const Input = ({ name, required, onChange, className }: InputProps) => {

  return (
    <FormInput
      type='text'
      name={name}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    />
  );
};
