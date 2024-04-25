const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config()

const subscriptionService = require('./services/subscriptionService');

const app = express();

app.use(bodyParser.json());

app.post('/subscribe', async (req, res, next) => {
    try {
        const { userId, topicId } = req.body;
        const subscription = await subscriptionService.subscribe(userId, topicId);
        res.status(200).send(subscription);
    } catch (err) {
        next(err);;
    }
    
 
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json(err.message);
});

const PORT = process.env.PORT | 5000;
app.listen(PORT, function () {
    console.log(`Express App running at http://127.0.0.1:${PORT}/`);
})