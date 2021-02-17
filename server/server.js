const express = require('express');
const app = express();

// app.use((req, res, next) => {
//   //middleware gets applied to all handlers
//   //gets called before the callback on each handler
//   console.log('Request incoming');
//   console.log(req.originalUrl);
//   console.log(req.headers['user-agent']);
//   next();
// });

//parse body to json; a string of information
app.use(express.json());

// Todo: Make endpoints

const body = {
  title: null,
  description: null,
  price: null,
  type: null,
  uid: 0
};

//body should have json****
app.post('/createListing', (req, res) => {
  console.log(req.body);
  uid++;
  res.status(200).send('Body received.');
});


//returns all listings
app.post('/api/viewListings', (req, res) => {
  console.log(req.allListings);
  res.status(200).send('allListings received.');
});

//delete listing by uid
app.delete('/api/deleteListing', (req, res) => {
  //req.query.id
});

//make inquiry(like comment to ask about listing)
app.post('/api/makeInquiry', (req, res) => {
  //body should have json
});

////returns all inquiries for a listing
app.get('/api/getInquiries', (req, res) => {
  
});

//default route
app.get('/', (req, res) => {
  res.status(404).send('Hello World!!!');
  console.log(res.statusCode);
});

//for random endpoint entered
app.get('*', (req, res) => {
  res.status(404);
  console.log(res.statusCode);
});

// app.post('/listingB', (req, res) => {
//   console.log(req.response);
//   console.log('Response received.');
// });


module.exports = app;

if (require.main === module) {
  console.log('Starting app');
  app.listen(3000);
}