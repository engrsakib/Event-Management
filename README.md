# Event Management Web Application (MERN Stack)

**Created by**: Md. Nazmus Sakib <br/>
 Full Stack Developer | Programming Instructor | Problem Solver <br/>
**Email**: [info@engrsakib.com](mailto:info@engrsakib.com)
**Website**: [engrsakib.com](https://engrsakib.com)

---

## Overview

This Event Management Web Application is a fully functional MERN stack project that allows users to manage events efficiently. The application includes a custom authentication system, dynamic event operations, a search and filter system, and an intuitive interface for easy use. Users can browse events, add their own, and manage events they have created.

---

## Features

### 1. **Navbar**:

* Logo and website name on the left.
* Links to:

  * Home
  * Events (private route)
  * Add Event (private route)
  * My Events (private route)
  * Sign In button (when not logged in)
* If the user is logged in:

  * Profile picture displayed
  * Dropdown menu with the following options:

    * User's name (not clickable)
    * Logout button

### 2. **Homepage**:

* Custom design with a clean layout.
* Overview of the Event Management System.

### 3. **Events Page (Private Route)**:

* Displays all events added via the "Add Event" page.
* Events sorted by date and time (most recent first).
* Each event presented as a card with the following details:

  * Event Title
  * Name (who posted the event)
  * Date and Time
  * Location
  * Description
  * Attendee Count
  * Join Event button
* When the "Join Event" button is clicked, the attendee count is incremented by 1 (one-time join only).
* Search system to find events by title.
* Filters to narrow down events:

  * Today's date
  * Date range (Current Week, Last Week, Current Month, Last Month)

### 4. **Add Event Page (Private Route)**:

* A form for users to add new events:

  * Event Title
  * Name (who posted the event)
  * Date and Time
  * Location
  * Description
  * Attendee Count (default 0)
  * Add Event button
* Once the "Add Event" button is clicked, the data is saved to the MongoDB database.

### 5. **My Events Page (Private Route)**:

* Displays a list of events created by the logged-in user.
* Each event card includes:

  * Event Title
  * Name (who posted the event)
  * Date and Time
  * Location
  * Description
  * Attendee Count
  * Update button
  * Delete button
* Update functionality: Allows users to modify event details in a modal or another route.
* Delete functionality: Deletes the event after confirmation.

### 6. **Authentication System**:

* Custom-built authentication (no third-party packages).
* **Login** page with:

  * Email and Password fields
* **Registration** page with:

  * Name, Email, Password, and Photo URL fields
* Error handling for invalid credentials and missing fields.

### 7. **Error Handling**:

* Clear and relevant error messages are displayed when needed, such as invalid credentials or missing required fields.

---

## Technologies Used

### Frontend

* **React.js**: For building the user interface.
* **Tailwind CSS**: For styling and responsive design.
* **Axios**: For making HTTP requests to the server.
* **Radix UI**: For accessible UI components like dropdowns and modals.
* **Lucide React**: For icons.
* **SweetAlert2**: For custom alerts and confirmations.
* **React Router**: For routing and navigation.

### Backend

* **Node.js**: For running the server.
* **Express.js**: For handling API routes.
* **MongoDB**: For storing event and user data.
* **JWT (JSON Web Token)**: For implementing authentication and authorization.
* **Cookie-Parser**: For managing cookies.
* **Cors**: For handling cross-origin requests.
* **Moment-Timezone**: For handling time-related operations.

---

## Setup & Installation

### Prerequisites

* Node.js and npm installed on your system.
* MongoDB instance running locally or using a cloud service like MongoDB Atlas.

### Clone the Repository

```bash
git clone <repository-url>
```

### Install Dependencies

1. **Frontend (Client-side) Setup**:

   * Navigate to the `client` directory:

     ```bash
     cd client
     ```
   * Install frontend dependencies:

     ```bash
     npm install
     ```

2. **Backend (Server-side) Setup**:

   * Navigate to the `server` directory:

     ```bash
     cd server
     ```
   * Install backend dependencies:

     ```bash
     npm install
     ```

### Configuration

* Create a `.env` file in the `server` directory to store environment variables like database URL and JWT secrets.

  ```env
  MONGO_URI=<your-mongo-db-uri>
  JWT_SECRET=<your-jwt-secret>
  ```

### Run the Application

1. **Start the Backend Server**:

   * In the `server` directory, run:

     ```bash
     npm run dev
     ```

2. **Start the Frontend**:

   * In the `client` directory, run:

     ```bash
     npm run dev
     ```

3. **Access the Application**:

   * Open your browser and go to `http://localhost:3000` to view the app.

---

## File Structure

```
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Different pages of the app
│   │   ├── App.js               # Main React app
│   │   └── index.js             # Entry point
├── server/                      # Express backend
│   ├── models/                  # MongoDB models (e.g., User, Event)
│   ├── routes/                  # API routes
│   ├── controllers/             # Logic for handling requests
│   ├── middleware/              # Authentication middleware
│   ├── .env                    # Environment variables
│   ├── server.js                # Entry point for server
└── README.md                    # Project documentation
```

---

## Future Improvements

* Implement pagination for events to handle large datasets.
* Add email notifications for event join confirmations or updates.
* Improve performance with caching or pagination on the backend.
* Add more advanced features like social login (Google, Facebook, etc.).

---

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

