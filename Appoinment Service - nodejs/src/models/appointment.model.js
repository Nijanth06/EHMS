const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentShema = new Schema(
  {
    sheduleId: {
      type: Number,
      required: true,
    },
    patientId: {
      type: Number,
      required: true,
    },
    requestedUserId: {
      type: Number,
      required: true,
    },
    lastUpdatedIUserID: {
      type: Number,
      default: null,
    },
    lastUpdatedIUserRole: {
      type: String,
      default: null,
    },
    doctorId: {
      type: Number,
      required: true,
    },
    hospitalId: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    requestedUserRole: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    hospitalCharges: {
      type: Number,
      required: true,
    },
    doctorCharges: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    paymentType: {
      type: String,
      required: true,
    },
    cashType: {
      type: String,
      // required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
appointmentShema.virtual("id").get(function () {
  return this._id.toHexString();
});
appointmentShema.set("toJSON", {
  virtual: true,
});

module.exports = mongoose.model("appointment", appointmentShema);
