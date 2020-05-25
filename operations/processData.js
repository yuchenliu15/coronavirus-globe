const axios = require('axios');

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
                                'count': (cityItem['confirmedCount'] / max).toFixed(countIndexDigit)
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
                'count': (item['confirmedCount'] / max).toFixed(countIndexDigit)
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

const addLocation = async (data, apiKey) => {
    const countryLocation = data.map(async (item) => {
        const geocodeMap = encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${item['name']}&key=${apiKey}`);
        const promise = await axios.get(geocodeMap)
            .then(res => {
                if(res) {
                    //console.log(res)
                    return {
                        name: item['name'],
                        lat: res['data']['results'][0]['geometry']['location']['lat'],
                        lng: res['data']['results'][0]['geometry']['location']['lng'],
                        size: item['count'],
                    };
                }

            })
            .catch((e) => {
                console.error(e);
            });
        return promise;
    });

    return await Promise.all(countryLocation);
}

module.exports = {
    filterData,
    addLocation
};