https://github.com/rabbitmq/rabbitmq-delayed-message-exchange?tab=readme-ov-file

https://www.cloudamqp.com/blog/rabbitmq_delayed_message_exchange_plugin_with_node_js.html

https://stackcoder.in/posts/install-rabbitmq-with-docker-running-with-nodejs

https://www.rabbitmq.com/docs/plugins#plugin-directories

docker run --name rabbit-mq --rm -it -p 15672:15672 -p 5672:5672 rabbitmq:3-management

docker exec -it rabbit-mq /bin/bash

docker cp /home/chillhai/Downloads/rabbitmq_delayed_message_exchange-3.13.0.ez rabbit-mq:///opt/rabbitmq/plugins rabbitmq_delayed_message_exchange.ez

rabbitmq-plugins enable rabbitmq_delayed_message_exchange





