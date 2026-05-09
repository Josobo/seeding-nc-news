<h1 align="center"> NC_NEWS Backend Project </h1>

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Contributing](#-contributing)

---

## 🌟 Overview

A backend project for a Reddit-style news platform built with Node.js, Express, and PostgreSQL. This project provides a fully relational database, seeded development/test data, and a RESTful API for accessing articles, comments, topics, and users.

The application supports sorting, filtering, voting, commenting, and robust error handling, making it suitable for frontend integration and backend portfolio projects.

### Architecture Overview

The system is built upon a **RESTful API** architecture using the **Express.js** framework. It utilizes a **Model-View-Controller (MVC)** pattern to ensure a clean separation of concerns, facilitating high maintainability and scalability. The data layer is powered by **PostgreSQL**.

---

## ✨ Key Features

The NC_NEWS Backend Project provides a suite of capabilities focused on streamlining the journey from "code" to "documentation."

- 📂 **Categorized Documentation (Topics):**
  Users can access structured documentation categories via the `topics` system. This allows for the segregation of README sections such as "Installation," "API Reference," and "Contribution Guidelines," ensuring that documentation is modular and easily navigable.

- 📝 **Dynamic Article Management:**
  At the heart of the system is the `articles` engine. Each article represents a comprehensive piece of documentation or a specific repository analysis report. Users can retrieve entire documentation sets or drill down into specific IDs to get granular details about a repository's functionality.

- 👥 **Collaborative Documentation Profiles:**
  The `users` module tracks documentation authors and contributors. This provides a transparent view of who has contributed to the documentation ecosystem, fostering a collaborative environment for open-source maintenance.

- 💬 **Integrated Feedback Loop (Comments):**
  Documentation is never static. The integrated comments system allows users to provide feedback, suggest updates, or ask questions directly on specific documentation articles, ensuring the content stays accurate and user-friendly.

- 🚀 **High-Performance Data Retrieval:**
  With optimized PostgreSQL queries and Express middleware, the API delivers documentation data with minimal latency, providing a snappy experience for the end-user interface.

---

## 🛠️ Tech Stack & Architecture

The project utilizes a curated selection of industry-standard technologies chosen for their reliability, performance, and developer experience.

| Technology     | Purpose             | Why it was Chosen                                                                                             |
| :------------- | :------------------ | :------------------------------------------------------------------------------------------------------------ |
| **Express.js** | Backend Framework   | Provides a minimalist and flexible web application framework for building robust RESTful APIs.                |
| **PostgreSQL** | Relational Database | Offers advanced data integrity and complex querying capabilities required for structured documentation data.  |
| **Node.js**    | Runtime Environment | Enables the execution of JavaScript on the server side, facilitating high-concurrency documentation requests. |
| **Jest**       | Testing Framework   | Ensures code reliability and prevents regressions in the documentation generation logic.                      |
| **Supertest**  | API Testing         | Allows for comprehensive integration testing of the REST endpoints to ensure 100% uptime.                     |

---

## 📁 Project Structure

The project follows a highly organized directory structure that adheres to modern MVC standards, making it easy for contributors to navigate and extend the codebase.

```
Josobo-seeding-nc-news-2ff124d/
├── 📁 controllers/             # Handles incoming requests and orchestrates data flow
│   ├── 📄 articles.controllers.js
│   ├── 📄 comments.controllers.js
│   ├── 📄 topics.controllers.js
│   └── 📄 users.controllers.js
├── 📁 models/                  # Defines data logic and interacts directly with PostgreSQL
│   ├── 📄 articles.models.js
│   ├── 📄 comments.models.js
│   ├── 📄 topics.models.js
│   └── 📄 users.models.js
├── 📁 db/                      # Database configuration, seeding, and raw data
│   ├── 📁 data/                # Environment-specific data (test/dev)
│   │   ├── 📁 development-data/
│   │   └── 📁 test-data/
│   ├── 📁 seeds/               # Database seeding logic
│   │   ├── 📄 seed.js
│   │   └── 📄 run-seed.js
│   ├── 📄 connection.js        # PostgreSQL connection pooling configuration
│   ├── 📄 setup-dbs.sql        # Initial database environment setup
│   └── 📄 utils.js             # Database utility functions
├── 📁 __tests__/               # Comprehensive test suites
│   ├── 📄 app.test.js          # API endpoint integration tests
│   ├── 📄 seed.test.js         # Seeding process validation
│   └── 📄 utils.test.js        # Utility function unit tests
├── 📁 .husky/                  # Git hooks for code quality (pre-commit)
│   └── 📄 pre-commit
├── 📄 app.js                   # Main Express application configuration
├── 📄 errors.js                # Global error handling middleware
├── 📄 listen.js                # Server entry point
├── 📄 package.json             # Project dependencies and lifecycle scripts
├── 📄 README.md                # Project documentation
└── 📄 .gitignore               # Git exclusion rules
```

---

## 🚀 Getting Started

Follow these steps to set up the NC_NEWS Backend Project engine on your local machine for development and testing.

### Prerequisites

- **Node.js**: Version 14.x or higher is recommended.
- **npm**: Usually comes bundled with Node.js.
- **PostgreSQL**: Ensure you have a local instance of Postgres running.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/northcoders/be-nc-news.git
    cd be-nc-news
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Prepare Git Hooks:**

    ```bash
    npm run prepare
    ```

4.  **Database Setup:**
    Initialize the PostgreSQL databases (development and test environments):

    ```bash
    npm run setup-dbs
    ```

5.  **Seed the Database:**
    Populate your development database with initial documentation data:

    ```bash
    npm run seed-dev
    ```

6.  **Run the Server:**
    Start the API engine:
    ```bash
    npm run start
    ```
    The server will typically listen on port 9090 (defined in `listen.js`).

### Environment Variables

Create a `.env` file in the root of the project directory. Populate it by setting the `PGDATABASE` environment variable to the name of the desired database

in the .env.test file

```
PGDATABASE=test_database_name
```

in the `.env.development` file

````
PGDATABASE=development_database_name

---

## 🔧 Usage

Once the server is running, you can interact with the API to manage documentation data. Below are the primary user-facing endpoints.

### Documentation Topics
Retrieve categories for documentation organization.
- **Endpoint:** `GET /api/topics`
- **Action:** Fetches an array of all documentation categories (e.g., "coding", "testing", "deployment").

### User Profiles
Manage and view documentation contributors.
- **Endpoint:** `GET /api/users`
- **Action:** Fetches a list of all registered users who can contribute to documentation.

### Documentation Articles
The core content of your repository's documentation.
- **Endpoint:** `GET /api/articles`
- **Action:** Fetches a list of all documentation articles/README modules.
- **Endpoint:** `GET /api/articles/:article_id`
- **Action:** Retrieves a specific piece of documentation by its unique ID.

### Interactive Feedback
View feedback and comments on specific documentation modules.
- **Endpoint:** `GET /api/articles/:article_id/comments`
- **Action:** Fetches all user feedback related to a specific documentation article.

### Running Tests
To ensure the documentation engine is functioning correctly:
```bash
# Run all tests
npm test

# Run only the seeding tests
npm run test-seed
````

---

## 🤝 Contributing

We welcome contributions to improve the NC_NEWS Frontend Project! Whether you are fixing a bug, adding new documentation categories, or optimizing the API performance, your help is appreciated.

### How to Contribute

1. **Fork the repository** - Click the 'Fork' button at the top right of this page.
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** - Improve code, documentation, or features.
4. **Test thoroughly** - Ensure all functionality works as expected.
   ```bash
   npm test
   ```
5. **Commit your changes** - Write clear, descriptive commit messages.
   ```bash
   git commit -m 'Add: Amazing new feature that improves documentation categorization'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request** - Submit your changes for review.

### Development Guidelines

- ✅ **Follow the MVC Pattern:** Keep logic in models and orchestration in controllers.
- 📝 **Self-Documenting Code:** Write clear variable names and add comments for complex SQL queries.
- 🧪 **TDD Approach:** Write tests for new endpoints before implementing the logic.
- 🔄 **Seeding:** Ensure any changes to the data schema are reflected in the `db/data` files.

---

<p align="center">Made with ❤️ by the NC_NEWS Backtend Project Team</p>
<p align="center">
  <a href="#">⬆️ Back to Top</a>
</p>
