const express = require('express');
const path = require('path');


require('../training/server/main').listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})

// app.listen(9000);
