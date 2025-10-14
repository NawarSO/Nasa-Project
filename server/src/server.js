require('dotenv').config();
const PORT = 8000 || process.env.PORT;
const app = require('./app')
const http = require('http');
const planetModel = require('./models/planet.model');
const {loadLaunchData} = require('./models/launches.model');
const {mongoDisconnect, mongoConnect } = require('./services/mongo')
const server = http.createServer(app);


async function startServer() {
await mongoConnect();
await planetModel.loadPlanets();
await loadLaunchData();

server.listen(PORT, () =>{
    console.log(`Listening on PORT ${PORT} ...`);
});
} 

startServer();
















