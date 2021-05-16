const express=require('express');
const {passport}=require('./Passport/passport');
const {generateUserToken,verify}=require('./auth/token');
const {mongoose}=require('./Database/connection');
const dotenv = require('dotenv');
dotenv.config();
var cors = require('cors')
const port=process.env.PORT
const app=express();
app.use(express.json())

app.use(passport.initialize());
app.use(cors())

const loginRoute=require('./routes/login/login.route');
const postRoute=require('./routes/post/post.route');
const profileRoute=require('./routes/profile/profile.route');
const friendsRoute=require('./routes/friends/friends.route');

app.use('/',loginRoute);
app.use('/post',postRoute);
app.use('/profile',profileRoute);
app.use('/friends',friendsRoute);








app.get('/',(req,res)=>{
    console.log('slash',req.user);
    res.send('hey');    
})
// app.get('/profile',(req,res)=>{
//     console.log('/profile',req.user);
//     res.send('profile');
// })


// app.get('/api/secure',
//   verify,
//   (req, res) => {
//     res.send('Secure response from ' + JSON.stringify(req.user));
//   }
// );

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
