// code away!
require('dotenv').config();
const path = require('path');
const api = require('./server');

if (process.env.NODE_ENV === 'production') {
  api.use(express.static(path.join(__dirname, 'client/build')))

  api.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  })
}

let port = process.env.PORT || 8000;
api.listen(port, () => console.log(`listening on port ${port}`));