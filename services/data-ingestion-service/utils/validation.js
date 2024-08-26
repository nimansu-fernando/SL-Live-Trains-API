const Joi = require('joi');

exports.validateIngestionData = (data) => {
  const schema = Joi.object({
    deviceID: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    speed: Joi.number().required(),
    timestamp: Joi.date().required(),
  });

  return schema.validate(data);
};
