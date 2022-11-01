import { ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Pagenation } from './index';

export default {
  title: 'components/Pagenation',
  component: Pagenation,
};

export const Default = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <Pagenation pageCount={20} currentPage={currentPage} onChange={(v) => setCurrentPage(v)} />
  );
};
