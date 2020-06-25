const jwt = require("jsonwebtoken")
const User = require("../models/user"
)
exports.loginRequired = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
            return res.status(401).json({ status: "fail", error: "unauthorized" })
        }
        const token = req.headers.authorization.replace("Bearer ","");
        const decoded = jwt.verify(token, process.env.SECRET);
    
        const user = await User.findById(decoded._id);
        if(!user) 
        return res.status(401).json({ status: "fail", error: "unauthorized" })
    
        req.user = user
        next()
    } catch (err) {
        return res.status(401).json({ status: "fail", error: err.message })
    }
}