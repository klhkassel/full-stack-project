
CREATE TABLE workout_input (
        id serial PRIMARY KEY,
        name text NOT NULL,
        exercise_type text,
        muscle text,
        difficulty text
    );


CREATE TABLE week (
    id serial PRIMARY KEY,
    sunday text,
    monday text,
    tuesday text,
    wednesday text,
    thursday text,
    friday text,
    saturday text
)