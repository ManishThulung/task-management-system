# Task Management System

This repository contains both frontend and backend of the task management system.

## Run the project using docker

You can follow the following steps to run the application on docker:

1. Clone the repository.
2. Setup .env variables you can user to the .env.example for reference and stay concious while setting env. variable.
3. IMPORTANT: set the .env variable NODE_ENV to DOCKER to run it using Docker.
4. Start your application by running:
   `docker compose up`.

Your backend application will be available at http://localhost:8000.
Your frontend application will be available at http://localhost:5173.
Your mongodb database GUI application will be available at http://localhost:8081 where you can see the structure of database through GUI and can interact with it.

## Setup the project manually

To run the project locally, you have to start the backend and frontend seperately

### First setup the backend

To run the backend locally follow the steps:

0. Navigate to the backend folder.
1. Install the dependencies: `npm install`
2. Setup the .env variables, you can user to the .env.example for reference.
3. IMPORTANT: set the .env variable NODE_ENV to LOCAL to run it locally.
4. Run the command: `npm run dev`

Your application will be available at http://localhost:8000.

### Second setup the frontend

To run the frontend locally follow the steps:

0. Navigate to the frontend folder.
1. Install the dependencies: `npm install`
2. Setup the .env variables, you can user to the .env.example for reference.
3. Run the command: `npm run dev`

Your application will be available at http://localhost:5173.

### Running Jest Tests

This project contains both unit and integration testing for the backend.

To run these Jest Test, run the following command: `npm test`
