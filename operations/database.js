const knex = require('knex');
const e = require('express');

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'location.sql'
    },
    useNullAsDefault: true
});

module.exports = () => {
    return db.schema.hasTable('locations')
        .then(exists => {
            if (!exists) {
                return db.schema.createTable('locations', table => {
                    table.text('name').primary();
                    table.real('lat');
                    table.real('lng');
                    table.float('size');
                });
            }
            else {
                return ; //promise success signal
            }

        });
};

module.exports.Location = {
    all(callback) {
        return db('locations').select().asCallback(callback);
    },
    create(data, callback) {
        return db('locations').insert({
            name: data.name,
            lat: data.lat,
            lng: data.lng,
            size: data.size
        })
            .asCallback(callback);
    }

};