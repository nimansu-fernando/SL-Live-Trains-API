const Joi = require('joi');

const locationSchema = Joi.object({
    deviceID: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    speed: Joi.number().required(),
    timestamp: Joi.date().required(),
    location: Joi.string().required(),
});

module.exports = {
    locationSchema,
};
