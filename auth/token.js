const jwt = require('jsonwebtoken');





//generate token
exports.generateUserToken=function generateUserToken(req, res) {
    console.log(req.user);
    // console.log(accessToken);
    let payload = {user:req.user}
    let accessToken = jwt.sign(payload, "heymysecret", {
        algorithm: "HS256",
        expiresIn: 999999
    })
    // console.log(accessToken);
    res.cookie("jwt", accessToken);
    res.redirect(`http://localhost:3000/home`);
}






//verify token
exports.verify=function verify (req, res, next){
    console.log(req.headers);
     let accessToken = req.headers.authorization
    if (!accessToken){
        return res.status(403).send()
    }

    let payload
    
    try{
        payload = jwt.verify(accessToken,'heymysecret' );
        console.log("payload",payload);
        req.user=payload;
        next()
    }
    catch(e){
        return res.status(401).send()
    }
}
