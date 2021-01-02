# Bunny REST API


### Getting Started

#### Step 1: clone the repository

```bash
git clone git@github.com:brainiactech/Buddy-todo-api.git buddy-todo-api
cd buddy-todo-api
```

#### Step 2: install General NPM packages

```bash
npm i
```

#### Step 3: install NPM packages on each microservice

1. cd into /buddy-todo-api/todo and run npm install
2. cd into /buddy-todo-api/users and run npm install


#### Step 4: define the database connection

Define Database for each service
  1. cd into /buddy-todo-api/todo/config and set the db field accordignly;
  2. cd into /buddy-todo-api/users/config and set the db field accordignly;


#### Step 5: start the server

This will start both service at the same time, ensure you run this on the /buddy-todo-api path and not inside the microservices path

```bash
npm start
```

#### Step 6: Additional Info

1. User service currently runs on port 5000 - http://localhost:5000/api/users
2. Todo service currently runs on port 3000 - http://localhost:3000/api/todo
3. Express gateway is used to bootstrap the service
