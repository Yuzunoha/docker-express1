const express = require('express');
const app = express();
const { execSync } = require('child_process');
const fs = require('fs');
const filenameScanResult = 'filenameScanResult.json';
app.set('view engine', 'ejs'); // ejsの使用を宣言している
app.use(express.json()); // body-parser
app.use(express.urlencoded({ extended: true })); // body-parser
app.use(express.static('public')); // ディレクトリを再帰的に公開する。画像もこの下にある

/**
 * strにsearchが含まれればtrueを返す
 */
const isMatch = (str, search) => -1 !== str.indexOf(search);

/**
 * スキャンして、publicより下のパス文字列の配列を返す
 * ['cloud_volumes/test1_jpgs', 'cloud_volumes/test2_jpgs', ... ]
 */
const scanJpgsDirPathList = ({ execSync }) => {
  const cmd = "find public/cloud_volumes/ -name '*jpgs' -type d";
  const result = execSync(cmd).toString().trim().split('\n').sort();
  return result.map((e) => e.split('public/')[1]);
};

/**
 * スキャン結果用のメモリ
 */
let jpgsDirPathList = null;

app.get('/', (req, res) => {
  if (!jpgsDirPathList) {
    jpgsDirPathList = JSON.parse(fs.readFileSync(filenameScanResult).toString());
  }
  const divs = jpgsDirPathList.map((e) => {
    const a = e.split('/');
    let div = '';
    div += '<div style="text-align: center; color: #999; padding-bottom: 10px; font-size: 13px">';
    div += `<a href="/view/${a[a.length - 1]}">`;
    div += `<img src="${e}/001.JPG" width="99%" />`; // 各jpgsフォルダの先頭画像を代表で選んでいる
    div += '</a><br /><span>1/228</span></div>';
    return div;
  });
  res.render('index', { divs });
});

app.get('/scan', (req, res) => {
  jpgsDirPathList = scanJpgsDirPathList({ execSync });
  fs.writeFileSync(filenameScanResult, JSON.stringify(jpgsDirPathList), 'utf8', (e) => e);
  res.redirect('/');
});

app.get('/view/:title', (req, res) => {
  const title = req.params.title;
  const jpgsDirPath = jpgsDirPathList.filter((e) => isMatch(e, title))[0];
  res.send({ jpgsDirPath });
  // TODO
});

/* 起動 */
app.listen(3000);
