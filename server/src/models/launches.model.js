const launchesDatabase = require('./lunches.mongo.js');
const planets = require('./planets.mongo.js');


const  DEFAULT_FLIGHT_NUMBER = 100;

const launch ={
    flightNumber:100,
    mission: 'Nawar1',
    rocket : 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['NASA', 'ZTM'],
    upcoming: true,
    success: true

}

 async function initializeLaunches() { // used to call saveLaunch(launch);
    try {
        await saveLaunch(launch);
        console.log('Launch saved successfully');
    } catch (error) {
        console.error('Error saving launch:', error);
    }
}

initializeLaunches();

// launches.set(launch.flightNumber, launch);

async function existLauncheWithId(launchId){
    return await launchesDatabase.findOne({
        flightNumber:launchId
    });
}
/*
function getAllLaunches(){
    return Array.from(launches.values());   // review vid 103 06:57
} */
async function getAllLaunches(){
    return await launchesDatabase
        .find({}, {'_id': 0, '__v': 0});
} 

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber'); // it will find all the launches and sort them des then it will get only one (the first one) 

        if(!latestLaunch)
            return DEFAULT_FLIGHT_NUMBER;
    return latestLaunch.flightNumber;
}


async function saveLaunch(launch) { // upsert operation : update if exist and insert if not.
   const planet = await planets.findOne({
    keplerName: launch.target,
   },);
   if(!planet){
        throw new Error('No matching planet found.');
   }
    await launchesDatabase.findOneAndUpdate({ 
        flightNumber: launch.flightNumber, // the key that the compare based on it. 
    }, launch,{ // value what we will save
        upsert: true,
    });
};


async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch,{
        customer: ['Nasa', 'Nawar'],
        upcoming: true,
        success: true,
        flightNumber: newFlightNumber
});
    await saveLaunch(newLaunch);
};

/*
function addNewLaunch(launch){
    latestFlightNumber++;
launches.set(
    latestFlightNumber, // key
    Object.assign(launch, {     // the value but with assigning the latest flight Number to it 
        flightNumber: latestFlightNumber,
        customer: ['Nasa', 'Nawar'],
        upcoming: true,
        success: true,
    }));
}
*/

async function abortLauchById(launchId){
    const aborted =  await launchesDatabase.updateOne({
        flightNumber: launchId,
    },{
        upcoming:false,
        success: false,
    });
    return aborted.acknowledged === true && aborted.modifiedCount === 1;
}




module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existLauncheWithId,
    abortLauchById
}
/*
now I can get the launches using the flight number if I give the number I will get the launch
command: launches.get(100)
will give me the launch 100 details
*/