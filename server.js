require('dotenv').config();
const express = require('express');
//var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dns = require('dns');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl/new', (req, res)=> {
  const {url} = req.body;
  dns.lookup(url, (err,addresses,family)=>{
    if(err){
      return res.json({
          error: "invalid URL"
        })
    }
  })
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
