const express = require('express');
const {userApi} = require('./API/user.api');

var cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;


const init = async () => {
  // ******************* initialize the APIs *************
  await new userApi(app).init();
  // *****************************************************
}

init().then(() => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});