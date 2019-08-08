// code away!
require('dotenv').config();
const api = require('./server');

let port = process.env.PORT || 8000;
api.listen(port, () => console.log(`listening on port ${port}`));