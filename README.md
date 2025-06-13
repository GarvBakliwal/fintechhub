#   🏦 FintechHub

## A Comprehensive Full-Stack Solution for Managing Your Finances

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Frontend Status](https://img.shields.io/badge/Frontend-Next.js%2014-blue)](./README-Frontend.md)
[![Backend Status](https://img.shields.io/badge/Backend-Node.js%20%26%20Express-green)](./README-Backend.md)
[![Deployment Status](https://img.shields.io/badge/Deployment-Docker%20%26%20Jenkins-orange)](./README-Deployment.md)

---

## 🌟 Overview

The **Personal Finance Dashboard** is a robust, full-stack application designed to empower users with effective personal finance management. It provides a secure, intuitive, and responsive interface for tracking financial accounts, monitoring transactions, and gaining actionable insights into spending habits. This entire system is backed by a powerful RESTful API and seamlessly integrates with leading financial data providers like Plaid.

This repository serves as the central hub for the entire application suite, which is modularly broken down into three core components:

* **Frontend**: The user-facing application, built with cutting-edge Next.js technology, delivering a dynamic and highly responsive user experience across various devices.
* **Backend**: The robust REST API, developed using Node.js and Express, responsible for all data operations, secure user authentication, and seamless integration with external financial APIs.
* **Deployment**: The comprehensive infrastructure and Continuous Integration/Continuous Deployment (CI/CD) setup, detailing how the entire application is containerized, orchestrated, and deployed for production using Docker, Jenkins, and AWS EC2.

---

## 🚀 Key Features & Highlights

* **Secure User Authentication**: Implement secure user registration, login, and streamlined OAuth integrations (Google, GitHub) for flexible and safe access.
* **Plaid Integration**: Connect securely to thousands of financial institutions, enabling real-time fetching of account balances and transaction data.
* **Comprehensive Financial Tracking**: Provides a unified view of all linked financial accounts and historical transactions, offering clarity on financial standing.
* **Intuitive User Interface**: A modern, responsive design built with TailwindCSS ensures a consistent and enjoyable user experience on both desktop and mobile devices.
* **Robust & Scalable API**: A well-documented, secure, and performant backend API supporting all client-side operations and external integrations.
* **Automated & Reliable Deployment**: Features a streamlined CI/CD pipeline, enabling efficient updates, consistent builds, and reliable hosting in a production environment.
* **Containerized Environment**: Utilizes Docker for consistent development, testing, and deployment environments across all services.

---

## 🛠️ Core Technologies Used

This project leverages a modern and powerful set of technologies across its various components to ensure scalability, maintainability, and a great user experience:

* **[Frontend](https://github.com/GarvBakliwal/fintechhub.git)**:
    * [Next.js 14+](https://nextjs.org/): React framework for server-side rendering and static site generation.
    * [Zustand](https://github.com/pmndrs/zustand): A small, fast, and scalable bear-necessities state-management solution for React.
    * [TailwindCSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.
    * [React Hook Form](https://react-hook-form.com/): Performant, flexible and extensible forms with easy-to-use validation.
    * [Zod](https://github.com/colinhacks/zod): TypeScript-first schema declaration and validation library.
* **[Backend](https://github.com/GarvBakliwal/fintechhub.git)**:
    * [Node.js](https://nodejs.org/): JavaScript runtime for building scalable server-side applications.
    * [Express.js](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
    * [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/): NoSQL database and an ODM for MongoDB.
    * [Passport.js](http://www.passportjs.org/): Authentication middleware for Node.js.
    * [Plaid SDK](https://plaid.com/): Official SDK for integrating with Plaid's financial data API.
    * [JSON Web Tokens (JWT)](https://jwt.io/): For secure, stateless authentication.
* **DevOps & Deployment**:
    * [Docker](https://www.docker.com/): Platform for developing, shipping, and running applications in containers.
    * [Docker Compose](https://docs.docker.com/compose/): Tool for defining and running multi-container Docker applications.
    * [NGINX](https://nginx.org/): High-performance HTTP server and reverse proxy.
    * [Jenkins CI/CD](https://www.jenkins.io/): Automation server for building, testing, and deploying projects.
    * [AWS EC2](https://aws.amazon.com/ec2/): Scalable computing capacity in the Amazon Web Services (AWS) cloud.

---

## 📁 Project Structure

This repository follows a monorepo approach, organizing distinct components into their own dedicated directories. Each primary component has its own comprehensive README file for detailed instructions and information:
```
.
├── README.md                      # Your current location: The main project overview.
├── README-Frontend.md             # Detailed documentation for the Frontend application.
├── README-Backend.md              # Detailed documentation for the Backend API.
├── README-Deployment.md           # Detailed documentation for the Deployment and DevOps setup.
├── frontend/                      # Contains the source code for the Next.js frontend application.
│   ├── app/
│   ├── components/
│   └── ...
├── backend/                       # Contains the source code for the Node.js/Express API.
│   ├── controllers/
│   ├── models/
│   └── ...
├── nginx/                         # Contains NGINX configuration files for the reverse proxy.
│   └── nginx.conf
├── docker-compose.yml             # Docker Compose file for orchestrating all services locally.
└── .github/workflows/             # (Optional) Contains GitHub Actions CI/CD workflows if used.
```

---

## 🏃‍♀️ Getting Started

To get the full Personal Finance Dashboard application up and running on your local machine, or to understand the deployment process, please refer to the specific component READMEs for comprehensive instructions.

### Quick Local Setup with Docker Compose (Recommended)

For the quickest way to get all services (frontend, backend, MongoDB, NGINX) running locally:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/GarvBakliwal/fintechhub.git
    cd fintechhub
    ```
2.  **Configure Environment Variables**:
    * Create a `.env.frontend` file in the root directory (or `frontend/.env.local` if Next.js specific). Refer to [`README-Frontend.md`](./README-Frontend.md) for required variables.
    * Create a `.env.backend` file in the root directory (or `backend/.env` if Node.js specific). Refer to [`README-Backend.md`](./README-Backend.md) for required variables.
    * Crucially, ensure your Plaid, Google OAuth, and JWT secrets are correctly configured.
3.  **Build and Run with Docker Compose**:
    ```bash
    # Ensure Docker Desktop is running
    docker-compose up -d --build
    ```
    This command will build the Docker images for your frontend and backend, set up a MongoDB container, configure NGINX as a reverse proxy, and start all services in detached mode.

Once all services are up, you can typically access the frontend application through your browser at `http://localhost`.

---

## 🌐 Live Demo

Experience the Personal Finance Dashboard live at:
**[fintechhub.site](http://fintechhub.site)**

---

## 🤝 Contributing

We welcome contributions from the community to make this project even better! If you'd like to contribute, please follow these general guidelines:

1.  **Fork the Repository**: Start by forking this repository to your GitHub account.
2.  **Create a New Branch**:
    ```bash
    git checkout -b feature/your-feature-name-or-bugfix
    ```
3.  **Make Your Changes**: Implement your features or bug fixes. Ensure your code adheres to the existing style and conventions.
4.  **Test Your Changes**: Run existing tests and add new ones if necessary to cover your changes.
5.  **Commit Your Changes**: Write clear and concise commit messages.
    ```bash
    git commit -m 'feat: Add new dashboard statistics view'
    ```
6.  **Push to the Branch**:
    ```bash
    git push origin feature/your-feature-name-or-bugfix
    ```
7.  **Open a Pull Request**: Submit a pull request to the `main` branch of this repository, describing your changes in detail.

Please refer to the individual component READMEs ([`README-Frontend.md`](./README-Frontend.md), [`README-Backend.md`](./README-Backend.md)) for more specific contribution guidelines related to their respective codebases.

---

## 📜 License

This project is open-sourced under the **MIT License**. For the full text of the [LICENSE](LICENSE) file in the root of this repository.

---

## 🧑‍💻 Author

**Garv Bakliwal**
* LinkedIn Profile : [garvbakliwal](https://linkedin.com/in/garvbakliwal)
* GitHub Profile : [GarvBakliwal](https://github.com/GarvBakliwal)

---


# 📦 FintechHub - Personal Finance Dashboard UI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)](https://nextjs.org/)
[![Zustand](https://img.shields.io/badge/State_Management-Zustand-blue)](https://github.com/pmndrs/zustand)
[![TailwindCSS](https://img.shields.io/badge/CSS_Framework-TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A responsive, secure, and feature-rich frontend application for a personal finance management dashboard. This UI is built using **Next.js 14+**, **Zustand** for efficient state management, and styled with **TailwindCSS** for a modern and clean look. It seamlessly integrates with a Node.js backend API and supports advanced features like OAuth authentication and Plaid API data fetching.

---

## 🗒️ Table of Contents

* 🚀 [Features](#-features)
* 🛠️ [Tech Stack](#️-tech-stack)
* 📁 [Project Structure](#-project-structure)
* 📦 [Installation](#-installation)
* ⚙️ [Environment Variables](#️-environment-variables-envlocal)
* 🧪 [Development](#-development)
* 🏗️ [Production Build](#️-production-build)
* 🔍 [Usage Examples](#-usage-examples)
* 🤝 [Contributing](#-contributing)
* 📜 [License](#-license)

---

## 🚀 Features

* **Next.js App Router**: Leverages the latest App Router for powerful routing, server components, and server-side rendering (SSR) capabilities, enhancing performance and SEO.
* **Zustand for Global State**: Efficient and lightweight state management for application-wide data, ensuring a smooth user experience.
* **Robust Form Validation**: Implements client-side form validation using `react-hook-form` paired with `zod` for schema-based validation, improving data integrity and user feedback.
* **OAuth Integration**: Supports seamless user authentication via Google and GitHub, providing convenient login options.
* **Fully Responsive Layout**: Designed with TailwindCSS to adapt gracefully across various screen sizes, from mobile phones to large desktop displays.
* **Toast Notifications**: Provides intuitive UI feedback for user actions (e.g., success messages, error alerts) using a toast notification library.
* **Dynamic Data Fetching**: Integrates with the backend API to securely fetch and display user accounts and transaction data from Plaid.

---

## 🛠️ Tech Stack

* [**Next.js 14+**](https://nextjs.org/): The React framework for production, enabling SSR, static site generation, and optimized routing.
* [**Zustand**](https://github.com/pmndrs/zustand): A fast, lightweight, and scalable state-management solution.
* [**TailwindCSS**](https://tailwindcss.com/): A utility-first CSS framework for highly customizable designs.
* [**React Hook Form**](https://react-hook-form.com/): A performant and flexible library for form management.
* [**Zod**](https://github.com/colinhacks/zod): TypeScript-first schema declaration and validation library, used for robust form data validation.
* [**Axios**](https://axios-http.com/): Promise-based HTTP client for making API requests.
* [**react-hot-toast**](https://react-hot-toast.com/): A simple and customizable toast notification library.

---

## 📁 Project Structure

The frontend application follows a standard Next.js project structure, with a focus on modularity and clear separation of concerns:
```
frontend/
├── public/                       # Static assets like images, fonts.
├── app/                          # Next.js App Router root.
│   ├── (auth)/                   # Grouped routes for authentication (login, register).
│   ├── (root)/                   # Grouped routes for authenticated dashboard sections.
│   ├── layout.tsx                # Root layout component.
│   ├── page.tsx                  # Root page component.
│   └── globals.css               # Global CSS, TailwindCSS configuration.
│ 
├── components/                   # Reusable UI components (e.g., buttons, forms, navbars).
│   ├── auth/
│   ├── ui/
│   └── dashboard/
│ 
├── lib/                          # Utility functions, helpers, API service layer.
│   ├── api.ts                    # Axios instance and API call wrappers.
│   ├── auth.ts                   # Authentication related utilities.
│   └── plaid.ts                  # Plaid specific client-side logic.
│ 
├── services/                     # API service layer.
│   ├── auth.ts                   # Authentication related utilities.
│   ├── data.ts                   # All data fetching related utilities.
│   ├── addBank.ts                # Bank adding Logic
│   └── plaid.ts                  # Plaid specific client-side logic.
│ 
├── zustand/                      # Zustand store definitions.
│   └── globalStore.ts
├── types/                        # TypeScript type definitions.
│   └── index.d.ts
├── .env.local.example            # Example environment variables file.
├── next.config.js                # Next.js configuration.
├── tailwind.config.ts            # TailwindCSS configuration.
└── tsconfig.json                 # TypeScript configuration.
```
---

## 📦 Installation

To set up the frontend application on your local machine:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/GarvBakliwal/fintechhub.git
    cd fintechhub
    ```
    * **Note**: If you cloned the monorepo, navigate into the `frontend` directory first.
2.  **Install dependencies**:
    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

---

## ⚙️ Environment Variables (`.env.local`)

Create a `.env.local` file in the `frontend/` directory based on the `.env.local.example` provided. These variables are crucial for the application to function correctly.

* REQUIRED
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080  # Or your deployed backend URL (e.g., https://api.your-domain.com)
```
* PLAID INTEGRATION (Consult Plaid documentation for values)
```
NEXT_PUBLIC_PLAID_CLIENT_ID=your_plaid_client_id_here
NEXT_PUBLIC_PLAID_ENV=sandbox # Options: sandbox, development, production
NEXT_PUBLIC_PLAID_PRODUCTS=transactions,auth # Comma-separated list of Plaid products (e.g., transactions,auth,identity)
NEXT_PUBLIC_PLAID_COUNTRY_CODES=US # Comma-separated list of country codes (e.g., US,CA)
```
> ✅ **Security Note**: Never commit your `.env.local` file to version control. It contains sensitive keys and configurations specific to your environment. `.gitignore` should already be configured to exclude it.

---

## 🧪 Development

To run the frontend application in development mode with hot-reloading:

```bash
npm run dev
# or yarn dev
# or pnpm dev
```
The application will typically be accessible at http://localhost:3000.

---

## 🏗️ Production Build
To build the application for production and serve it:

Build the project:
```Bash
npm run build
# or yarn build
# or pnpm build
```
This command compiles the Next.js application into optimized static assets and server-side code.
Start the production server:
```Bash
npm start
# or yarn start
# or pnpm start
```
This will serve the production build. Ensure your `NEXT_PUBLIC_BACKEND_URL` is set to your deployed backend URL.

---

## 🔍 Usage Examples
Upon running the application, you'll be presented with the authentication screen.

* **Register/Login:** Use the built-in forms.
* **Connect Bank Accounts:** After logging in, you'll be prompted to connect your financial institutions via Plaid Link. Follow the on-screen instructions.
* **View Dashboard:** Once accounts are linked, navigate to the dashboard to see an overview of your accounts and transactions.
* **Explore Transactions:** Dive into detailed transaction lists, often with filtering or sorting options.

---

## 🤝 Contributing
We welcome contributions to the Personal Finance Dashboard Frontend!

* **Setup:** Follow the Installation and Development steps.
* **Branching:** Create a new branch for your feature or bug fix:

  ```Bash
  git checkout -b feature/  add-new-chart.
  ```

* **Code Style:** Ensure your code adheres to the project's ESLint and Prettier configurations.
* **Pull Requests:** Submit a clear and detailed pull request, explaining the changes and their purpose. Include screenshots if applicable.

---

## 📜 License
This frontend application is licensed under the MIT License. For more information, see the LICENSE file in the root of the repository.

---
