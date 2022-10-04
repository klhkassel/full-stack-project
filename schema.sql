CREATE TABLE users (
    id serial PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password TEXT NOT NULL
);

