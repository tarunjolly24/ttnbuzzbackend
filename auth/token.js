const jwt = require('jsonwebtoken');





//generate token
exports.generateUserToken=function generateUserToken(req, res) {
    // console.log(req.user);
    // console.log(accessToken);
    let payload = {user:req.user}
    let accessToken = jwt.sign(payload, "heymysecret", {
        algorithm: "HS256",
        expiresIn: '1 day'
    })
    console.log(accessToken);
    res.cookie("jwt",accessToken,{
        httpOnly:false,
        secure:false,
        sameSite:'lax'

    });
    res.cookie("jwt1",accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    });
    res.cookie("jwt2",accessToken,{
        httpOnly:true,
        secure:true,
        sameSite:'none'
    });
    res.cookie("jwt3",accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:'none'
    });
    res.cookie("jwt4",accessToken,{
        httpOnly:true,
        sameSite:'lax'
    });
    res.cookie("jwt5",accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:'none',
        domain:'localhost'

    });
    res.cookie("jwt6",accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:'lax',
        domain:'localhost'

    });
    res.cookie("jwt7",accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:'secure',
        domain:'localhost'

    });
    // res.cookie("jwt6",accessToken,{
    //     httpOnly:true,
    //     secure:process.env.NODE_ENV==='production',
    //     sameSite:'true',
    //     domain:'localhost'

    // });
    res.redirect(`http://localhost:3000/feed`);
}






//verify token
exports.verify=function verify (req, res, next){
    // console.log(req.headers);
     let accessToken = req.headers.authorization
     if(accessToken){
            accessToken=accessToken.split("=")[1];
     }
    if (!accessToken){
        return res.status(403).send("unauthorized")
    }
    // console.log("accesstoken",accessToken);
   
    let payload
    try{
        payload = jwt.verify(accessToken,'heymysecret' );
        // console.log("payload",payload);
        req.user=payload;
        next()
    }
    catch(e){
        return res.status(401).send("unauthorized")
    }
}




