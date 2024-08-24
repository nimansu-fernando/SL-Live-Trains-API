const engineModel = require('../models/engine-model');

const getAllEngines = () => {
    return engineModel.getAllEngines();
};

const getEngineById = (id) => {
    return engineModel.getEngineById(id);
};

const createEngine = (engine) => {
    return engineModel.createEngine(engine);
};

const updateEngine = (id, engine) => {
    return engineModel.updateEngine(id, engine);
};

const deleteEngine = (id) => {
    return engineModel.deleteEngine(id);
};

const getEngineNumberByDeviceId = (iotDeviceId) => {
    return engineModel.getEngineNumberByDeviceId(iotDeviceId);
};

module.exports = {
    getAllEngines,
    getEngineById,
    createEngine,
    updateEngine,
    deleteEngine,
    getEngineNumberByDeviceId
};
