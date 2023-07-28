const CronJob = require("node-cron");
const Appointment = require("../models/appointment.model");
const { date } = require("joi");

exports.initScheduledJobs = () => {

  const ChangeStatusOfAppoiment = CronJob.schedule("*/10 * * * *", () => {
    console.log("I'm executed on a schedule!");

    // cancel = async (req, res, next) => {
    //   try {
    //     const appointment = await Appointment.findOneAndUpdate(
    //       {
    //         date: { $lte: "2023-04-20" },
    //         status: "active",
    //       },
    //       {
    //         status: "Cancelled",
    //       },
    //       { new: true }
    //     );
    //     console.log(appointment);
    //   } catch (error) {
    //     next(error);
    //   }
    // };
    // cancel();
  });

//   ChangeStatusOfAppoiment.start();
};
