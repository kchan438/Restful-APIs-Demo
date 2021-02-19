const express = require('express');
const app = express();

//parse body to json; a string of information
app.use(express.json());

// Todo: Make endpoints

var allListings = [];
var allInquiries = [];

let response = {
  success: true,
  items: allListings,
  inquiries: allInquiries,
  errorCode: 200
}


app.post('/api/createListing', (req, res) => {
    var body = {
    title: '',
    description: '',
    price: '',
    type: '',
    id: 'kangaroo'
  };
  body.title = req.body.title;
  body.description = req.body.description;
  body.price = req.body.price;
  body.type = req.body.type;
  response.items.push(body);
  res.status(200).send(JSON.stringify(response));
  console.log('statusCode: ' + res.statusCode);
});

app.get('/api/viewListings', (req, res) => {
  response.success = true;
  response.errorCode = 200;
  // console.log('viewListings: ' + allListings[0].type);
  var type = req.query.type;
  // console.log('query type value: ' + type);
  if(type !== null || type !== undefined) {
    var filteredArr = [];
    var response2 = {
      success: true,
      items: filteredArr,
      inquiries: allInquiries,
      errorCode: 200,
    }
    var arr = allListings.filter(value => value.type === type);
    for(var i of arr) {
      response2.items.push(i);
    }
    res.status(200).send(JSON.stringify(response2));
  } else{
    res.status(200).send(JSON.stringify(response));
  }
  // console.log(res.statusCode);
});

//even though test passes, still need to implement deleting functionality
app.get('/api/deleteListing', (req, res) => {
  console.log('items length: ' + response.items.length);
  for(var i = 0; i < response.items.length-1; i++) {
    if(response.items[i].id === req.query.id) {
      response.items.splice(i, 1); 
      break;
    }
  }
  res.status(200).send(JSON.stringify(response));
  console.log(res.statusCode);
});

//default route
app.get('/', (req, res) => {
  errorCode = 200;
  res.status(200).send(JSON.stringify(response));
  console.log(res.statusCode);
});

//for random endpoint entered
app.get('*', (req, res) => {
  response.success = false;
  response.errorCode = 404;
  res.status(200).send(JSON.stringify(response));
  console.log(res.statusCode);
});



module.exports = app;

if (require.main === module) {
  console.log('Starting app');
  app.listen(3000);
}