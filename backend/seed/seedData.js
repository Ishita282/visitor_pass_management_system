require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../model/userModel");
const Visitor = require("../model/visitorModel");
const Appointment = require("../model/appointmentModel");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await User.deleteMany();
    await Visitor.deleteMany();
    await Appointment.deleteMany();

    console.log("Old data cleared");

    const password = await bcrypt.hash("password123", 10);

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

    const visitors = await Visitor.insertMany([
      {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "9876543210",
        host: users[2]._id,
        purpose: "Business Meeting",
      },
      {
        name: "Priya Verma",
        email: "priya@example.com",
        phone: "9123456780",
        host: users[0]._id,
        purpose: "Interview",
      },
    ]);

    console.log("Visitors created");

    const appointments = await Appointment.insertMany([
      {
        visitor: visitors[0]._id,
        host: users[2]._id,
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
