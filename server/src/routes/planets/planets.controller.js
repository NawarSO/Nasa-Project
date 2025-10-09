const {
   getAllPlanets,

} = require('../../models/planet.model');

async function httpGetAllPlanets(req,res){
   res.status(200).json(await getAllPlanets());
}

module.exports = {
   httpGetAllPlanets,
};