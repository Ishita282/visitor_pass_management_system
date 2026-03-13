# Visitor Pass Management System (MERN)

## Project Overview

This project is a **Visitor Pass Management System** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.

The system replaces traditional manual visitor registers used in offices, institutions, and organizations with a **digital visitor management system**.

Visitors can pre-register, employees can approve appointments, and security staff can verify entries using **QR code based passes**.  
It improves **security, efficiency, and record tracking** by providing digital visitor passes, QR verification, automated logging, and centralized dashboards.

---

## Features

- Role-based authentication using **JWT**
- Visitor registration with personal details and photo
- Appointment scheduling and approval
- QR code based visitor pass generation
- PDF visitor badge generation
- Visitor check-in and check-out tracking
- Dashboard with visitor statistics
- Email notifications for appointments and passes
- Search, filter, and export visitor logs

---

## Tech Stack

### Frontend
- React
- React Router
- Axios
- HTML / CSS / JavaScript

### Backend
- Node.js
- Express.js
- JWT Authentication
- Nodemailer

### Database
- MongoDB (MongoDB Atlas)

### Additional Tools
- QR Code generation
- PDFKit for pass generation
- Email & SMS notifications

---

## Deployment

Frontend: **Vercel**  
Backend API: **Render**  
Database: **MongoDB Atlas**

**Live Project:**  
[https://visitor-pass-management-system.vercel.app/](https://visitor-pass-management-system.vercel.app/)

**API Base URL:**  
[https://visitor-pass-management-system-wnl4.onrender.com](https://visitor-pass-management-system-wnl4.onrender.com)

---

## Demo Accounts

| Role     | Email                  | Password    |
| -------- | --------------------- | ----------- |
| Admin    | admin@example.com      | password123 |
| Security | security@example.com   | password123 |
| Employee | employee@example.com   | password123 |

---

## Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account or local MongoDB
- Git

Check installation:

```bash
node -v
npm -v
```

Clone the Repository:

```bash
git clone https://github.com/Ishita282/visitor_pass_management_system
cd visitor_pass_management_system
```

### Environment Variables

Create a .env file inside the backend folder:

```bash
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
BASE_URL=http://localhost:4000

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
```

### Variable	Description
    PORT	    Backend server port
    MONGO_URI	MongoDB database connection
    JWT_SECRET	Secret key for JWT authentication
    BASE_URL	Base API URL
    EMAIL_USER	Gmail account for notifications
    EMAIL_PASS	Gmail app password
    TWILIO_*	Twilio credentials for SMS

## Installation
### Backend
```bash
cd backend
npm install
```
### Frontend
```bash

cd frontend
npm install
```

## Running the Application
### Backend
```bash
cd backend
npm start
```
    Runs on: http://localhost:4000
### Frontend
```bash
cd frontend
npm start
```
    Runs on: http://localhost:3000

## API Endpoints

- Authentication
    >> POST /api/auth/register – Register new user
    >> POST /api/auth/login – Login user and return JWT

- Visitors
    >> POST /api/visitors – Create visitor
    >> GET /api/visitors – Get all visitors
    >> GET /api/visitors/:id – Get visitor by ID

- Appointments
    >> POST /api/appointments – Create appointment
    >> GET /api/appointments – Get all appointments
    >> PATCH /api/appointments/:id/status – Approve/reject appointment

- Pass Management
    >> POST /api/pass/generate/:appointmentId – Generate visitor pass with QR & PDF

- Check Logs
    >> POST /api/checkin/:passId – Visitor check-in
    >> POST /api/checkout/:passId – Visitor check-out
    >> GET /api/checklogs – Get all check logs

- Dashboard
    >> GET /api/dashboard/stats – Visitor statistics
    >> GET /api/dashboard/search – Search/filter visitor logs
    >> GET /api/dashboard/export – Export logs (CSV/JSON)

## Database Schema

- Users
    >> name, email, password, role

- Visitors
    >> name, email, phone, purpose, photo

- Appointments
    >> visitor (ref), host (ref), date, status

- Passes
    >> visitor (ref), appointment (ref), qrCode, createdAt

- CheckLogs
    >> visitor (ref), pass (ref), checkInTime, checkOutTime


## ScreenShots

![signup](signup.png)
![dashboard](dashboard.png)
![visitor](visitor.png)
![all_visitors](all_visitors.png)
![appointment](appointment.png)
![all_appointments](all_appointments.png)
![pass](pass.png)
![scan](scan.png)
