# 🛠️ FintechHub - Backend

A robust, secure, and scalable RESTful API built with Node.js and Express.js to serve as the backbone for the Personal Finance Dashboard. This API handles user authentication, integrates with the Plaid API for banking data, and manages all financial transactions and account information. It's designed with security best practices and modularity in mind.


## 🗒️ Table of Contents

* 🔐 [Features](#-features)

* 🧰 [Tech Stack](#-tech-stack)

* 📁 [Folder Structure](#-folder-structure)

* 📦 [Installation](#-installation)

* 🗂️ [Environment Configuration](#-environment-configuration)

* 🧪 [Development](#-development)

* 🚀 [API Endpoints](#-api-endpoints)

* 🔒 [Security Measures](#-security-measures)

* 🤝 [Contributing](#-contributing)

* 📜 [License](#-license)


---


## 🔐 Features

* **JWT Authentication:** Secure user authentication using JSON Web Tokens for stateless and scalable sessions.

* **MongoDB with Mongoose:** Persistent data storage using a NoSQL database (MongoDB) with Mongoose ODM for structured data management.

* **Plaid API Integration:** Connects to the Plaid API to securely fetch and manage user financial accounts and transaction data.

* **RESTful API Design:** Follows REST principles for clear, predictable, and scalable API endpoints.

* **Security Best Practices:** Includes rate limiting, CORS configuration, and Helmet for setting secure HTTP headers.

* **Comprehensive Error Handling:** Robust error handling mechanisms to provide meaningful feedback.

  
---


## 🧰 Tech Stack

* **Node.js:** JavaScript runtime for building the server-side application.
  
* **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.

* **MongoDB:** NoSQL database for storing user, authentication, and financial data.

* **Mongoose:** MongoDB object data modeling (ODM) for Node.js.

* **Plaid Node.js SDK:** Official SDK for interacting with the Plaid API.

* **bcryptjs:** For secure password hashing.

* **jsonwebtoken:** For generating and verifying JSON Web Tokens.

* **dotenv:** To load environment variables from a .env file.

* **cors:** Node.js middleware for enabling Cross-Origin Resource Sharing.

* **helmet:** Helps secure Express apps by setting various HTTP headers.

  
---


## 📁 Folder Structure

The backend application is structured for clarity, maintainability, and scalability:
```
src/
│
├── index.ts                      # Main Express application setup and entry point for the Node.js server.
│
├── lib/                          # Utility functions (e.g., JWT generation, Plaid helpers).
│   ├── jwt.ts
│   ├── db.ts                     # MongoDB connection setup.
│   └── plaidClient.ts
│
├── controllers/                  # Logic for handling API requests and responses.
│   ├── authController.ts
│   ├── accountController.ts
│   └── transactionController.ts
│
├── middleware/                   # Express middleware (e.g., authentication, error handling).
│   └── authMiddleware.ts
│
├── models/                       # Mongoose schemas and models for database entities.
│   ├── User.ts
│   ├── Account.ts
│   └── Transaction.ts
│
├── routes/                       # Defines API endpoints and links them to controllers.
│   ├── authRoutes.ts
│   ├── accountRoutes.ts
│   └── transactionRoutes.ts
│
├── .env.example                  # Example environment variables file.
└── package.json                  # Project dependencies and scripts.
```


---


## 📦 Installation
To set up the backend API on your local machine:

* Clone the repository:
```Bash
git clone https://github.com/GarvBakliwal/FintechHubBackend.git
cd FintechHubBackend
```
> Note: If you cloned the monorepo, navigate into the backend directory first.

* Install dependencies:
```Bash
npm install
# or yarn install
# or pnpm install
```


---


## 🗂️ Environment Configuration

Create a .env file in the backend/ directory based on the .env.example provided. These variables are essential for the API to connect to the database, secure tokens, and interact with external services.

```
PORT=8000 # The port your Express app will listen on

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/fintechhub # Your MongoDB connection string

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here # A long, random string for signing JWTs

# Plaid API Credentials (Get these from your Plaid Dashboard)
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox # Options: sandbox, development, production

# Frontend Client URL (for CORS)
SITE_URL=http://localhost:3000 # Your frontend application's URL (e.g., http://localhost:3000 or https://your-domain.com)
```

> ✅ Security Note: Never commit your .env file to version control. It contains sensitive API keys and secrets. `.gitignore` should already be configured to exclude it.


---


## 🧪 Development
To run the backend API in development mode with hot-reloading (using nodemon):

```Bash
npm run dev
# or yarn dev
# or pnpm dev
```
> The API server will typically start on http://localhost:8080 (or the PORT specified in your .env).


---


## 🚀 API Endpoints
The API provides the following core endpoints:

### User & Authentication

| Method | Route                        | Description                                      | Request Body (Example)                                                                 | Success Response (Example)                                                |
|--------|------------------------------|--------------------------------------------------|----------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| POST   | /api/auth/register           | Register a new user                              | `{ "username": "user", "email": "user@example.com", "password": "password123" }`      | `{ "message": "User registered successfully", "token": "..." }`            |
| POST   | /api/auth/login              | Authenticate and login a user                    | `{ "email": "user@example.com", "password": "password123" }`                          | `{ "message": "Logged in successfully", "token": "..." }`                  |
| GET    | /api/data                 | Get authenticated user's profile (requires JWT) with all Data  | N/A                                                                                    | `[user:{ "id": "...", "email": "...", "username": "..." },accouts:{ "account_id": "...", "name": "...", "balances": {} },transactions:{ "transaction_id": "...", "name": "...", "amount": "..." }, ... ],`                       |

### Plaid & Financial Data

These endpoints typically require a valid JWT in the Authorization: Bearer <token> header.

| Method | Route                            | Description                                      | Request Body (Example)                            | Success Response (Example)                                         |
|--------|----------------------------------|--------------------------------------------------|--------------------------------------------------|---------------------------------------------------------------------|
| POST   | /api/create-link-token     | Create a Plaid Link token for client-side use    | N/A                                              | `{ "link_token": "link-sandbox-..." }`                              |
| POST   | /api/exchange-public-token      | Exchange Plaid public token for access token     | `{ "public_token": "public-sandbox-..." }`       | `{ "message": "Plaid account linked successfully" }`               |
| GET    | https://sandbox.plaid.com/accounts/get                    | Get all linked Plaid accounts for user           | N/A                                              | `[ { "account_id": "...", "name": "...", "balances": {} }, ... ]` |
| GET    | https://sandbox.plaid.com/transactions/get                | Get all transactions for linked accounts         | `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` (optional query params) | `[ { "transaction_id": "...", "name": "...", "amount": "..." }, ... ]` |

---

## 🔒 Security Measures


* **Helmet:** Sets various HTTP headers to help protect your app from well-known web vulnerabilities.

* **CORS:** Configured to allow requests only from your specified frontend CLIENT_URL.

* **JWT:** Tokens are used for secure and stateless authentication, expiring after a set duration.

* **Password Hashing:** User passwords are securely hashed using bcryptjs before being stored in the database.

* **Environment Variables:** Sensitive credentials are kept out of source control using .env files.


---


## 🤝 Contributing

We welcome contributions to the Personal Finance Dashboard Backend!

* **Setup:** Follow the Installation and Development steps.

* **Branching:** Create a new branch for your feature or bug fix: 
    ```Bash
    git checkout -b feature/add-new-api-endpoint.
    ```

* **Code Style:** Ensure your code adheres to the project's ESLint and Prettier configurations.

* **API Documentation:** If adding new endpoints, update the API Endpoints section in this `README`.

* **Pull Requests:** Submit a clear and detailed pull request, explaining the changes and their purpose.


---


## 📜 License

This backend API is licensed under the MIT License. For more information, see the LICENSE file in the root of the repository.

---
