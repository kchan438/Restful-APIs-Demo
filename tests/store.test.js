const request = require("supertest");
const app = require('../server/server.js');

const randomType = Math.random() + '';
const randomPrice = Math.random();

describe("Should Store Data", () => {
  test("Stores an item", done => {
    const testApp = request(app);
    testApp
      .post('/api/createListing')
      .send({
        description: 'This is my item for sale.',
        type: randomType,
        price: randomPrice,
        title: 'Gym equipment for sale.',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data.success === true);
        expect(data.items.length === 1);
        expect(data.items[0].type === randomType);
        expect(data.items[0].price === randomPrice);
        expect(data.items[0].id.length === 8);
        console.log(data.items);
      })
      .then(() => testApp.get('/api/viewListings'))
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        console.log(data.items[0]);
        expect(data.success === true);
        expect(data.items.length === 1);
        expect(data.items[0].type === randomType);
        expect(data.items[0].price === randomPrice);
        expect(data.items[0].id.length === 8);
        done();
      });
  });
});