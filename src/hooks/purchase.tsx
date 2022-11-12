import { getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const onCartInFunc = (itemId: string, price: number, count: number) => {
  if (window.localStorage) {
    const defaultItemsJson = localStorage.getItem('purchasedItems');
    const defaultItems = defaultItemsJson == null ? [] : JSON.parse(defaultItemsJson);
    const purchasedItems = [...defaultItems, { id: itemId, price: price, count: count }];
    let purchasedItemsJson = JSON.stringify(purchasedItems, undefined, 1);
    localStorage.setItem('purchasedItems', purchasedItemsJson);
  }
};

export const onCartOutFunc = (itemId: string) => {
  if (window.localStorage) {
    const defaultItemsJson = localStorage.getItem('purchasedItems');
    const defaultItems = defaultItemsJson == null ? [] : JSON.parse(defaultItemsJson);
    const purchasedItems = defaultItems.filter((item) => item.id !== itemId);
    let purchasedItemsJson = JSON.stringify(purchasedItems, undefined, 1);
    localStorage.setItem('purchasedItems', purchasedItemsJson);
  }
};

export const onPurchase = async (price: number) => {
  if (window.localStorage) {
    const userId = localStorage.getItem('userId');
    const userRef = db.collection('users').doc(userId);
    const userData = await (await getDoc(userRef)).data();
    await userRef.update({ point: userData.point - price });
    localStorage.removeItem('purchasedItems');
    alert('購入しました');
  }
};
