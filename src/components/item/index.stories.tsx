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
  price: 200,
  imagePath: 'https://i.pinimg.com/474x/a5/f6/6b/a5f66b7bb16c9e18b666d712f6b73cdb.jpg',
};
