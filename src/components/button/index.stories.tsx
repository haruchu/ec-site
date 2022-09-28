import { ComponentStory } from '@storybook/react';

import { Button } from './index';

export default {
  title: 'components/Button',
  component: Button,
  backgroundColor: '#e8d7f4',
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "text",
  onClick: () => console.log("onClick")
};
