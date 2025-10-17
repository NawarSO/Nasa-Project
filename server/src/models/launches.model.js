const launchesDatabase = require('./lunches.mongo.js');
const planets = require('./planets.mongo.js');
const axios = require('axios');
const {getPagination} = require('./../services/query.js');
const  DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';
/*
const launch ={
    flightNumber:100,   // flight_number
    mission: 'Nawar1',  //name
    rocket : 'Explorer IS1', // rocket.name
    launchDate: new Date('December 27, 2030'), // date_local
    target: 'Kepler-442 b', // not applicable 
    customer: ['NASA', 'ZTM'], // payload.customer for each payload
    upcoming: true, // upcoming
    success: true //success
}
*/
async function populateLaunches(){
    const response = await axios.post(SPACEX_API_URL, {
        query:{},
        options: {
            pagination: false, // to get all of the launches if it is true we will get only 10 launches (one page)
            populate: [
                {
                    path:'rocket',
                    select:{
                        name:1
                    }
                },
                {
                    path:'payloads',
                    select:{
                        'customers': 1
                    }
                }
            ]
        }
    });

    if(response.status !== 200){
        console.log('Problem downloading launch data');
        throw new Error('Launch data download failed');
    }

    const launchDocs = response.data.docs;
    for(launchDoc of launchDocs){
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((paylaod)=> { // flatMap is a function that will take every element in the array and call the callback function for it. so in our example: the payloads array has many elements so for every element it will return it and append it to the array that called customers. 
            return paylaod['customers'];
        })
        const launch = {
            flightNumber: launchDoc ['flight_number'],
            mission: launchDoc ['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers, // it will take the customers auto from the customers list above
        }
        console.log(`${launch.flightNumber} ${launch.mission}`);
        await saveLaunch(launch);
    };
}

async function loadLaunchData(){
    const firstLaunch = await findLaunch({
        flightNumber:1, // 
        rocket: "Falcon 1", //      // get them from request them in postman 
        mission: 'FalconSat'//
    });
    if(firstLaunch){ // in this way we check if the first launch of the space X api found in our db so we don't need to request them again and get them because we already have them.
        console.log('The spaceX Data already loaded');
    } else{
        console.log('Downloading the SpaceX data...');
        await populateLaunches();
    }   
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

async function findLaunch(filter){
    return await launchesDatabase.findOne(filter);
}

async function existLauncheWithId(launchId){
    return await findLaunch({
        flightNumber:launchId
    });
}
/*
function getAllLaunches(){
    return Array.from(launches.values());   // review vid 103 06:57
} */
async function getAllLaunches(skip, limit){
    console.log(`skip is ${skip}`);
    console.log(`limit is ${limit}`);
    return await launchesDatabase
        .find({}, {'_id': 0, '__v': 0})
        .sort({flightNumber: 1})
        .skip(skip)
        .limit(limit);
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
    await launchesDatabase.findOneAndUpdate({ 
        flightNumber: launch.flightNumber, // the key that the compare based on it. 
    }, launch,{ // value what we will save
        upsert: true,
    });
};

async function scheduleNewLaunch(launch) {  
    const planet = await planets.findOne({
        keplerName: launch.target,
       },);
       if(!planet){
            throw new Error('No matching planet found.');
       }
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch,{
        customer: ['Nasa', 'Nawar'],
        upcoming: true,
        success: true,
        flightNumber: newFlightNumber
});
    await saveLaunch(newLaunch);
};

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
    loadLaunchData,
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