const Joi = require('joi');

const lineSchema = Joi.object({
    line_code: Joi.string().max(10).required(),
    name: Joi.string().max(255).required(),
    description: Joi.string().allow(null, ''),
    length_km: Joi.number().precision(2).required(),
    stations: Joi.number().integer().required()
});

const routeSchema = Joi.object({
    short_code: Joi.string().max(10).required(),
    route_key: Joi.string().max(10).required(),
    name: Joi.string().max(255).required(),
    distance_km: Joi.number().precision(2).required()
});

const stationSchema = Joi.object({
    station_code: Joi.string().max(10).required(),
    name: Joi.string().max(255).required(),
    short_code: Joi.string().allow(null, ''),
    city: Joi.string().max(255).required(),
    latitude: Joi.number().precision(9).required(),
    longitude: Joi.number().precision(9).required(),
    line_id: Joi.string().max(10).required()
});

module.exports = {
    lineSchema,
    routeSchema,
    stationSchema
};
