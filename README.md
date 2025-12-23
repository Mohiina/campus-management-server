# Campus Management System

## Overview
This repository contains both the **backend API** and the **frontend client** for the Campus Management System.  
The system allows managing campuses and students, including creating, reading, updating, and deleting records.  

---

## Backend (Server-Side)

### Description
The backend handles all data operations related to campuses and students, including database interactions and API request processing.

### Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Sequelize (ORM)

### Features
- Exposes RESTful API endpoints for campuses and students
- Performs CRUD (Create, Read, Update, Delete) operations
- Manages relationships between campuses and enrolled students
- Validates and persists data in a PostgreSQL database

### Project Structure
The backend is modular with separate folders for:
- Database models
- API routes
- Application configuration

---

## Frontend (Client-Side)

### Description
The frontend provides a user interface for managing campuses and students. It is built using React, Redux, and React Router, communicating with the backend API via Axios.

### Technologies Used
- React
- Redux
- React Router
- Axios

### Features
- View all campuses and students
- View individual campus and student details
- Add, edit, and delete campuses
- Add, edit, and delete students

---



## Getting Started (Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/Mohiina/campus-management-server.git
cd campus-management-server
```

---

## Start the Backend Server

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install backend dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm start
```

The backend API will run at:

```
http://localhost:3001
```


---

## Start the Frontend Application

1. Open a **new terminal window/tab**

2. Navigate to the frontend folder:

```bash
cd frontend
```

3. Install frontend dependencies:

```bash
npm install
```

4. Start the frontend application:

```bash
npm start
```

The frontend will run at:

```
http://localhost:3000
```

---

## Running the Full Application

* Backend must be running **first**
* Frontend communicates with the backend API at `localhost:3001`
* Access the app in your browser at:

```
http://localhost:3000
```

---




## Contributors
- Name: Mokhinabonu Ubaydulloeva
- Email: Mokhinabonu.ubaydulloeva43@myhunter.cuny.edu
- GitHub: [Mohiina](https://github.com/Mohiina)
  
