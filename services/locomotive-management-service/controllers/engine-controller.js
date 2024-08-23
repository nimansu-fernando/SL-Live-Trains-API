const engineService = require('../services/engine-service');

exports.getAllEngines = async (req, res) => {
    try {
        const [rows] = await engineService.getAllEngines();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving engines', error });
    }
};

exports.getEngineById = async (req, res) => {
    try {
        const [rows] = await engineService.getEngineById(req.params.id);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Engine not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving engine', error });
    }
};

exports.createEngine = async (req, res) => {
    try {
        const result = await engineService.createEngine(req.body);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating engine', error });
    }
};

exports.updateEngine = async (req, res) => {
    try {
        await engineService.updateEngine(req.params.id, req.body);
        res.json({ message: 'Engine updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating engine', error });
    }
};

exports.deleteEngine = async (req, res) => {
    try {
        await engineService.deleteEngine(req.params.id);
        res.json({ message: 'Engine deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting engine', error });
    }
};
