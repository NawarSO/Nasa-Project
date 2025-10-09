const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber: {type: Number,
        require: true,
    }, 
    mission: {type: String,
        require: true
    },
    launchDate: {type: Date,
        require: true,
    },
    rocket: {
        type: String,
        require: true
    },
    target :{
        type: String,
        require:true
    },
    target:{
        type: String,
        require: true
    },
    upcoming:{
        type: Boolean,
        require: true
    },
     success:{
        type: Boolean,
        require: true,
        default: true
     },
     customers : [String]
});

module.exports = mongoose.model('Launch',launchesSchema);