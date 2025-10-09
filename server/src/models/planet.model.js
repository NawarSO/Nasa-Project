const {parse} = require('csv-parse');
const fs = require('fs')
const path = require('path'); 
const habitablePlanet = [];
const planets = require('./planets.mongo')



function isHabitable(planet){
        return planet['koi_disposition'] === 'CONFIRMED' 
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 
        && planet['koi_prad'] < 1.6
    }

function loadPlanets() {
    return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv')).pipe(parse({
    comment: '#',
    columns: true,
    }))
    .on('data',async (data)=>{
        if(isHabitable(data)) {
            savePlanet(data);
        }
    }).on('error',(err) =>{
        console.log(`error had been happen ${err}`);
        reject(err);
    }).on('end', async ()=>{
        const countPlanetsFound = (await getAllPlanets()).length ;
        console.log(`we have ${countPlanetsFound} habitable planet`);
        resolve();
    });
})};

async function getAllPlanets(){
    return await planets.find({},{'_id': 0, '__v':0});
}
async function savePlanet(planet){
try{
    await planets.updateOne({
        keplerName: planet.kepler_name,
    }, {
        keplerName: planet.kepler_name
    }, {
        upsert: true
        });} catch(err){
        console.log(`error has been happend while updating the habitable planets ... ${err}`)
}
};




module.exports = {
    getAllPlanets,
    loadPlanets,
};