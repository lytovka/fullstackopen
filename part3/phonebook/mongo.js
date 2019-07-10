const mongoose = require("mongoose");

// if(process.argv.length < 5) { 
//     console.log('Please include your password as well');
//     process.exit(1);
// }
const password = process.argv[2];

const url = `mongodb+srv://new-user_1:${password}@cluster0-yyqzy.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true });

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length === 3) {
    Contact.find({}).then(res => {
        res.forEach(c => {
            console.log(c.name, c.number, c.id);
        });
        mongoose.connection.close();
        process.exit(1);
    });
}

const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4]
});

contact.save().then(res => {
    console.log(`added ${process.argv[3]} with phone number ${process.argv[4]}`);
    mongoose.connection.close();
});

