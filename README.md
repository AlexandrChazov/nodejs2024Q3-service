## REST Service

Task link: "https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md"

Done 10.11.2024 \
Deadline 12.11.2024 \
Score: 760/760

## Steps to get started:
- Clone repository: `git clone https://github.com/AlexandrChazov/nodejs2024Q3-service.git`
- Open folder with project
- Checkout to the 'dev' branch: `git checkout dev`
- Install dependencies: `npm i`
- Start application: `npm run start`
- build image: `docker build -t postgre_db .`
- run image: `docker run -d --name DB -p 5000:5432 -e POSTGRES_PASSWORD=root postgre_db`
- build image: `docker build -t server .`

## Steps to check:
Make sure the `README.md` file contains detailed instructions for installing, running and using the application (+10) \
Make sure the application code divided into modules:

- Albums (+10)
- Artists (+10)
- Favorites (+10)
- Tracks (+10)
- Users (+10)

Make sure PORT value is stored in `.env` file (+10) \
Make sure OpenAPI spec in the `doc` folder corresponds with assignment (+20) \
Run tests: `npm run test` (+670)

### Total score: 720/720
