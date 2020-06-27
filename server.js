const express = require('express');
const app = express();
require('dotenv').config();
const getVirusData = require('./operations/data');
const path = require('path');
const database = require('./operations/database');
const Location = require('./operations/database').Location;

const executeTime = 1440 * 60 * 1000;

const forEachData = (result) => {
    result.forEach((data) => {
        if (data) {
            Location.create(data, []);
        }
    });
}

const updateDB = async () => {
    const data = await getVirusData();
    forEachData(data);
}
if (process.env.NODE_ENV === "production") {
    updateDB(); //get data as soon as start running
}
setInterval(updateDB, executeTime);

app.use('/public', express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '/index.html'));

});

app.get('/data', (req, res) => {
    database()
        .then(() => {
            Location.all((error, data) => {
                if (error) console.error(error)
                res.json(data);
            });

        });

});

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});