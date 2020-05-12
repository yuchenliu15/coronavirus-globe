const axios = require('axios');
const {
    filterData,
    addLocation
} = require('./processData');
require('dotenv').config();
const apiKey = process.env.GOOGLE_API;

const getVirusData = async () => {
    try {
        const res = await axios.get('http://lab.isaaclin.cn/nCoV/api/area?latest=1');
        const filtered = filterData(res);
        const result = await addLocation(filtered, apiKey);
        return result;
    } catch (e) {
        console.error(e);
    }
}

module.exports = getVirusData;
