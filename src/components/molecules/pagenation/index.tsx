import { useState } from 'react';
import { Pagination } from './style';

type PagenationProps = {
  pageCount: number;
  currentPage: number;
  onChange: (page: number) => void;
};

export const Pagenation = ({ pageCount, currentPage, onChange }: PagenationProps) => {
  return <Pagination count={pageCount} onChange={(e, page) => onChange(page)} page={currentPage} />;
};
