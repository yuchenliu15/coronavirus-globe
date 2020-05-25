const app = require('express')();
require('dotenv').config();
const getVirusData = require('./operations/data');
const Location = require('./operations/database').Location;

const executeTime = 1440 * 60 * 1000;

const updateDB = () => {
    getVirusData()
        .then(result => {
            result.forEach(data => {
                console.log(data)
                //Location.create(data.name, data.lat, data.lng, data.size);
            });
        })
        .then(()=>{
            console.log('success data')
        })
        .catch((e)=>{
            console.error(e);
        });
}
updateDB();
setInterval(updateDB, executeTime);

app.get('/', (req, res) => {

    Location.all((error,data)  => {
        if(error) console.error(error)
        console.log(data);
    });

});

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});