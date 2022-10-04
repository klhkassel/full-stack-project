
CREATE TABLE workout_input (
        id serial PRIMARY KEY,
        category text NOT NULL,
        exercise_type text,
        muscle text,
        difficulty text
    );


CREATE TABLE week (
    id serial PRIMARY KEY,
    monday text,
    tuesday text,
    wednesday text,
    thursday text,
    friday text,
    saturday text
)

CREATE TABLE daysOfWeek_Exercises (
    id serial PRIMARY KEY,
    dayofweek text,
    exercise_type
)