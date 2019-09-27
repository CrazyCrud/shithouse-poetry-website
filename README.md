# Develop

## Docker

To start the Docker container run:
`docker-compose up -d`

You can edit the Mysql credentials in the *.env* file located in the root directory.

## URLs

Visist *localhost:8081* to view the front end.     
The API is running at *localhost:8083/api*.
You can access the Postgres database at *localhost:5432*.

## NPM

To install NPM packages execute the following:
`docker-compose exec web npm i <package-name>`