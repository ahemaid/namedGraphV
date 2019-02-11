var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
  var searchString = ""; 
  if(req.originalUrl.split("search?")[1])
  searchString = req.originalUrl.split("search?")[1] ; 
    res.render('search', {
      title: 'search',
      searchTerm : searchString
    });
  });
  
  module.exports = router;
  