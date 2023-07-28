const Joi = require("joi");

module.exports = {
  create: {
    body: Joi.object({
      _id: Joi.forbidden(),
      sheduleId: Joi.number().required(),
      patientId: Joi.number().required(),
      requestedUserId: Joi.number().required(),
      doctorId: Joi.number().required(),
      hospitalId: Joi.number().required(),
      date: Joi.date().required(),
      hospitalCharges: Joi.number().required(),
      doctorCharges: Joi.number().required(),
      paymentStatus: Joi.string(),
      paymentType: Joi.string().required(),
      cashType: Joi.string().required(),
      lastUpdatedIUserID: Joi.number(),
      lastUpdatedIUserRole: Joi.string(),
    }),
  },
};
