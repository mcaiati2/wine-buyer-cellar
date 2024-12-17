# Wine Buyer Cellar

Wine Buyer Cellar is a comprehensive wine inventory management application designed to help users keep track of their wine collections. This application allows users to create and manage shops, add wines to their inventory, and view detailed information about each wine.

## Features

- **User Authentication**: Secure user registration and login functionality.
- **Shop Management**: Create, edit, and delete shops.
- **Wine Inventory**: Add, view, and manage wines within each shop.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Translucent UI Elements**: Modern and visually appealing design with translucent UI elements

## Technologies Used

- **Frontend**: React, TypeScript, Bootstrap
- **Backend**: Node.js, Express, Sequelize, PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS, Flexbox, Grid

## Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL

### Setup

1. Clone the repository:

```sh
git clone https://github.com/your-username/wine-buyer-cellar.git
cd wine-buyer-cellar
```

2. Install dependencies:

npm install

3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

- JWT_SECRET: A secret key for JWT authentication
- MONGODB_URL: The connection string for your MongoDB database
- PORT: The port number for the server (optional, default is 3333)

4. Run the development server:

npm run dev

This will start both the client and server in development mode.

## Running Tests

To run the tests, use the following command:

npm test

## Building for Production

To build the project for production, use the following command:

npm run build

This will create optimized builds for both the client and server.

## Deployment

The project is configured to deploy to Render. Ensure you have the necessary environment variables set in your Render dashboard:

- RENDER_API_KEY: Your Render API key
- SERVICE_ID: The ID of your Render service

The deployment process is automated using GitHub Actions. On merging a pull request to the main branch, the CI workflow will run tests and deploy the application to Render.

## License

This project is licensed under the MIT License.