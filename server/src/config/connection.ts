import { Sequelize } from "sequelize";

let client: any;

client = process.env.DB_URL ? new Sequelize(process.env.DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}) : new Sequelize({
  username: 'postgres',
  password: 'pass',
  database: 'wine_database_2',
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

export default client;