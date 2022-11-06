import { ComponentStory } from '@storybook/react';
import { User } from 'react-feather';

import { Menu } from './index';

export default {
  title: 'components/Menu',
  component: Menu,
};

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Default = Template.bind({});
Default.args = {
  menu: [
    {
      icon: <User />,
      link: '#',
    },
    {
      icon: <User />,
      link: '#',
    },
    {
      icon: <User />,
      link: '#',
    },
  ],
};
