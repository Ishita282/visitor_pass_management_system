require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../model/userModel");
const Visitor = require("../model/visitorModel");
const Appointment = require("../model/appoinmentModel");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Clear existing data
    await User.deleteMany();
    await Visitor.deleteMany();
    await Appointment.deleteMany();

    console.log("Old data cleared");

    // Hash password
    const password = await bcrypt.hash("password123", 10);

    // Create users
    const users = await User.insertMany([
      {
        name: "Admin User",
        email: "admin@example.com",
        password: password,
        role: "admin",
      },
      {
        name: "Security Staff",
        email: "security@example.com",
        password: password,
        role: "security",
      },
      {
        name: "Employee Host",
        email: "employee@example.com",
        password: password,
        role: "employee",
      },
    ]);

    console.log("Users created");

    // Create visitors
    const visitors = await Visitor.insertMany([
      {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "9876543210",
        purpose: "Business Meeting",
      },
      {
        name: "Priya Verma",
        email: "priya@example.com",
        phone: "9123456780",
        purpose: "Interview",
      },
    ]);

    console.log("Visitors created");

    // Create appointments
    const appointments = await Appointment.insertMany([
      {
        visitor: visitors[0]._id,
        host: users[2]._id, // employee
        date: new Date(),
        status: "approved",
      },
      {
        visitor: visitors[1]._id,
        host: users[2]._id,
        date: new Date(),
        status: "pending",
      },
    ]);

    console.log("Appointments created");

    console.log("Seed data inserted successfully");
    process.exit();

  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedData();