const sqlite3 = require('sqlite3').verbose();
const dbName = 'location.sql';
const db = new sqlite3.Database(dbName);

db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXIST locations
        (lat REAL PRIMARY KEY, lng REAL, size INTEGER)
    `;
    db.run(sql);
});

class Location {
    
    static all(callback) {
        db.all('SELECT * FROM locations', callback);
    }

    static create(data, callback) {
        const sql = 'INSERT INTO locations(lat,lng,size) VALUES (?,?,?)';
        db.run(sql, data.lat, data.lng, data.size, callback);
    }

    static update(data, callback) {
        const sql = 'UPDATE locations SET size = ? WHERE id = ?';
        db.run(sql, data.size, data.lat, callback);
    }

}

module.exports = db;
module.exports.Location = Location;