//importing axios library
const axios = require('axios');

//promise; if server is running, it'll return back the data with res.send(res.data)
axios.get('http://localhost:3000')
    .then((res) => {
        console.log(res.data);  //gives res.send('Hello World);
    })
    .catch((error) => {
        console.log(error);
    });

const body = {
    title: 'Specialized Bike 2021 Model',
    description: 'Has disc brakes and flipper shifters',
    price: '$5000',
    type: 'bike',
    uid:'12345678' 
};

//creates listing based off user description
axios.post('http://localhost:3000/createListing', body)
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.log(error);
    });