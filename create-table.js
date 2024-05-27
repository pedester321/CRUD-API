import sql from './db.js';

// Now you can use the sql constant to execute queries
async function createTable() {
  await sql`
  CREATE TABLE products (
      id TEXT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price FLOAT NOT NULL,
      description TEXT
  );
`;
  console.log('Tabela Criada');
}

createTable()