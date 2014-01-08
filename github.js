/* global chrome */
var _options = {};

var _escapeRegExp = function (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

var _port = chrome.runtime.connect({
    name: 'github'
});

_port.postMessage({
    method: 'getOptions'
});

_port.onMessage.addListener(function (data) {
    switch (data.method) {
    case 'getOptions':
        _options = {
            board: data.board,
            disabled: data.disabled,
            pattern: data.pattern
        };

        _onStart();
        break;

    case 'getShortUrl':
        if (data && data.shortUrl) {
            window.open(data.shortUrl, 'trello');
        } else {
            alert('Can\'t open the trello card');
        }
        break;
    }
});

var _onStart = function () {
    var boardId = _options.board;
    var disabled = _options.disabled === '1';
    var pattern = _options.pattern;

    // It only works when user has set trello board id
    if (!boardId || disabled) {
        return;
    }

    var rxPattern = new RegExp(_escapeRegExp(pattern).replace(/\\\{\\\{no\\\}\\\}/i, '([0-9]+)'), 'g');
    var messages = document.querySelectorAll(
        '.message blockquote,' +
        '.message a,' +
        '.message p,' +
        'p.commit-title,' +
        '.comment-body p,' +
        '.comment-body code'
    );

    var _openTrelloCardByNo = function (no) {
        _port.postMessage({
            method: 'getShortUrl',
            board: boardId,
            no: no
        });
    };

    for (var i = 0, l = messages.length; i < l; i++) {
        if (messages[i].querySelector('code')) {
            continue;
        }

        if (rxPattern.test(messages[i].innerHTML)) {
            messages[i].innerHTML = messages[i].innerHTML.replace(rxPattern, '<span class="__linkTrello" data-no="$1">' + pattern.replace(/\{\{no\}\}/i, '$1') + '</span>');
        }
    }

    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('__linkTrello')) {
            e.preventDefault();
            e.stopPropagation();
            _openTrelloCardByNo(e.target.getAttribute('data-no'));
        }
    }, true);
};