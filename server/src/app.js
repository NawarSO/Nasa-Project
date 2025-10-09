const express = require('express');
const planetsRouter = require('./routes/planets/planets.Router');
const launchesRouter = require('./routes/launches/launches.router');
const cors = require('cors');
const path = require("path");
const morgan = require('morgan');
const app = express();

app.use(cors({
    origin:'http://localhost:3000',
}));

app.use(morgan('combined'));

app.use(express.json()); // to parse any JSON data come from requests'
app.use(express.static(path.join(__dirname,"..","public "))); // note there is space after the name public
app.use(planetsRouter); 
app.use('/launches',launchesRouter);
app.use('/',(req,res) => {
    res.sendFile(path.join(__dirname,"..","public ","index.html"));
})

module.exports = app;
