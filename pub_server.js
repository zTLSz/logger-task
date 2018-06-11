// const express = require('express');
//const path = require('path');
//const app = express();

require('server/main').listen(3000, () => {
  logger.success('Server is running at http://localhost:3000')
})

// app.listen(9000);
