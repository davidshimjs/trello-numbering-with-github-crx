/* global chrome */
var prefix = '__trelloWithGithub__';
var elBoard = document.querySelector('#board');
var elPattern = document.querySelector('#pattern');
var elUse = document.querySelector('#use');
var elTrello = document.querySelector('#trello');
var elBoardGroup = document.querySelector('.boardGroup');
var elLogout = document.querySelector('#logout');

var _updateTrelloLayout = function () {
    chrome.runtime.getBackgroundPage(function (w) {
        var Trello = w.getTrello();

        if (Trello.authorized()) {
            elTrello.style.display = 'none';
            elBoardGroup.style.display = 'block';

            Trello.members.get('me', function (data) {
                elBoard.options[0].selected = true;

                data.idBoards.forEach(function (id) {
                    Trello.boards.get(id, {
                        fields: 'name'
                    }, function (data) {
                        var option = new Option(data.name, data.id);

                        if (elBoard.options[0].value === '') {
                            elBoard.removeChild(elBoard.options[0]);
                        }

                        elBoard.appendChild(option);

                        if (
                            localStorage.getItem(prefix + 'board') &&
                            localStorage.getItem(prefix + 'board') === data.id
                        ) {
                            option.selected = true;
                        }
                    });
                });
            });
        } else {
            elTrello.style.display = 'block';
            elBoardGroup.style.display = 'none';
        }
    });
};

// Attach events
elBoard.addEventListener('change', function (e) {
    var boardId = e.srcElement.options[e.srcElement.selectedIndex].value;

    if (boardId) {
        localStorage.setItem(prefix + 'board', boardId);
    } else {
        localStorage.setItem(prefix + 'board', boardId);
    }
});

elPattern.addEventListener('blur', function (e) {
    var pattern = e.srcElement.value;
    localStorage.setItem(prefix + 'pattern', pattern);
});

elUse.addEventListener('change', function (e) {
    localStorage.setItem(prefix + 'disabled', e.srcElement.checked ? '0' : '1');
});

elTrello.addEventListener('click', function () {
    chrome.runtime.getBackgroundPage(function (w) {
       w.authorize();
    });
});

elLogout.addEventListener('click', function () {
    chrome.runtime.getBackgroundPage(function (w) {
       w.deauthorize();
    });

    _updateTrelloLayout();
});

// Fill input fields
window.addEventListener('load', function () {
    _updateTrelloLayout();

    // Set default value
    if (!localStorage.getItem(prefix + 'pattern')) {
        localStorage.setItem(prefix + 'pattern', '{{{no}}}');
    }

    if (localStorage.getItem(prefix + 'pattern')) {
        elPattern.value = localStorage.getItem(prefix + 'pattern');
    }

    elUse.checked = localStorage.getItem(prefix + 'disabled') === '1' ? false : true;
});