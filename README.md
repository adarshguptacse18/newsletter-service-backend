# Newsletter-subscription-backend

This is an implementation of newsletter-backend-service in which users can send pre-decided content to a specific set of users at specified time / interval. 

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Start the DB: Create an instance of postgres and run init.sql from backend/db/init.sql and jobs/db/init.sql
3. Start the Rabbit-mq queue by running rabbit-mq/run.sh 
4. Do the following for both backend folder and jobs folder
   1. Create a new `.env` file using a text editor or by running the following command:
       ```bash
       touch .env
       ```
   2. Open the .env file in a text editor and add the following variables:
   3. Copy code
      ```
      POSTGRES_USER=
      POSTGRES_PASSWORD=
      POSTGRES_HOST=
      POSTGRES_PORT=
      QUEUE_URL= 
      EMAIL_SERVICE_USERNAME=
      EMAIL_SERVICE_PASSWORD=
      ``` 
    4. Install dependencies:
       ```bash
       npm install
       ```
5. Start the server:
   ```bash
   # inside backend folder
   node app.js
   # inside jobs folder
   node emailSenderProcessor.js
   node topicSubscriberContentProcessor.js
   ```

## API Endpoints

### Health Check

- **GET /healthcheck**
  - *Summary*: Health check endpoint
  - *Description*: Returns a success message indicating that the system is healthy

### User

- **POST /createUser**
  - *Summary*: Create a user
  - *Description*: Creates a new user with the specified email


### Subscription

- **POST /subscription/subscribe**
  - *Summary*: Subscribe to a topic
  - *Description*: User subscribes to a topic

- **GET /subscription/getUsersByTopicId/{topicId}**
  - *Summary*: Get users by topic ID
  - *Description*: Retrieves a list of users subscribed to a specific topic

### Post

- **POST /post/schedule**
  - *Summary*: Schedule a post
  - *Description*: Creates a new post with the specified content, title, topic ID, and scheduled date

- **GET /post/get/{id}**
  - *Summary*: Get post by ID
  - *Description*: Retrieves a post by its ID


## Swagger Documentation

API documentation is available using Swagger UI at `/api-docs`.

## Design Description
 **Queue Mechanism:**
   - Technology: Rabbit-mq with [delayed-exchange-message](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange) plugin. 
   - When a post is scheduled, it is inserted into a posts queue
   - A background job retrieves posts from the queue and identifies users subscribed to the corresponding topic. It then inserts {postId, userId, content, email, etc} into another queue.
   - An email queue sends emails to users based on the postId and userId.

**Idempotency and Reliability:**
   - To ensure at-most-once delivery of emails, before sending email a unique entry is created into DB.
   - Post creation is synchronized with queue insertion to guarantee that posts are only created after being successfully added to the queue, preventing scenarios where posts are created but not sent. One pitfall, if post commit failed in DB but still can be sent to queue. But this won't trigger any emails because, when the job will try to fetch details for this post, this post won't be present. 

**Extensibility**
  - If in future, we require newsletter to be personalised like more in starting Hi #{username}, then that is possible in current mechanism. While processing messages from emails queue, we can render the content with the user's data and push it to the emails queue. 

## Future Scope:
 - Add metrics of successful updates of mail sent for owners of the service
 - Analytics for the posts: Views, readtime, etc 
