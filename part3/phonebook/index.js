require('dotenv').config({ path: 'entry.env' });
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require("cors");
const Contact = require('./models/phonebook');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("info", (req) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :response-time :info'));

app.get('/', (req, res) => {
    res.send("<h1>Hop-hey la la ley</h1>")
});

app.get('/info', (req, res) => {
    Contact.find({}).then(phonebook => {
        res.write(`<p>This phonebook has ${phonebook.length} people</p>`);
        res.write(`<p>${new Date()}</p>`);
        res.end();
    });
});

app.get('/api/persons', (req, res) => {
    Contact.find({}).then(phonebook => {
        res.json(phonebook.map(person => {
            return person.toJSON()
        }));
    });
});

app.get('/api/persons/:id', (req, res) => {
    Contact.findById(req.params.id).then(contact => {
        res.json(contact.toJSON());
    });
});

app.post("/api/persons", (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "content missing"
        });
    }
    const contact = new Contact({
        name: body.name,
        number: body.number
    });

    contact.save().then(savedContact => {
        res.json(savedContact.toJSON());
    });
    res.json(contact);
});

app.put("/api/persons/:id", (req, res) => {
    console.log('hellow');
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    contact = phonebook.find((n) => {
        return n.id === id;
    });

    if (!contact) {
        res.status(404).send("<p>Can't find the contact</p>").end();
    }
    else {
        phonebook = phonebook.filter((n) => {
            return n.id !== id;
        });
        res.status(204).end();
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('running on', PORT);
});