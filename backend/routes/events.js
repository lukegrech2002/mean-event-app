const express = require("express");

const Event = require('../models/event');

const router = express.Router();

router.post("", (req, res, next) => {
    const event = new Event({
      name: req.body.name,
      date: req.body.date,
      location: req.body.location,
      weather: req.body.weather
    });
    event.save().then(createdEvent => {
      res.status(201).json({
          message: 'Event added successfully',
          eventId: createdEvent._id
      });
    });
  });
  
router.put("/:id", (req, res, next) => {
    const event = new Event({
        _id: req.body.id,
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        weather: req.body.weather  
    });
    Event.updateOne({_id: req.params.id}, event).then(result => {
        console.log(result);
        res.status(200).json({message: 'Update successful'});
    })
});

router.get("", (req, res, next) => {
Event.find().then(documents => {
        res.status(200).json({
            message: "Events fetched successfully!",
            events: documents
        });
    })
    .catch(err => {
        console.log("Error:" + err);
    })
});

router.get("/:id", (req, res, next) => {
    Event.findById(req.params.id).then(event => {
        if (event){
            res.status(200).json(event)
        } else {
            res.status(404).json({message: 'Event not found'});
        }
    })
});

router.delete("/:id", (req, res, next) => {
    Event.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({message: "Event Deleted"});
    });
});

module.exports = router;