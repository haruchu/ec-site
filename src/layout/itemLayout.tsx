import { ref, getDownloadURL } from 'firebase/storage';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { X } from 'react-feather';
import { storage } from '../../firebase/firebase';
import { Count } from '../components/molecules/count';
import { Item } from '../components/molecules/item';
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
import { onCartInFunc, onCartOutFunc } from '../hooks/purchase';
import { StyledInfiniteScroll } from '../styles/List';

export type ItemType = {
  id: string;
  name: string;
  point: number;
  imageId: string;
  saler: string;
  salerId: string;
  uploadDate: string;
};

type ListLayoutProps = {
  items: ItemType[];
  loadMore: () => Promise<void>;
  hasMore: boolean;
};

const ListLayout = ({ items, loadMore, hasMore }: ListLayoutProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [point, setPoint] = useState(0);
  const [salerName, setSalerName] = useState('');
  const [imageId, setImageId] = useState('');
  const [url, setURL] = useState('');
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [isCarted, setIsCarted] = useState(false);

  const refreshCartItems = () => {
    const purchasedItemsInfoJson = localStorage.getItem('purchasedItems');
    const purchasedItemsInfo =
      purchasedItemsInfoJson == null ? [] : JSON.parse(purchasedItemsInfoJson);
    setCartItems(purchasedItemsInfo.map((item) => item.id));
  };

  useEffect(() => {
    refreshCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setCount(1);
    setSalerName(salerName);
    setImageId(imageId);
    setIsOpen(true);
    setIsCarted(cartItems.includes(id));
  };

  const onModalClose = () => {
    setIsOpen(false);
  };

  const onLayoutCartIn = (id: string, point: number, count: number) => {
    onCartInFunc(id, point, count);
    refreshCartItems();
    setIsOpen(false);
  };

  const onLayoutCartOut = (id: string) => {
    onCartOutFunc(id);
    refreshCartItems();
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
            {isCarted ? <></> : <ModalItemPoint>{point * count}</ModalItemPoint>}
            <BuyButtonWrapper>
              {isCarted ? (
                <StyledButton text='カートから外す' onClick={() => onLayoutCartOut(id)} />
              ) : (
                <>
                  <Count count={count} onChange={setCount} />
                  <StyledButton
                    text='カートに入れる'
                    onClick={() => onLayoutCartIn(id, point, count)}
                  />
                </>
              )}
            </BuyButtonWrapper>
          </ModalRight>
        </ModalWrapper>
      </StyledModal>
      <StyledInfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        {items.map((item, index) => (
          <Item
            key={index}
            name={item.name}
            point={item.point}
            imageId={item.imageId}
            onModalOpen={() =>
              onModalOpen(item.id, item.name, item.point, item.saler, item.imageId)
            }
          />
        ))}
      </StyledInfiniteScroll>
    </>
  );
};

export default ListLayout;
