const search_location = 'germany';

const geocode_map = `https://maps.googleapis.com/maps/api/geocode/json?address=${search_location}&key=${api_key}`

fetch(geocode_map)
    .then(res => {
        res.json()
            .then(data => {
                console.log(data);
            })
    });