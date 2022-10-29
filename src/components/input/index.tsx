import { forwardRef } from 'react';
import { FormInput } from './style';

type InputProps = {
  className?: string;
  type: 'text' | 'password';
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...rest }: InputProps, ref) => {
    return <FormInput type={type} className={className} ref={ref} {...rest} />;
  },
);
