import { ComponentStory } from '@storybook/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Input } from './index';

export default {
  title: 'components/Input',
  component: Input,
  backgroundColor: '#e8d7f4',
};

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Test = () => {
  type FormValues = {
    test: string;
  };
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('test')} type="text"/>
      <input type='submit' />
    </form>
  );
};
