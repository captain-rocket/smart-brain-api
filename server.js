const express = require('express');
const bcrypt= require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { handleRegister } = require('./controllers/register');
const { handleSignIn } = require('./controllers/signin');
const { handleProfile } = require('./controllers/profile');
const { handleImage } = require('./controllers/image');
const { handleApiCall } = require('./controllers/image');
 
 const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
  }
});

 const app = express();

app.use(express.json());
app.use(cors());

 app.get('/', (req, res)=> { res.send('it is working!') })

 app.post('/signin', (req, res) => handleSignIn(req, res, db, bcrypt));

app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));

app.get('/profile/:id', (req, res) => handleProfile(req, res, db));

app.put('/image', (req, res) => handleImage(req, res, db));
app.post('/imageUrl', (req, res) => handleApiCall(req, res));

 app.listen(process.env.PORT || 3000, ()=> {
   console.log(`app is running on port ${process.env.PORT}`);
 })

/* 

/ --> res = this is working
/signin --> = POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/