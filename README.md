# Stolaris User Frontend

## Table of Contents

1. [Introduction](#1-introduction)
2. [Tech Stack](#2-technologies-used)
3. [Project Structure](#3-project-structure)
4. [Features](#4-features)
5. [Setup and Installation](#5-setup-and-installation)
6. [API Integration](#6-api-integration)
7. [Authentication](#7-authentication)
8. [Live Preview](#8-live-preview)

## 1. Introduction

This project is a React-based web application designed to provide a user-facing interface using the [Stolaris Blog API](https://github.com/Stolir/stolaris-blog-api/). It allows users to browse articles, view author profiles, leave comments, and manage their own profiles. The application is built with a focus on responsiveness and a smooth user experience. To view this site refer to the [live preview](#8-live-preview) section.

## 2. Tech Stack

The project leverages modern web development technologies to deliver a robust and interactive experience:

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool that provides a lightning-fast development experience.
- **JavaScript (ESM)**: The primary programming language, utilizing ES Modules for modularity.
- **CSS Modules**: For scoped styling of components.
- **React Router**: For declarative routing within the application.
- **Tiptap**: A headless wrapper around ProseMirror, used for rich text editing capabilities (though primarily for rendering in the user frontend).
- **Dotenv**: For managing environment variables.

## 3. Project Structure

The application follows a component-based architecture, organized into logical directories:

```
src/
├── App.jsx                 # Main application component
├── components/             # Reusable UI components
│   ├── AlertBox/
│   ├── ArticleCard/
│   ├── ... (and many more)
├── context/                # React Context for global state management (e.g., AuthContext)
├── index.css               # Global CSS styles
├── lib/                    # Utility functions and API request handlers
│   ├── serverRequests.js
│   ├── tiptapUtils.js
│   └── utils.js
├── loaders/                # Data loaders for React Router
│   ├── articleLoader.js
│   └── userLoader.js
├── main.jsx                # Entry point of the application
├── pages/                  # Page-level components (e.g., HomePage, ArticlePage)
│   ├── AboutMePage/
│   ├── ArticlePage/
│   ├── ... (and many more)
└── router.jsx              # React Router configuration
```

## 4. Features

This project provides the following key features:

- **Article Browsing**: Users can view a list of articles and read full article content.
- **User Authentication**: Secure login and registration functionality.
- **Commenting System**: Users can post and view comments on articles.
- **User Profiles**: View and manage personal user profiles.
- **Responsive Design**: Optimized for various screen sizes and devices.
- **Rich Text Rendering**: Displays articles with rich text formatting and syntax highlighting.

## 5. Setup and Installation

To set up and run the project locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Stolir/stolaris-user-frontend.git
    cd stolaris-user-frontend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    # or yarn install
    ```
3.  **Configure environment variables**:
    Create a `.env` file in the root directory and add your API URL:
    ```
    VITE_API_URL=http://localhost:3000 # Replace with your backend API URL
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    # or yarn dev
    ```
    The application will typically be available at `http://localhost:5173`.

## 6. API Integration

The frontend communicates with a backend API to fetch and submit data. The `src/lib/serverRequests.js` file contains functions responsible for making API calls. Key API interactions include:

- **Authentication**: `loginUser`, `registerUser`, `logoutUser`, `getUser`.
- **Articles**: `getArticles`, `getArticle`.
- **Comments**: `addComment`, `deleteComment`, `getAllComments`.
- **User Management**: `updateUser`.

All API requests are made using `fetch` and include `credentials: "include"` to handle cookies for authentication.

## 7. Authentication

The application uses a token-based authentication system, managed via `AuthContext.jsx`. The `AuthContext` provides a global state for user authentication, including `user` data, `login`, `logout`, `loading`, and `setLoading` functions. This context ensures that authentication status is available throughout the application.

## 8. Live Preview

To view the site head to https://abdelrahman-blog.netlify.app/
