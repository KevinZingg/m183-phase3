const express = require('express');
const session = require('express-session');
const path = require('path');
const header = require('./fw/header');
const footer = require('./fw/footer');
const login = require('./login');

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
    res.send(wrapContent(``));
});

// Login-Seite anzeigen
app.get('/login', async (req, res) => {
    res.send(wrapContent(await login(req)));
});

// Profilseite anzeigen
app.get('/profile', (req, res) => {
    if (req.session.loggedin) {
        res.send(`Welcome, ${req.session.username}! <a href="/logout">Logout</a>`);
    } else {
        res.send('Please login to view this page');
    }
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

function wrapContent(content) {
    return header+content+footer;
}
