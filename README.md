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

# Node.js E-commerce Application

An e-commerce application built with Node.js, Express, and MongoDB, featuring user authentication, product management, shopping cart functionality, and Stripe payment integration.

## Features

- User Authentication & Authorization
  - Secure login/register system
  - Session management with MongoDB
  - CSRF protection
  - Flash messages for user feedback

- Product Management
  - CRUD operations for products
  - Image upload support
  - Product categorization
  - Search and filtering

- Shopping Cart
  - Add/remove products
  - Quantity management
  - Price calculation
  - Cart persistence

- Checkout & Payment
  - Stripe payment integration
  - Secure checkout process
  - Order management
  - PDF invoice generation

- Admin Dashboard
  - Product management interface
  - Order tracking
  - User management

## Setup Instructions

### Prerequisites

1. Node.js (v18 or higher)
2. MongoDB (v6 or higher)
3. Stripe account
4. Email service provider

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster_url/database_name

# Authentication
PASSWORD=your_password
EMAIL=your_email@example.com

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Email Configuration (Nodemailer)
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/node-mongoose-ecommerce.git
```

2. Install dependencies:
```bash
npm install
```

3. Create the `.env` file with your configuration

4. Start the application:
```bash
npm start
```

## Dependencies

- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling for Node.js
- `bcryptjs`: Password hashing
- `connect-mongodb-session`: MongoDB session store
- `csurf`: CSRF protection
- `express-session`: Session management
- `express-validator`: Form validation
- `multer`: File upload handling
- `nodemailer`: Email sending
- `pdfkit`: PDF generation
- `stripe`: Payment processing
- `ejs`: Template engine
- `pug`: Alternative template engine
- `express-handlebars`: Handlebars template engine
- `dotenv`: Environment variable management

## Project Structure

```
node-mongoose/
├── controllers/        # Route controllers
├── models/            # Mongoose models
├── routes/            # Express routes
├── views/            # Template views
├── public/           # Static assets
├── middleware/       # Custom middleware
└── util/             # Utility functions
```
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
