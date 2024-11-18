// import * as process from "node:process";
import { DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
	type: "postgres",

	// host: process.env.DB_HOST,
	// port: Number(process.env.DB_PORT),
	// username: process.env.DB_USERNAME,
	// password: process.env.DB_PASSWORD,
	// database: process.env.DB_NAME,

	host: "db",
	port: 5432,
	username: "postgres",
	password: "root",
	database: "library",

	entities: ["dist/**/*.entity.js"],
	migrations: ["postgres_db/migrations/*.js"],
	synchronize: false,
};
