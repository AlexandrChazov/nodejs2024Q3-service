const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateTables1732460877511 {
	name = "CreateTables1732460877511";

	async up(queryRunner) {
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "fav-artist" ("id" SERIAL NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_8cff6c5b5647c3d31f6e48322dd" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "fav-album" ("id" SERIAL NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_280e17dae0a9691edca35d2ef09" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "fav-track" ("id" SERIAL NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "PK_65e53bab6c9dbf97d59a685dcde" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
		);

		await queryRunner.query(
			`ALTER TABLE "fav-artist" DROP CONSTRAINT IF EXISTS "FK_e6827071b8418ab7862a276c60b"`,
		);
		await queryRunner.query(
			`ALTER TABLE "fav-album" DROP CONSTRAINT IF EXISTS "FK_0d352c5429938d93eacbb927b28"`,
		);
		await queryRunner.query(
			`ALTER TABLE "album" DROP CONSTRAINT IF EXISTS "FK_3d06f25148a4a880b429e3bc839"`,
		);
		await queryRunner.query(
			`ALTER TABLE "fav-track" DROP CONSTRAINT IF EXISTS "FK_f743febd10a6ecb55153d113457"`,
		);
		await queryRunner.query(
			`ALTER TABLE "track" DROP CONSTRAINT IF EXISTS "FK_997cfd9e91fd00a363500f72dc2"`,
		);
		await queryRunner.query(
			`ALTER TABLE "track" DROP CONSTRAINT IF EXISTS "FK_b105d945c4c185395daca91606a"`,
		);

		await queryRunner.query(
			`ALTER TABLE "fav-artist" ADD CONSTRAINT "FK_e6827071b8418ab7862a276c60b" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "fav-album" ADD CONSTRAINT "FK_0d352c5429938d93eacbb927b28" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "fav-track" ADD CONSTRAINT "FK_f743febd10a6ecb55153d113457" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
		);
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`,
		);
		await queryRunner.query(
			`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`,
		);
		await queryRunner.query(
			`ALTER TABLE "fav-track" DROP CONSTRAINT "FK_f743febd10a6ecb55153d113457"`,
		);
		await queryRunner.query(
			`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`,
		);
		await queryRunner.query(
			`ALTER TABLE "fav-album" DROP CONSTRAINT "FK_0d352c5429938d93eacbb927b28"`,
		);
		await queryRunner.query(
			`ALTER TABLE "fav-artist" DROP CONSTRAINT "FK_e6827071b8418ab7862a276c60b"`,
		);
		await queryRunner.query(`DROP TABLE "user"`);
		await queryRunner.query(`DROP TABLE "track"`);
		await queryRunner.query(`DROP TABLE "fav-track"`);
		await queryRunner.query(`DROP TABLE "album"`);
		await queryRunner.query(`DROP TABLE "fav-album"`);
		await queryRunner.query(`DROP TABLE "artist"`);
		await queryRunner.query(`DROP TABLE "fav-artist"`);
	}
};
