const app = require('express')();
require('dotenv').config();
const getVirusData = require('./operations/data');
const Location = require('./operations/database').Location;

const executeTime = 1440 * 60 * 1000;

const forEachData = (result) => {
    result.forEach((data)=>{
        if(data) {
            Location.create(data, []);
        }
    });
}

const updateDB = async () => {
    const data = await getVirusData();
    forEachData(data);
}
updateDB();
setInterval(updateDB, executeTime);

app.get('/', (req, res) => {

    Location.all((error,data)  => {
        if(error) console.error(error)
        res.json(data);
    });

});

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});