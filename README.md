# ChatterBox

ChatterBox is a real-time chat application built with Node.js, Express, and Socket.io. It allows users to send and receive messages in real-time, providing a seamless communication experience.

## Features

- Real-time messaging using WebSockets.
- Simple and intuitive user interface.
- Support for multiple users to join and chat.
- No build step required for deployment.

## Technologies Used

- **Node.js**: JavaScript runtime for the backend.
- **Express**: Web framework for building the server.
- **Socket.io**: Library for real-time web applications, enabling bi-directional communication between clients and server.
- **Font Awesome**: For icons.
- **Nodemon**: Development tool for automatically restarting the server during development.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) version 18.x or later.
- [npm](https://www.npmjs.com/) version 8.x or later.

## Deployment

ChatterBox is designed for deployment on platforms such as Render or Heroku. The application requires no build step, and simply running `npm install` and `npm start` is sufficient for deployment.

### Render
Follow Render's documentation to deploy the app. It is easy to set up using the default configuration and deploy through the GitHub repository.

### Heroku
Use the following steps to deploy on Heroku:

1. Create a new Heroku app.
2. Link it to the GitHub repository or push the project to Heroku using Git.
3. Set up environment variables (if necessary) and deploy.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Socket.io](https://socket.io/) for enabling real-time communication.
- [Express](https://expressjs.com/) for building the backend server.
- [Font Awesome](https://fontawesome.com/) for the beautiful icons.
