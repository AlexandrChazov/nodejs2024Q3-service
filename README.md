## REST service: Logging & Error Handling and Authentication and Authorization

Task link: "https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/logging-error-authentication-authorization/assignment.md"

Done 25.11.2024 \
Deadline 26.11.2024 \
Score: 340/340

## Steps to get started:
- clone repository: `git clone https://github.com/AlexandrChazov/nodejs2024Q3-service.git`
- open folder with project
- checkout to the 'dev3' branch: `git checkout dev3`
- install dependencies: `npm install`
- start Docker desktop app locally on your machine
- run docker container: `npm run docker:start`

## Steps to check:
### 1) Logging & Error Handling:

- **+20** Custom `LoggingService` is implemented and used for logging (see `LoggerServiceCustom`)
- **+20** Custom `Exception Filter` is implemented and used for handling exceptions during request processing (see `HttpExceptionFilter`)
- **+20** Logging for request (`url`, `query parameters`, `body`) and response with `status code` is implemented.
- **+20** Error handling is implemented including sending response with an appropriate `http status code` and errors logging.
- **+10** Error handling  and logging is implemented for `uncaughtException` event (see file `main.ts`).
- **+10** Error handling  and logging is implemented for `unhandledRejection` event (see file `main.ts`).


### 2) Authentication and Authorization:

- **+30** Route `/auth/signup` implemented correctly, related logic is divided between controller and corresponding service
- **+30** Route `/auth/login` has been implemented, related logic is divided between controller and corresponding service
- **+10** `User` `password` saved into database as hash
- **+20** Access Token is implemented,`JWT` payload contains `userId` and `login`, secret key is saved in `.env`. (`JWT_SECRET_KEY`)
- **+40** Authentication is required for the access to all routes except `/auth/signup`, `/auth/login`, `/doc` and `/`.
- **+10** Separate module is implemented **within application scope** to check that all requests to all routes except mentioned above contain required JWT token (`AuthModule`)

## Advanced Scope

### 1) Logging & Error Handling:

- **+20** Logs are written to a file (`dist/logs`).
- **+10** Logs files are rotated with size.
- **+10** Add environment variable to specify max file size (`LOG_FILE_MAX_SIZE_KB`).
- **+10** Error logs are written to a separate file.
- **+20** Add environment variable to specify logging level and corresponding functionality.
  Logs with configured level to be registered as well as other higher priority levels. For example if you set level 2, all messages with levels 0, 1 and 2 should be logged. (`LOG_LEVEL`)


### 2) Authentication and Authorization:
- **+30** Route `/auth/refresh` implemented correctly, related logic is divided between controller and corresponding service

### Total score: 340/340
