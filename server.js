const app = require('express')();
require('dotenv').config();

app.get('/', (req, res) => {
    
});

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});