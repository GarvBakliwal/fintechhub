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
