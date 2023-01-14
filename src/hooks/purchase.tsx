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

export const onPurchase = async (price: number, successFunc: () => void) => {
  if (window.localStorage) {
    const userId = localStorage.getItem('userId');
    const userRef = db.collection('users').doc(userId);
    const userData = await (await getDoc(userRef)).data();
    if (userData.point - price < 0) {
      alert('ポイントが足りません');
    } else {
      const purchasedItems: { id: string; price: string; count: number }[] = JSON.parse(
        localStorage.getItem('purchasedItems'),
      );
      purchasedItems.map(async (item) => {
        const tempItemRef = db.collection('items');
        const itemSnap = await tempItemRef.where('id', '==', item.id).get();
        const itemInfo = itemSnap.docs.map((doc) => ({
          docId: doc.id,
        }));
        const itemRef = db.collection('items').doc(itemInfo[0].docId);
        const itemData = await (await getDoc(itemRef)).data();
        const salerUserRef = db.collection('users').doc(itemData.salerId);
        const salerUserData = await (await getDoc(salerUserRef)).data();
        await salerUserRef.update({ point: salerUserData.point + Number(item.price) * item.count });
        itemRef.delete();
      });
      await userRef.update({ point: userData.point - price });
      localStorage.removeItem('purchasedItems');
      alert('購入しました');
      successFunc();
    }
  }
};
