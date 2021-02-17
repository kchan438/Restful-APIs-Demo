const express = require('express');
const app = express();

//parse body to json; a string of information
app.use(express.json());

// Todo: Make endpoints

var allListings = [];
var allInquiries = [];


app.post('/api/createListing', (req, res) => {
  var response = {
    success: true,
    items: allListings = [],
    inquiries: allInquiries,
    errorCode: 200
  }
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
  var response = {
    success: true,
    items: allListings,
    inquiries: allInquiries,
    errorCode: 200
  }
  res.status(200).send(JSON.stringify(response));
  console.log(res.statusCode);
});



//default route
app.get('/', (req, res) => {
  var response = {
    success: false,
    items: allListings,
    inquiries: allInquiries,
    errorCode: 404
  }
  res.status(200).send(JSON.stringify(response));
  console.log(res.statusCode);
});

//for random endpoint entered
app.get('*', (req, res) => {
  var response = {
    success: false,
    items: allListings,
    inquiries: allInquiries,
    errorCode: 404
  }
  res.status(200).send(JSON.stringify(response));
  console.log(res.statusCode);
});



module.exports = app;

if (require.main === module) {
  console.log('Starting app');
  app.listen(3000);
}