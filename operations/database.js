const sqlite3 = require('sqlite3').verbose();
const dbName = 'location.sql';
const db = new sqlite3.Database(dbName);

db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXISTS locations
        (lat REAL, lng REAL, size INTEGER, PRIMARY KEY (lat, lng))
    `;
    db.run(sql);
});

class Location {
    
    static all(callback) {
        db.all('SELECT * FROM locations', callback);
    }

    static create(data, callback) {
        const sql = 'REPLACE INTO locations(lat,lng,size) VALUES (?,?,?)';
        db.run(sql, data.lat, data.lng, data.size, callback);
    }

    static update(data, callback) {
        const sql = 'UPDATE locations SET size = ? WHERE id = ?';
        db.run(sql, data.size, data.lat, callback);
    }

}

Location.create({lat:3,lng:3,size:10},()=>{

})
Location.create({lat:3,lng:4,size:10},()=>{

})
Location.create({lat:4,lng:4,size:2},()=>{

})
Location.all((e, data)=>{
    console.log(data);
})
module.exports = db;
module.exports.Location = Location;