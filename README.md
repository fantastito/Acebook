## Makers Acebook MERN Project

Working with existing code, our challenge was to improve and extend a
social media web application. Over two weeks, our team of five developed 
functionality for the MERN codebase, allowing users to:
- Securely sign-up and log-in
- View posts on a feed
- Like and comment on posts
- Create their own text and image posts
- Edit or delete those posts
- Set their own bio and profile photo
- Become friends with other users

Team:
- [Simon Budden](https://github.com/fantastito)
- [Dan Guillis](https://github.com/dgullis) 
- [Nick Torkington](https://github.com/N1ckT0rk)
- [Thomas Powell](https://github.com/fnepnep83)
- [Ed Gemmill](https://github.com/EdGemmill)

### Screenshots

<table>
  <tr>
    <td><img src="./docs/screenshots/screenshotplace_holder.jpg" alt="Image  1" width="300"></td>
    <td><img src="./docs/screenshots/screenshotplace_holder.jpg" alt="Image  2" width="300"></td>
  </tr>
  <tr>
    <td><img src="./docs/screenshots/screenshotplace_holder.jpg" alt="Image  3" width="300"></td>
    <td><img src="./docs/screenshots/screenshotplace_holder.jpg" alt="Image  4" width="300"></td>
  </tr>
</table>

### Development

We completed the project following a two-week intro to JavaScript and React. 
A number of pre-defined user stories gave the team targets, though
we were free to develop any feature. We made improvements across the codebase,
building the front-end user interface and creating routes to the back-end to 
perform operations and database queries.

The project was as much about applying software development principles as it 
was furthering our understanding of web apps. We used agile workflows to structure
our development, taking tickets from a Trello board, with daily stand-ups and retros, 
working to two-day sprints. We worked in pairs and tried to follow test-driven 
development (though we prioritised learning about the code base and seeing what is 
possible, over robust testing).

### Seed code
Makers provided [a MERN starter code base](https://github.com/makersacademy/acebook-mern-vite) that had some basic features. 

### Quick start guide
### Install Node.js

If you haven't already, make sure you have node and NVM installed.

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), (`20.5.0` at
   time of writing).
   ```
   nvm install 20
   ```

### Set up your project

1. Have one team member fork this repository
2. Rename the fork to `acebook-<team name>`
3. Every team member clone the fork to their local machine
4. Install dependencies for both the `frontend` and `api` applications:
   ```
   cd frontend
   npm install
   cd ../api
   npm install
   ```
5. Install an ESLint plugin for your editor, for example
   [ESLint for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
6. Install MongoDB
   ```
   brew tap mongodb/brew
   brew install mongodb-community@6.0
   ```
   _Note:_ If you see a message that says
   `If you need to have mongodb-community@6.0 first in your PATH, run:`, follow
   the instruction. Restart your terminal after this.
7. Start MongoDB

   ```
   brew services start mongodb-community@6.0
   ```

### Setting up environment variables.

We need to create two `.env` files, one in the frontend and one in the api.

#### Frontend

Create a file `frontend/.env` with the following contents:

```
VITE_BACKEND_URL="http://localhost:3000"
```

#### Backend

Create a file `api/.env` with the following contents:

```
MONGODB_URL="mongodb://0.0.0.0/acebook"
NODE_ENV="development"
JWT_SECRET="secret"
```

For an explanation of these environment variables, see the documentation.

### How to run the server and use the app

1. Start the server application (in the `api` directory) in dev mode:

```
; cd api
; npm run dev
```

2. Start the front end application (in the `frontend` directory)

In a new terminal session...

```
; cd frontend
; npm run dev
```

You should now be able to open your browser and go to
`http://localhost:3000/signup` to create a new user.

Then, after signing up, you should be able to log in by going to
`http://localhost:3000/login`.

After logging in, you won't see much but you can create posts using PostMan and
they should then show up in the browser if you refresh the page.
