import { getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const getUserInfo = async () => {
  let data = {};
  let userId;
  typeof window !== 'undefined' && (userId = localStorage.getItem('userId'));
  const userRef = db.collection('users').doc(userId);
  const userData = await (await getDoc(userRef)).data();

  return userData;
};
