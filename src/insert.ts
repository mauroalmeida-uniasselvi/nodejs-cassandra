import { Client, types } from 'cassandra-driver';

export async function insertStudent(
  client: Client,
  firstName: string,
  lastName: string,
  grade: number,
  email: string
): Promise<string> {
  const studentId = types.Uuid.random();
  await client.execute(
    'INSERT INTO students (student_id, first_name, last_name, grade, email) VALUES (?, ?, ?, ?, ?)',
    [studentId, firstName, lastName, grade, email],
    { prepare: true }
  );
  return studentId.toString();
}
