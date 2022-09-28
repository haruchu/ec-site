import { forwardRef } from 'react';
import { FormInput } from './style';

type InputProps = {
  className?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }: InputProps, ref) => {
    return <FormInput type='text' className={className} ref={ref} {...rest} />;
  },
);
