// Get a token in a <pre> tag
// var token = document.querySelector('pre').innerHTML.toString().trim();
var token = location.hash.toString().match(/token=(.+)/i)[1];

// Send a token to chrome extension
chrome.runtime.sendMessage(token);

// Close a popup
self.close();