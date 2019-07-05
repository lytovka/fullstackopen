const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("info", (req) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :response-time :info'));

let phonebook = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
];

app.get('/', (req, res) => {
    res.send("<h1>Hop-hey la la ley</h1>")
});

app.get('/info', (req, res) => {
    res.write(`<p>This phonebook has ${phonebook.length} people</p>`);
    res.write(`<p>${new Date()}</p>`);
    res.end();
});

app.get('/api/persons', (req, res) => {
    res.json(phonebook);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const contact = phonebook.find((n) => {
        return n.id === id;
    });

    if (!contact) {
        res.status(404).send("<h1>Ooops</h1>").end();
    }
    else {
        res.json(contact);
    }
});

const isNameExist = (name) => {
    return phonebook.find((n) => {
        return n.name === name;
    }) === undefined ? false : true;
}

app.post("/api/persons", (req, res) => {
    const body = req.body;
    if(!body.name || !body.number){
        return res.status(400).json({
            error: "content missing"
        });
    }
    if(isNameExist(body.name)){
        return res.status(400).json({
            error: "this contact already exists"
        });
    }
    const contact = { 
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random()*100000),
    }

    phonebook = phonebook.concat(contact);
    res.json(phonebook);
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