/* fetch('http://lab.isaaclin.cn/nCoV/api/area?latest=0')
.then(res => {
    res.json()
    .then(data => {
        console.log(data);
    })
}); */


/* const api_key = 'AIzaSyDGniKf9hyWWfJf3-1b7A5FOV6jlIfqtig';
const search_location = 'germany';

const geocode_map = `https://maps.googleapis.com/maps/api/geocode/json?address=${search_location}&key=${api_key}`

fetch(geocode_map)
.then(res => {
    res.json()
    .then(data => {
        console.log(data);
    })
}); */

//test on 
const data = require('./coronavirus_api.json');

let new_list = [];
data.forEach((item) => {
    if ('cities' in item && item['cities'] !== null) {
        try {
            item['cities'].forEach((city_item) => {
                new_list.push(
                    {
                        'name': city_item['cityEnglishName'],
                        'count': city_item['confirmedCount']
                    });
            });
        } catch (e) {
            console.log('ERROR: ' + item)
            console.log(e);
        }

    }
    else {
        new_list.push({
            'name': item['provinceEnglishName'],
            'count': item['confirmedCount']
        });
    }
});

console.log(new_list);