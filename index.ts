import { Client } from 'cassandra-driver';
import { insertStudent } from './src/insert.ts';
import { selectStudentById, selectAllStudents } from './src/select.ts';
import { updateStudentFirstName } from './src/update.ts';
import { deleteStudent } from './src/delete.ts';

// Environment variables
const contactPoints = process.env.CASSANDRA_CONTACT_POINTS?.split(',') || ['localhost:9042'];
const localDataCenter = process.env.CASSANDRA_LOCAL_DC || 'datacenter1';
const keyspace = process.env.CASSANDRA_KEYSPACE || 'uniasselvi';
const username = process.env.CASSANDRA_USER || 'cassandra';
const password = process.env.CASSANDRA_PASSWORD || 'cassandra';

async function main() {
  // Connect directly with keyspace (init.sh already created it)
  const client = new Client({
    contactPoints,
    localDataCenter,
    keyspace,
    credentials: {
      username,
      password,
    },
  });

  try {
    await client.connect();
    console.log('Connected to Cassandra');

    // CREATE: Insert a student
    const studentId = await insertStudent(client, 'John', 'Doe', 10, 'john@example.com');
    console.log('Student created with ID:', studentId);

    // READ: Select the student
    const student = await selectStudentById(client, studentId);
    console.log('Student read:', student);

    // UPDATE: Update the student's first name
    await updateStudentFirstName(client, studentId, 'Jane');
    console.log('Student updated');

    // READ: Select updated student
    const updatedStudent = await selectStudentById(client, studentId);
    console.log('Updated student:', updatedStudent);

    // DELETE: Delete the student
    await deleteStudent(client, studentId);
    console.log('Student deleted');

    // READ: Verify all students
    const allStudents = await selectAllStudents(client);
    console.log('All students:', allStudents);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    try {
      await client.shutdown();
    } catch (e) {
      // Already closed
    }
    console.log('Connection closed');
  }
}

main();
