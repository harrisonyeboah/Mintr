// models/User.js
import mongoose from "mongoose";

// Define the schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true, // ensures usernames are unique
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensures emails are unique
    trim: true,
    lowercase: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false // new field: defaults to not verified
  }
}, { timestamps: true }); // adds createdAt and updatedAt

// Create the model
const User = mongoose.model("User", userSchema);

export default User;
