CREATE KEYSPACE IF NOT EXISTS uniasselvi
WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': 1 };

USE uniasselvi;

CREATE TABLE IF NOT EXISTS students (
    student_id UUID PRIMARY KEY,
    first_name text,
    last_name text,
    grade int,
    email text
);

-- Create index on email for efficient lookups
CREATE INDEX IF NOT EXISTS students_email_idx ON students (email);
