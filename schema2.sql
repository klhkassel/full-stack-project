
CREATE TABLE workout_input (
        id serial PRIMARY KEY,
        exercise varchar,
        workout varchar,
        instructions varchar
    );


CREATE TABLE dayofweek (
    id serial PRIMARY KEY,
    dayofweek varchar
);

CREATE TABLE daysOfWeek_Exercises (
    workout_input numeric,
    dayofweek numeric
);