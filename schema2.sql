CREATE TABLE Workout Input (
        id serial PRIMARY KEY,
        name text NOT NULL,
        exercise_type text,
        muscle text,
        difficulty text,
    );