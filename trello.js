/* global chrome */
chrome.runtime.sendMessage({
    method: 'getOptions'
}, function (options) {
    var disabled = options.disabled === '1';
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
});