import { ComponentStory } from '@storybook/react';

import { Item } from './index';

export default {
  title: 'components/Item',
  component: Item,
};

const Template: ComponentStory<typeof Item> = (args) => <Item {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'トマト',
  point: 200,
  imagePath: 'path',
  salerName: 'test産業',
};
