const receive = [
    {
        "name": "Guam",
        "count": 3
    },
    {
        "name": "Israel",
        "count": 337
    },
    {
        "name": "Slovakia",
        "count": 97
    },
]
/* const gData = [{
    lat: 51,
    lng: 10,
    size: Math.random(),
},
{
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: Math.random(),
},
*/
const api_key = 'AIzaSyBfNl1mn143JBKW9uyBbZGqkbf_HFPXoW8';

/* const globe_data = */

const globe_data = async (countries_counts) => {
    const country_location = countries_counts.map(async (item) => {
        const geocode_map = `https://maps.googleapis.com/maps/api/geocode/json?address=${item['name']}&key=${api_key}`;
        const promise_return = await fetch(geocode_map)
            .then(res => res.json())
            .then(data => {
                return {
                    lat: data['results'][0]['geometry']['location']['lat'],
                    lng: data['results'][0]['geometry']['location']['lng'],
                    size: 1,
                };
            });
        return promise_return;
    });
    const temp = await Promise.all(country_location)
    return temp;

}


console.log(globe_data(receive));

