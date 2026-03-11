# Visitor Pass Management System (MERN)

## Project Overview

I developed a **Visitor Pass Management System** using the MERN stack (MongoDB, Express.js, React, and Node.js).
The goal of this project is to digitize the traditional visitor register system used in offices, institutions, and organizations.

Instead of maintaining manual entry logs, this system allows organizations to manage visitors digitally. Visitors can pre-register, hosts can approve appointments, and security personnel can verify entries using QR-code-based passes.

The system improves **security, efficiency, and record management** by providing digital visitor passes, QR code verification, and centralized dashboards for monitoring visitor activity.

### Key Features

* Role-based authentication using JWT
* Visitor pre-registration
* Appointment scheduling and approval
* QR code based visitor passes
* Check-in and check-out logging
* Dashboard for managing visitors and reports
* Email notifications for appointment and pass updates

---

# Tech Stack

### Frontend

* React
* React Router
* HTML, CSS, JavaScript

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB

### Additional Tools

* QR Code generation
* PDF pass generation

---

# Deployment

The project is deployed online so users can access it without running it locally.

* The **frontend application** is deployed using **Vercel**.
* The **backend API** is deployed using **Render**.
* The **database** is hosted on **MongoDB Atlas**.

This setup allows the application to run as a full-stack cloud-hosted system.

---

# Live Demo

Live Project Link:
`https://visitor-pass-management-system.vercel.app/`

API Base URL:
`https://visitor-pass-management-system-wnl4.onrender.com`

You can use the demo accounts below to test the application:

Admin
Email: `admin@example.com`
Password: `password123`

Security
Email: `security@example.com`
Password: `password123`

Employee
Email: `employee@example.com`
Password: `password123`

---

# GitHub Repository

Source code for this project is available on GitHub.

Repository Link:
`https://github.com/Ishita282/visitor_pass_management_system`

---

# How to Clone the Project

To run this project locally, first clone the repository from GitHub.

```bash
git clone https://github.com/Ishita282/visitor_pass_management_system
```

Then move into the project folder:

```bash
cd visitor-pass-management-system
```

---

# Project Setup Instructions

## 1. Install Dependencies

### Backend

Navigate to the backend folder and install dependencies.

```bash
cd backend
npm install
```

### Frontend

Open a new terminal and install frontend dependencies.

```bash
cd frontend
npm install
```

---

# Environment Variables

Create a `.env` file inside the **backend folder** and add the following variables.

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:4000
```

---

# Running the Project

## Start Backend Server

```bash
cd backend
npm start
```

The backend server will run on:

```
http://localhost:4000
```

---

## Start Frontend Application

```bash
cd frontend
npm start
```

The React application will run on:

```
http://localhost:3000
```

---

# Project Structure

```
visitor-pass-management-system
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── App.js
│
└── README.md
```

---

# Future Improvements

Some features that can be added in future versions:

* OTP-based visitor verification
* Multi-organization support
* Advanced analytics dashboard
* Export visitor reports
* Mobile-friendly interface

---

# Conclusion

This project demonstrates the implementation of a full-stack web application using the MERN stack. It showcases authentication, role-based access control, QR-code integration, and digital visitor pass management.

The system can be used by organizations to modernize their visitor management process and maintain secure digital records.
