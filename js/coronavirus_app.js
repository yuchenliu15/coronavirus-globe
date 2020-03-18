

//filter full API data into a list with objects each with name of the area 
//and the count of coronavirus discovered
function filter_data(data) {
    data = data['results'];
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
        else if (item['cities'] !== null) {
            new_list.push({
                'name': item['provinceEnglishName'],
                'count': item['confirmedCount']
            });
        }
    });

    return new_list;
}

export default filter_data;