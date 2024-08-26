const Joi = require('joi');

const engineSchema = Joi.object({
    engine_number: Joi.string().max(255).required(),
    type: Joi.string().max(255).required(),
    class: Joi.string().max(255).required(),
    capacity: Joi.number().integer().required(),  
    power: Joi.number().integer().required(),  
    status: Joi.string().max(255).required(),  
    iot_device_id: Joi.string().max(255).required()  
});

const trainSchema = Joi.object({
    train_number: Joi.string().max(255).required(),
    name: Joi.string().max(255).required(),
    number_of_coaches: Joi.number().integer().required(),  
    seating_capacity: Joi.number().integer().required(),  
    class_configuration: Joi.string().max(255).required(),  
    status: Joi.string().max(255).required(),  
    engine_number: Joi.string().max(255).required()  
});

module.exports = {
    engineSchema,
    trainSchema
};