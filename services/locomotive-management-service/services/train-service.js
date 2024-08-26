const trainModel = require('../models/train-model');

const getAllTrains = () => {
    return trainModel.getAllTrains();
};

const getTrainById = (id) => {
    return trainModel.getTrainById(id);
};

const createTrain = (train) => {
    return trainModel.createTrain(train);
};

const updateTrain = (id, train) => {
    return trainModel.updateTrain(id, train);
};

const deleteTrain = (id) => {
    return trainModel.deleteTrain(id);
};

const getTrainNumberByEngineNumber = (engineNumber) => {
    return trainModel.getTrainNumberByEngineNumber(engineNumber);
};

module.exports = {
    getAllTrains,
    getTrainById,
    createTrain,
    updateTrain,
    deleteTrain,
    getTrainNumberByEngineNumber
};
