const express=require('express');
const {passport}=require('./Passport/passport');
const {generateUserToken,verify}=require('./auth/token');
const {mongoose}=require('./Database/connection');
const dotenv = require('dotenv');
const formData = require('express-form-data')

var cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'ddcgdnhqp', 
    api_key: '394153769529545', 
    api_secret: 'J0GftJkIy8CNtr99kasKroIwmC0' 
  });
dotenv.config();
var cors = require('cors')
const port=5000;
//process.env.PORT
const app=express();
app.use(express.json())
app.use(formData.parse())

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

app.post('/image-upload', (req, res) => {
  const values = Object.values(req.files)
  // console.log(values);
  const promises = values.map(image => cloudinary.uploader.upload(image.path))
  
  Promise
    .all(promises)
    .then(results => res.json(results))
    .catch((err) => {
      // console.log('err line 44',err)
      res.status(400).json(err)})


  })
  






app.get('/',(req,res)=>{
    // console.log('slash',req.user);
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
