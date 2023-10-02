require('dotenv').config();
const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');

const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');


const NUM_SEED_USERS = 10;
const NUM_SEED_TWEETS = 30;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
// Create users
const users = [];

users.push(
    new User ({
        username: 'demo-user',
        email: 'demo-user@appacademy.io',
        hashedPassword: bcrypt.hashSync('password', 10)
    })
    )
users.push(
    new User ({
        username: 'Alex-Brown',
        email: 'Alex-Brown@appacademy.io',
        hashedPassword: bcrypt.hashSync('password', 10)
    })
    )
users.push(
    new User ({
        username: 'Avery-Berry',
        email: 'Avery-Berry@appacademy.io',
        hashedPassword: bcrypt.hashSync('password', 10)
    })
    )
        
users.push(
    new User ({
        username: 'Muhammad-Amray',
        email: 'Muhammad-Amray@appacademy.io',
        hashedPassword: bcrypt.hashSync('password', 10)
    })
    )

users.push(
    new User ({
        username: 'Zi-Tan',
        email: 'Zi-Tan@appacademy.io',
        hashedPassword: bcrypt.hashSync('password', 10)
    })
    )
        
const insertSeeds = () => {
 console.log("Resetting db and seeding users and tweets...");
          
  User.collection.drop()
    .then(() => User.insertMany(users))
    .then(() => {
    console.log("Done!");
     mongoose.disconnect();
    })
        .catch(err => {
        console.error(err.stack);
        process.exit(1);
     });
}