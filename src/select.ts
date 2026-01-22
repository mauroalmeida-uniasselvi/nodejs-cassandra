import { Client } from 'cassandra-driver';

interface Student {
  student_id: string;
  first_name: string;
  last_name: string;
  grade: number;
  email: string;
}

export async function selectStudentById(client: Client, id: string): Promise<Student | null> {
  const result = await client.execute(
    'SELECT student_id, first_name, last_name, grade, email FROM students WHERE student_id = ?',
    [id],
    { prepare: true }
  );
  if (result.rows.length === 0) {
    return null;
  }
  const row = result.rows[0];
  return {
    student_id: row.student_id.toString(),
    first_name: row.first_name,
    last_name: row.last_name,
    grade: row.grade,
    email: row.email,
  };
}

export async function selectAllStudents(client: Client): Promise<Student[]> {
  const result = await client.execute(
    'SELECT student_id, first_name, last_name, grade, email FROM students ALLOW FILTERING',
    [],
    { prepare: true }
  );
  return result.rows.map((row) => ({
    student_id: row.student_id.toString(),
    first_name: row.first_name,
    last_name: row.last_name,
    grade: row.grade,
    email: row.email,
  }));
}
