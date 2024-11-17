## REST Service

Task link: "https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md"

Done 10.11.2024 \
Deadline 12.11.2024 \
Score: 760/760

## Steps to get started:
- clone repository: `git clone https://github.com/AlexandrChazov/nodejs2024Q3-service.git`
- open folder with project
- checkout to the 'dev' branch: `git checkout dev`
- install dependencies: `npm install`
- start Docker desktop app locally on your machine
- run docker container: `docker compose up`

## Steps to check:
### 1) Cotainerization, Docker
- +20 Readme.md has instruction how to run application
- +30 user-defined bridge is created and configured (`networks: - backend`)
- +30 container auto restart after crash (`restart: always`)
- +20 application is restarting upon changes implemented into src folder (`volumes: - ./src:/server/src`)
- +30 database files and logs to be stored in volumes instead of container (`volumes: - postgres-data:/var/lib/postgresql/data`)

### 2) Database (PostgreSQL) & ORM
- +20 Users data is stored in PostgreSQL database and typeorm interacts with the database to manipulate data.
- +20 Artists data is stored in PostgreSQL database and typeorm interacts with the database to manipulate data.
- +20 Albums data is stored in PostgreSQL database and typeorm interacts with the database to manipulate data.
- +20 Tracks data is stored in PostgreSQL database and typeorm interacts with the database to manipulate data.
- +20 Favorites data is stored in PostgreSQL database and typeorm interacts with the database to manipulate data.

### 3) Advanced Scope

- +20 Your built image is pushed to DockerHub

- +10 Variables used for connection to database to be stored in `.env`
- +10 typeorm decorators create relations between entities
- +30 Local PostgreSQL installation is not required for task check, connection is implemented to database stored in docker container

### Total score: 300/360
