'use strict';
//travis is bad
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/build`));

app.listen(PORT, function(){
  console.log('server up:', PORT);
});
