import { config } from "dotenv";
import { DataSourceOptions } from "typeorm";

config({ path: ".env" });

export const dataSourceOptions: DataSourceOptions = {
	type: "postgres",
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: ["dist/**/*.entity.js"],
	migrations: ["postgres_db/migrations/*.js"],
	synchronize: false,
};
