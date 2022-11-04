import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { db } from '../../../../firebase/firebase';
import { Wrapper } from '../../../styles/Form';
import { StyledInfiniteScroll } from '../../../styles/List';
import { Item } from '../../molecules/item';
import { PurchasedItem } from '../../molecules/purchasedItem';

export type ItemType = {
  id: string;
  name: string;
  price: number;
  imageId: string;
  saler: string;
  uploadDate: string;
};

type ListLayoutProps = {
  items: ItemType[];
  loadMore: () => Promise<void>;
  hasMore: boolean;
};

const PurchasedListLayout = ({ items, loadMore, hasMore }: ListLayoutProps) => {
  return (
    <StyledInfiniteScroll loadMore={loadMore} hasMore={hasMore}>
      {items.map((item, index) => (
        <PurchasedItem
          key={index}
          id={item.id}
          name={item.name}
          price={item.price}
          imageId={item.imageId}
          salerName={item.saler}
        />
      ))}
    </StyledInfiniteScroll>
  );
};

export default PurchasedListLayout;
