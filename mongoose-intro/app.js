const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// make a connection to mongo - 'mongodb://localhost/NAMEOFTHEDATABASE'
// if the database doesn't exist it gets created


mongoose
    .connect("mongodb://localhost/mongoose-intro")
    .then(x => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
    })
    .catch(err => {
        console.error("Error connecting to mongo", err);
    });

// const catSchema = mongoose.Schema({
//     name: String,
//     lives: Number
// });

// const Cat = mongoose.model('Cat', catSchema);

// you can also have an array as parameter and insert many
// Cat.create({ name: 'felix' }).then(catFromDB => {
//     console.log('cat got created: ', catFromDB);
// }).catch(err => {
//     console.log('error', err);
// });

// all the queries are in the docs : https://mongoosejs.com/docs/queries.html

// find() returns all documents from the collection - returns an array 
// or empty array if no documents
// Cat.find().then(catsFromDB => {
//     console.log(catsFromDB);
// }).catch(err => {
//     console.log(`Error while finding a cat: ${err}`);
// });

// Cat.findById(id) -> returns the document with an id field matching the given ObjectId
// Cat.findById('mongoObjId').then(cat => {
//     console.log(cat);
// });

// finds the first document that matches the search query
// Cat.findOne({ name: 'kitty' });

// updates the first document matching the given query 
// and merge the changes onto the fields of that document
// Cat.updateOne({ name: 'felix' }, { name: "Garfield II" })
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// Cat.updateMany(query, changes) -> updates all documents matching the given query and apply the changes to these documents
// Cat.updateMany({ age: 9 }, { age: 18 })
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// deletes the first document that matches the query
// Cat.deleteOne({ hungry: true }).then(result => {
//     console.log(result);
// });

// deletes all documents that match the query 
// Cat.deleteMany({ name: "Foo" }).then(result => {
//     console.log(result);
// });

// deletes the document matching the id
// Cat.deleteById('id439028');

// gets an array and inserts all the items in the database
// Cat.insertMany([{ name: 'foo' }, { name: 'bar' }]);

// updates the first document found
// Cat.updateOne({ name: 'Bar' }, { name: 'Carlo' }).then(cat => { });

// updated element mit dieser id
// Cat.findByIdAndUpdate('id890890', { name: 'foo' });


const userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 20,
        set: value => {
            return value
                .split(' ')
                .map(str => str[0].toUpperCase() + str.slice(1).toLowerCase())
                .join(' ');
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 120
    },
    hobbies: [String],
    address: Object,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            message: 'Email must be lowercase',
            validator: value => {
                // check if email is lowercase and contains an @
                if (value.toLowerCase() === value && value.includes('@')) return true;
                else return false;
            }
        }
    }

});

const User = mongoose.model('User', userSchema);

User.create({ name: 'jane doe', email: 'janedoe@gmail.com' }).then(user => {
    console.log('created user: ', user);
    mongoose.connection.close();
}).catch(err => {
    console.log('error', err);
});
