import { ref, getDownloadURL } from 'firebase/storage';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { X } from 'react-feather';
import { storage } from '../../firebase/firebase';
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
  ModalItemPoint,
  BuyButtonWrapper,
  StyledButton,
} from '../components/molecules/item/style';
import { PurchasedItem } from '../components/molecules/purchasedItem';
import { StyledInfiniteScroll } from '../styles/List';
import { ItemType } from './itemLayout';

type ListLayoutProps = {
  items: (ItemType & { count: string })[];
  loadMore: () => Promise<void>;
  hasMore: boolean;
  onCartOut: (id: string) => void;
};

const PurchasedListLayout = ({ items, loadMore, hasMore, onCartOut }: ListLayoutProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [point, setPoint] = useState(0);
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
    point: number,
    salerName: string,
    imageId: string,
  ) => {
    setId(id);
    setName(name);
    setPoint(point);
    setSalerName(salerName);
    setImageId(imageId);
    setIsOpen(true);
  };

  const onModalClose = () => {
    setCount(1);
    setIsOpen(false);
  };

  const onLayoutCartOut = (id: string) => {
    onCartOut(id);
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
              <ModalSeller onClick={() => router.push(`/profile/${salerName}`)}>
                {salerName}
              </ModalSeller>
            </SalerWrapper>
            <ModalItemPoint>{point * count}</ModalItemPoint>
            <BuyButtonWrapper>
              <StyledButton text='カートから外す' onClick={() => onLayoutCartOut(id)} />
            </BuyButtonWrapper>
          </ModalRight>
        </ModalWrapper>
      </StyledModal>
      <h2>カートに入っているもの</h2>
      <StyledInfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        {items.map((item, index) => (
          <PurchasedItem
            key={index}
            id={item.id}
            name={item.name}
            point={item.point}
            count={item.count}
            imageId={item.imageId}
            salerName={item.saler}
            onModalOpen={() =>
              onModalOpen(item.id, item.name, item.point, item.saler, item.imageId)
            }
            onCarOut={() => onLayoutCartOut(item.id)}
          />
        ))}
      </StyledInfiniteScroll>
    </>
  );
};

export default PurchasedListLayout;
