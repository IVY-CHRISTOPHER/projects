const Event = require('../models/event.model');
const jwt = require('jsonwebtoken');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();

//* C

module.exports = {
    createEvent: async (req,res) => {
        try {
            console.log("line 9", req.body);
            //* Adding a foreign key to the request body
            const decodedJWT = jwt.decode(req.cookies.userToken, {complete: true});
            console.log("line 11", decodedJWT.payload);
            req.body.User_Id = decodedJWT.payload._id;
            console.log("line 13", req.body);
            req.body.User_Name = decodedJWT.payload.firstName + " " + decodedJWT.payload.lastName;
            console.log("line 16", req.body);
            req.body.createdAt = month + "-" + day + "-" + year;
            console.log("line 24", req.body);
            const newEvent = await Event.create(req.body);
            res.status(201).json(newEvent);
        }
        catch(err){
            console.log("line 17", err);
            res.status(400).json(err);
        }
    }
}

//* R
module.exports.findAllEvents = (req,res) => {
    Event.find()
        .then((allEvents) => {
            res.json(allEvents)
        })
        .catch((err) => {
            res.json({message: 'Error finding all Events', error: err})
        });
}

module.exports.findOneEvent = (req,res) => {
    Event.findOne({_id: req.params.id})
        .then(event => {
            res.json(event)
        })
        .catch(err => {
            res.json({message: 'Error finding one event', error: err})
        });
}

//* U
module.exports.updateEvent = (req,res) => {
    Event.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(updatedEvent => {
            res.json(updatedEvent)
        })
        .catch (err => {
            res.json({message: 'Error updating Event'})
        });
}

//! Delete
module.exports.deleteEvent = (req,res) => {
    Event.deleteOne({_id: req.params.id})
        .then(deleteConfirm => {
            res.json(deleteConfirm)
        })
        .catch(err => {
            res.json({message: 'Error Deleting Event', error: err})
        });
}