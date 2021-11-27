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
    host : '127.0.0.1',
    // port : 3306,
    user : 'roger910',
    password : '',
    database : 'smart-brain'
  }
});

 const app = express();

app.use(express.json());
app.use(cors());

 app.get('/', (req, res)=> {
   res.send('success')
 })

 app.post('/signin', (req, res) => handleSignIn(req, res, db, bcrypt));

app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));

app.get('/profile/:id', (req, res) => handleProfile(req, res, db));

app.put('/image', (req, res) => handleImage(req, res, db));
app.post('/imageUrl', (req, res) => handleApiCall(req, res));

 app.listen(3000, ()=> {
   console.log('app is running on port 3000');
 })

/* 

/ --> res = this is working
/signin --> = POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/