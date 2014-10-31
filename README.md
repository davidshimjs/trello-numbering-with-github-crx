trello-numbering-with-github-crx
================================

Using a number of trello card in github commit logs

How to Use
---
Replace a `yourapikey` to your api key in `client.js` file at 6 line.
If you want to generate api key, you can check out https://trello.com/1/appKey/generate

```javascript
var opts = {
    "version": 1,
    "apiEndpoint": "https://api.trello.com",
    "authEndpoint": "https://trello.com",
    "key": "yourapikey"
};
```

and you can add this project on chrome extensions as folder.

Gallery
---
![Trello](https://raw.github.com/davidshimjs/trello-numbering-with-github-crx/master/readme/screenshot1.png)

As you can see, Trello cards can have short number.

![Github](https://raw.github.com/davidshimjs/trello-numbering-with-github-crx/master/readme/screenshot2.png)

You can link your trello card with short number at github message.

License
---
this project under the MIT License

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/davidshimjs/trello-numbering-with-github-crx/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

