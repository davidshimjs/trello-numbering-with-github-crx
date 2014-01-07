var prefix = '__trelloWithGithub__';

var authorize = function () {
    Trello.authorize({
        type: 'popup',
        callback_method: 'fragment',
        return_url: 'https://trello.com/1/token/approve',
        expiration: 'never',
        name: 'Trello with Github extension',
        success: _onAuthorize,
        scope: {
            write: true,
            read: true,
            account: true
        }
    });
};

var deauthorize = function () {
    Trello.deauthorize();
    Trello.setToken(null);
    localStorage.removeItem('trello_token');
    localStorage.removeItem(prefix + 'board');
};

var getTrello = function () {
    return Trello;
};

var _onAuthorize = function (token) {
    if (typeof token === 'object') {
        console.log(token);
        token = token.token;
    }

    Trello.setToken(token);
    localStorage.setItem('trello_token', token);
};

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === 'github') {
        port.onMessage.addListener(function (request) {
            switch (request.method) {
            case 'getOptions':
                port.postMessage({
                    method: request.method,
                    board: localStorage.getItem(prefix + 'board'),
                    disabled: localStorage.getItem(prefix + 'disabled'),
                    pattern: localStorage.getItem(prefix + 'pattern')
                });
                break;

            case 'getShortUrl':
                Trello.boards.get(request.board + '/cards/' + request.no, {
                    fields: 'shortUrl'
                }, function (data) {
                    port.postMessage({
                        method: request.method,
                        id: data.id,
                        shortUrl: data.shortUrl
                    });
                })
                break;
            }
        });
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (typeof request === 'string') {
        _onAuthorize(request);
        return;
    }
    // switch (request.method) {
    // case 'getOptions':
    //     sendResponse({
    //         board: localStorage.getItem(prefix + 'board'),
    //         disabled: localStorage.getItem(prefix + 'disabled'),
    //         pattern: localStorage.getItem(prefix + 'pattern')
    //     });
    //     break;

    // case 'getShortUrl':
    //     Trello.boards.get(request.board + '/cards/' + request.no, {
    //         fields: 'shortUrl'
    //     }, function (data) {
    //         sendResponse({
    //             id: data.id,
    //             shortUrl: data.shortUrl
    //         });
    //     })
    //     break;
    // }
});

Trello.authorize({
    interactive: false
});