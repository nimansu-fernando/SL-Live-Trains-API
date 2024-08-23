const Joi = require('joi');

const tripSchema = Joi.object({
    trip_number: Joi.number().integer().required(),  
    route_id: Joi.string().max(10).required(),  
    train_id: Joi.number().integer().required(),  
    type: Joi.string().max(255).required()  
});

const scheduleSchema = Joi.object({
    trip_id: Joi.number().integer().required(),  
    start_time: Joi.string().regex(/^\d{2}:\d{2}:\d{2}$/).required(),  
    end_time: Joi.string().regex(/^\d{2}:\d{2}:\d{2}$/).required(),  
    frequency: Joi.string().max(255).required(),  
    duration: Joi.number().integer().required()  
});

const tripStationSchema = Joi.object({
    trip_id: Joi.number().integer().required(),  
    station_id: Joi.string().max(255).required(),  
    stop_sequence: Joi.number().integer().required(),  
    arrival_time: Joi.string().regex(/^\d{2}:\d{2}:\d{2}$/).required(),  
    departure_time: Joi.string().regex(/^\d{2}:\d{2}:\d{2}$/).required(),  
    stop_duration: Joi.number().integer().required()  
});

module.exports = {
    tripSchema,
    scheduleSchema,
    tripStationSchema,
};
