import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Check connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL via Sequelize");
  } catch (error) {
    console.error("Connection error:", error);
  }
})();
