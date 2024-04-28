require('dotenv').config();

const QueueConsumer = require('./queue/consumer');
const QueuePublisher = require('./queue/publisher');

new QueueConsumer("posts").registerAsyncCallback(processPost);
const queuePublisher = new QueuePublisher("emails");

async function fetchPostById(postId) {
    const result = await fetch(
        `${process.env.BACKEND_URL}/post/get/${postId}`,
    );
    return await result.json();
}

async function fetchUsersByTopic(topicId) {
    const result = await fetch(
        `${process.env.BACKEND_URL}/subscription/getUsersByTopicId/${topicId}`,
    );
    return JSON.parse(await result.text());
}

async function processPost(data) {
    try {
        const postId = JSON.parse(data).id;
        const post = await fetchPostById(postId);
        const { id, topic_id, content, title } = post;
        const users = await fetchUsersByTopic(topic_id);
        users.forEach(async (user) => {
            await queuePublisher.sendToQueue({
                email: user.email,
                userId: user.user_id,
                content,
                postId,
                title
            });
            console.log(`Sending post to ${user.email}`);
        });
        // TODO HANDLE RETRIES
    } catch (err) {
        console.log(err)
    }
}


