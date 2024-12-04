const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

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
  `DROP DATABASE notes_db`,
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

    const hashedPassword = await bcrypt.hash("admin", 10);

    // Insert user admin ke dalam tabel users
    const adminQuery = `
      INSERT INTO users (username, name, pekerjaan, email, password, nomor_telepon)
      VALUES ('admin', 'Admin User', 'Admin', 'admin@forumtani.com', ?, '081234567890');
    `;
    await connection.query(adminQuery, [hashedPassword]);

    const gabrielQuery = `
      INSERT INTO users (username, name, pekerjaan, email, password, nomor_telepon)
      VALUES ('gabrielhtg', 'Gabriel Cesar Hutagalung', 'Mahasiswa', 'gabrielhutagalung970@gmail.com', ?, '082165646255');
    `;
    await connection.query(gabrielQuery, [hashedPassword]);

    console.log("Migrasi berhasil!");
  } catch (error) {
    console.error("Terjadi kesalahan saat migrasi:", error);
  } finally {
    await connection.end();
  }
})();
