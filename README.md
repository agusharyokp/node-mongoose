# Dynamic Content Project

This project is a comprehensive guide to building a Node.js application using Express, MongoDB, and Mongoose. It demonstrates how to create a dynamic web application with various features and functionalities.

## Project Structure

- `app.js`: The main entry point of the application.
- `controllers/`: Contains the logic for handling requests and responses.
- `data/`: Stores data-related files.
- `models/`: Defines the Mongoose models for interacting with MongoDB.
- `public/`: Contains static assets like CSS, JavaScript, and images.
- `routes/`: Defines the routing for the application.
- `util/`: Utility functions used across the application.
- `views/`: Template files for rendering HTML.

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd lear-node-mongoose
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Application

To start the application, use the following command:

```bash
npm start
```

This will run the application using `nodemon` for automatic restarting during development.

## Features

- User authentication and session management
- Dynamic content rendering with EJS, Pug, and Handlebars
- Database interaction using Mongoose and MongoDB
- MVC architecture
- CSRF protection
- Flash messages for error handling
- Email notifications using Nodemailer

## Dependencies

- `express`: Web framework for Node.js
- `mongoose`: ODM for MongoDB
- `body-parser`: Middleware for parsing request bodies
- `express-session`: Session management
- `connect-mongodb-session`: MongoDB session store for Express
- `cookie-parser`: Parse cookies
- `ejs`, `pug`, `express-handlebars`: Template engines
- `mysql2`, `sequelize`: MySQL database interaction
- `nodemailer`: Email sending
- `connect-flash`: Flash message middleware
- `csurf`: CSRF protection middleware

## Environment Variables

Create a `.env` file in the root directory and declare the following environment variables:

- `MONGODB_URI`: The connection string for your MongoDB database.
- `PASSWORD`: The password for email authentication.
- `EMAIL`: The email address used for sending notifications.

## License

This project is licensed under the ISC License.

## Dependencies

- `express`: Web framework for Node.js
- `mongoose`: ODM for MongoDB
- `body-parser`: Middleware for parsing request bodies
- `express-session`: Session management
- `connect-mongodb-session`: MongoDB session store for Express
- `cookie-parser`: Parse cookies
- `ejs`, `pug`, `express-handlebars`: Template engines
- `mysql2`, `sequelize`: MySQL database interaction
