import { db } from "../../firebase/firebase";

export const getUserInfo = async () => {
  let data = {};
  let userId;
  typeof window !== 'undefined' && (userId = localStorage.getItem('userId'));

  const colRef = db.collection('users');
  const userSnap = await colRef.where('id', '==', userId).get();
  data = userSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};