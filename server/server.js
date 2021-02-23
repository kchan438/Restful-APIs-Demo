const express = require('express');
var randomstring = require('randomstring');
const app = express();

//parse body to json; a string of information
app.use(express.json());

// Todo: Make endpoints

var allListings = [];
var allInquiries = [];;
var response = {
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
    id: ''
  };
  body.title = req.body.title;
  body.description = req.body.description;
  body.price = req.body.price;
  body.type = req.body.type;
  body.id = randomstring.generate({
    length: 8,
    charset: 'numeric'
  });
  response.items.push(body);
  console.log(response.items);
  res.status(200).send(JSON.stringify(response));
  console.log('statusCode: ' + res.statusCode);
});

app.get('/api/viewListings', (req, res) => {
  res.status(200).send(JSON.stringify(response));
  // console.log(res.statusCode);
});

app.get('/api/viewListings?type=<type>', (req, res) => {
  var type = req.query.type;
    var filteredArr = [];
    var response2 = {
      success: true,
      items: filteredArr,
      inquiries: allInquiries,
      errorCode: 200,
    };
    var arr = allListings.filter(value => value.type === type);
    for(var i of arr) {
      response2.items.push(i);
    }
    res.status(200).send(JSON.stringify(response2));
});

//even though test passes, still need to implement deleting functionality
app.get('/api/deleteListing?id=<id>', (req, res) => {
  console.log('items length: ' + response.items.length);
  for(var i = 0; i < response.items.length-1; i++) {
    if(response.items[i].id === req.query.id) {
      response.items.splice(i, 1); 
      break;
    }
  }
  res.status(200).send(JSON.stringify(response));
});

app.post('/api/makeInquiry', (req, res) => {
  const listingID = req.query.listingId;
  const reqMessage = req.body.message;
  var inquiry = {
    id: listingID,
    message: reqMessage
  };
  allInquiries.unshift(inquiry);
  res.status(200).send(response);
});

app.get('/api/getInquiries?listingId=<listingId>', (req, res) => {
  const listingID = req.query.listingId;
  var filteredInquiries = [];
  var newResponse = {
    success: true,
    items: allListings,
    inquiries: filteredInquiries,
    errorCode: 200
  }
var arr2 = allInquiries.filter(value => value.id === listingID);
for(var i of arr2) {
  newResponse.inquiries.push(i);
}
  res.status(200).send(JSON.stringify(newResponse));
});

//default route
app.get('/', (req, res) => {
  response.errorCode = 404;
  res.status(200).send(JSON.stringify(response));
  console.log(res.statusCode);
});

//for random endpoint entered
app.get('*', (req, res) => {
  response.success = false;
  response.errorCode = 404;
  res.status(200).send(JSON.stringify(response));
  // console.log(res.statusCode);
  console.log('* is called');
});

module.exports = app;

if (require.main === module) {
  console.log('Starting app');
  app.listen(3000);
}