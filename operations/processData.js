

//filter full API data into a list with objects each with name of the area 
//and the count of coronavirus discovered
const filterData = (data) => {

    if(data['data']['results'] === null || data['data']['results'] === undefined) {
        console.log('Empty data');
        return -1;
    }
    
    data = data['data']['results'];
    const result = [];
    let max = 0;

    data.forEach(item => {
        if ('cities' in item && item['cities'] !== null) {
            try {
                item['cities'].forEach((city_item) => {
                    max = city_item['confirmedCount'] > max? city_item['confirmedCount']: max;
                });
            } catch (e) {
                console.log('ERROR: ' + item)
                console.error(e);
            }

        }
        else if (item['cities'] !== null) {
            max = city_item['confirmedCount'] > max? city_item['confirmedCount']: max;
        }
    });

    console.log(max);

    data.forEach((item) => {
        if ('cities' in item && item['cities'] !== null) {
            try {
                item['cities'].forEach((city_item) => {
                    result.push(
                        {
                            'name': city_item['cityEnglishName'],
                            'count': city_item['confirmedCount']/max
                        });
                });
            } catch (e) {
                console.log('ERROR: ' + item)
                console.error(e);
            }

        }
        else if (item['cities'] !== null) {
            result.push({
                'name': item['provinceEnglishName'],
                'count': item['confirmedCount']
            });
        }
    });

    return result;
}

module.exports = {
    filterData
};