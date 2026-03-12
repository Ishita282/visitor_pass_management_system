# Visitor Pass Management System (MERN)

## Project Overview

This project is a **Visitor Pass Management System** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.

The purpose of this system is to replace traditional manual visitor registers used in offices, institutions, and organizations with a **digital visitor management system**.

Visitors can pre-register, employees can approve appointments, and security staff can verify entries using **QR code based passes**.

The system improves **security, efficiency, and record tracking** by providing digital visitor passes, QR verification, automated logging, and centralized dashboards.

---

# Features

* Role-based authentication using **JWT**
* Visitor registration with personal details and photo
* Appointment scheduling and approval
* QR code based visitor pass generation
* PDF visitor badge generation
* Visitor check-in and check-out tracking
* Dashboard with visitor statistics
* Email notifications for appointments and passes
* Search, filter, and export visitor logs

---

# Tech Stack

## Frontend

* React
* React Router
* Axios
* HTML / CSS / JavaScript

## Backend

* Node.js
* Express.js
* JWT Authentication
* Nodemailer

## Database

* MongoDB (MongoDB Atlas)

## Additional Tools

* QR Code generation
* PDFKit for pass generation
* Email notifications

---

# Deployment

The project is deployed using cloud services.

Frontend: **Vercel**
Backend API: **Render**
Database: **MongoDB Atlas**

Live Project:

https://visitor-pass-management-system.vercel.app/

API Base URL:

https://visitor-pass-management-system-wnl4.onrender.com

---

# Demo Accounts

You can test the system using the following demo accounts.

Admin
Email: [admin@example.com](mailto:admin@example.com)
Password: password123

Security
Email: [security@example.com](mailto:security@example.com)
Password: password123

Employee
Email: [employee@example.com](mailto:employee@example.com)
Password: password123

---

# Prerequisites

Before running this project locally, make sure you have installed:

* Node.js (version 16 or higher)
* npm or yarn
* MongoDB Atlas account or local MongoDB
* Git

Check installation:

```
node -v
npm -v
```

---

# Clone the Repository

```
git clone https://github.com/Ishita282/visitor_pass_management_system
```

Move into the project directory:

```
cd visitor_pass_management_system
```

---

# Environment Variables

Create a `.env` file inside the **backend folder**.

Example:

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
BASE_URL=http://localhost:4000

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

Explanation:

| Variable   | Description                          |
| ---------- | ------------------------------------ |
| PORT       | Backend server port                  |
| MONGO_URI  | MongoDB database connection          |
| JWT_SECRET | Secret key for JWT authentication    |
| BASE_URL   | Base API URL                         |
| EMAIL_USER | Gmail account used for notifications |
| EMAIL_PASS | Gmail app password                   |

---

# Installation

## Install Backend Dependencies

```
cd backend
npm install
```

## Install Frontend Dependencies

Open another terminal.

```
cd frontend
npm install
```

---

# Running the Application

## Start Backend Server

```
cd backend
npm start
```

Server runs at:

```
http://localhost:4000
```

---

## Start Frontend

```
cd frontend
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

# API Endpoints

## Authentication

POST /api/auth/register
Register a new user.

POST /api/auth/login
Login user and return JWT token.

---

## Visitors

POST /api/visitors
Create a new visitor.

GET /api/visitors
Get all visitors.

GET /api/visitors/:id
Get visitor by ID.

---

## Appointments

POST /api/appointments
Create appointment.

GET /api/appointments
Get all appointments.

PUT /api/appointments/:id/status
Approve or reject appointment.

---

## Pass Management

POST /api/pass/generate/:appointmentId
Generate visitor pass with QR code and PDF badge.

---

## Check Logs

POST /api/checkin/:passId
Check-in visitor.

POST /api/checkout/:passId
Check-out visitor.

GET /api/checklogs
Get all check logs.

---

## Dashboard

GET /api/dashboard/stats
Get visitor statistics.

GET /api/dashboard/search
Search and filter visitor logs.

GET /api/dashboard/export
Export visitor logs (CSV / JSON).

---

# Database Schema

The system uses the following MongoDB collections.

## Users

Stores system users (Admin, Security, Employee).

Fields:

* name
* email
* password
* role

---

## Visitors

Stores visitor information.

Fields:

* name
* email
* phone
* purpose
* photo

---

## Appointments

Stores appointment requests between visitors and hosts.

Fields:

* visitor (reference)
* host (reference)
* date
* status

---

## Passes

Stores generated visitor passes.

Fields:

* visitor
* appointment
* qrCode
* createdAt

---

## CheckLogs

Tracks visitor entry and exit.

Fields:

* visitor
* pass
* checkInTime
* checkOutTime

---

# Project Structure

```
visitor_pass_management_system
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── utils
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── utils
│   │
│   └── App.js
│
└── README.md
```

---

# Future Improvements

Possible improvements for future versions:

* OTP-based visitor verification
* Multi-organization support
* Advanced analytics dashboard
* Mobile responsive UI
* Role-based dashboard views

---

# Conclusion

This project demonstrates a complete **MERN stack application** implementing authentication, visitor management, QR code generation, and digital pass verification.

The system helps organizations modernize their visitor management process by replacing manual registers with a secure and scalable digital platform.

---