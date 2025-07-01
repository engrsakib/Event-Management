# Eventify - A Feature-Rich Event Management MERN Application

[](https://opensource.org/licenses/MIT)
[](https://reactjs.org/)
[](https://nodejs.org/)
[](https://expressjs.com/)
[](https://www.mongodb.com/)

**Eventify** is a full-featured web application built on the MERN stack (MongoDB, Express.js, React.js, Node.js) designed for efficient event management. It provides a seamless and intuitive user experience with a custom-built authentication system, dynamic event operations, and a robust search and filtering engine.

-----

## ✨ Key Features

  - **Custom User Authentication:** Secure user registration and login system built from scratch using JWT (JSON Web Tokens) and cookie-based sessions.
  - **Dynamic Event Management (CRUD):** Authenticated users can create, read, update, and delete events with ease.
  - **Advanced Search and Filtering:** A powerful system allowing users to search events by title and filter them based on predefined date ranges (Today, This Week, Last Week, This Month, Last Month).
  - **Asynchronous Server State Management:** Utilizes **TanStack Query (React Query)** for efficient data fetching, caching, and synchronization, providing an optimistic UI and a better user experience.
  - **Event Participation System:** Users can join events, which atomically increments the attendee count. A user is restricted to joining any single event only once.
  - **Rich Text Editor:** A WYSIWYG editor for creating detailed and well-formatted event descriptions.
  - **Personalized User Dashboard:** A dedicated "My Events" page where users can view and manage only the events they have created.
  - **Secure Private Routes:** Core application pages such as Events, Add Event, and My Events are protected and accessible only to authenticated users.
  - **Interactive UI:** Built with a modern tech stack including Framer Motion for animations and Radix UI for accessible components, providing a polished and responsive user interface.

-----

## 🛠️ Technologies Used

  - **Frontend:**

      - **Framework:** React.js (v19)
      - **Build Tool:** Vite
      - **Routing:** React Router DOM
      - **Server State Management:** TanStack Query (React Query)
      - **HTTP Client:** Axios
      - **Styling:** Tailwind CSS
      - **UI Components:** Radix UI (Headless Components)
      - **Animation:** Framer Motion
      - **Rich Text Editor:** Jodit / React Simple WYSIWYG
      - **Notifications:** React Toastify, SweetAlert2
      - **Icons:** Lucide React, React Icons

  - **Backend:**

      - **Runtime:** Node.js
      - **Framework:** Express.js (with MVC Architecture)
      - **Database:** MongoDB
      - **Authentication:** JSON Web Token (JWT), Cookie-Parser
      - **API Communication:** CORS, Dotenv

-----

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed on your local machine:

  - Node.js (v18 or later)
  - npm or yarn
  - MongoDB (local installation or a cloud instance like MongoDB Atlas)

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/engrsakib/Event-Management.git
    cd Event-Management
    ```

2.  **Configure the Backend (Server):**

      - Navigate to the server directory:
        ```sh
        cd "ph server"
        ```
      - Install the required dependencies:
        ```sh
        npm install
        ```
      - Create a `.env` file in the root of the `/ph server` directory and add the necessary environment variables (see the Environment Variables section below).
      - Start the backend server:
        ```sh
        npm run dev
        ```

3.  **Configure the Frontend (Client):**

      - From the root project folder, navigate to the client directory:
        ```sh
        cd "PH client"
        ```
      - Install the required dependencies:
        ```sh
        npm install
        ```
      - Create a `.env` file in the root of the `/PH client` directory and add the necessary environment variables.
      - Start the frontend development server:
        ```sh
        npm run dev
        ```

-----

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env` files.

#### Backend (`/ph server/.env`)

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_strong_jwt_secret_key
```

#### Frontend (`/PH client/.env`)

```
VITE_API_BASE_URL=http://localhost:5000
```

-----

## 🔌 API Endpoints

The following are the main API routes supported by the backend:

### Authentication Routes

| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| `POST` | `/api/auth/register` | Register a new user.         |
| `POST` | `/api/auth/login`    | Log in an existing user.     |
| `POST` | `/api/auth/logout`   | Log out the current user.    |

### Event Routes

| Method  | Endpoint                | Description                                        |
|---------|-------------------------|----------------------------------------------------|
| `GET`   | `/api/events`           | Get all events with search and filter query params. |
| `POST`  | `/api/events`           | Create a new event (Private).                      |
| `GET`   | `/api/events/my-events` | Get all events created by the logged-in user (Private). |
| `GET`   | `/api/events/:id`       | Get details of a single event.                     |
| `PUT`   | `/api/events/:id`       | Update an existing event (Private, user-owned).    |
| `DELETE`| `/api/events/:id`       | Delete an existing event (Private, user-owned).    |
| `PATCH` | `/api/events/join/:id`  | Join an event and increment the attendee count (Private). |

-----

## 👤 Author

**Sakib**

  - **GitHub:** [@engrsakib](https://github.com/engrsakib)
  - **LinkedIn:** [Your LinkedIn Profile](https://www.linkedin.com/in/engrsakib)

-----

## 📜 License

This project is licensed under the MIT License.