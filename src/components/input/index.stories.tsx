import { ComponentStory } from '@storybook/react';

import { Input } from './index';

export default {
  title: 'components/Input',
  component: Input,
  backgroundColor: '#e8d7f4',
};

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "text",
  required: true,
  onChange: () => console.log("onChange")
};
