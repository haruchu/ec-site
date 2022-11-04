import { Plus, Minus } from 'react-feather';
import { CountButton, CountContent, Wrapper } from './style';

type CountProps = {
  count: number;
  onChange: (count: number) => void;
};

export const Count = ({ count, onChange }: CountProps) => {
  return (
    <Wrapper>
      <CountButton onClick={() => onChange(count - 1)} disabled={count == 1}>
        <span>
          <Minus />
        </span>
      </CountButton>
      <CountContent>
        <span>{count}</span>
      </CountContent>
      <CountButton onClick={() => onChange(count + 1)} disabled={count == 99}>
        <span>
          <Plus />
        </span>
      </CountButton>
    </Wrapper>
  );
};
