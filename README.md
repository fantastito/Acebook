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
    <td><img src="./docs/screenshots/screenshot_1.jpg" alt="Image  1" width="300"></td>
    <td><img src="./docs/screenshots/screenshot_2.jpg" alt="Image  2" width="300"></td>
  </tr>
  <tr>
    <td><img src="./docs/screenshots/screenshot_3.jpg" alt="Image  3" width="300"></td>
    <td><img src="./docs/screenshots/screenshot_4.jpg" alt="Image  4" width="300"></td>
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

Ensure you have the following tools installed:
1. [Node.js](https://nodejs.org/en/)
2. [MongoDB](https://www.mongodb.com/)

#### Clone and Install Dependencies
1. Clone the repository and navigate to the project directory:
   ```
   git clone https://github.com/<your-username>/acebook-<team-name>.git
   cd acebook-<team-name>
   ```
2. Install project dependencies for both the frontend and API applications:
   ```
   cd frontend && npm install
   cd ../api && npm install
   ```

#### Set up Environment Variables
Create environment variable files for the frontend and API:

**Frontend**
Create a file frontend/.env with the following content:
`VITE_BACKEND_URL="http://localhost:3000"`

**Backend**
Create a file api/.env with the following content:
```
MONGODB_URL="mongodb://0.0.0.0/acebook"
NODE_ENV="development"
JWT_SECRET="secret"
```

#### Start the Server and Application
1. Start the API server (in the api directory) in development mode:
   ```
   cd api && npm run dev
   ```
2. In a new terminal session, start the frontend application (in the frontend directory):
   ```
   cd ../frontend && npm run dev
   ```

#### Access Acebook
Open your browser and go to http://localhost:5173/signup to create a new user. After signing up, log in and take a look around.