const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

mongoose.connection.once('open', () => {
    console.log("DB connection ready"); 
});

mongoose.connection.on('error', (err) =>{
    console.log(`Error has been happen ${err}`);
})

async function mongoConnect () {
        await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    //    useFindAndModify: false,
    //    useCreateIndex: true,
    });
}
async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}