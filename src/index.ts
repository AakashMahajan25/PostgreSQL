import { Client } from "pg";

const client = new Client({
  connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres",
});

async function createUsersTable() {
  await client.connect();
  const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );    
    `);
  console.log(result);
}

async function insertDataInTable() {
  await client.connect();
  const result = await client.query(`
      INSERT INTO users (
        id, username, email, password, created_at
      )
      VALUES (
        '1', 'aakash25', 'a@gmail.com', 'helloWorld', '2024-08-17 14:30:00+00'
      )
  `);
  console.log(result);
}

async function viewDataFromTable() {
  await client.connect();
  const result = await client.query(`
    SELECT * FROM users
  `);
  console.log(result);
}

async function getaUser(email: string) {
  await client.connect();
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];
  const result = await client.query(query, values);
  if (result.rows.length > 0) {
    console.log("User Found: ", result.rows[0]);
    return result.rows[0];
  } else {
    console.log("No User found with the given email");
    return null;
  }
}

getaUser("aa@gmail.com");
