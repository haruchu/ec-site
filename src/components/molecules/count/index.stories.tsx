import { ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Count } from './index';

export default {
  title: 'components/Count',
  component: Count,
};

const Template: ComponentStory<typeof Count> = () => {
  const [count, setCount] = useState(0);
  const props = {
    count: count,
    onChange: (count) => setCount(count)
  };

  return <Count {...props} />;
};

export const Default = Template.bind({});
