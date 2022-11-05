export const onCartInFunc = (itemId: string, count: number) => {
  if (window.localStorage) {
    const defaultItemsJson = localStorage.getItem('purchasedItems');
    const defaultItems = defaultItemsJson == null ? [] : JSON.parse(defaultItemsJson);
    const purchasedItems = [...defaultItems, { id: itemId, count: count }];
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
