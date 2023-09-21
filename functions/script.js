// Requiring express in our server
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
// Defining get request at '/' route
app.use(cors({
    origin: '*'
}));
app.get('/', function (req, res) {
    res.json({
        number: 1
    });
});

// Defining get request at '/multiple' route
app.get('/get', async function (req, res) {
    let url = req.query.url;
    console.log(url);
    // Make an HTTP GET request with the provided URL and request body
    let resData = await axios.get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
    res.send(resData);
});

// Defining get request at '/array' route
app.post('/post', async function (req, res) {
    let url = req.query.url;
    console.log(url);
    console.log("body:" + req.body);
    // Make an HTTP GET request with the provided URL and request body
    let resData = await axios.post(url, { data: req.body })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
    console.log("body:" + JSON.stringify(resData));
    res.send(resData);
    //res.json(resData);
});

// Setting the server to listen at port 3000
app.listen(3009, function (req, res) {
    console.log("Server is running at port 3000");
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app)