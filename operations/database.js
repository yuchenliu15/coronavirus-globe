const sqlite3 = require('sqlite3').verbose();
const dbName = 'location.sql';
const db = new sqlite3.Database(dbName);

db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXISTS locations
        (name TEXT PRIMARY KEY, lat REAL, lng REAL, size FLOAT)
    `;
    db.run(sql);
});

class Location {
    
    static all(callback) {
        db.all('SELECT * FROM locations', callback);
    }

    static create(data, callback) {
        const sql = 'REPLACE INTO locations(name,lat,lng,size) VALUES (?,?,?,?)';
        db.run(sql, data.name, data.lat, data.lng, data.size, callback);
    }
}

module.exports = db;
module.exports.Location = Location;