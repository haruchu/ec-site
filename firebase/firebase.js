var admin = require('firebase-admin');

// ダウンロードしたJSONファイルをインポート。
var serviceAccount = require('./serviceAccountKey.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch {}

export const db = admin.firestore();
