const User = require("../models/user.model");
const secrete = process.env.SECRETE_KEY;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
    registerUser: async (req, res) => {
        try {
            // * Check if the email that was sent in the request already exists in the database
            const potentialUser = await User.findOne({email: req.body.email})
            if(potentialUser){
                res.status(400).json({message: "Email already exists"})
            }else{
                //* create the user
                const newUser = await User.create(req.body);
                //* Generating a user token
                const userToken = jwt.sign({_id: newUser._id, email: newUser.email, firstName: newUser.firstName, lastName: newUser.lastName}, secrete, {expiresIn: '1h'});
                console.log(userToken);
                //* sending user data back to the client
                res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge:2 * 60 * 60 * 1000}).json(newUser);
            }
        }
        catch(err){
            res.status(400).json({error: err});
        }
    },
    loginUser: async (req, res) => {
        try{
            const potentialUser = await User.findOne({email: req.body.email});
            if(potentialUser){
                const passwordsMatch = await bcrypt.compare(req.body.password, potentialUser.password)
                if(passwordsMatch){
                    const userToken = jwt.sign({_id: potentialUser._id, 
                        email: potentialUser.email,
                        firstName: potentialUser.firstName, 
                        lastName: potentialUser.lastName}, 
                        secrete, {expiresIn: '1h'});
                    console.log(userToken)
                    res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge:2 * 60 * 60 * 1000}).json(potentialUser);
                }
                else {
                    res.status(400).json({message: 'Invalid Email/Password'});
                }
            }
            else {
                res.status(400).json({message: 'Invalid Email/Password'});
            }
        }
        catch(err){
            res.status(400).json({error: err});
        }
    },
    logoutUser: (req, res) => {
        res.clearCookie('userToken');
        res.sendStatus(200).json({message: 'Logged out successfully'});
    }
}

module.exports.getAllUsers = (req, res) => {
    User.find()
        .then(allUsers => res.json(allUsers))
        .catch(err => res.json(err));
}

module.exports.getOneUser = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(oneUser => res.json(oneUser))
        .catch(err => res.json(err));
}
