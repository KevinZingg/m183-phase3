const express = require('express');
const session = require('express-session');
const path = require('path');
const header = require('./fw/header');
const footer = require('./fw/footer');
const login = require('./login');
const index = require('./index');

const app = express();
const PORT = 3000;

// Middleware für Session-Handling
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Middleware für Body-Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routen
app.get('/', (req, res) => {
    if(activeUserSession(req)) {
        res.send(wrapContent(index.html));
    } else {
        res.redirect('login');
    }
});

// edit task
app.get('/edit', (req, res) => {
    if(activeUserSession(req)) {
        res.send(wrapContent(''));
    } else {
        res.redirect('/');
    }
});

// Login-Seite anzeigen
app.get('/login', async (req, res) => {
    let content = await login(req, res);
    res.send(wrapContent(content));
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Profilseite anzeigen
app.get('/profile', (req, res) => {
    if (req.session.loggedin) {
        res.send(`Welcome, ${req.session.username}! <a href="/logout">Logout</a>`);
    } else {
        res.send('Please login to view this page');
    }
});

// save task
app.get('/savetask', (req, res) => {
    res.redirect('/');
});

// search
app.get('/search', (req, res) => {
    res.redirect('/');
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

function wrapContent(content) {
    return header+content+footer;
}

function activeUserSession(req) {
    // TODO: implement logic
    return true;
}