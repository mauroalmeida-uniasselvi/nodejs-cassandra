import { Client } from 'cassandra-driver';

export async function updateStudent(
  client: Client,
  id: string,
  firstName: string,
  lastName: string,
  grade: number,
  email: string
): Promise<void> {
  await client.execute(
    'UPDATE students SET first_name = ?, last_name = ?, grade = ?, email = ? WHERE student_id = ?',
    [firstName, lastName, grade, email, id],
    { prepare: true }
  );
}

export async function updateStudentFirstName(
  client: Client,
  id: string,
  firstName: string
): Promise<void> {
  await client.execute(
    'UPDATE students SET first_name = ? WHERE student_id = ?',
    [firstName, id],
    { prepare: true }
  );
}

export async function updateStudentLastName(
  client: Client,
  id: string,
  lastName: string
): Promise<void> {
  await client.execute(
    'UPDATE students SET last_name = ? WHERE student_id = ?',
    [lastName, id],
    { prepare: true }
  );
}

export async function updateStudentGrade(
  client: Client,
  id: string,
  grade: number
): Promise<void> {
  await client.execute(
    'UPDATE students SET grade = ? WHERE student_id = ?',
    [grade, id],
    { prepare: true }
  );
}
