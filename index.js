var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
const dotenv = require('dotenv');
const formData = require('express-form-data')
var cloudinary = require('cloudinary');
const helmet = require('helmet');
var cors = require('cors')
const { passport } = require('./Passport/passport');
const { generateUserToken, verify } = require('./auth/token');
const { mongoose } = require('./Database/connection');
const express = require('express');
dotenv.config();


if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    // Create a worker
    cluster.fork();
  }
} else {
  // Workers share the TCP connection in this server

//helmet 
//catch 
//cluster 
// console.log(process.env.api_key);
cloudinary.config({
  cloud_name:process.env.cloud_name,
  api_key:process.env.api_key,
  api_secret:process.env.api_secret
});
const PORT =process.env.PORT;
const app = express();
app.use(express.json())
app.use(formData.parse())
// app.use(helmet());
app.use(cors({
  credentials:true
}));
app.use(passport.initialize());
app.use(express.static('public'));
const loginRoute = require('./routes/login/login.route');
const postRoute = require('./routes/post/post.route');
const profileRoute = require('./routes/profile/profile.route');
const friendsRoute = require('./routes/friends/friends.route');
const commentRoute = require('./routes/comment/comment.route');

app.use('/', loginRoute);
app.use('/post', postRoute);
app.use('/profile', profileRoute);
app.use('/friends', friendsRoute);
app.use('/comment', commentRoute);

// app.post('/image-upload', (req, res) => {
//   // console.log(req.body);
//   const values = Object.values(req.files)
//   console.log(values);
//   const promises = values.map(image => cloudinary.uploader.upload(image.path))

//   Promise
//     .all(promises)
//     .then(results => res.json(results))
//     .catch((err) => {
//       // console.log('err line 44',err)
//       res.status(400).json(err)})


//   })




app.get('/', (req, res) => {
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
  // All workers use this port


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})

}