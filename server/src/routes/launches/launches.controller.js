const {
    getAllLaunches,
    scheduleNewLaunch,
    existLauncheWithId,
    abortLauchById,
} = require('../../models/launches.model');
async function httpGetAllLaunches(req,res){
    return res.status(200).json(await getAllLaunches());   // review vid 105 
}

async function httpPostLaunch (req,res){
    const launch = req.body;
    
    if(!launch.mission || !launch.rocket || !launch.target || !launch.launchDate){
        return res.status(400).json({
            error: "Missing required launch property",
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    if(launch.launchDate.toString() === 'Invalid Date'){
        return res.status(400).json({
            error: "Enter a valid date",
        })
    }
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res){
    const launchId = Number(req.params.id); //  +req.params.id will also make it number without it will not work because the flightNumber is number while the req.params.id is pass in the url as string 
    const existLaunch = await existLauncheWithId(launchId);
    if(!existLaunch){
        return res.status(404).json({
            error: 'Launch not found',
        });
    }
    const aborted = await abortLauchById(launchId);
     if(!aborted){
       return res.status(400).json({
            error: 'Launch not aborted',
        });
    }
     return res.status(200).json({ok:true,});
}

module.exports = {
    httpGetAllLaunches,
    httpPostLaunch,
    httpAbortLaunch
}