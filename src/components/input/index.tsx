import { forwardRef } from 'react';
import { FormInput } from './style';

type InputProps = {
  name: string;
  required: boolean;
  className?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, required, className, ...rest }: InputProps, ref) => {
    return (
      <FormInput
        type='text'
        name={name}
        required={required}
        className={className}
        ref={ref}
        {...rest}
      />
    );
  },
);
