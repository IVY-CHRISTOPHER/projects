const jwt = require("jsonwebtoken");
const secret = process.env.SECRETE_KEY;

module.exports.authenticate = (req, res, next) => {
    console.log("line 5", req.cookies);
    jwt.verify(req.cookies.userToken, secret, (err, payload) => {
    if (err) { 
        res.status(401).json({verified: false});
    } else {
        console.log("line 10", payload);
        next();
    }
    });
}