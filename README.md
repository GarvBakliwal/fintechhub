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
├── /frontend/README.md            # Detailed documentation for the Frontend application.
├── /backend/README.md             # Detailed documentation for the Backend API.
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
└──docker-compose.yml              # Docker Compose file for orchestrating all services locally.

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

    >This command will build the Docker images for your frontend and backend, set up a MongoDB container, configure NGINX as a reverse proxy, and start all services in detached mode.

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

>Please refer to the individual component READMEs ([`README-Frontend.md`](./README-Frontend.md), [`README-Backend.md`](./README-Backend.md)) for more specific contribution guidelines related to their respective codebases.

---

## 📜 License

This project is open-sourced under the **MIT License**. For the full text of the [LICENSE](LICENSE) file in the root of this repository.

---

## 🧑‍💻 Author

**Garv Bakliwal**
* LinkedIn Profile : [garvbakliwal](https://linkedin.com/in/garvbakliwal)
* GitHub Profile : [GarvBakliwal](https://github.com/GarvBakliwal)

---
