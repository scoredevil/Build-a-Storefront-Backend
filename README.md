# udacity-storefront-backend
Build a JavaScript API based on a requirements given by the stakeholders. You will architect the database, tables, and columns to fulfill the requirements.

The database schema and and API route information can be found in the (REQUIREMENT.md)

## Installation Instructions:
This section contains all the packages used in this project and how to install them. However, you can fork this repo and run the following command at the root directory to install all packages.

`npm install`

## Set up Database

`docker-compose up`  to get to the docker container
`npm install` to install all dependencies
`db-migrate up` to set up the database and get access via http://127.0.0.1:5432
`npm run build` to build the app


### Start 
`npm run start` to start the app and get access via http://127.0.0.1:
### Create Databases
We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`

### Migrate Database
Navigate to the root directory and run the command below to migrate the database 

`yarn dev-up`

## Environmental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you. 

**NB:** The given values are used in development and testing but not in production. 
```
PORT=127.0.0.1
POSTGRES_HOST="localhost"
POSTGRES_USER="###"
POSTGRES_PASSWORD="###"
POSTGRES_DB="storefront_dev"
POSTGRES_TEST_DB="storefront_test"
TOKEN_KEY=###
ENV=test
BCRYPT_PASSWORD=###
SALT_ROUNDS="10"

```

## Start App
`npm run start`

### Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file. 


## Testing
Run test with 

`npm run test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database. 



