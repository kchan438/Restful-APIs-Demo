const express = require("express");
const app = express();

app.use((req, res, next) => {
  //middleware gets applied to all handlers
  //gets called before the callback on each handler
  console.log('Request incoming');
  console.log(req.originalUrl);
  console.log(req.headers['user-agent']);
  next();
});

//parse body to json; a string of information
app.use(express.json());

// Todo: Make endpoints

//body should have json****
app.post('/createListing', (req, res) => {
  console.log(req.body);
});

//returns all listings
app.get('/viewListings', (req, res) => {
  console.log(`Here is the listing:\n${req.body}`);
});

//returns all listings only by matching type
app.get('/viewListing?type=<type>', (req, res) => {

});

//delete listing by uid
app.post('/deleteListing?id=<id>', (req, res) => {

});

//make inquiry(like comment to ask about listing)
app.post('/makeInquiry', (req, res) => {
  //body should have json
  //keys: message
});

////returns all inquiries for a listing
app.get('/getInquiries?listingId=<listingId>', (req, res) => {
  
});

module.exports = app;

if (require.main === module) {
  console.log('Starting app');
  app.listen(4000);
}


