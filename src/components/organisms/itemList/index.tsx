import { ref, getDownloadURL } from 'firebase/storage';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { X } from 'react-feather';
import { storage } from '../../../../firebase/firebase';
import { StyledInfiniteScroll } from '../../../styles/List';
import { Count } from '../../molecules/count';
import { Item } from '../../molecules/item';
import {
  StyledModal,
  modalStyle,
  ModalWrapper,
  ModalCloseButton,
  ModalLeft,
  ModalImage,
  ModalRight,
  ModalItemName,
  SalerWrapper,
  ModalSeller,
  ModalItemPrice,
  BuyButtonWrapper,
  StyledButton,
} from '../../molecules/item/style';

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

export const onCartIn = (itemId: string, count: number) => {
  if (window.localStorage) {
    const defaultItemsJson = localStorage.getItem('purchasedItems');
    const defaultItems = defaultItemsJson == null ? [] : JSON.parse(defaultItemsJson);
    const purchasedItems = [...defaultItems, { id: itemId, count: count }];
    let purchasedItemsJson = JSON.stringify(purchasedItems, undefined, 1);
    localStorage.setItem('purchasedItems', purchasedItemsJson);
  }
};

const ListLayout = ({ items, loadMore, hasMore }: ListLayoutProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [salerName, setSalerName] = useState('');
  const [imageId, setImageId] = useState('');
  const [url, setURL] = useState('');

  useEffect(() => {
    const gsReference = ref(storage, `gs://ec-0831.appspot.com/images/hoge/${imageId}.png`);
    getDownloadURL(gsReference)
      .then((fileURL) => {
        setURL(fileURL);
      })
      .catch((err) => console.log(err));
  }, [imageId]);

  const onModalOpen = (
    id: string,
    name: string,
    price: number,
    salerName: string,
    imageId: string,
  ) => {
    setId(id);
    setName(name);
    setPrice(price);
    setSalerName(salerName);
    setImageId(imageId);
    setIsOpen(true);
  };

  const onModalClose = () => {
    setCount(1);
    setIsOpen(false);
  };

  const onModalCartIn = (id: string, count: number) => {
    onCartIn(id, count);
    setIsOpen(false);
  };

  return (
    <>
      <StyledModal isOpen={modalIsOpen} onRequestClose={() => onModalClose()} style={modalStyle}>
        <ModalWrapper>
          <ModalCloseButton onClick={() => setIsOpen(false)}>
            <X />
          </ModalCloseButton>
          <ModalLeft>
            <ModalImage src={url} />
          </ModalLeft>
          <ModalRight>
            <ModalItemName>{name}</ModalItemName>
            <SalerWrapper>
              <ModalSeller onClick={() => router.push(`/list/${salerName}`)}>
                {salerName}
              </ModalSeller>
            </SalerWrapper>
            <ModalItemPrice>{price * count}</ModalItemPrice>
            <BuyButtonWrapper>
              <Count count={count} onChange={setCount} />
              <StyledButton text='カートに入れる' onClick={() => onModalCartIn(id, count)} />
            </BuyButtonWrapper>
          </ModalRight>
        </ModalWrapper>
      </StyledModal>
      <StyledInfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        {items.map((item, index) => (
          <Item
            key={index}
            id={item.id}
            name={item.name}
            price={item.price}
            imageId={item.imageId}
            onModalOpen={() =>
              onModalOpen(item.id, item.name, item.price, item.saler, item.imageId)
            }
          />
        ))}
      </StyledInfiniteScroll>
    </>
  );
};

export default ListLayout;
