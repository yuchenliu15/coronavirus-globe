const axios = require('axios');
const {
    filterData
} = require('./processData');

const getVirusData = async () => {
    try {
        const res = await axios.get('http://lab.isaaclin.cn/nCoV/api/area?latest=1');
        
        filterData(res);
    } catch (e) {
        console.error(e);
    }

}

getVirusData();