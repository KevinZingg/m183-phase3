const tasklist = require('./user/tasklist');
const bgSearch = require('./user/backgroundsearch');

function getHtml() {
    return `<h2>Welcome, <?php echo $_COOKIE['username']; ?>!</h2>` + tasklist.html + '<hr />' + bgSearch.html;
}

module.exports = {
    html: getHtml()
}