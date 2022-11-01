import { forwardRef } from 'react';
import { CountButton, CountContent, Wrapper } from './style';

type CountProps = {
  count: number;
  onChange: (count: number) => void;
};

export const Count =
  ({count, onChange}:CountProps) => {

    return (
      <Wrapper>
        <CountButton onClick={() => onChange(count - 1)} disabled={count == 0}><span>-</span></CountButton>
        <CountContent>{count}</CountContent>
        <CountButton onClick={() => onChange(count + 1)} disabled={count == 99}><span>+</span></CountButton>
      </Wrapper>
    );
  };
