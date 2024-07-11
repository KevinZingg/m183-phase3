const tasklist = require('./user/tasklist');
const bgSearch = require('./user/backgroundsearch');
const { encode } = require('html-entities');

async function getHtml(req) {
    let taskListHtml = await tasklist.html(req);
    return `<h2>Welcome, ${encode(req.cookies.username)}!</h2>` + taskListHtml + '<hr />' + bgSearch.html(req);
}

module.exports = {
    html: getHtml
};
