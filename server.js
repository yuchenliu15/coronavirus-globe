const app = require('express')();
require('dotenv').config();
const getVirusData = require('./operations/data');

app.get('/', (req, res) => {

    getVirusData()
        .then(result => {
            res.send(result);
        });
});

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});