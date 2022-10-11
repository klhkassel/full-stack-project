
-- CREATE TABLE workout_input (
--         id serial PRIMARY KEY,
--         exercise varchar,
--         workout varchar,
--         instructions varchar
--     );


-- CREATE TABLE dayofweek (
--     id serial PRIMARY KEY,
--     dayofweek varchar

-- );

-- -- DROP TABLE daysOfWeek_Exercises

-- CREATE TABLE daysOfWeek_Exercises (
--     workout_input integer REFERENCES workout_input(id),
--     dayofweek integer REFERENCES dayofweek(id)
-- );


-- CREATE TABLE workoutBenefits (
--     id serial PRIMARY KEY,
--     workout_type varchar  ,
--     benefits varchar
-- )
-- DROP TABLE users

CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar,
    email VARCHAR(50) NOT NULL UNIQUE,
    password TEXT NOT NULL
);