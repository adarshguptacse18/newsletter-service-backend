const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const subscriptionService = require('./services/subscriptionService');
const postService = require('./services/postService');
const userService = require('./services/userService');

const app = express();

app.use(bodyParser.json());

console.log(swaggerSpec);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 * @swagger
 * /healthcheck:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns a success message indicating that the system is healthy
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
app.get('/healthcheck', (req, res) => {
    console.log("System is healthy");
    res.status(200).send('System is running');
});

/**
 * @swagger
 * /subscription/subscribe:
 *   post:
 *     summary: Subscribe to a topic
 *     description: User subscribes to a topic
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 2
 *               topicId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   example: 2
 *                 topicId:
 *                   type: integer
 *                   example: 3
 *     example:
 *       request:
 *         body:
 *           userId: 2
 *           topicId: 3
 *       response:
 *         body:
 *           subscription:
 *             userId: 2
 *             topicId: 3
 */
app.post('/subscription/subscribe', async (req, res, next) => {
    try {
        const { userId, topicId } = req.body;
        const subscription = await subscriptionService.subscribe(userId, topicId);
        res.status(200).send(subscription);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /subscription/getUsersByTopicId/{topicId}:
 *   get:
 *     summary: Get users by topic ID
 *     description: Retrieves a list of users subscribed to a specific topic
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: object
 *     example:
 *       request:
 *         params:
 *           topicId: 2
 *       response:
 *         body:
 *           - user:
 *               userId: "user123"
 *               email: "user@example.com"
 */
app.get('/subscription/getUsersByTopicId/:topicId', async (req, res, next) => {
    try {
        const { topicId } = req.params;
        const users = await subscriptionService.getUsersByTopicId(topicId);
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /post/schedule:
 *   post:
 *     summary: Schedule a post
 *     description: Creates a new post with the specified content, title, topic ID, and scheduled date
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               title:
 *                 type: string
 *               topic_id:
 *                 type: integer
 *               scheduled_at:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: object
 *     example:
 *       request:
 *         body:
 *           content: "Lorem ipsum dolor sit amet"
 *           title: "Sample Post"
 *           topic_id: "topic123"
 *           scheduled_at: "2022-01-01T12:00:00Z"
 *       response:
 *         body:
 *           post:
 *             postId: "post123"
 *             content: "Lorem ipsum dolor sit amet"
 *             title: "Sample Post"
 *             topicId: "topic123"
 *             scheduledAt: "2022-01-01T12:00:00Z"
 */
app.post('/post/schedule', async (req, res, next) => {
    try {
        const { content, title, topic_id, scheduled_at } = req.body;
        const post = await postService.create({ content, topic_id, scheduled_at, title });
        res.status(200).send(post);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /post/get/{id}:
 *   get:
 *     summary: Get post by ID
 *     description: Retrieves a post by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: object
 *     example:
 *       request:
 *         params:
 *           id: "post123"
 *       response:
 *         body:
 *           post:
 *             postId: "post123"
 *             content: "Lorem ipsum dolor sit amet"
 *             title: "Sample Post"
 *             topicId: "topic123"
 *             scheduledAt: "2022-01-01T12:00:00Z"
 */
app.get('/post/get/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await postService.findById(id);
        res.status(200).send(post);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /createUser:
 *   post:
 *     summary: Create a user
 *     description: Creates a new user with the specified email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *     example:
 *       request:
 *         body:
 *           email: "user@example.com"
 *       response:
 *         body:
 *           user:
 *             userId: "user123"
 *             email: "user@example.com"
 */
app.post('/createUser', async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userService.create({ email });
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json(err.message);
});

const PORT = process.env.PORT | 5000;
app.listen(PORT, function () {
    console.log(`Express App running at http://127.0.0.1:${PORT}/`);
});

module.exports = app;