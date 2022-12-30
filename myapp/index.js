/* インスタンス化 */
const express = require('express');
const app = express();
const { execSync } = require('child_process');

/* セッティング */
app.set('view engine', 'ejs'); // ejsの使用を宣言している
app.use(express.json()); // body-parser
app.use(express.urlencoded({ extended: true })); // body-parser

/* ミドルウェア */
// app.use('/', controller.checkAndInitDb);

/* ルーティング */
app.get('/', (req, res) => {
  const a = execSync("find /cloud_volumes/ -name '*jpgs' -type d").toString().trim().split('\n');
  let out = '';
  a.forEach((e) => {
    out += '画像のディレクトリ: ' + e + '<br>';
  });
  res.send('<pre>' + out + '</pre>');
});

/* 起動 */
app.listen(3000);
