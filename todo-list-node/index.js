const tasklist = require('./user/tasklist');
const bgSearch = require('./user/backgroundsearch');

function getHtml(req) {
    return `<h2>Welcome, `+req.cookies.username+`!</h2>` + tasklist.html + '<hr />' + bgSearch.html;
}

module.exports = {
    html: getHtml
}