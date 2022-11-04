import { ComponentStory } from '@storybook/react';

import { PurchasedItem } from './index';

export default {
  title: 'components/PurchasedItem',
  component: PurchasedItem,
};

const Template: ComponentStory<typeof PurchasedItem> = (args) => <PurchasedItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'トマト',
  price: 200,
  imagePath: 'path',
  salerName: 'test産業',
};
