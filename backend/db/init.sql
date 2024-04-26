
CREATE TABLE "users" (
    "id"  SERIAL PRIMARY KEY,
    "email" text UNIQUE
);

CREATE TABLE
    "subscriptions" (
        "user_id" int, -- user id will be used as partition key to avoid hotspots
        "topic_id" int, -- TODO add foreign key
        PRIMARY KEY ("user_id", "topic_id")
    );
     -- TODO add index of topic_id, user_id


CREATE TABLE "post" (
    "id"  SERIAL PRIMARY KEY,
    "topic_id" int,-- TODO add foreign key
    "user_id" int, -- TODO add foreign key
    "content" text,
    "scheduled_at" timestamp
);

