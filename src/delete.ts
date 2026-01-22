import { Client } from 'cassandra-driver';

export async function deleteStudent(client: Client, id: string): Promise<void> {
  await client.execute(
    'DELETE FROM students WHERE student_id = ?',
    [id],
    { prepare: true }
  );
}

export async function deleteAllStudents(client: Client): Promise<void> {
  await client.execute(
    'TRUNCATE students',
    [],
    { prepare: false }
  );
}
