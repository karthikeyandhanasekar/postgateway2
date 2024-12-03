import mongoose from "mongoose";
import { userSchema } from "../models/userSchema";

// Pre-save hook to trigger Mongoose validation
userSchema.pre("save", async function (next) {
  try {
    // Trigger Mongoose's built-in validation
    await this.validate(); // This will validate all fields in the schema
    next(); // Proceed to the next middleware or save if validation passes
  } catch (error) {
    console.error();
    
    next(error); // If validation fails, pass the error to the next middleware
  }
});
