## ECサイト

### リンク
https://ec-site-beige.vercel.app/

### 概要
Next.jsの学習がてらに簡単なECサイトを作成しました。

### 実装機能
+ ログイン・ログアウト（localstrageで保持）
+ 無限スクロール
+ カートに入れる・購入処理（localstrageでカートの中身を保持）
+ 商品のアップロード
+ モーダルによる商品詳細の表示
+ レスポンシブ対応
など

### 開発を通して
商品の表示に時間がかかりローディングが遅かったりと、パフォーマンス面での課題に苦戦した。
今回はデータの取得・保存・削除などはfirestoreでゴリゴリに書いたが、自作でAPIを作ってみたいと感じた。
