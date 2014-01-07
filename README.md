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

License
---
this projec under the MIT License