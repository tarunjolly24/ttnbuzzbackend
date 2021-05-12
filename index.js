const express=require('express');
const {passport}=require('./Passport/passport');
const {generateUserToken,verify}=require('./auth/token');
const {mongoose}=require('./Database/connection');
const dotenv = require('dotenv');
dotenv.config();
var cors = require('cors')
const port=process.env.PORT
const app=express();

app.use(passport.initialize());
app.use(cors())

const loginRoute=require('./routes/login/login.route');

app.use('/',loginRoute);






app.get('/',(req,res)=>{
    console.log('slash',req.user);
    res.send('hey');    
})
app.get('/profile',(req,res)=>{
    console.log('/profile',req.user);
    res.send('profile');
})


app.get('/api/secure',
  verify,
  (req, res) => {
    res.send('Secure response from ' + JSON.stringify(req.user));
  }
);

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
