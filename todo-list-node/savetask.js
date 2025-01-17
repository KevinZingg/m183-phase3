const db = require('./fw/db');

async function getHtml(req) {
    let html = '';
    let taskId = '';

    if (req.body.id !== undefined && req.body.id.length !== 0) {
        taskId = req.body.id;
        let stmt = await db.executeStatement('SELECT ID, title, state FROM tasks WHERE ID = ?', [taskId]);
        if (stmt.length === 0) {
            taskId = '';
        }
    }

    if (req.body.title !== undefined && req.body.state !== undefined) {
        let state = req.body.state;
        let title = req.body.title;
        let userid = req.cookies.userid;

        if (taskId === '') {
            stmt = db.executeStatement("INSERT INTO tasks (title, state, userID) VALUES (?, ?, ?)", [title, state, userid]);
        } else {
            stmt = db.executeStatement("UPDATE tasks SET title = ?, state = ? WHERE ID = ?", [title, state, taskId]);
        }

        html += "<span class='info info-success'>Update successful</span>";
    } else {
        html += "<span class='info info-error'>No update was made</span>";
    }

    return html;
}

module.exports = { html: getHtml };
