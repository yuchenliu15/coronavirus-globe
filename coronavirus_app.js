function fetch_coronavirus_data(){
    fetch('http://lab.isaaclin.cn/nCoV/api/area?latest=0')
    .then(res => {
        res.json()
        .then(data => {
            filter_data(data);
        })
    });
}

//filter full API data into a list with objects each with name of the area 
//and the count of coronavirus discovered
function filter_data(data) {
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
}

export default fetch_coronavirus_data;