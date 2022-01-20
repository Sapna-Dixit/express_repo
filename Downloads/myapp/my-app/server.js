require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT ||8000;
const routes=require('./server/routes/index')
require('./server/mysqlconnection/db');
const cors = require('cors');
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Cache-Control, Pragma, Origin, Authorization, Content-Type, Content-Disposition, X-Requested-With'
  );
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  return next();
});


app.use(routes);

const server = app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})