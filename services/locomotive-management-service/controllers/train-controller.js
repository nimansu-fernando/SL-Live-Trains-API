const trainService = require('../services/train-service');

exports.getAllTrains = async (req, res) => {
    try {
        const [rows] = await trainService.getAllTrains();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving trains', error });
    }
};

exports.getTrainById = async (req, res) => {
    try {
        const [rows] = await trainService.getTrainById(req.params.id);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving train', error });
    }
};

exports.createTrain = async (req, res) => {
    try {
        const result = await trainService.createTrain(req.body);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating train', error });
    }
};

exports.updateTrain = async (req, res) => {
    try {
        await trainService.updateTrain(req.params.id, req.body);
        res.json({ message: 'Train updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating train', error });
    }
};

exports.deleteTrain = async (req, res) => {
    try {
        await trainService.deleteTrain(req.params.id);
        res.json({ message: 'Train deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting train', error });
    }
};

exports.getTrainNumberByEngineNumber = async (req, res) => {
    try {
        const [rows] = await trainService.getTrainNumberByEngineNumber(req.params.engine_number);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving train number', error });
    }
};
