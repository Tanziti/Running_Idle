require('dotenv').config();
const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Character = require('../models/Character.js')

const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds(); 
  })
  .then(() => {
    insertSeeds2();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
// Create users
const users = [];
const characters = [];

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

characters.push(
    new Character ({
        user: users[1].id,
        name: 'TheBestBob',
        heart: 0,
        legs: 0,
        arms: 0,
        points: 0,
        outfit: 'red',
        shoes: 'yellow'
    })
    )

characters.push(
    new Character ({
        user: users[2].id,
        name: 'Bob',
        heart: 0,
        legs: 0,
        arms: 0,
        points: 0,
        outfit: 'red',
        shoes: 'yellow'
    })
    )

characters.push(
    new Character ({
        user: users[2].id,
        name: 'Tim',
        heart: 0,
        legs: 0,
        arms: 0,
        points: 0,
        outfit: 'yellow',
        shoes: 'red'
    })
    )

    characters.push(
    new Character ({
        user: users[3].id,
        name: 'GarboBob',
        heart: 0,
        legs: 0,
        arms: 0,
        points: 0,
        outfit: 'red',
        shoes: 'yellow'
    })
    )

characters.push(
    new Character ({
        user: users[3].id,
        name: 'SuperBob',
        heart: 0,
        legs: 0,
        arms: 0,
        points: 0,
        outfit: 'red',
        shoes: 'yellow'
    })
    )

characters.push(
    new Character ({
        user: users[3].id,
        name: 'ThatBob',
        heart: 0,
        legs: 0,
        arms: 0,
        points: 0,
        outfit: 'red',
        shoes: 'yellow'
    })
    )

characters.push(
    new Character ({
        user: users[4].id,
        name: 'GodBob',
        heart: 0,
        legs: 0,
        arms: 0,
        points: 0,
        outfit: 'red',
        shoes: 'yellow'
    })
    )

characters.push(
    new Character ({
        user: users[4].id,
        name: 'BobOfGod',
        heart: 0,
        legs: 0,
        arms: 0,
        points: 0,
        outfit: 'red',
        shoes: 'yellow'
    })
    )

characters.push(
    new Character ({
        user: users[4].id,
        name: 'Rob',
        heart: 0,
        legs: 0,
        arms: 0,
        points: 0,
        outfit: 'red',
        shoes: 'yellow'
    })
    )

characters.push(
    new Character ({
        user: users[4].id,
        name: 'BoB',
        heart: 0,
        legs: 0,
        arms: 0,
        points: 0,
        outfit: 'red',
        shoes: 'yellow'
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

const insertSeeds2 = () => {
          
  Character.collection.drop()
    .then(() => Character.insertMany(characters))
    .then(() => {
    console.log("Done with characters!");
     mongoose.disconnect();
    })
        .catch(err => {
        console.error(err.stack);
        process.exit(1);
     });
}