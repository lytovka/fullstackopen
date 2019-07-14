require("dotenv").config({ path: "entry.env" });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Contact = require("./models/phonebook");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("info", (req) => {
  return JSON.stringify(req.body);
});
app.use(morgan(":method :url :response-time :info"));

app.get("/", (req, res) => {
  res.send("<h1>Hop-hey la la ley</h1>");
});

app.get("/info", (req, res) => {
  Contact.find({}).then(phonebook => {
    res.write(`<p>This phonebook has ${phonebook.length} people</p>`);
    res.write(`<p>${new Date()}</p>`);
    res.end();
  });
});

app.get("/api/persons", (req, res) => {
  Contact.find({}).then(phonebook => {
    res.json(phonebook.map(person => {
      return person.toJSON();
    }));
  });
});

app.get("/api/persons/:id", (req, res) => {
  Contact.findById(req.params.id).then(contact => {
    if (contact) {
      res.json(contact.toJSON());
    }
    else {
      res.status(404).end();
    }
  })
    .catch((error) => next(error));
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

  contact.save()
    .then(savedContact => savedContact.toJSON())
    .then(savedAndFormattedContact => {
      res.json(savedAndFormattedContact);
    })
    .catch(error => next(error));
});

app.put("/api/persons/:id", (req, res) => {

  const contact = {
    name: req.body.name,
    number: req.body.number
  };

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then(updatedContact => updatedContact.toJSON())
    .then(updatedAndFormattedContact => {
      res.json(updatedAndFormattedContact);
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (req, res) => {
  Contact.findByIdAndDelete(req.params.id).then(result => {
    res.status(204).end();
  })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind == "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  }
  else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("running on", PORT);
});