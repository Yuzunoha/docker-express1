/* インスタンス化 */
const express = require('express');
const app = express();
const { execSync } = require('child_process');

/* セッティング */
app.set('view engine', 'ejs'); // ejsの使用を宣言している
app.use(express.json()); // body-parser
app.use(express.urlencoded({ extended: true })); // body-parser
app.use(express.static('public')); // ディレクトリを再帰的に公開する。画像もこの下にある

/* ミドルウェア */
// app.use('/', controller.checkAndInitDb);

/* ルーティング */
app.get('/', (req, res) => {
  res.render('menu', {});
});

app.get('/test', (req, res) => {
  const a = scanJpgsDirPathList({ execSync });
  let out = '';
  a.forEach((e) => {
    out += '画像のディレクトリ: ' + e + '<br>';
  });
  res.send('<pre>' + out + '</pre>');
});

/* 起動 */
app.listen(3000);

/**
 * スキャンして、publicより下のパス文字列の配列を返す
 * ['cloud_volumes/test1/jpgs', 'cloud_volumes/test2/jpgs', ... ]
 */
const scanJpgsDirPathList = ({ execSync }) => {
  const cmd = "find public/cloud_volumes/ -name '*jpgs' -type d";
  const result = execSync(cmd).toString().trim().split('\n');
  return result.map((e) => e.split('public/')[1]);
};
