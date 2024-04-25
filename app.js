const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());

app.post('/subscribe', function (req, res) {
    const {userId, topicId} = req.body;
    console.log(`Subscribing user ${userId} to topic ${topicId}`);
    res.send("Subscribed");
})

const PORT = process.env.PORT | 5000;
app.listen(PORT, function () {
    console.log(`Express App running at http://127.0.0.1:${PORT}/`);
})