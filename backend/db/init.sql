
CREATE TABLE "users" (
    "id"  SERIAL PRIMARY KEY,
    "email" text UNIQUE
);

CREATE TABLE "post" (
    "id"  SERIAL PRIMARY KEY,
    "topic_id" int,-- TODO add foreign key
    "user_id" int  REFERENCES "users" ("id"), 
    "title" text,
    "content" text,
    "scheduled_at" timestamp
);

CREATE TABLE
    "subscription" (
        "user_id" int REFERENCES "users" ("id"), -- user id will be used as partition key to avoid hotspots
        "topic_id" int, -- TODO add foreign key
        PRIMARY KEY ("user_id", "topic_id")
    );

CREATE INDEX topic_id_index ON post (topic_id);



