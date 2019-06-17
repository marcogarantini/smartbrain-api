const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: 'pg',
  connection: {
    host : process.env.IP,
    user : 'postgres',
    password : 'test',
    database : 'smartbrain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


// app.get('/', (req, res) => {
//     res.send(db.users);
// });

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.getUser(db));

app.put('/image', image.countEntries(db));

app.post('/imageurl', image.handleApiCall());

app.listen(8080, () => {
    console.log('server is running...');
});