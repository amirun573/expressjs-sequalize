# expressjs-sequalize

ExpressJS + Sequelize ORM + MYSQL + Redis + Docker

## Table of Contents

- [Project Name](#project-name)
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [API Documentation](#api-documentation)


## Introduction

This project are using ExpressJS + Sequelize ORM + MYSQL + Redis + Docker          

## Features

List the main features of your project.

- Sign Up and Login for User
- Authentication
- Create/Update/Listing Note




### Installation

1. Install Docker (https://www.docker.com/products/docker-desktop/).
2. Pull the Redis image to docker. Refer (https://collabnix.com/running-redis-on-windows-using-docker-container/).
3. After pulling this project, please run `npm install`.
4. Then, run `sequelize init`. Ensure you have installed `sequelize-cli`.
5. After that, the config folder will be appeared and contain the config.json file. Please make sure you set up the database connection for this project.
6. After that, run `sequelize db:migrate`. With this command, it will create the tables that have been setup in this project.
7. From this process, you can start to run the project by using `npm start `/`npm run dev`.
8. To push this project as image to docker, you need to initialize it from this project by running Docker CLI where you can refer to this site => https://faun.pub/how-to-build-a-node-js-application-with-docker-f596fbd3a51


## API Documentation

To test this API, I have already prepared the Postman file where you can test the API for this project. (https://drive.google.com/file/d/1XggotAZTj_j0SO5eiy62ApYR6t7pNij7/view?usp=sharing)



List any external libraries, frameworks, or open-source projects you used. Also, thank contributors if any.

---
Replace the sections in the template with your project-specific details. Remember to keep your README up-to-date as your project evolves.
