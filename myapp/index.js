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
  let out = '';
  // out += execSync("find $PWD/cloud_volumes/ -name '*jpgs' -type d").toString() + '<br>';
  out += execSync('pwd').toString() + '<br>';
  out += execSync('cd ../cloud_volumes/test/jpgs && ls').toString() + '<br>';
  res.send('<pre>' + out + '</pre>');
});

/* 起動 */
app.listen(3000);
