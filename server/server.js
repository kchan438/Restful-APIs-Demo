const express = require('express');
const app = express();

//parse body to json; a string of information
app.use(express.json());

// Todo: Make endpoints

const allListings = [];
const allInquiries = [];

const body = {
  title: null,
  description: null,
  price: null,
  type: null,
  uid: 0
};

var response = {
  success: false,
  items: allListings,
  inquiries: allInquiries,
  errorCode: 404
}

app.post('/createListing', (req, res) => {
  // var responseCode = {
  //   success: true,
  //   items: allListings,
  //   inquiries: allInquiries,
  //   errorCode: 404
  // }
  // var bodyText = new body();
  // bodyText.description = req.data.description;
  // bodyText.type = req.data.type;
  // bodyText.title = req.data.title;
  // bodyText.price = req.data.price;
  // bodyText.uid++;
  // items.push(bodyText);
  res.status(200).send();
  console.log(res.statusCode);
  console.log('createlisting');
  // console.log(req.body);
});

//default route
app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify(response));
  console.log(res.statusCode);
});

//for random endpoint entered
app.get('*', (req, res) => {
  res.status(200).send(JSON.stringify(response));
  console.log(res.statusCode);
});



module.exports = app;

if (require.main === module) {
  console.log('Starting app');
  app.listen(3000);
}