/* global chrome */
var _options = {};
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
    }
});

var _onStart = function () {
    var disabled = _options.disabled === '1';
    var INTERVAL = 3000;

    if (disabled) {
        return;
    }

    setInterval(function () {
        var shortIds = document.querySelectorAll('.card-short-id.hide');

        for (var i = 0, l = shortIds.length; i < l; i++) {
            shortIds[i].classList.remove('hide');
        }
    }, INTERVAL);
};