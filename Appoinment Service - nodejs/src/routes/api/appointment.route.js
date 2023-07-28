const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");
const appointmentValidation = require("../../validations/appointment.validation");
const appointmenController = require("../../controllers/appointment.controller");
const { authenticate } = require("../../middlewares/authenticate");
const ROLES = require("../../ROLES");
const { authorize } = require("../../middlewares/authorize");

router.post(
  "/",
  validate(appointmentValidation.create),
  authenticate,
  authorize([ROLES.patient,ROLES.reciptionist]),
  appointmenController.create
);
router.get(
  "/getByHospital/:id",
  authenticate,
  authorize(ROLES.reciptionist),
  appointmenController.listByHospital
);

router.get(
  "/getByPatient/:id",
  // authenticate,
  // authorize(ROLES.patient),
  appointmenController.listByPatient
);
router.get(
  "/view/:id",
  authenticate,
  authorize(ROLES.patient),
  appointmenController.view
);
router.put(
  "/cancel/:id",
  authenticate,
  authorize(ROLES.patient, ROLES.reciptionist),
  appointmenController.canceledByUser
);
router.get(
  "/latest/:id",
  authenticate,
  authorize(ROLES.patient, ROLES.reciptionist),
  appointmenController.latestAppDetailsByPatient
);

//not developped
router.get("/getByDoctor/:id", appointmenController.listByDoctor);
router.get("/getByUser/:id", appointmenController.listByUser);
router.get("/getByShedule/:id", appointmenController.listByDoctor);

module.exports = router;
