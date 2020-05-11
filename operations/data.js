const axios = require('axios');
const {
    filterData
} = require('./processData');

const fs = require('fs'); //testing

const getVirusData = async () => {
    try {
        const res = await axios.get('http://lab.isaaclin.cn/nCoV/api/area?latest=1');
        fs.writeFile('testing.json', JSON.stringify(filterData(res)), (e)=> {
            if (e)
                console.error(e);
        });
    } catch (e) {
        console.error(e);
    }

}

getVirusData();