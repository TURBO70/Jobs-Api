const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "please provide company"],
      maxlength: 50,
      minlength: 3,
    },
    position: {
      type: String,
      required: [true, "please provide position"],
      maxlength: 50,
      minlength: 3,
    },
    status: {
      type: String,
      required: [true, "please provide status"],
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
