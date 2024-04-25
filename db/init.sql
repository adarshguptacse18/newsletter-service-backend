CREATE TABLE
    "subscriptions" (
        "user_id" int, # user id will be used as partition key to avoid hotspots
        "topic_id" int,
        PRIMARY KEY ("user_id", "topic_id")
    );