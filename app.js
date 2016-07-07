'use strict';

const fs = require('fs');
const xml2js = require('xml2js');
const request = require('request');
const cfg = require('./.travis/config.json');

fs.readFile('./public/atom.xml', 'utf8', function (err, data) {
  xml2js.parseString(data, function (err, data) {
    const post = data.feed.entry[0];
    const title = ' 《' + post.title[0] + '》 ';
    const link = title + post.link[0]['$'].href;
    const prefix = [
      '发表了新的博客'
    ];
    const suffix = [];

    const pre = prefix[(Math.random() * prefix.length) | 0];
    const suf = suffix[(Math.random() * suffix.length) | 0];
    const text = [pre, suf, link].join('');

    let options = {
      url: 'https://api.weibo.com/2/statuses/update.json',
      method: 'POST',
      auth: {
        user: cfg.weibo.username,
        pass: cfg.weibo.secret
      },
      form: {
        source: cfg.weibo.appkey,
        status: text
      }
    };

    request(options, function (err, response, body) {
      console.log(body);
    });

  })
});

