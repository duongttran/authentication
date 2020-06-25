const User = require("../models/user")

exports.loginWithEmail = async(req, res, next) => {
    try{
       const {email, password} = req.body
       if(!email || !password){
           return res.status(400).json({
                status: "fail",
                error: "Email, Name, Password are require"
            })
       }

       const user = await User.loginWithEmail(email, password)
       if(!user){
           return res.status(401).json({
            status: "fail",
            message: "Wrong Email or Password"
        })
       }

      



    const token = await user.generateToken()

       res.json({
           status: "success",
           data: {user: user, token: token}
       })
    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.logout = async(req, res, next) => {
    const token = req.headers.authorization.replace("Bearer ","");
    // console.log(token)
    console.log(req.user.tokens)
    req.user.tokens = req.user.tokens.filter(item => item !== token);
    console.log(req.user.tokens)
    await req.user.save();
     res.status(204).json({});
}