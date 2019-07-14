const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);


const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true })
  .then(res => {
    console.log("connected to", url);
  })
  .catch((error) => {
    console.log(error);
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 5,
    required: true
  }
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Contact", contactSchema);

