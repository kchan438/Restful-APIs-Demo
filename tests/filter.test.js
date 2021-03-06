const request = require("supertest");
const app = require('../server/server.js');

const randomType = Math.random();

describe("Filter", () => {
  test("Test filter", done => {
    const testApp = request(app);
    testApp
      .post('/api/createListing')
      .send({
        description: 'This is my item for sale.',
        type: randomType,
        price: 123,
        title: 'Gym equipment for sale.',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data.success === true);
        expect(data.items.length === 1);
        expect(data.items[0].type === randomType);
        expect(data.items[0].price === '123');
        expect(data.items[0].id.length === 8);
        console.log(data);
      })
      .then(() => testApp.get('/api/viewListings?type=furniture'))
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data.success === true);
        expect(data.items.length === 0);
        done();
      })
      .then(() => testApp.get(`/api/viewListings?type=${randomType}`))
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data.success === true);
        expect(data.items.length === 1);
        done();
      });
  });
});