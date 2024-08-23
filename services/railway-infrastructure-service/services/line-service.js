const lineModel = require('../models/line-model');

const getAllLines = () => {
    return lineModel.getAllLines();
};

const getLineById = (id) => {
    return lineModel.getLineById(id);
};

const createLine = (line) => {
    return lineModel.createLine(line);
};

const updateLine = (id, line) => {
    return lineModel.updateLine(id, line);
};

const deleteLine = (id) => {
    return lineModel.deleteLine(id);
};

module.exports = {
    getAllLines,
    getLineById,
    createLine,
    updateLine,
    deleteLine
};
