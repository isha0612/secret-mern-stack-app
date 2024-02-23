# Secrets - A MERN Stack Application


I've created a secret application utilizing technologies such as HTML, CSS and React.js for the frontend, along with Node.js, Express.js for the backend and MongoDB for the database. The application features a robust authentication system, incorporating user registration, login and password recovery functionality through the utilization of JSON Web Tokens and cookies. Additionally, there's a section for sharing secrets anonymously, where all posted secrets are listed without revealing the user identities. Users also have the option to submit their secrets anonymously.

Link to the website - https://secret-mern-stack-app-frontend.vercel.app/

## Clone the repository
```terminal
$ git clone https://github.com/isha0612/mern-stack-app.git
```

## Project structure
```terminal
client/
   package.json
   .env 
server/
   package.json
   .env 
README.md
```


# Run the fullstack app on your machine 

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

Notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other.

## Client-side usage

### Prepare your secret

Run the script at the first level:

(You need to assign values to all the variables mentioned in the .env.example file and store those variables in the .env file.)

For example -

```terminal
$ cd server
$ echo "REACT_APP_SERVER_URL=YOUR_REACT_APP_SERVER_URL" >> src/.env
```

### Start the client-side server

```terminal
$ cd client          // go to client folder
$ npm i              // npm install packages
$ npm run dev        // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```


## Server-side usage

### Prepare your secret

Run the script at the first level:

(You need to assign values to all the variables mentioned in the .env.example file and store those variables in the .env file to  set port numbers of frontend and backend, connect to MongoDB and enable password recovery functionality.)

For example -

```terminal
$ cd server
$ echo "JWTSECRET=YOUR_JWT_SECRET" >> src/.env
```

### Start the server-side server

```terminal
$ cd server       // go to server folder
$ npm i           // npm install packages
$ npm run dev     // run it locally
$ npm run build   // this will build the server code to es5 js codes and generate a dist file
```