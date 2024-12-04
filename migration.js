const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

const queries = [
  `DROP DATABASE IF EXISTS notes_db`,
  `CREATE DATABASE notes_db`,
  `USE notes_db`,
  `CREATE TABLE notes
  (
      id       bigint auto_increment primary key,
      title    text     not null,
      datetime datetime not null,
      note     longtext not null
  )`,
];

(async () => {
  const connection = await mysql.createConnection(config);

  try {
    console.log("Migration dimulai!");

    for (const e of queries) {
      await connection.query(e);
      console.log(`Query berhasil dieksekusi: ${e}\n`);
    }

    console.log("Migrasi berhasil!");
  } catch (error) {
    console.error("Terjadi kesalahan saat migrasi:", error);
  } finally {
    await connection.end();
  }
})();
