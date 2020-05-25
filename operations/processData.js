const axios = require('axios');
require('dotenv').config();
const Bottleneck = require('bottleneck');

const apiKey = process.env.GOOGLE_API;
const limiter = new Bottleneck({
    minTime: 200
  });

//filter full API data into a list with objects each with name of the area 
//and the count of coronavirus discovered
const filterData = (data) => {

    if (data['data']['results'] === null || data['data']['results'] === undefined) {
        console.log('Empty data');
        return -1;
    }

    data = data['data']['results'];
    const result = [];
    const max = getMaxCount(data);
    const countIndexDigit = 5;

    data.forEach((item) => {
        if ('cities' in item && item['cities'] !== null) {
            try {
                item['cities'].forEach((cityItem) => {
                    if (cityItem['cityEnglishName'] !== null && cityItem['cityEnglishName'] !== undefined) {
                        result.push(
                            {
                                'name': cityItem['cityEnglishName'],
                                'count': parseFloat((cityItem['confirmedCount'] / max).toFixed(countIndexDigit))
                            });
                    }

                });
            } catch (e) {
                console.log('ERROR: ' + item)
                console.error(e);
            }

        }
        else if (item['cities'] !== null && item['provinceEnglishName'] !== undefined) {
            result.push({
                'name': item['provinceEnglishName'],
                'count': parseFloat((item['confirmedCount'] / max).toFixed(countIndexDigit))
            });
        }
    });

    return result;
}

const getMaxCount = (data) => {
    let max = 0;
    data.forEach(item => {
        if ('cities' in item && item['cities'] !== null) {
            try {
                item['cities'].forEach((cityItem) => {
                    max = cityItem['confirmedCount'] > max ? cityItem['confirmedCount'] : max;
                });
            } catch (e) {
                console.log('ERROR: ' + item)
                console.error(e);
            }

        }
        else if (item['cities'] !== null) {
            max = cityItem['confirmedCount'] > max ? cityItem['confirmedCount'] : max;
        }
    });

    return max;
};

const getGeoData = async (name) => {
    
    const url = encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${apiKey}`);
    return axios.get(url);

}

const throttleGetGeoData = limiter.wrap(getGeoData);

const addLocation = async (data) => {

    const countryLocation = data.map(async (item) => {
        const promise = await getGeoData(item['name'])
            .then(res => {
                if(res.status === 200) {
                    //console.log(res)
                    if(res['data']['results'].length !== 0) {
                        return {
                            name: item['name'],
                            lat: res['data']['results'][0]['geometry']['location']['lat'],
                            lng: res['data']['results'][0]['geometry']['location']['lng'],
                            size: item['count'],
                        };
                    }
                } 
                else {
                    console.log(res)
                }

            })
            .catch((e) => {
                console.error(e);
            });
        return promise;
    });

    const all =  await Promise.all(countryLocation);
    return all;
}

module.exports = {
    filterData,
    addLocation
};