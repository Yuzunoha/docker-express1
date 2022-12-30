/* インスタンス化 */
const express = require('express');
const app = express();

/* セッティング */
app.set('view engine', 'ejs'); // ejsの使用を宣言している
app.use(express.json()); // body-parser
app.use(express.urlencoded({ extended: true })); // body-parser

/* ミドルウェア */
// app.use('/', controller.checkAndInitDb);

/* ルーティング */
app.get('/', (req, res) => {
  res.send('hello!');
});

/* 起動 */
app.listen(3000);
