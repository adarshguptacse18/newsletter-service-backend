const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const subscriptionService = require('./services/subscriptionService');
const postService = require('./services/postService');
const userService = require('./services/userService');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log("System is healthy");
    res.status(200).send('Hello World');
});

app.post('/subscription/subscribe', async (req, res, next) => {
    try {
        const { userId, topicId } = req.body;
        const subscription = await subscriptionService.subscribe(userId, topicId);
        res.status(200).send(subscription);
    } catch (err) {
        next(err);;
    }
});

app.get('/subscription/getUsersByTopicId/:topicId', async (req, res, next) => {
    try {
        const { topicId } = req.params;
        const users = await subscriptionService.getUsersByTopicId(topicId);
        res.status(200).send(users);
    } catch (err) {
        next(err);;
    }
});
app.post('/post/schedule', async (req, res, next) => {
    try {
        const { content, title, topic_id, scheduled_at } = req.body;
        const post = await postService.create({ content, topic_id, scheduled_at, title });
        res.status(200).send(post);
    } catch (err) {
        next(err);;
    }
});

app.get('/post/get/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await postService.findById(id);
        res.status(200).send(post);
    } catch (err) {
        next(err);;
    }
});

app.post('/createUser', async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userService.create({ email });
        res.status(200).send(user);
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


module.exports = app;