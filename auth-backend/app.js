const express = require('express');
const cors = require('cors');
const Authenticate = require('./services/auth/authenticate');

/* const {Pool} = require('pg'); */
require('dotenv').config();
const app = express();

const port = process.env.PORTENV || 5000

app.use(cors());
app.use(express.json())

app.use('/api/signout', require('./routes/signout'));
app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/user', Authenticate, require('./routes/user'));
app.use('/api/todo', Authenticate, require('./routes/todo'));
app.use('/api/refreshtoken', require('./routes/refreshToken'))


app.get('/', (req,res)=>{
    res.send('Hello world')
})

app.listen(port, ()=>{
    console.log('Server listening on port '+port)
})