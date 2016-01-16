'use strict';

const fs = require('fs');
const xml2js = require('xml2js');
const request = require('request');
const cfg = require('./.travis/config.json');

fs.readFile('./public/atom.xml', 'utf8', function (err, data) {
  xml2js.parseString(data, function (err, data) {
    const post = data.feed.entry[0];
    const title = '： 《' + post.title[0] + '》 ';
    const link = '（戳这里戳这里>>> post.link[0]["$"].href'+' <<<）';
    const prefix = [
      '集美貌与智慧于一身的@HiiTea 刚刚更新了博客(๑•̀ㅂ•́)و✧',
      '勤劳又美丽的@HiiTea 又更新博客啦ヽ(✿ﾟ▽ﾟ)ノ',
      '本宝宝@HiiTea 更新了博客╮(•́ω•̀)╭'
    ];
    const suffix = [
      '看看谁能抢到第一个沙发！',
      '你们不理我，我会哭的哦QAQ',
      '走过路过千万别错过！'
    ];

    const pre = prefix[(Math.random()*prefix.length)|0];
    const suf = suffix[(Math.random()*suffix.length)|0];

    let options = {
      url: 'https://api.weibo.com/2/statuses/update.json',
      method: 'POST',
      auth: {
        user: cfg.weibo.username,
        pass: cfg.weibo.secret
      },
      form: {
        source: cfg.weibo.appkey,
        status: pre + title + suf + link
      }
    };

    request(options);

  })
});

