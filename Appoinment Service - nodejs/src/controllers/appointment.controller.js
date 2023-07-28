const axios = require("axios");
const Appointment = require("../models/appointment.model");
const httpStatus = require("http-status");
const { request } = require("express");
const { date } = require("joi");
// const kafkaProducer = require("../middlewares/kafkaProducer");
exports.create = async (req, res, next) => {
  console.log(req.body);
  try {
    const appointmentExist = await Appointment.find({
      sheduleId: req.body.sheduleId,
      status: "active",
    });
    // console.log(appointmentExist);
    if (appointmentExist.length > 0) {
      return res.status(httpStatus.CONFLICT).json("Booked");
    }
    const isCreatedApp = await Appointment.findOne({
      patientId: req.body.patientId,
      sheduleId: req.body.sheduleId,
    });
    const isCreatedAppForSameDoc = await Appointment.findOne({
      patientId: req.body.patientId,
      date: req.body.date,
      doctorId: req.body.doctorId,
    });

    if (isCreatedApp) {
      return res.status(httpStatus.CONFLICT).send("This slot is booked!!");
    }
    if (isCreatedAppForSameDoc) {
      return res
        .status(httpStatus.CONFLICT)
        .send("Patient Already Created Appointmnet for this Doctor!!");
    }
    const appNo = Appointment.find()
      .sort({ _id: -1 })
      .select("appointmentNo")
      .limit(1);
    const appointment = new Appointment({
      sheduleId: req.body.sheduleId,
      patientId: req.body.patientId,
      requestedUserId: req.body.requestedUserId,
      requestedUserRole: req.role,
      doctorId: req.body.doctorId,
      hospitalId: req.body.hospitalId,
      appoinmentStatus: req.body.status,
      paymentStatus: req.body.paymentStatus,
      paymentType: req.body.paymentType,
      hospitalCharges: req.body.hospitalCharges,
      doctorCharges: req.body.doctorCharges,
      date: req.body.date,
    });

    await appointment.save();
    const data = {
      status: "Book",
    };
    await axios.put(
      `http://localhost:9899/doctor/avabiles/${req.body.sheduleId}`,
      data
    );
    // await kafkaProducer.sendToKafka("appointments", appointment); // Replace with your desired Kafka topic

    return res.status(httpStatus.CREATED).json({ appointment });
  } catch (error) {
    next(error);
  }
};

exports.listByDoctor = async (req, res, next) => {
  let appData = {};
  try {
    const appointment = await Appointment.find({
      doctorId: req.params.id,
    });
    let patientId = "";
    let doctorId = "";
    let hospitalId = "";
    let requestedUserId = "";
    if (appointment.length !== 0) {
      appointment.map((app, idx) => {
        patientId = patientId + app.patientId + ",";
        doctorId = doctorId + app.doctorId + ",";
        hospitalId = hospitalId + app.hospitalId + ",";
        requestedUserId = requestedUserId + app.requestedUserId + ",";
      });
      let responseRecp;
      if (appointment.role === "Receptionist") {
        responseRecp = await axios.get(
          `http://localhost:9896/admin/Employees?ids=${requestedUserId}`
        );
        appData.requestedUserId = responseRecp.data;
      }
      const responseDoc = await axios.get(
        `http://localhost:9896/admin/Employees?ids=${doctorId}`
      );

      const responseHos = await axios.get(
        `http://localhost:9896/admin/hospitals?ids=${hospitalId}`
      );
      const responsepatient = await axios.get(
        `http://localhost:9897/auth/patient?ids=${patientId}`
      );
      for (let i = 0; i < responsepatient.data.length; i++) {
        let doctor = {
          name:
            responseDoc.data[0].firstName + " " + responseDoc.data[0].firstName,
          id: responseDoc.data.id,
        };
        let hospital = {
          name: responseHos.data[0].name,
          branch: responseHos.data[0].branch,
          id: responseHos.data[0].id,
        };
        let recptionist;
        if (responseRecp !== null && responseRecp !== undefined) {
          recptionist = {
            name:
              responseRecp.data[0].firstName + responseRecp.data[0].firstName,
            id: responseRecp.data[0].id,
          };
        }
        let patient = {
          name:
            responsepatient.data[0].firstName +
            " " +
            responsepatient.data[0].firstName,
          id: responsepatient.data[0].id,
        };
        appData[i] = { doctor, hospital, patient, recptionist };
      }
      return res.status(httpStatus.OK).json({ appData });
    } else {
      return res.status(httpStatus.NOT_FOUND).send("No appointment found");
    }
  } catch (error) {
    next(error);
  }
};

exports.listByUser = async (req, res, next) => {
  let appData = {};
  try {
    const appointment = await Appointment.find({
      requestedUserId: req.params.id,
      status: "Cancelled",
    });
    let patientId = "";
    let doctorId = "";
    let hospitalId = "";
    let requestedUserId = "";
    if (appointment.length !== 0) {
      appointment.map((app, idx) => {
        patientId = patientId + app.patientId + ",";
        doctorId = doctorId + app.doctorId + ",";
        hospitalId = hospitalId + app.hospitalId + ",";
        requestedUserId = requestedUserId + app.requestedUserId + ",";
      });
      let responseRecp;
      if (appointment.requestedUserId !== appointment.patientId) {
        responseRecp = await axios.get(
          `http://localhost:9896/admin/Employees?ids=${requestedUserId}`
        );
        appData.requestedUserId = responseRecp.data;
      }
      const responseDoc = await axios.get(
        `http://localhost:9896/admin/Employees?ids=${doctorId}`
      );

      const responseHos = await axios.get(
        `http://localhost:9896/admin/hospitals?ids=${hospitalId}`
      );
      const responsepatient = await axios.get(
        `http://localhost:9897/auth/patient?ids=${patientId}`
      );
      for (let i = 0; i < responsepatient.data.length; i++) {
        let doctor = {
          name:
            responseDoc.data[0].firstName + " " + responseDoc.data[0].firstName,
          id: responseDoc.data.id,
        };
        let hospital = {
          name: responseHos.data[0].name,
          branch: responseHos.data[0].branch,
          id: responseHos.data[0].id,
        };
        let recptionist;
        if (responseRecp !== null && responseRecp !== undefined) {
          recptionist = {
            name:
              responseRecp.data[0].firstName + responseRecp.data[0].firstName,
            id: responseRecp.data[0].id,
          };
        }
        let patient = {
          name:
            responsepatient.data[0].firstName +
            " " +
            responsepatient.data[0].firstName,
          id: responsepatient.data[0].id,
        };
        appData[i] = { doctor, hospital, patient, recptionist };
      }
      return res.status(httpStatus.OK).json({ appData });
    } else {
      return res.status(httpStatus.NOT_FOUND).send("No appointment found");
    }
  } catch (error) {
    next(error);
  }
};
exports.listByPatient = async (req, res, next) => {
  let appData = {};
  try {
    const appointment = await Appointment.find({
      patientId: req.params.id,
      // status: "Cancelled",
    });
    if (appointment.length !== 0) {
      let responseRecp;
      for (let i = 0; i < appointment.length; i++) {
        if (appointment[i].requestedUserId !== appointment[i].patientId) {
          responseRecp = await axios.get(
            `http://localhost:9896/admin/Employees?ids=${appointment[i].requestedUserId}`
          );
        }
        const responseDoc = await axios.get(
          `http://localhost:9896/admin/Employees?ids=${appointment[i].doctorId}`
        );

        const responseHos = await axios.get(
          `http://localhost:9896/admin/hospitals?ids=${appointment[i].hospitalId}`
        );
        const responsepatient = await axios.get(
          `http://localhost:9897/auth/patient?ids=${appointment[i].patientId}`
        );
        let doctor = {
          name:
            responseDoc.data[0].firstName + " " + responseDoc.data[0].lastName,
          id: responseDoc.data[0].id,
        };
        let hospital = {
          name: responseHos.data[0].name,
          branch: responseHos.data[0].branch,
          id: responseHos.data[0].id,
        };
        let recptionist = {};
        if (responseRecp.data.length > 0) {
          recptionist = {
            name:
              responseRecp.data[0].firstName + responseRecp.data[0].firstName,
            id: responseRecp.data[0].id,
          };
        }
        let patient = {
          name:
            responsepatient.data[0].firstName +
            " " +
            responsepatient.data[0].firstName,
          id: responsepatient.data[0].id,
        };
        appData[i] = {
          id: appointment[i]._id,
          date: appointment[i].date,
          status: appointment[i].status,
          doctor,
          hospital,
          patient,
          recptionist,
        };
      }
      return res.status(httpStatus.OK).json({ appData });
    } else {
      return res.status(httpStatus.NOT_FOUND).send("No appointment found");
    }
  } catch (error) {
    next(error);
  }
};

exports.listByHospital = async (req, res, next) => {
  let appData = {};
  try {
    const appointment = await Appointment.find({
      hospitalId: req.params.id,
    });
    let patientId = "";
    let doctorId = "";
    let hospitalId = "";
    let requestedUserId = "";
    console.log(appointment.length,"?????");
    if (appointment.length !== 0) {
      appointment.map((app, idx) => {
        patientId = patientId + app.patientId + ",";
        doctorId = doctorId + app.doctorId + ",";
        hospitalId = hospitalId + app.hospitalId + ",";
        requestedUserId = requestedUserId + app.requestedUserId + ",";
        // status = app.status
      });
      
      console.log(appointment[0].requestedUserId);
      for(let j=0;j<appointment.length;j++){
        let responseRecp;
        if (appointment.role === "Receptionist") {
          responseRecp = await axios.get(
            `http://localhost:9896/admin/Employees?ids=${appointment[j].requestedUserId}`
          );
          appData.requestedUserId = responseRecp.data;
        }
        const responseDoc = await axios.get(
          `http://localhost:9896/admin/Employees?ids=${appointment[j].doctorId}`
        );
  
        const responseHos = await axios.get(
          `http://localhost:9896/admin/hospitals?ids=${appointment[j].hospitalId}`
        );
        const responsepatient = await axios.get(
          `http://localhost:9897/auth/patient?ids=${appointment[j].patientId}`
        );
        let doctor = {
          name:
            responseDoc.data[0].firstName + " " + responseDoc.data[0].firstName,
          id: responseDoc.data.id,
        };
      
        let recptionist;
        if (responseRecp !== null && responseRecp !== undefined) {
          recptionist = {
            name:
              responseRecp.data[0].firstName + responseRecp.data[0].firstName,
            id: responseRecp.data[0].id,
          };
        }
        let patient = {
          name:
            responsepatient.data[0].firstName +
            " " +
            responsepatient.data[0].lastName,
          id: responsepatient.data[0].id,
          email: responsepatient.data[0].email,
          gender: responsepatient.data[0].gender,
          mobileNumber: responsepatient.data[0].mobileNumber,
          doctorName: doctor.name,
          status: appointment[0].status,
          date:appointment[0].date,
        };
        appData[j] = patient;
      }
      console.log(appData,">>>>>>>>>>");
    
      return res.status(httpStatus.OK).json( appData );
    } else {
      return res.status(httpStatus.NOT_FOUND).send("No appointment found");
    }
  } catch (error) {
    next(error);
  }
};

exports.listByShedule = async (req, res, next) => {
  try {
    const appointment = await Appointment.find({
      sheduleId: req.params.id,
      status: "active",
    });
    console.log(req.params.id);
    if (appointment.length !== 0) {
      return res.status(httpStatus.OK).json({ appointment });
    } else {
      return res.status(httpStatus.NOT_FOUND).send("No appointment found");
    }
  } catch (error) {
    next(error);
  }
};

exports.view = async (req, res, next) => {
  console.log(req.headers.loggeduser, "header");
  let appData = {};
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(httpStatus.NOT_FOUND).send("User not found!!");
    }
    console.log(appointment.patientId);
    if (appointment.requestedUserId !== appointment.patientId) {
      const responseRecp = await axios.get(
        `http://localhost:9896/admin/Employees?ids=${appointment.requestedUserId}`
      );
    }
    const responseDoc = await axios.get(
      `http://localhost:9896/admin/Employees?ids=${appointment.doctorId}`
    );
    const responseHos = await axios.get(
      `http://localhost:9896/admin/hospitals?ids=${appointment.hospitalId}`
    );
    const responsepatient = await axios.get(
      `http://localhost:9897/auth/patient?ids=${appointment.patientId}`
    );
    appData.doctor = responseDoc.data;
    appData.hospital = responseHos.data;
    appData.patient = responsepatient.data;
    console.log("Patient name", appData);
    return res.status(httpStatus.OK).json({ appData });
  } catch (error) {
    next(error);
  }
};
exports.cancel = async (req, res, next) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      req.params.id,
      {
        status: "Cancelled",
      },
      { new: true }
    );
    if (!appointment) {
      return res.status(httpStatus.NOT_FOUND).send("User not found!!");
    }
    return res.status(httpStatus.OK).json({ appointment });
  } catch (error) {
    next(error);
  }
};
exports.canceledByUser = async (req, res, next) => {
  console.log(req.body);

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: "active",
        lastUpdatedIUserRole: req.role,
        lastUpdatedIUserID: req.body.patientId,
      },

      { new: true }
    );
    if (!appointment) {
      return res.status(httpStatus.NOT_FOUND).send("User not found!!");
    }
    return res.status(httpStatus.OK).json({ appointment });
  } catch (error) {
    next(error);
  }
};
exports.latestAppDetailsByPatient = async (req, res, next) => {
  let appData = {};
  try {
    const appointment = await Appointment.find({
      patientId: req.params.id,
      status: "active",
    })
      .sort({ _id: -1 })
      .limit(1);

    let patientId = "";
    let doctorId = "";
    let hospitalId = "";
    let requestedUserId = "";
    if (appointment.length !== 0) {
      appointment.map((app, idx) => {
        patientId = patientId + app.patientId + ",";
        doctorId = doctorId + app.doctorId + ",";
        hospitalId = hospitalId + app.hospitalId + ",";
        requestedUserId = requestedUserId + app.requestedUserId + ",";
      });
      let responseRecp;
      if (appointment.role === "Receptionist") {
        console.log("looo");
        responseRecp = await axios.get(
          `http://localhost:9896/admin/Employees?ids=${requestedUserId}`
        );
        appData.requestedUserId = responseRecp.data;
      }
      const responseDoc = await axios.get(
        `http://localhost:9896/admin/Employees?ids=${doctorId}`
      );

      const responseHos = await axios.get(
        `http://localhost:9896/admin/hospitals?ids=${hospitalId}`
      );
      const responsepatient = await axios.get(
        `http://localhost:9897/auth/patient?ids=${patientId}`
      );
      for (let i = 0; i < responsepatient.data.length; i++) {
        let doctor = {
          name:
            responseDoc.data[0].firstName + " " + responseDoc.data[0].lastName,
          id: responseDoc.data[0].id,
        };
        let hospital = {
          name: responseHos.data[0].name,
          branch: responseHos.data[0].branch,
          id: responseHos.data[0].id,
        };
        let recptionist;
        if (responseRecp !== null && responseRecp !== undefined) {
          recptionist = {
            name:
              responseRecp.data[0].firstName + responseRecp.data[0].lastName,
            id: responseRecp.data[0].id,
          };
        }
        let patient = {
          name:
            responsepatient.data[0].firstName +
            " " +
            responsepatient.data[0].lastName,
          id: responsepatient.data[0].id,
        };
        let date = appointment[0].date;
        let id = appointment[0]._id;
        let otherData = { date, id };
        appData[i] = { doctor, hospital, patient, recptionist, otherData };
      }
      return res.status(httpStatus.OK).json({ appData });
    } else {
      return res.status(httpStatus.NOT_FOUND).send("No appointment found");
    }
  } catch (error) {
    next(error);
  }
};
