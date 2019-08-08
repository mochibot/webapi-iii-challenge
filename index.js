// code away!
require('dotenv').config();
const api = require('./server');

if (process.env.NODE_ENV === "production") {
  //serve any static files
  api.use(express.static(path.join(__dirname, 'client/build')));
  
  //handle react routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

let port = process.env.PORT || 8000;
api.listen(port, () => console.log(`listening on port ${port}`));