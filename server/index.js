const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const proxy = require('express-http-proxy');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./db.js");
const { argv } = require("./config.js");

const HTTP_PORT = process.env.PORT || 8000;

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.get("/api/entries", (req, res, next) => {
    var sql = "select id,description,start,end from entries ORDER BY start desc;"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "entries": rows
        })
    });
});

app.post("/api/entries", (req, res, next) => {
    var errors = []
    if (!req.body.description) {
        errors.push("No description provided");
    }
    if (!req.body.start) {
        errors.push("No Start Date / Time Provided");
    }
    if (!req.body.end) {
        errors.push("No End Date / Time Provided");
    }

    if (errors.length) {
        res.status(400).json({ "errors": errors });
        return;
    }

    var data = {
        description: req.body.description,
        start: req.body.start,
        end: req.body.end
    }
    var sql = 'INSERT INTO entries (description, start, end) VALUES (?,?,?)'
    var params = [data.description, data.start, data.end]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "entry": { ...data, id: this.lastID }
        })
    });
});

if (argv.dev) {
    app.use('/', proxy('http://localhost:3000/'));
}

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use(function (req, res) {
    res.status(404);
});
